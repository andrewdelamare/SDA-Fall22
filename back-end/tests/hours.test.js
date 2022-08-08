const supertest = require("supertest");
const { mongoose } = require("mongoose");
const config = require("../utils/config");
const app = require("../app");
const api = supertest(app);
const Hour = require("../models/hour");
const Station = require("../models/station");
const { hour, station } = require("./initDb");
describe("Testing hours endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI);
    await Hour.deleteMany();
    await Station.deleteMany();
    await Hour.create(hour);
    await Station.create(station);
  });
  it("GET /hour", async () => {
    const response = await api
      .get("/hour")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body[0].trips.length).toBe(9);
  });

  it("GET /hours/:day/:hour", async () => {
    const response = await api
      .get("/hours/1619816400000/0")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body[0].trips.length).toBe(9);
  });

  it("POST /trip", async () => {
    const response = await api
      .post("/trip")
      .send({
        departure: "2021-04-30T21:59:54.000+00:00",
        ret: "2021-04-30T22:06:44.000+00:00",
        depId: 274,
        depNm: "Voikukantie",
        retId: 276,
        retNm: "Puotinharju",
        distance: 1012,
      })
      .expect("content-type", /json/)
      .expect(201);
  });
});
