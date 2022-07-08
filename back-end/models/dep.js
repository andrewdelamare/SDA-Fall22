const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Trip = require("./trip");

const depSchema = new Schema({
  page: { type: Number, required: true },
  trips: [Trip],
});

const Dep = mongoose.model("Dep", depSchema);
module.exports = Dep;
