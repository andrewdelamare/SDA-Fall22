const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Trip = require("./trip");

const retSchema = new Schema({
  page: { type: Number, required: true },
  trips: [Trip],
});

const Ret = mongoose.model("Ret", retSchema);
module.exports = Ret;
