const fs = require("fs/promises");
const path = require("path");

/**
 * @typedef {{ message: string; column: number; line: number; kind: string; }} LintResult
 * @typedef {import("./read-files").FileData} FileData
 * @typedef {LintResult & FileData} Result
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

/**
 * @param {FileData[]} files
 * @returns {Result[]}
 */
async function runLint(files) {
  const runActionlint = await initialize();
  /** @type {Array<Result>} */
  const results = files
    .map((file) => {
      const lintResults = runActionlint(file.data, file.path);
      return lintResults.map((result) => ({ ...result, ...file }));
    })
    .flat()
    .filter((result) => !!result.message);
  return results;
}

module.exports = { runLint };
