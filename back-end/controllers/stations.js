const express = require("express");
const Hour = require("../models/hour");
const Station = require("../models/station");
const stationRouter = express.Router();

stationRouter.get("/stations", async (req, res) => {
  const result = await Station.find({}).limit(100).lean();
  return res.status(200).json(result);
});
stationRouter.get("/stations/:page", async (req, res) => {
  const page = req.params.page * 100;
  const docs = await Station.find({}).skip(page).limit(100).lean();
  const count = await Station.estimatedDocumentCount();
  const result = [docs, count];
  return res.status(200).json(result);
});

stationRouter.get("/stations/station/:id", async (req, res) => {
  const id = req.params.id;
  const doc = await Station.findOne({ stationId: id }).lean();
  return res.status(200).json(doc);
});

stationRouter.get("/stations/station/:id/departures", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.depId": id })
    .count("departures");
  console.log(result);
  return res.status(200).json(result);
});

module.exports = stationRouter;
