const mongoose = require("mongoose");

// Album model
const albumSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pics-users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    emails: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model("albums", albumSchema);

module.exports = Album;
