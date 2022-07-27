const fs = require("fs");
const { parse } = require("csv-parse");
const Hour = require("../models/hour");
const Station = require("../models/station");
const config = require("../utils/config");
const mongoose = require("mongoose");
const cliProgress = require("cli-progress");
const {
  startOfHour,
  startOfDay,
  parseISO,
  getTime,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachHourOfInterval,
  getMonth,
} = require("date-fns");
//node utils/parser.js csv/2021-05.csv
//FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
//1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582

const parseFile = (file, type) => {
  let records = [];
  let recordsLen = 0;
  let trash = 0;
  const parser = fs.createReadStream(`${file}`);
  console.log("now parsing file...");
  return new Promise((resolve) => {
    parser
      .pipe(
        parse({
          columns: true,
        })
      )
      .on("data", (record) => {
        let vals = Object.values(record);
        if (type === "trip") {
          let it = {
            departure: vals[0],
            ret: vals[1],
            depId: vals[2],
            depNm: vals[3],
            retId: vals[4],
            retNm: vals[5],
            distance: vals[6],
            duration: vals[7],
          };
          parseInt(it.distance) > 10 && parseInt(it.duration) > 10
            ? records.push(it)
            : trash++;
        } else if (type === "station") {
          let it = new Station({
            fid: vals[0],
            stationId: vals[1],
            Nimi: vals[2],
            namn: vals[3],
            name: vals[4],
            osoite: vals[5],
            address: vals[6],
            kaupunki: vals[7],
            stad: vals[8],
            operaattor: vals[9],
            kapasiteet: vals[10],
            x: vals[11],
            y: vals[12],
            startNum: 0,
            endNum: 0,
            disSt: { may: [], june: [], july: [] },
            disEnd: { may: [], june: [], july: [] },
            startedAt: {
              may: [],
              june: [],
              july: [],
            },
            returnedAt: {
              may: [],
              june: [],
              july: [],
            },
          });
          records.push(it);
        }
      })
      .on("end", () => {
        console.log("all records parsed");
        console.log(records.length, " valid records");
        console.log(trash, " invalid records");
        recordsLen = records.length;
        resolve({ records, recordsLen, trash });
      });
  });
};

const packageHours = (records) => {
  const hours = [];
  const dep = parseISO(records[0].departure);
  const startmon = startOfMonth(dep);
  const endmon = endOfMonth(dep);
  const hourinterval = eachHourOfInterval({ start: startmon, end: endmon });
  return new Promise((resolve) => {
    for (const h of hourinterval) {
      hours.push(
        new Hour({
          day: startOfDay(h),
          hour: h,
          trips: [],
        })
      );
    }
    const progbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    const leng = records.length;
    console.log("now sorting trips into their respective hour documents...");
    progbar.start(leng, 0);
    for (const record of records) {
      const dep = parseISO(record.departure);
      const starthour = startOfHour(dep);
      progbar.increment();
      for (const h of hours) {
        if (!(h.hour > starthour) && !(h.hour < starthour)) {
          h.trips.push(record);
        }
      }
    }

    progbar.stop();
    resolve(hours);
  });
};

const addTripDataToStations = async (records) => {
  console.log("now updating station documents...");
  return new Promise(async (resolve) => {
    const progbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    const leng = records.length;
    progbar.start(leng, 0);
    //for each trip
    for (const record of records) {
      const iso = parseISO(record.departure);
      const mon = getMonth(iso);
      // startNum ++, distance -> disSt, retId -> returnedAt

      const depChanges =
        mon == 4
          ? {
              $push: {
                "disSt.may": record.distance,
                "returnedAt.may": record.retId,
              },
              $inc: { startNum: 1 },
            }
          : mon == 5
          ? {
              $push: {
                "disSt.june": record.distance,
                "returnedAt.june": record.retId,
              },
              $inc: { startNum: 1 },
            }
          : {
              $push: {
                "disSt.july": record.distance,
                "returnedAt.july": record.retId,
              },
              $inc: { startNum: 1 },
            };

      await Station.findOneAndUpdate({ stationId: record.depId }, depChanges);
      // endNum ++, distance -> disEnd, depId -> startedAt

      const retChanges =
        mon == 4
          ? {
              $push: {
                "disEnd.may": record.distance,
                "startedAt.may": record.depId,
              },
              $inc: { endNum: 1 },
            }
          : mon == 5
          ? {
              $push: {
                "disEnd.june": record.distance,
                "startedAt.june": record.depId,
              },
              $inc: { endNum: 1 },
            }
          : {
              $push: {
                "disEnd.july": record.distance,
                "startedAt.july": record.depId,
              },
              $inc: { endNum: 1 },
            };

      await Station.findOneAndUpdate({ stationId: record.retId }, retChanges);

      progbar.increment();
    }
    progbar.stop();
    resolve();
  });
};

