const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const tripSchema = new Schema({
  departure: Date,
  return: Date,
  depId: Number,
  depNm: String,
  retId: Number,
  retNm: String,
  distance: Number,
  duration: Number,
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
