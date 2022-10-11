const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const hourRouter = require("./controllers/hours");
const stationRouter = require("./controllers/stations");
const app = express();

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(hourRouter);
app.use("/stations", stationRouter);
module.exports = app;
