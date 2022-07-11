const Medicine = require("../model/MedicineModel");

// Get all medicines --- typically pre-defined

async function getMedicines(req, res) {
    try {
        const medicines = await Medicine.find();
        return res.json(medicines);
    } catch (error) {
        res.json(error);
    }
}

module.exports = { getMedicines };
