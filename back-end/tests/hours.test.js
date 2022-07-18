const { default: mongoose } = require("mongoose");
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
  //expect.assertions(1);
  const obj = await parseFile("./test.csv", "trip");
  console.log(obj);

  //console.log(result.recordsLen);
  //const hours = result.hours;
}, 30000);
