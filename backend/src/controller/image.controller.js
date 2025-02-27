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
