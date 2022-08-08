const supertest = require("supertest");
const { mongoose } = require("mongoose");
const config = require("../utils/config");
const app = require("../app");
const api = supertest(app);
const Hour = require("../models/hour");
const Station = require("../models/station");
const { hour, station } = require("./initDb");
describe("Testing stations endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI);
    await Hour.deleteMany();
    await Station.deleteMany();
    await Hour.create(hour);
    await Station.create(station);
  });
  it("GET /stations", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /stations/station/:id", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.name).toBe("Piispansilta");
  });

  it("POST /station/new", async () => {
    mongoose.connect(config.MONGODB_URI);
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

  it("GET /stations/station/:id/totalcounts", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627/totalcounts")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.depCount).toBe(6);
  });

  it("GET /stations/station/totalcounts/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/totalcounts/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.journeys).toBe(9);
  });

  it("GET /stations/station/:id/counts/:month", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627/counts/4")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.depCount).toBe(6);
    expect(response.body.retCount).toBe(3);
  });

  it("GET /stations/station/counts/:mont/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/counts/4/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.journeys).toBe(9);
  });

  it("GET /stations/station/:id/totalavs", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627/totalavs")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDistSt).toBe(1379.6666666666667);
    expect(response.body.avDistRet).toBe(3415);
  });

  it("GET /stations/station/totalavs/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/totalavs/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDis).toBe(2058.1111111111113);
  });

  it("GET /stations/station/:id/avs/:month", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627/avs/4")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDistSt).toBe(1379.6666666666667);
    expect(response.body.avDistRet).toBe(3415);
  });

  it("GET /stations/station/avs/:month/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/avs/4/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDis).toBe(2058.1111111111113);
  });

  it("GET /stations/station/:id/allpopular", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627/allpopular")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.count).toBe(2);
    expect(response.body.popReturns.first.count).toBe(3);
  });

  it("GET /stations/station/allpopular/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/allpopular/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.stId).toBe(627);
    expect(response.body.popReturns.first.count).toBe(3);
  });

  it("GET /stations/station/:id/popular/:month", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/627/popular/4")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.stId).toBe(505);
    expect(response.body.popReturns.first.stId).toBe(641);
  });

  it("GET /stations/station/popular/:month/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/station/popular/4/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.stId).toBe(627);
    expect(response.body.popReturns.first.count).toBe(3);
  });
});
