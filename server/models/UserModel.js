const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        phone_number: { type: String, required: true },
        photo: { type: String, default: "" },
        user_type: { type: String, required: true },
        location: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        favorites: [
            {
                medicine: {
                    type: mongoose.Types.ObjectId,
                    ref: "Medicine",
                },
            },
        ],
        token: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
