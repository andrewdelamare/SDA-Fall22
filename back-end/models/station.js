const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const stationSchema = new Schema({
  fid: String,
  stationId: String,
  Nimi: String,
  namn: String,
  name: String,
  osoite: String,
  address: String,
  kaupunki: String,
  stad: String,
  operaattor: String,
  kapasiteet: String,
  x: String,
  y: String,
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
