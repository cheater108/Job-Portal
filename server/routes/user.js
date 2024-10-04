const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsyncError");
const { registerUser, loginUser } = require("../controllers/userControllers");

// register an user
router.post("/register", catchAsync(registerUser));

//login user
router.post("/login", catchAsync(loginUser));

module.exports = router;
