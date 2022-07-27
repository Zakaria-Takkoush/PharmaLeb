const Medicine = require("../models/MedicineModel");

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

// Get a medicine
async function getMedicine(req, res) {
    try {
        const medicine = await Medicine.findById(req.params.id);
        return res.json(medicine);
    } catch (error) {
        res.json({ Error: error.message });
    }
}

// Delete a medicine
async function deleteMedicine(req, res) {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) {
            return res.status(404).json("Not Found");
        }
        return res.json({ status: "success", deleted: medicine });
    } catch (error) {
        res.json({ Error: error.message });
    }
}

// Edit a medicine
async function editMedicine(req, res) {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        if (!medicine) {
            return res.status(404).json("Not Found");
        }
        return res.json({
            status: "success",
            updated: medicine,
        });
    } catch (error) {
        res.json({ Error: error.message });
    }
}

module.exports = {
    getMedicines,
    addMedicine,
    getMedicine,
    deleteMedicine,
    editMedicine,
};
