const { mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const hourRouter = require("../controllers/hours");
const Hour = require("../models/hour");
const {
  processFile,
  parseFile,
  packageHours,
  uploadFiles,
} = require("../utils/parser");
const api = supertest(app);

//beforeEach(async () => {
//await Hour.deleteMany();
//});

test("Parse files", async () => {
  expect.assertions(5);
  const obj = await parseFile("tests/short.csv", "trip");
  expect(obj.recordsLen).toEqual(62159);
  expect(obj.trash).toEqual(2547);
  expect(obj.records[5000]).toHaveProperty("departure");
  expect(obj.records[5040]).toHaveProperty("ret");
  expect(obj.records[60040]).toHaveProperty("distance");
}, 30000);
