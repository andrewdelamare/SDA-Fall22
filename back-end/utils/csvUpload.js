const { processFile } = require("./parser");
const file = process.argv[2];
const type = process.argv[3];
const action = process.argv[4];
try {
  processFile(file, type, action);
} catch (error) {
  console.log(error.message);
}
