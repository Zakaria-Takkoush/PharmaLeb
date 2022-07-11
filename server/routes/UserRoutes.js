const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/UserController");
const verifyToken = require("../middleware/auth");

// Register Route

router.post("/register", register);

// Login Route

router.post("/login", login);

router.get("/", verifyToken, (req, res) => {
    res.send(req.user);
});

module.exports = router;
