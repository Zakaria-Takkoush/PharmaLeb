const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/UserController");

// Register Route

router.post("/register", register);

// Login Route

// router.post("/login", login);

module.exports = router;
