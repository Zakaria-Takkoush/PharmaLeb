const Pharmacy = require("../model/PharmacyModel");

// Add a pharmacy
async function registerPharmacy(req, res) {
    const { name, phone_number, location, address, owner } = req.body;
    try {
        const new_pharm = await Pharmacy.create(req.body);
        res.status(201).json(new_pharm);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ Error: error.message });
    }
}

module.exports = {
    registerPharmacy,
};
