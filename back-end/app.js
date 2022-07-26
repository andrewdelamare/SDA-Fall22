const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const hourRouter = require("./controllers/hours");
const app = express();

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(hourRouter);
module.exports = app;
