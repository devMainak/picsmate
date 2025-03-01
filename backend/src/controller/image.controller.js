const fs = require("fs");
const path = require("path");
const Image = require("../models/image.model");
const multer = require("multer");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer
const storage = multer.diskStorage({});
export const upload = multer({ storage });

exports.getImagesInAlbum = async (req, res) => {
  const { albumId } = req.params;
  try {
    const images = await Image.find({ albumId });
    if (!images.length) {
      res.status(404).json({ message: "No image found." });
    } else {
      res.status(200).json({ message: "Images fetched successfully.", images });
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
        .status(404)
        .json({ message: "No favourite images found in the album." });
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
    const { albumId } = req.params;
    const { tags } = req.query;

    const tagFilter = tags ? { tags: { $in: tags.split(",") } } : {};

    const images = await Image.find({ albumId, ...tagFilter });
    if (!images.length) {
      res.status(404).json({ message: "Failed to load images with tags." });
    } else {
      res
        .status(200)
        .json({ message: "Images with the following tags fetched.", images });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load images with tags." });
  }
};

exports.uploadImage = async (req, res) => {
  const { imageData } = req.body;

  try {
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

    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    fs.unlinkSync(filePath);

    const newImage = new Image({
      ...imageData,
      imageUrl: cloudinaryResponse.secure_url,
    });
    const savedImage = await newImage.save();

    res
      .status(201)
      .json({ message: "Image uploaded successfully", savedImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};

exports.favouriteImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    const { isFavorite } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(imageId, { isFavorite });
    if (!updatedImage) {
      res.status(400).json({ message: "Failed to add image as favourite" });
    } else {
      res
        .status(200)
        .json({ message: "Image added as favourite", updatedImage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add image as favourite." });
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
        .json({ message: "Added comment for image.", updatedImage });
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
      res.status(400).json({ message: "Failed to delete image." });
    } else {
      res.status(200).json({ message: "Image deleted.", deletedImage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete image." });
  }
};
