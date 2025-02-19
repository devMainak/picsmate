const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );

  return accessToken;
};

module.exports = { createAccessToken };
