const express = require("express");
const { getMedicines } = require("../controller/MedicineController");
const router = express.Router();

router.get("/", getMedicines);

module.exports = router;
