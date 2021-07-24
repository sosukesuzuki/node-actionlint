#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const { glob } = require("./glob");
const { initialize } = require("./initialize.js");
const chalk = require("chalk");
import { codeFrameColumns } from "@babel/code-frame";

const args = process.argv.slice(2);
run(args);

/**
 * @typedef {{ message: string; column: number; line: number; kind: string; }} LintResult
 * @typedef {{ path: string; data: string; }} FileData
 * @typedef { LintResult & FileData } Result
 */

async function run(args) {
  /** @type { (src: string, path: string) => LintResult } */
  const runActionlint = await initialize();
  const pattern = args[0];
  const filePaths = await glob(pattern);
  /** @type {Array<FileData>} */
  const files = await Promise.all(
    filePaths.map(async (filePath) => {
      const data = await fs.readFile(filePath, "utf-8");
      return { path: filePath, data };
    })
  );
  /** @type {Array<Result>} */
  const results = files
    .map((file) => ({ ...runActionlint(data, path), ...file }))
    .flat();
  const text = getLogResults(results);
  console.log(text);
}

/**
 * @param {Array<Result>} results
 * @returns {string}
 */
function getLogResults(results) {
  let text = "";
  for (const result of results) {
    const relativePath = path.relative(process.cwd(), result.path);
    text += chalk.yellow(relativePath);
    text +=
      chalk.gray(":") + result.line + chalk.gray(":") + result.column + " ";
    text += chalk.bold.white(result.message) + " ";
    text += chalk.gray("[", result.kind, "]") + "\n";
    const codeFrame = codeFrameColumns(result.data, {
      line: result.line,
      column: result.column,
    });
    text += codeFrame + "\n";
  }
  return text;
}
