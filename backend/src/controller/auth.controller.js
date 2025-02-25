const User = require("../models/user.model");
const axios = require("axios");
const { createAccessToken } = require("../services/createAccessToken");
const { setSecureCookie } = require("../services/setSecureCookie");

// Google OAuth implementation
exports.initiateAuth = (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:${process.env.PORT}/auth/google/callback&response_type=code&scope=openid email profile&access_type=offline&prompt=select_account`;
  res.redirect(googleAuthUrl);
};

exports.authCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ message: "Authorization code not provided" });
  }

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `http://localhost:${process.env.PORT}/auth/google/callback`,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const googleAccessToken = tokenResponse.data.access_token;
    // Fetch user info from Google
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${googleAccessToken}` },
      }
    );

    const { sub, name, email, picture } = userInfoResponse.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        userId: sub,
        name,
        email,
        profilePicture: picture,
      });
      await user.save();
    }

    const accessToken = createAccessToken(user);
    setSecureCookie(res, accessToken);

    return res.redirect(`http://localhost:5173/dashboard`);
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Credentials missing." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const accessToken = createAccessToken(user);
    setSecureCookie(res, accessToken);

    return res.redirect(`http://localhost:5173/profile`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authorization Failed." });
  }
};

exports.verifyAuth = (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
};
