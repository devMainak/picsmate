const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const {
  uploadImage,
  upload,
  getImagesInAlbum,
  getFavoriteImages,
  getImagesByTag,
  addComment,
  favouriteImage,
  deleteImage,
} = require("../controller/image.controller");

router.get("/", authenticate, getImagesInAlbum);
router.get("/favourites", authenticate, getFavoriteImages);
router.get("/tags", authenticate, getImagesByTag);
router.post("/", authenticate, upload.single("image"), uploadImage);
router.put("/:imageId/favourite", authenticate, favouriteImage);
router.post("/:imageId/comments", authenticate, addComment);
router.delete("/:imageId", authenticate, deleteImage);

module.exports = router;
