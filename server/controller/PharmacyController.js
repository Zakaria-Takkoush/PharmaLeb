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

// Delete a pharmacy
async function removePharmacy(req, res) {
    try {
        const removed = await Pharmacy.findByIdAndRemove(req.params.id);
        if (!removed) {
            return res.json({ status: "Not found or already removed" });
        }
        return res.json({ status: "success", removed: removed });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

// Edit a pharmacy
async function editPharmacy(req, res) {
    // const { name, phone_number, location, address, owner } = req.body;
    try {
        const pharmacy = await Pharmacy.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        if (!pharmacy) {
            res.json("No pharmacy to edit");
        }
        return res.status(200).json({ status: "success", edited: pharmacy });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ Error: error.message });
    }
}

// Delete All
async function removeAllPharmacies(req, res) {
    try {
        const removed = await Pharmacy.deleteMany();
        return res.status(200).json({ status: "success", removed: removed });
    } catch (error) {
        console.log(error.message);
        res.json({ Error: error.message });
    }
}

// Get all pharmacies
async function getPharmacies(req, res) {
    try {
        const pharmacies = await Pharmacy.find();
        if (pharmacies.length == 0) {
            return res.json("No pharmacies found");
        }
        return res.status(200).json({ found: pharmacies.length, pharmacies });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ Error: error.message });
    }
}

// Get a specific pharmacy
async function getPharmacy(req, res) {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if (!pharmacy) {
            return res.status(404).json("Pharmacy not found");
        }
        return res.status(200).json(pharmacy);
    } catch (error) {
        console.log(error.message);
        res.error.json(error);
    }
}

// Get Items of a specific pharmacy
async function getItemsByPharmID(req, res) {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        const items = pharmacy.items;
        return res.status(200).json({
            pharmacy: pharmacy.name,
            "itemCount:": items.length,
            "items:": items,
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

module.exports = {
    registerPharmacy,
    removePharmacy,
    editPharmacy,
    removeAllPharmacies,
    getPharmacies,
    getItemsByPharmID,
    getPharmacy,
    addItemToPharmacy,
};
