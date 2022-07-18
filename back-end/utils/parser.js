const fs = require("fs");
const { parse } = require("csv-parse");
const Hour = require("../models/hour");
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
} = require("date-fns");
//node utils/parser.js csv/2021-05.csv

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
  const hours = await packageHours(records);
  if (action === "upload" && type == "trip") {
    await uploadFiles(hours, Hour);
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
module.exports = { processFile, parseFile, packageHours, uploadFiles };
