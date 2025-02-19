const express = require("express");
const router = express.Router();
const { getUser } = require("../controller/user.controller");
const authenticate = require("../middlewares/auth.middleware");

router.get("/profile", authenticate, getUser);

module.exports = router;
