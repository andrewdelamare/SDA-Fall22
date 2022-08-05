const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
describe("Testing stations endpoints", () => {
  it("GET /stations", async () => {
    const response = await api
      .get("/stations")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.length).toBe(457);
  });

  it("GET /stations/station/:id", async () => {
    const response = await api
      .get("/stations/station/551")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.name).toBe("Tietäjä");
  });

  it("POST /station/new", async () => {
    const response = await api
      .post("/station/new")
      .send({
        stationId: "999",
        name: "fake station",
        address: "fake street",
        kaupunki: "fake city",
        operaattor: "fake operator",
        x: "00.000",
        y: "00.000",
      })
      .expect("content-type", /json/)
      .expect(201);
  });
});
/*
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
*/