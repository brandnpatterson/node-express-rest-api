const express = require("express");
const router = express.Router();
const { home, auth, profile } = require("../controllers");

router.get("/", home);
router.get("/auth", auth);
router.get("/profile/:username", profile);

module.exports = router;
