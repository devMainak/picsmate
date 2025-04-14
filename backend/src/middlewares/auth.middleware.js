const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  let token = req.cookies?.access_token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TokenExpiredError" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
