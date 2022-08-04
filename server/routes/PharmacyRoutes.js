const express = require("express");

// Import Pharmacy Functions
const {
    registerPharmacy,
    removePharmacy,
    editPharmacy,
    removeAllPharmacies,
    getPharmacies,
    getPharmacy,
    getPharmacyByOwnerID,
} = require("../controllers/PharmacyController");

// Import Item Functions
const {
    getItemsByPharmID,
    addItemToPharmacy,
    removeItemFromPharmacy,
    updateItemStock,
    findMedicineAtPharmacies,
} = require("../controllers/ItemController");

// authentication middleware
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Get all pharmacies
router.get("/", getPharmacies);

// Get a Pharmacy (pass its id as param)
router.get("/:id", verifyToken, getPharmacy);

// Get a pharmacy by its owner's id (pass its owner id as param)
router.get("/owner/:id", verifyToken, getPharmacyByOwnerID);

// Add a pharmacy
router.post("/", verifyToken, registerPharmacy);

// Delete a pharmacy (pass its id as param)
router.delete("/:id", removePharmacy);

// Edit a pharmacy (pass its id as param)
router.put("/:id", editPharmacy);

// Get a pharmacy stock items
router.get("/:id/items", verifyToken, getItemsByPharmID);

// Add an item to pharmacy (pass medicine id as param)
router.post("/:id/add_item", verifyToken, addItemToPharmacy);

// Remove an item from pharmacy (pass ITEM id as param)
router.delete("/:id/delete_item", removeItemFromPharmacy);

// Update an item stock (pass ITEM id as param)
router.put("/:id/edit_stock", updateItemStock);

// Find all pharmacies having a medicine (pass MEDICINE id as param)
router.get("/available/:id", findMedicineAtPharmacies);

// Delete All (testing and admin)
router.delete("/", removeAllPharmacies);

module.exports = router;
