const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const durSchema = new Schema({
  page: { type: Number, required: true },
  trips: [{
    departure: { type: Date, required: true },
    ret: { type: Date, required: true },
    depId: { type: Number, required: true },
    depNm: { type: String, required: true },
    retId: { type: Number, required: true },
    retNm: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
  }],
});

const Dur = mongoose.model("Dur", durSchema);
module.exports = Dur;
