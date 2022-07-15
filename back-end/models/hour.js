const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const hourSchema = new Schema({
  day: Date,
  hour: Date,
  trips: [
    {
      departure: { type: Date, required: true },
      ret: { type: Date, required: true },
      depId: { type: Number, required: true },
      depNm: { type: String, required: true },
      retId: { type: Number, required: true },
      retNm: { type: String, required: true },
      distance: { type: Number, required: true },
      duration: { type: Number, required: true },
    },
  ],
});

const Hour = mongoose.model("Hour", hourSchema);
module.exports = Hour;
