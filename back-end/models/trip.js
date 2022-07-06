const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const tripSchema = new Schema({
  departure: { type: Date, required: true },
  ret: { type: Date, required: true },
  depId: { type: Number, required: true },
  depNm: { type: String, required: true },
  retId: { type: Number, required: true },
  retNm: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
