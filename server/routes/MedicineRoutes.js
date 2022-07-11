const express = require("express");
const {
    getMedicines,
    addMedicine,
} = require("../controller/MedicineController");
const router = express.Router();

// Get all medicines
router.get("/", getMedicines);

// Add a medicine
router.post("/", addMedicine);

module.exports = router;
