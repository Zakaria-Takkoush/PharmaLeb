const express = require("express");
const {
    addFavorite,
    getFavorites,
    deleteFavorite,
} = require("../controller/FavoritesController");
const router = express.Router();
const { register, login } = require("../controller/UserController");
const verifyToken = require("../middleware/auth");

// Register Route

router.post("/register", register);

// Login Route

router.post("/login", login);

// Get the user from token
router.get("/", verifyToken, (req, res) => {
    res.send(req.user);
});

// Favorites:
router.get("/fav/:id", getFavorites);

// Add a favorite
router.post("/fav/:id", addFavorite);

// Delete a favorite
router.delete("/fav/:id", deleteFavorite);

module.exports = router;
