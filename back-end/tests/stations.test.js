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

  it("GET /stations/:id", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.name).toBe("Piispansilta");
  });

  it("POST /stations/new", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .post("/stations/new")
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

  it("GET /stations/:id/totalcounts", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627/totalcounts")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.depCount).toBe(6);
  });

  it("GET /stations/totalcounts/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/totalcounts/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.journeys).toBe(9);
  });

  it("GET /stations/:id/counts/:month", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627/counts/4")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.depCount).toBe(6);
    expect(response.body.retCount).toBe(3);
  });

  it("GET /stations/counts/:mont/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/counts/4/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.journeys).toBe(9);
  });

  it("GET /stations/:id/totalavs", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627/totalavs")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDistSt).toBe(1379.6666666666667);
    expect(response.body.avDistRet).toBe(3415);
  });

  it("GET /stations/totalavs/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/totalavs/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDis).toBe(2058.1111111111113);
  });

  it("GET /stations/:id/avs/:month", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627/avs/4")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDistSt).toBe(1379.6666666666667);
    expect(response.body.avDistRet).toBe(3415);
  });

  it("GET /stations/avs/:month/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/avs/4/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.avDis).toBe(2058.1111111111113);
  });

  it("GET /stations/:id/allpopular", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627/allpopular")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.count).toBe(2);
    expect(response.body.popReturns.first.count).toBe(3);
  });

  it("GET /stations/allpopular/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/allpopular/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.stId).toBe(627);
    expect(response.body.popReturns.first.count).toBe(3);
  });

  it("GET /stations/:id/popular/:month", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/627/popular/4")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.stId).toBe(505);
    expect(response.body.popReturns.first.stId).toBe(641);
  });

  it("GET /stations/popular/:month/data", async () => {
    mongoose.connect(config.MONGODB_URI);
    const response = await api
      .get("/stations/popular/4/data")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body.popDepartures.first.stId).toBe(627);
    expect(response.body.popReturns.first.count).toBe(3);
  });
});