const altTripDataMethod = async (records) => {
  console.log("now updating station documents...");
  return new Promise(async (resolve) => {
    const progbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    const leng = records.length;
    progbar.start(leng, 0);
    for (const station of records) {
      let i = 0;
      if (i < 2208) {
        let hObjs = await Hour.find({})
          .limit(100)
          .skip(i * 100);
        for (const obj of hObjs) {
          const bucketOfTrips = obj.trips;
          for (const trip of bucketOfTrips) {
            const iso = parseISO(trip.departure);
            const mon = getMonth(iso);
            if (station.stationId == trip.depId) {
              mon == 4
                ? (station.disSt.may.push(trip.distance),
                  station.returnedAt.may.push(trip.retId),
                  station.startNum++)
                : mon == 5
                ? (station.disSt.june.push(trip.distance),
                  station.returnedAt.june.push(trip.retId),
                  station.startNum++)
                : (station.disSt.july.push(trip.distance),
                  station.returnedAt.july.push(trip.retId),
                  station.startNum++);
            }
            if (station.stationId == trip.retId) {
              mon == 4
                ? (station.disEnd.may.push(trip.distance),
                  station.startedAt.may.push(trip.depId),
                  station.endNum++)
                : mon == 5
                ? (station.disEnd.june.push(trip.distance),
                  station.startedAt.june.push(trip.depId),
                  station.endNum++)
                : (station.disEnd.july.push(trip.distance),
                  station.startedAt.july.push(trip.depId),
                  station.endNum++);
            }
          }
        }
        i + 100;
      }
      await station.save();
      progbar.increment();
    }
    progbar.stop();
    resolve();
  });
};

const chunkedUpload = async (arr, model) => {
  console.log("now sending chunks of 100 records to db...");
  return new Promise(async (resolve) => {
    const progbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    const leng = ~~(arr.length / 100) + 1;
    progbar.start(leng, 0);
    for (let i = 0; i < arr.length; i += 100) {
      const chunk = arr.slice(i, i + 100);
      const done = await model.insertMany(chunk, { ordered: false });
      if (done) {
        progbar.increment();
      }
    }
    progbar.stop();
    resolve();
  });
};

const uploadFiles = async (arr, model) => {
  try {
    mongoose.connect(config.MONGODB_URI);
    await chunkedUpload(arr, model);
    mongoose.connection.close(function () {
      console.log("complete");
    });
  } catch (error) {
    console.log(error.message);
    mongoose.connection.close(function () {
      console.log("closing mongo connection");
      process.exit(0);
    });
  }
};

const processFile = async (file, type, action) => {
  const start = Date.now();
  const recordsObj = await parseFile(file, type);
  const records = recordsObj.records;
  if (action === "upload" && type == "trip") {
    const hours = await packageHours(records);
    await uploadFiles(hours, Hour);
    const mls = Date.now() - start;
    console.log(
      "It took ",
      Math.floor(mls / 1000),
      " seconds to complete parsing and upload of your file"
    );
    process.exit(0);
  } else if (action === "stationData" && type == "trip") {
    await addTripDataToStations(records);
    const mls = Date.now() - start;
    console.log(
      "It took ",
      Math.floor(mls / 1000),
      " seconds to complete parsing and updates to staion documents"
    );
    process.exit(0);
  } else if (action === "stationData" && type == "station") {
    await altTripDataMethod(records);
    const mls = Date.now() - start;
    console.log(
      "It took ",
      Math.floor(mls / 1000),
      " seconds to complete parsing and updates to staion documents"
    );
    process.exit(0);
  } else if (action === "upload" && type == "station") {
    await uploadFiles(records, Station);
    const mls = Date.now() - start;
    console.log(
      "It took ",
      Math.floor(mls / 1000),
      " seconds to complete parsing and upload of your file"
    );
    process.exit(0);
  } else {
    const mls = Date.now() - start;
    console.log(
      "It took ",
      Math.floor(mls / 1000),
      " seconds to complete the processing of your file"
    );
    process.exit(0);
  }
};
module.exports = {
  processFile,
  parseFile,
  packageHours,
  uploadFiles,
  addTripDataToStations,
};
