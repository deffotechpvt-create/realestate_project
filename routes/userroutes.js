const express = require("express");
const router = express.Router();

const { getMyProfile, updateMyProfile } = require("../controllers/usercontroller");
const authMiddleware = require("../middleware/authMiddleware");

// GET logged in user
router.get("/me", authMiddleware, getMyProfile);

// UPDATE profile
router.put("/me", authMiddleware, updateMyProfile);

module.exports = router;
