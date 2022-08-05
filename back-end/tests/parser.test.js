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

/* 
  processFile,
  parseFile: {uniqueRecords, recordsLen, urLength, trash},
  packageHours,
  uploadFiles,

            departure: vals[0],
            ret: vals[1],
            depId: vals[2],
            depNm: vals[3],
            retId: vals[4],
            retNm: vals[5],
            distance: vals[6],
            duration: vals[7],

*/

describe("Testing parser functions", () => {
  test("parseFile", async () => {
    expect.assertions(11);
    const obj = await parseFile("tests/short.csv", "trip");
    expect(obj.trash).toStrictEqual(11112);
    expect(obj.recordsLen).toStrictEqual(259040);
    expect(obj.recordsLen + obj.trash).toStrictEqual(270152);
    expect(obj.uniqueRecords).toHaveLength(obj.urLength);
    expect(obj.uniqueRecords[5000]).toHaveProperty("departure");
    expect(obj.uniqueRecords[5040]).toHaveProperty("ret");
    expect(obj.uniqueRecords[60040]).toHaveProperty("depId");
    expect(obj.uniqueRecords[75000]).toHaveProperty("depNm");
    expect(obj.uniqueRecords[81250]).toHaveProperty("retId");
    expect(obj.uniqueRecords[96070]).toHaveProperty("distance");
    expect(obj.uniqueRecords[11250]).toHaveProperty("duration");
  }, 30000);
});
