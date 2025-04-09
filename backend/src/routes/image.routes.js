const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadImage,
  getFavoriteImages,
  getImagesByTag,
  addComment,
  favouriteImage,
  deleteImage,
  getAllImages,
} = require("../controller/image.controller");
const authenticate = require("../middlewares/auth.middleware");

// multer
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const multerUpload = multer({ storage });

router.use(authenticate);

router.get("/", getAllImages);
router.get("/favourites", getFavoriteImages);
router.get("/search", getImagesByTag);
router.post("/", multerUpload.single("file"), uploadImage);
router.put("/:imageId/favourite", favouriteImage);
router.post("/:imageId/comments", addComment);
router.delete("/:imageId", deleteImage);

module.exports = router;
