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

router.use(authenticate);

router.get("/", getAlbums);
router.post("/", createAlbum);
router.put("/:albumId", updateAlbum);
router.post("/:albumId/share", shareAlbum);
router.delete("/:albumId", deleteAlbum);

module.exports = router;
