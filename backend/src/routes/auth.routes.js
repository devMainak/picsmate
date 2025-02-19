const express = require("express");
const router = express.Router();
const { initiateAuth, authCallback } = require("../controller/auth.controller");

router.get("/google", initiateAuth);
router.get("/google/callback", authCallback);

module.exports = router;
