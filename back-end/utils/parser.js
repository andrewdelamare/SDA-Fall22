const fs = require("fs");
const { parse } = require("csv-parse");
const Trip = require("../models/trip");
const Dep = require("../models/dep");
const Ret = require("../models/ret");
const Dist = require("../models/dist");
const Dur = require("../models/dur");
const config = require("../utils/config");
const mongoose = require("mongoose");

//Process file function parses csv files, creates new Trip objects, filters them sorts them,
//adds them to containers to aid pagination and uploads them to a database
//node utils/parser.js csv/2021-05.csv 
const processFile = async (args) => {
  const start = Date.now();
  mongoose.connect(config.MONGODB_URI);
  let records = [];
  let trash = 0;
  const parser = fs.createReadStream(`${args}`);
  console.log("now parsing file...");
  parser
    .pipe(
      parse({
        columns: true,
      })
    )
    .on("data", async (record) => {
      let vals = Object.values(record);
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
    })
    .on("end", async () => {
      console.log("all records parsed");
      console.log(records.length, " valid records");
      console.log(trash, " invalid records");

      //---------------CREATE ARRAYS OF CONTAINER DOCS-----------
      //DEP
      records.sort((a, b) => {
        a.departure - b.departure;
      });
      let depArr = [];
      let pages = 0;
      for (let i = 0; i < records.length; i += 1000) {
        const chunk = records.slice(i, i + 1000);
        depArr.push(new Dep({ page: pages, trips: chunk }));
        pages++;
      }
      console.log("depArr: ", depArr.length);
      //RET
      records.sort((a, b) => {
        a.ret - b.ret;
      });
      let retArr = [];
      pages = 0;
      for (let i = 0; i < records.length; i += 1000) {
        const chunk = records.slice(i, i + 1000);
        retArr.push(new Ret({ page: pages, trips: chunk }));
        pages++;
      }
      console.log("retArr: ", retArr.length);
      //DIST
      records.sort((a, b) => {
        a.distance - b.distance;
      });
      let distArr = [];
      pages = 0;
      for (let i = 0; i < records.length; i += 1000) {
        const chunk = records.slice(i, i + 1000);
        distArr.push(new Dist({ page: pages, trips: chunk }));
        pages++;
      }
      console.log("distArr: ", distArr.length);
      //DUR
      records.sort((a, b) => {
        a.duration - b.duration;
      });
      let durArr = [];
      pages = 0;
      for (let i = 0; i < records.length; i += 1000) {
        const chunk = records.slice(i, i + 1000);
        durArr.push(new Dur({ page: pages, trips: chunk }));
        pages++;
      }
      console.log("durArr: ", durArr.length);
      try {
        //--------------------------CHUNKED------------------------
        //210 seconds mongoAtl with chunked method
        // seconds Azure | est 4710 sec with chunked method
        const chunkedUpload = async (arr, model) => {
          console.log("now sending chunks of 100 records to db...");
          let chunks = 0;
          for (let i = 0; i < arr.length; i += 100) {
            const chunk = arr.slice(i, i + 100);
            const done = await model.insertMany(chunk, { ordered: false });
            if (done) {
              chunks++;
              console.log("chunk ", chunks, " uploaded");
            }
          }
        };
        await chunkedUpload(depArr, Dep);
        await chunkedUpload(retArr, Ret);
        await chunkedUpload(distArr, Dist);
        await chunkedUpload(durArr, Dur);
        //------------------------NON CHUNKED-----------------------
        //186 seconds mongoAtl with non chunked method
        //13193 seconds Azure with non chunked method
        /*
        console.log("now uploading files to db");
        await Trip.insertMany(records, { ordered: false });
      */
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
    });
};
const arg = process.argv[2];
try {
  processFile(arg);
} catch (error) {
  console.log(error);
}
module.exports = processFile;
