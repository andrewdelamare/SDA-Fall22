const fs = require("fs");
const arg = process.argv[2];
const { parse } = require("csv-parse");

const results = [];
const filtered = [];
fs.createReadStream(`${arg}`)
  .pipe(parse({ columns: true }))
  .on("data", (data) => {
    const vals = Object.values(data);
    const fixed = {
      departure: vals[0],
      return: vals[1],
      depId: vals[2],
      depNm: vals[3],
      retId: vals[4],
      retNm: vals[5],
      distance: vals[6],
      duration: vals[7],
    };
    parseInt(fixed.duration) <= 10 ?
    filtered.push(fixed) :
    parseInt(fixed.distance) <= 10 ?
    filtered.push(fixed) :
    results.push(fixed);
  })
  .on("end", () => {
    console.log("results: ",results.length);
    console.log("filtered out: ",filtered.length);
  });
