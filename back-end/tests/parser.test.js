const { mongoose } = require("mongoose");
const config = require("../utils/config");
const Hour = require("../models/hour");
const Station = require("../models/station");
const { parseFile, packageHours, uploadFiles } = require("../utils/parser");

describe("Testing parser functions with journeys", () => {
  let obj;
  let hours;
  test("parseFile", async () => {
    obj = await parseFile("tests/short.csv", "trip");
    expect.assertions(11);
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

  test("packageHours", async () => {
    hours = await packageHours(obj.uniqueRecords.slice(120000));
    expect(hours).toBeDefined();
    expect(hours.length).toBe(744);
    expect(hours[0].trips.length).toBe(477);
  }, 30000);

  test("uploadFiles", async () => {
    await mongoose.connect(config.MONGODB_URI);
    await Hour.deleteMany();
    await uploadFiles(hours, Hour);
    await mongoose.connect(config.MONGODB_URI);
    const hourDocs = await Hour.estimatedDocumentCount();
    const found = await Hour.findOne({ hour: hours[0].hour });
    expect(hourDocs).toBe(744);
    expect(found.trips.length).toBe(477);
  }, 60000);
});

describe("Testing parser functions with stations", () => {
  let stations;
  test("parseFile", async () => {
    stations = await parseFile("tests/stationsTestData.csv", "station");
    expect.assertions(15);
    expect(stations.trash).toStrictEqual(0);
    expect(stations.recordsLen).toStrictEqual(457);
    expect(stations.recordsLen + stations.trash).toStrictEqual(457);
    expect(stations.uniqueRecords).toHaveLength(stations.urLength);
    expect(stations.uniqueRecords[2]).toHaveProperty("stationId");
    expect(stations.uniqueRecords[4]).toHaveProperty("Nimi");
    expect(stations.uniqueRecords[59]).toHaveProperty("stad");
    expect(stations.uniqueRecords[120]).toHaveProperty("operaattor");
    expect(stations.uniqueRecords[200]).toHaveProperty("namn");
    expect(stations.uniqueRecords[255]).toHaveProperty("x");
    expect(stations.uniqueRecords[258]).toHaveProperty("y");
    expect(stations.uniqueRecords[300]).toHaveProperty("name");
    expect(stations.uniqueRecords[320]).toHaveProperty("osoite");
    expect(stations.uniqueRecords[399]).toHaveProperty("address");
    expect(stations.uniqueRecords[450]).toHaveProperty("kaupunki");
  }, 30000);

  test("uploadFiles", async () => {
    await mongoose.connect(config.MONGODB_URI);
    await Station.deleteMany();
    await uploadFiles(stations.uniqueRecords, Station);
    await mongoose.connect(config.MONGODB_URI);
    const stationDocs = await Station.estimatedDocumentCount();
    expect(stationDocs).toBe(457);
  }, 60000);
});
