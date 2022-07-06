const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const tripRouter = require("./controllers/trips");
const app = express();

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(tripRouter);
