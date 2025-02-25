const Album = require("../models/album.model");

exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    if (albums.length > 0) {
      res.status(200).json({ message: "Albums fetched successfully.", albums });
    } else {
      res.status(404).json({ message: "No albums found.", albums: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching albums" });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const { albumdata } = req.body;
    const album = new Album(albumdata);
    await album.save();
    res.status(201).json({ message: "Album created.", album });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating album" });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { albumdata } = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(id, albumdata, {
      new: true,
    });
    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found." });
    }
    res
      .status(200)
      .json({ message: "Album updated successfully.", updatedAlbum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating album" });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAlbum = await Album.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found." });
    }
    res
      .status(200)
      .json({ message: "Album deleted successfully.", deletedAlbum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting album" });
  }
};
