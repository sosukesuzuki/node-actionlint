const fs = require("fs/promises");
const path = require("path");
require("../wasm_exec.js");

async function initialize() {
  const go = new Go();
  const mod = await WebAssembly.compile(
    await fs.readFile(path.join(__dirname, "../main.wasm"))
  );
  let instance = await WebAssembly.instantiate(mod, go.importObject);
  await go.run(instance);
  instance = await WebAssembly.instantiate(mod, go.importObject);
}

module.exports = { initialize };
