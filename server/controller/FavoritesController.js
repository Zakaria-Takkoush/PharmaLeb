const User = require("../model/UserModel");

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

module.exports = { addFavorite };
