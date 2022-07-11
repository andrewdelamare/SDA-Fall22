const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const tripRouter = require("../controllers/trips");
const Trip = require("../models/trip");
const processFile = require("../utils/parser");
const testFile = require("test");
const api = supertest(app);

beforeEach(async () => {
  await Trip.deleteMany();
});

test("Parse files", () => {});
