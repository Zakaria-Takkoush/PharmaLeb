const express = require("express");
const { registerPharmacy } = require("../controller/PharmacyController");
const router = express.Router();

router.post("/", registerPharmacy);

module.exports = router;
