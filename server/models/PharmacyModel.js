const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone_number: { type: String, required: true },
        address: { type: String, required: true },
        owner: { type: mongoose.Types.ObjectId, ref: "User" },
        location: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        items: [
            {
                item: {
                    type: mongoose.Types.ObjectId,
                    ref: "Medicine",
                },
                stock: { type: Number, default: 0 },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
