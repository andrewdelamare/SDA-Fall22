//FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
//1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const stationSchema = new Schema({
  fid: Number,
  stationId: Number,
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
  startNum: Number,
  endNum: Number,
  avDisSt: { all: Number, 4: Number, 6: Number, 7: Number },
  avDisEnd: { all: Number, 5: Number, 6: Number, 7: Number },
  popRetSt: {
    all: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    5: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    6: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    7: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
  },
  popDepEnd: {
    all: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    5: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    6: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    7: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
  },
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
