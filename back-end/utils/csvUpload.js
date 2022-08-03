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
  //processFile/("csv/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv", "station", "upload")
} catch (error) {
  console.log(error.message);
}
