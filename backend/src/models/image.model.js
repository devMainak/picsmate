const mongoose = require("mongoose");

// Image model
const imageSchema = new mongoose.Schema(
  {
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "albums",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    person: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        owner: {
          name: String,
          profilePic: String,
        },
        comment: String,
      },
    ],
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("images", imageSchema);

module.exports = Image;
