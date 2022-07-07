const express = require("express");
const {
    registerPharmacy,
    removePharmacy,
    editPharmacy,
} = require("../controller/PharmacyController");
const router = express.Router();

router.post("/", registerPharmacy);
router.delete("/:id", removePharmacy);
router.put("/:id", editPharmacy);

module.exports = router;
