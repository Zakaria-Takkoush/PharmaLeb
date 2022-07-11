const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name: { type: String },
        code: { type: String },
        dosage: { type: String },
        price: { type: String },
        image: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
