const fs = require("fs");
const arg = process.argv[2];
const { parse } = require("csv-parse");

const results = [];

fs.createReadStream(`csv/${arg}`)
  .pipe(parse({ columns: true }))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const fixedKeys = results.map((obj) => {
      const vals = Object.values(obj);
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
      return fixed;
    });
    console.log(fixedKeys);
  });
