const express = require("express");
const {
    registerPharmacy,
    removePharmacy,
} = require("../controller/PharmacyController");
const router = express.Router();

router.post("/", registerPharmacy);
router.delete("/:id", removePharmacy);

module.exports = router;
