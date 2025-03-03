const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadImage,
  getImagesInAlbum,
  getFavoriteImages,
  getImagesByTag,
  addComment,
  favouriteImage,
  deleteImage,
} = require("../controller/image.controller");
const authenticate = require("../middlewares/auth.middleware");

// multer
const storage = multer.diskStorage({});
const multerUpload = multer({ storage });

router.use(authenticate);

router.get("/", getImagesInAlbum);
router.get("/favourites", getFavoriteImages);
router.get("/tags", getImagesByTag);
router.post("/", multerUpload.single("image"), uploadImage);
router.put("/:imageId/favourite", favouriteImage);
router.post("/:imageId/comments", addComment);
router.delete("/:imageId", deleteImage);

module.exports = router;
