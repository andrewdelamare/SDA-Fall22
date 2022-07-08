const fs = require("fs");
const { parse } = require("csv-parse");
const Trip = require("../models/trip");
const config = require("../utils/config");
const mongoose = require("mongoose");

//Process file function parses csv files, creates new Trip objects, filters them and uploads them to a database

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
      try {
        //210 seconds mongoAtl with chunked method
        // seconds Azure | est 4710 sec with chunked method
        /* 
      console.log("now sending chunks of 1000 records to db...");
      let chunks = 0
      for (let i = 0; i < records.length; i += 1000 ){
        const chunk = records.slice(i, i+1000)
        const done = await Trip.insertMany(chunk, { ordered: false });
        if (done){
          chunks++
          console.log("chunk ", chunks, " uploaded")
        }
      }; */
        //186 seconds mongoAtl with non chunked method
        //13193 seconds Azure with non chunked method

        console.log("now uploading files to db");
        await Trip.insertMany(records, { ordered: false });

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
