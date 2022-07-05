const fs = require("fs");
const arg = process.argv[2];
const { parse } = require("csv-parse");

const results = [];

fs.createReadStream(`csv/${arg}`)
  .pipe(parse({ columns: true }))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
  });
