const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Trip = require("./trip");

const durSchema = new Schema({
  page: { type: Number, required: true },
  trips: [Trip],
});

const Dur = mongoose.model("Dur", durSchema);
module.exports = Dur;
