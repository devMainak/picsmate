const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "TokenExpiredError" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
