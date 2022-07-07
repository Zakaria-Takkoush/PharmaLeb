const express = require("express");
const {
    registerPharmacy,
    removePharmacy,
    editPharmacy,
    removeAllPharmacies,
    getPharmacies,
    getItemsByPharmID,
    getPharmacy,
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

// Delete All (testing and admin)
router.delete("/", removeAllPharmacies);

module.exports = router;
