const mongoose = require("mongoose");
const config = require("../utils/config");
const { processFile } = require("./parser");
const file = process.argv[2];
const type = process.argv[3];
const action = process.argv[4];
try {
  mongoose.connect(config.MONGODB_URI);
  processFile(file, type, action);
  //processFile("csv/2021-05.csv", "trip", "upload");
  //processFile("csv/2021-06.csv", "trip", "upload");
  //processFile("csv/2021-07.csv", "trip", "upload");
} catch (error) {
  console.log(error.message);
}
