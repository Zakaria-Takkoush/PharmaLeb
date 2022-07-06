const express = require("express");
const {
    registerPharmacy,
    removePharmacy,
    editPharmacy,
    removeAllPharmacies,
} = require("../controller/PharmacyController");
const router = express.Router();

router.post("/", registerPharmacy);
router.delete("/:id", removePharmacy);
router.put("/:id", editPharmacy);

// Delete All (testing)
router.delete("/", removeAllPharmacies);

module.exports = router;
