const User = require("../models/user.model");
const axios = require("axios");
const qs = require("qs");
const validator = require("validator");
const { createAccessToken } = require("../services/createAccessToken");
const { setSecureCookie } = require("../services/setSecureCookie");

// Google OAuth implementation
exports.initiateAuth = (req, res) => {
  const redirectUri = `${process.env.OAUTH_REDIRECT_BASE}/auth/google/callback`;

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile&access_type=offline&prompt=select_account`;

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
      qs.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.OAUTH_REDIRECT_BASE}/auth/google/callback`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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

    return res.redirect(`https://picsmate.vercel.app/photos`);
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
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User have not registered." });
    }
    const accessToken = createAccessToken(user);
    setSecureCookie(res, accessToken);

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authorization Failed." });
  }
};

exports.verifyAuth = (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
};

exports.logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to logout" });
  }
};
