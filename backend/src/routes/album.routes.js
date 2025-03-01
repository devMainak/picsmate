const express = require("express");
const router = express.Router();
const {
  createAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  shareAlbum,
} = require("../controller/album.controller");
const authenticate = require("../middlewares/auth.middleware");


router.get("/", authenticate, getAlbums);
router.post("/", authenticate, createAlbum);
router.put("/:albumId", authenticate, updateAlbum);
router.post("/:albumId/share", authenticate, shareAlbum)
router.delete("/:albumId", authenticate, deleteAlbum);

module.exports = router;
