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
} = require("../controller/PharmacyController");
const router = express.Router();

// Get all
router.get("/", getPharmacies);

// Get a Pharmacy

router.get("/:id", getPharmacy);
router.post("/", registerPharmacy);
router.delete("/:id", removePharmacy);
router.put("/:id", editPharmacy);

// Get a pharmacy stock items
router.get("/:id/items", getItemsByPharmID);

// Add an item to pharmacy
router.post("/:id/add_item", addItemToPharmacy);

// Remove an item from pharmacy
router.delete("/:id/delete_item", removeItemFromPharmacy);

// Delete All (testing and admin)
router.delete("/", removeAllPharmacies);

module.exports = router;
