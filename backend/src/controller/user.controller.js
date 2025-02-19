const User = require("../models/user.model");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User details fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
