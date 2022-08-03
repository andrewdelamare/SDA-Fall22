const express = require("express");
const Hour = require("../models/hour");
const Station = require("../models/station");
const stationRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { startOfMonth, endOfMonth, startOfDay } = require("date-fns");

stationRouter.get("/stations", async (req, res) => {
  const result = await Station.find({}).lean();
  return res.status(200).json(result);
});

stationRouter.get("/stations/station/:id", async (req, res) => {
  const id = req.params.id;
  const doc = await Station.findOne({ stationId: id }).lean();
  return res.status(200).json(doc);
});

stationRouter.post(
  "/station/new",
  body("stationId").isNumeric(),
  body("name").isString(),
  body("address").isString(),
  body("kaupunki").isString(),
  body("operaattor").isString(),
  body("x").isString(),
  body("y").isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.body.stationId;
    const stringId = id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
    const station = {
      stationId: stringId,
      Nimi: req.body.name,
      namn: req.body.name,
      name: req.body.name,
      osoite: req.body.address,
      address: req.body.address,
      kaupunki: req.body.kaupunki,
      stad: req.body.kaupunki,
      operaattor: req.body.operaattor,
      x: req.body.x,
      y: req.body.y,
    };
    const exists = await Station.exists({ stationId: station.stationId });
    if (exists !== null) {
      return res
        .status(400)
        .json({ error: "This station ID is already in use" });
    } else {
      const result = await Station.create(station);
      console.log(result);
      return res.status(201).json(result);
    }
  }
);

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

stationRouter.get("/stations/station/totalcounts/data", async (req, res) => {
  const departures = await Hour.aggregate().unwind("trips").count("departures");
  const data = {
    journeys: departures[0].departures,
  };
  return res.status(200).json(data);
});

stationRouter.get("/stations/station/:id/counts/:month", async (req, res) => {
  const id = parseInt(req.params.id);
  const month = parseInt(req.params.month);
  const monthDate = new Date(2021, month, 1);
  const startMon = startOfMonth(monthDate);
  const endMon = startOfDay(endOfMonth(monthDate));

  const departures = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
    .match({ "trips.depId": id })
    .count("departures");
  const returns = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
    .match({ "trips.retId": id })
    .count("returns");
  const data = {
    depCount: departures[0].departures,
    retCount: returns[0].returns,
  };
  return res.status(200).json(data);
});

stationRouter.get("/stations/station/counts/:month/data", async (req, res) => {
  const month = parseInt(req.params.month);
  const monthDate = new Date(2021, month, 1);
  const startMon = startOfMonth(monthDate);
  const endMon = startOfDay(endOfMonth(monthDate));

  const departures = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
    .count("departures");
  const data = {
    journeys: departures[0].departures,
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

stationRouter.get("/stations/station/totalavs/data", async (req, res) => {
  const avDis = await Hour.aggregate()
    .unwind("trips")
    .group({ _id: null, averageDist: { $avg: "$trips.distance" } });
  const data = {
    avDis: avDis[0].averageDist,
  };
  return res.status(200).json(data);
});

stationRouter.get("/stations/station/:id/avs/:month", async (req, res) => {
  const id = parseInt(req.params.id);
  const month = parseInt(req.params.month);
  const monthDate = new Date(2021, month, 1);
  const startMon = startOfMonth(monthDate);
  const endMon = startOfDay(endOfMonth(monthDate));

  const avDistanceStarted = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
    .match({ "trips.depId": id })
    .group({ _id: null, averageDistanceStart: { $avg: "$trips.distance" } });
  const avDistanceEnded = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
    .match({ "trips.retId": id })
    .group({ _id: null, averageDistanceEnd: { $avg: "$trips.distance" } });

  const data = {
    avDistSt: avDistanceStarted[0].averageDistanceStart,
    avDistRet: avDistanceEnded[0].averageDistanceEnd,
  };
  return res.status(200).json(data);
});

stationRouter.get("/stations/station/avs/:month/data", async (req, res) => {
  const month = parseInt(req.params.month);
  const monthDate = new Date(2021, month, 1);
  const startMon = startOfMonth(monthDate);
  const endMon = startOfDay(endOfMonth(monthDate));

  const avDistanceStarted = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
    .group({ _id: null, averageDist: { $avg: "$trips.distance" } });
  const data = {
    avDis: avDistanceStarted[0].averageDist,
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

stationRouter.get("/stations/station/allpopular/data", async (req, res) => {
  const popularDepartures = await Hour.aggregate()
    .unwind("trips")
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

stationRouter.get("/stations/station/:id/popular/:month", async (req, res) => {
  const id = parseInt(req.params.id);
  const month = parseInt(req.params.month);
  const monthDate = new Date(2021, month, 1);
  const startMon = startOfMonth(monthDate);
  const endMon = startOfDay(endOfMonth(monthDate));
  const popularDepartures = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
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
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
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

stationRouter.get("/stations/station/popular/:month/data", async (req, res) => {
  const id = parseInt(req.params.id);
  const month = parseInt(req.params.month);
  const monthDate = new Date(2021, month, 1);
  const startMon = startOfMonth(monthDate);
  const endMon = startOfDay(endOfMonth(monthDate));
  const popularDepartures = await Hour.aggregate()
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
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
    .match({ $and: [{ day: { $gte: startMon } }, { day: { $lte: endMon } }] })
    .unwind("trips")
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
