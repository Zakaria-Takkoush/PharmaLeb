require("dotenv").config(); // require .env for processing
require("./config/connection").connect();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// import routers
const pharmacyRouter = require("./routes/PharmacyRoutes");
const medicineRouter = require("./routes/MedicineRoutes");
const userRouter = require("./routes/UserRoutes");

// routes version 1
app.use("/v1/api/pharmacies", pharmacyRouter);
app.use("/v1/api/medicines", medicineRouter);
app.use("/v1/api/users", userRouter);

// port
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
