const { initialize } = require("./initialize.js");

(async () => {
  const runActionlint = await initialize();
  console.log(typeof runActionlint);
})();
