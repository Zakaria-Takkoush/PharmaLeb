const Pharmacy = require("../models/PharmacyModel");

// Get Items of a specific pharmacy
async function getItemsByPharmID(req, res) {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id).populate({
            path: "items",
            populate: {
                path: "item",
                model: "Medicine",
            },
        }); // used populate to get medicine info directly
        const items = pharmacy.items;
        return res.status(200).json({
            pharmacy: pharmacy.name,
            itemCount: items.length,
            items: items,
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ Error: error.message });
    }
}

// Add an item to a pharmacy
async function addItemToPharmacy(req, res) {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);

        // item to add
        const itemToAdd = req.body;

        // for very item added, check if it already exists
        for (let i = 0; i < pharmacy.items.length; i++) {
            if (itemToAdd.item == pharmacy.items[i].item) {
                return res.json("Item already exists");
            }
        }
        // if item does not exist, add it to the array and save
        pharmacy.items.push(itemToAdd);
        await pharmacy.save();
        return res
            .status(201)
            .json({ pharmacy: pharmacy, added_item: itemToAdd });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

// Remove and item from a pharmacy
async function removeItemFromPharmacy(req, res) {
    try {
        // Find pharmacy by its id
        const pharmacy = await Pharmacy.findById(req.params.id);
        await pharmacy.items.remove({ _id: req.body.id });
        await pharmacy.save();
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

// Update stock of an item in a pharmacy
async function updateItemStock(req, res) {
    try {
        // Find pharmacy by its id
        const pharmacy = await Pharmacy.findById(req.params.id);

        // Find the specific item by its unique id
        const itemToEdit = pharmacy.items.id(req.body.id);
        if (!itemToEdit) {
            return res.status(404).json("No item to update");
        }

        // Update stock
        itemToEdit.stock = req.body.stock;

        // Save pharmacy
        await pharmacy.save();
        return res.status(200).json({ status: "stock updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

// Get all pharmacies having a certain medicine
async function findMedicineAtPharmacies(req, res) {
    try {
        const pharmacies = await Pharmacy.find();
        let available = [];
        for (let i = 0; i < pharmacies.length; i++) {
            for (let j = 0; j < pharmacies[i].items.length; j++) {
                if (pharmacies[i].items[j].item == req.params.id) {
                    available.push(pharmacies[i]);
                }
            }
        }
        // return list of pharmacies having the medicine available
        return res.json({ found_at: available.length, pharmacies: available });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

module.exports = {
    getItemsByPharmID,
    addItemToPharmacy,
    removeItemFromPharmacy,
    updateItemStock,
    findMedicineAtPharmacies,
};
