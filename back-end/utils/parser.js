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

//Process file function parses csv files, creates new Trip/Station objects, filters them,
//adds them to containers by date and hour to aid query time and uploads them to a database
//node utils/parser.js csv/2021-05.csv
const processFile = async (file, type, upload) => {
  const start = Date.now();
  let records = [];
  let hours = [];
  let trash = 0;
  const parser = fs.createReadStream(`${file}`);
  console.log("now parsing file...");
  parser
    .pipe(
      parse({
        columns: true,
      })
    )
    .on("data", async (record) => {
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
    .on("end", async () => {
      console.log("all records parsed");
      console.log(records.length, " valid records");
      console.log(trash, " invalid records");
      const dep = parseISO(records[0].departure);
      const startmon = startOfMonth(dep);
      const endmon = endOfMonth(dep);
      const hourinterval = eachHourOfInterval({ start: startmon, end: endmon });
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
      records = [];
      progbar.stop();
      if (upload === "upload") {
        try {
          mongoose.connect(config.MONGODB_URI);
          const chunkedUpload = async (arr, model) => {
            console.log("now sending chunks of 100 records to db...");
            const progbar = new cliProgress.SingleBar(
              {},
              cliProgress.Presets.shades_classic
            );
            const leng = ~~(arr.length / 100) + 1;
            progbar.start(leng, 0);
            let chunks = 0;
            for (let i = 0; i < arr.length; i += 100) {
              const chunk = arr.slice(i, i + 100);
              const done = await model.insertMany(chunk, { ordered: false });
              if (done) {
                chunks++;
                progbar.increment();
              }
            }
            progbar.stop();
          };
          await chunkedUpload(hours, Hour);
          const mls = Date.now() - start;
          console.log(
            "It took ",
            Math.floor(mls / 1000),
            " seconds to complete parsing and upload of your file"
          );
          mongoose.connection.close(function () {
            console.log("complete");
            process.exit(0);
          });
        } catch (error) {
          console.log(error);
          mongoose.connection.close(function () {
            console.log("closing mongo connection");
            process.exit(0);
          });
        }
      } else {
        const mls = Date.now() - start;
        console.log(
          "It took ",
          Math.floor(mls / 1000),
          " seconds to complete the parsing of your file"
        );
        process.exit(0);
      }
    });
};
const file = process.argv[2];
const type = process.argv[3];
const upload = process.argv[4];
try {
  processFile(file, type, upload);
} catch (error) {
  console.log(error);
}
module.exports = processFile;
