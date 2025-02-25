const mongoose = require("mongoose");

// User model
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("pics-users", userSchema);

module.exports = User;
