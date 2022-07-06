require("dotenv").config(); // require .env for processing

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// port
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
