const express = require("express");
const {
    registerPharmacy,
    removePharmacy,
    editPharmacy,
    removeAllPharmacies,
    getPharmacies,
    getItemsByPharmID,
    getPharmacy,
    addItemToPharmacy,
    removeItemFromPharmacy,
    updateItemStock,
    findMedicineAtPharmacies,
} = require("../controller/PharmacyController");

// authentication middleware
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Get all
router.get("/", getPharmacies);

// Get a Pharmacy
router.get("/:id", getPharmacy);

// Add a pharmacy
router.post("/", registerPharmacy);

// Delete a pharmacy
router.delete("/:id", removePharmacy);

// Edit a pharmacy
router.put("/:id", editPharmacy);

// Get a pharmacy stock items
router.get("/:id/items", getItemsByPharmID);

// Add an item to pharmacy
router.post("/:id/add_item", addItemToPharmacy);

// Remove an item from pharmacy
router.delete("/:id/delete_item", removeItemFromPharmacy);

// Update an item stock
router.put("/:id/edit_stock", updateItemStock);

// Find all pharmacies having a medicine
router.get("/available/:id", findMedicineAtPharmacies);

// Delete All (testing and admin)
router.delete("/", removeAllPharmacies);

module.exports = router;
