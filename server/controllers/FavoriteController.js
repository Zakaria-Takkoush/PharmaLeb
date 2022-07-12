const User = require("../models/UserModel");

// Get all favorites of a certain user
async function getFavorites(req, res) {
    try {
        const user = await User.findById(req.params.id);
        const favorites = user.favorites;
        return res.status(200).json({
            user: user.email,
            "favoriteCount:": favorites.length,
            "favorites:": favorites,
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ Error: error.message });
    }
}

// Add a favorite
async function addFavorite(req, res) {
    try {
        const user = await User.findById(req.params.id);

        // favorite to add
        const favoriteToAdd = req.body;

        // // for every fav added, check if it already exists
        for (let i = 0; i < user.favorites.length; i++) {
            if (favoriteToAdd.medicine == user.favorites[i].medicine) {
                return res.json("Item already exists im favorites");
            }
        }

        // if favorite does not exist, add it to the array and save
        user.favorites.push(favoriteToAdd);
        await user.save();
        return res
            .status(201)
            .json({ user: user, favorite_added: favoriteToAdd });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

// Delete a favorite
async function deleteFavorite(req, res) {
    try {
        // Find user by its id
        const user = await User.findById(req.params.id);

        // Find the favorite by its unique id
        const favorite = user.favorites.id(req.body.id);
        if (!favorite) {
            return res.status(404).json("Favorite not found");
        }

        // delete favorite
        await favorite.remove();

        // Save User
        await user.save();
        return res
            .status(200)
            .json({ status: "User Favorites updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

module.exports = { addFavorite, getFavorites, deleteFavorite };
