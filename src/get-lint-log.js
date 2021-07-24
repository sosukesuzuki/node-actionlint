const path = require("path");
const chalk = require("chalk");
const { codeFrameColumns } = require("@babel/code-frame");

/**
 * @typedef {import("./run-lint").Result} Result
 */

/**
 * @param {Array<Result>} results
 * @returns {string}
 */
function getLintLog(results) {
  let text = "";
  for (const result of results) {
    const relativePath = path.relative(process.cwd(), result.path);
    text += chalk.yellow(relativePath);
    text +=
      chalk.gray(":") + result.line + chalk.gray(":") + result.column + " ";
    text += chalk.bold.white(result.message) + " ";
    text += chalk.gray("[", result.kind, "]") + "\n";
    const codeFrame = codeFrameColumns(result.data, {
      start: { line: result.line, column: result.column },
    });
    text += codeFrame + "\n";
  }
  return text;
}

module.exports = { getLintLog };
