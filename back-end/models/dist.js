const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Trip = require("./trip");

const distSchema = new Schema({
  page: { type: Number, required: true },
  trips: [Trip],
});

const Dist = mongoose.model("Dist", distSchema);
module.exports = Dist;
