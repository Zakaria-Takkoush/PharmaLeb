const express = require("express");
const {
    getMedicines,
    addMedicine,
    getMedicine,
} = require("../controllers/MedicineController");
const router = express.Router();

// Get all medicines
router.get("/", getMedicines);

// Get a medicine
router.get("/:id", getMedicine);

// Add a medicine
router.post("/", addMedicine);

module.exports = router;
