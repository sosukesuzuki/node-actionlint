const { initialize } = require("./initialize.js");

async function main() {
  await initialize();
  console.log("FOO");
}

main();
