const fs = require("fs");
const path = require("path");
const Image = require("../models/image.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate({
      path: "albumId",
      populate: {
        path: "owner",
      },
    });
    if (!images.length) {
      res.status(200).json({ message: "No images found.", images });
    } else {
      res.status(200).json({ message: "Images fetched successfully", images });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch images." });
  }
};

exports.getFavoriteImages = async (req, res) => {
  const { albumId } = req.params;
  try {
    const favouriteImages = await Image.find({ albumId, isFavorite: true });
    if (!favouriteImages.length) {
      res
        .status(200)
        .json({ message: "No favourite images found in the album.", images });
    } else {
      res.status(200).json({
        message: "Favourite images fetched from the album.",
        favouriteImages,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load favourite images" });
  }
};

exports.getImagesByTag = async (req, res) => {
  try {
    const { tags } = req.query;

    const tagFilter = tags ? { tags: { $in: tags.split(",") } } : {};

    const images = await Image.find(tagFilter).populate({
      path: "albumId",
      populate: {
        path: "owner",
      },
    });

    res
      .status(200)
      .json({ message: "Images with the following tags fetched.", images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load images with tags." });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { imageData } = req.body;

    const parsedImageData = imageData ? JSON.parse(imageData) : {};

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const fileSize = fs.statSync(filePath).size;
    const fileExt = path.extname(filePath).toLowerCase();

    const allowedExtentions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!allowedExtentions.includes(fileExt)) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        message: "Invalid image format. Only JPG, PNG and GIF are allowed.",
      });
    }

    if (fileSize > 5 * 1024 * 1024) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }
    const sizeInMb = (fileSize / (1024 * 1024)).toFixed(2);
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    fs.unlinkSync(filePath);

    const newImage = new Image({
      ...parsedImageData,
      size: sizeInMb,
      imageUrl: cloudinaryResponse.secure_url,
      imgPublicId: cloudinaryResponse.public_id,
    });

    const savedImage = await newImage.save();
    const uploadedImage = await savedImage.populate({
      path: "albumId",
      populate: {
        path: "owner",
      },
    });

    res
      .status(201)
      .json({ message: "Image uploaded successfully", uploadedImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};

exports.favouriteImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.isFavourite = !image.isFavourite;
    const updatedImage = await image.save();

    res.status(200).json({
      message: `Image ${
        image.isFavourite ? "added to" : "removed from"
      } favourites`,
      updatedImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle favourite status." });
  }
};

exports.addComment = async (req, res) => {
  const { imageId } = req.params;
  try {
    const { comment } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(
      imageId,
      {
        $addToSet: { comments: comment },
      },
      { new: true }
    );

    if (!updatedImage) {
      res.status(400).json({ message: "Failed to add comment for image." });
    } else {
      res
        .status(201)
        .json({ message: "Added comment for image.", updatedImage, comment });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment for image." });
  }
};

exports.deleteImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);

    if (!deletedImage) {
      return res.status(400).json({ message: "Failed to delete image." });
    }

    // Make sure public_id exists in the image document
    if (deletedImage.public_id) {
      await cloudinary.uploader.destroy(deletedImage.public_id);
    }

    res.status(200).json({ message: "Image deleted.", deletedImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete image." });
  }
};
