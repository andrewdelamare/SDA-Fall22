//FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
//1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
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
  startNum: Number,
  endNum: Number,
  disSt: { may: [Number], june: [Number], july: [Number] },
  disEnd: { may: [Number], june: [Number], july: [Number] },
  startedAt: {
    may: [Number],
    june: [Number],
    july: [Number],
  },
  returnedAt: {
    may: [Number],
    june: [Number],
    july: [Number],
  },
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
