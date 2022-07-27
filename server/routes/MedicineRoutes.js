const express = require("express");
const {
    getMedicines,
    addMedicine,
    getMedicine,
    deleteMedicine,
    editMedicine,
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

// Edit a medicine
router.put("/:id", editMedicine);

module.exports = router;
