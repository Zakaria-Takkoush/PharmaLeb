const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
    image: { type: String },
    dosage: { type: String },
});

module.exports = mongoose.model("Medicine", medicineSchema);
