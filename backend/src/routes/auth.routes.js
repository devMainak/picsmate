const express = require("express");
const router = express.Router();
const {
  initiateAuth,
  authCallback,
  login,
  verifyAuth,
} = require("../controller/auth.controller");
const authenticate = require("../middlewares/auth.middleware");

router.get("/google", initiateAuth);
router.get("/google/callback", authCallback);
router.post("/login", login);
router.get("/verify", authenticate, verifyAuth);

module.exports = router;
