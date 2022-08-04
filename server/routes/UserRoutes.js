const express = require("express");
const {
    addFavorite,
    getFavorites,
    deleteFavorite,
} = require("../controllers/FavoriteController");
const router = express.Router();
const {
    register,
    login,
    editProfile,
} = require("../controllers/UserController");
const verifyToken = require("../middleware/auth");

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Edit Profile
router.put("/edit_prof/:id", verifyToken, editProfile);

// Get the user from token
router.get("/", verifyToken, (req, res) => {
    res.send(req.user);
});

// Favorites:
router.get("/fav/:id", getFavorites);

// Add a favorite
router.post("/fav/:id", addFavorite);

// Delete a favorite (pass user_id as param and fav_id in the body)
router.delete("/fav/:id", deleteFavorite);

module.exports = router;
