const express = require("express");
const {
    getMedicines,
    addMedicine,
    getMedicine,
    deleteMedicine,
} = require("../controllers/MedicineController");
const router = express.Router();

// Get all medicines
router.get("/", getMedicines);

// Get a medicine
router.get("/:id", getMedicine);

// Add a medicine
router.post("/", addMedicine);

// Delete a medicine
router.delete("/:id", deleteMedicine);

module.exports = router;
