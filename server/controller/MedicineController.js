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

// Add a medicine
async function addMedicine(req, res) {
    const { name, code, dosage, image, price } = req.body;
    try {
        const medicine = await Medicine.create(req.body);
        res.status(201).json(medicine);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ Error: error.message });
    }
}

module.exports = { getMedicines, addMedicine };
