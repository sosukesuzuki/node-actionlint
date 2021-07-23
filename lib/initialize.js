const fs = require("fs/promises");
const path = require("path");

async function initialize() {
  require("../wasm_exec.js");
  const go = new Go();
  const { instance } = await WebAssembly.instantiate(
    await fs.readFile(path.join(__dirname, "../main.wasm")),
    go.importObject
  );
  go.run(instance);
  return global.runActionlint;
}

module.exports = { initialize };
