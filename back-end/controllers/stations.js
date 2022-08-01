const express = require("express");
const Hour = require("../models/hour");
const Station = require("../models/station");
const stationRouter = express.Router();

stationRouter.get("/stations", async (req, res) => {
  const result = await Station.find({}).lean();
  return res.status(200).json(result);
});

stationRouter.get("/stations/station/:id", async (req, res) => {
  const id = req.params.id;
  const doc = await Station.findOne({ stationId: id }).lean();
  return res.status(200).json(doc);
});

stationRouter.get("/stations/station/:id/totalcounts", async (req, res) => {
  const id = parseInt(req.params.id);
  const departures = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.depId": id })
    .count("departures");
  const returns = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.retId": id })
    .count("returns");
  const data = {
    depCount: departures[0].departures,
    retCount: returns[0].returns,
  };
  return res.status(200).json(data);
});

stationRouter.get("/stations/station/:id/totalavs", async (req, res) => {
  const id = parseInt(req.params.id);
  const avDistanceStarted = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.depId": id })
    .group({ _id: null, averageDistanceStart: { $avg: "$trips.distance" } });
  const avDistanceEnded = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.retId": id })
    .group({ _id: null, averageDistanceEnd: { $avg: "$trips.distance" } });

  const data = {
    avDistSt: avDistanceStarted[0].averageDistanceStart,
    avDistRet: avDistanceEnded[0].averageDistanceEnd,
  };
  return res.status(200).json(data);
});

stationRouter.get("/stations/station/:id/allpopular", async (req, res) => {
  const id = parseInt(req.params.id);
  const popularDepartures = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.retId": id })
    .group({
      _id: "$trips.depId",
      stNm: { $first: "$trips.depNm" },
      count: { $sum: 1 },
    })
    .sort({ count: -1 })
    .group({
      _id: 1,
      stations: {
        $push: { stId: "$_id", count: "$count", stNm: "$stNm" },
      },
    })
    .project({
      first: { $arrayElemAt: ["$stations", 0] },
      second: { $arrayElemAt: ["$stations", 1] },
      third: { $arrayElemAt: ["$stations", 2] },
      fourth: { $arrayElemAt: ["$stations", 3] },
      fifth: { $arrayElemAt: ["$stations", 4] },
    });
  const popularReturns = await Hour.aggregate()
    .unwind("trips")
    .match({ "trips.depId": id })
    .group({
      _id: "$trips.retId",
      stNm: { $first: "$trips.retNm" },
      count: { $sum: 1 },
    })
    .sort({ count: -1 })
    .group({
      _id: 1,
      stations: {
        $push: { stId: "$_id", count: "$count", stNm: "$stNm" },
      },
    })
    .project({
      first: { $arrayElemAt: ["$stations", 0] },
      second: { $arrayElemAt: ["$stations", 1] },
      third: { $arrayElemAt: ["$stations", 2] },
      fourth: { $arrayElemAt: ["$stations", 3] },
      fifth: { $arrayElemAt: ["$stations", 4] },
    });

  const data = {
    popDepartures: popularDepartures[0],
    popReturns: popularReturns[0],
  };
  return res.status(200).json(data);
});
module.exports = stationRouter;