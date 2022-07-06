const fs = require("fs");
const arg = process.argv[2];
const { parse } = require("csv-parse");
const Trip = require("../models/trip");
const config = require("../utils/config");
const mongoose = require("mongoose");
const processFile = async () => {
  mongoose.connect(config.MONGODB_URI);
  let records = [];
  let trash = [];
  const parser = fs.createReadStream(`${arg}`).pipe(
    parse({
      columns: true,
    })
  );
  for await (const record of parser) {
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
      : trash.push(it);
  }

  try {
    const done = await Trip.insertMany(records);
    if (done) {
      mongoose.connection.close(function () {
        console.log("complete");
        console.log("filtered out ", trash.length, " files");
        process.exit(0);
      });
    }
  } catch (error) {
    console.log(error);
  }
  /* 
  const done = await Trip.insertMany(records)
  if(done){
    mongoose.Connection.close();
    return console.log(completed);
  } */
};
processFile();
