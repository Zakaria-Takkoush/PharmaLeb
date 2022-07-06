const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date_of_birth: { type: Date },
    phone_number: { type: String, required: true },
    photo: { type: String },
    user_type: { type: Number },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    favorites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Medicine",
        },
    ],
    token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
