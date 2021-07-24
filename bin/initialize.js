const fs = require("fs/promises");
const path = require("path");

/**
 * @typedef {{ message: string; column: number; line: number; kind: string; }} LintResult
 */

/**
 * @returns { (src: string, path: string) => LintResult }
 */
async function initialize() {
  global.throwError = function throwError(msg) {
    throw new Error(msg);
  };
  require("../wasm_exec.js");
  // eslint-disable-next-line no-undef
  const go = new Go();
  // eslint-disable-next-line no-undef
  const { instance } = await WebAssembly.instantiate(
    await fs.readFile(path.join(__dirname, "../main.wasm")),
    go.importObject
  );
  go.run(instance);
  return global.runActionlint;
}

module.exports = { initialize };
