#!/usr/bin/env node

const { getLintLog } = require("../src/get-lint-log");
const { glob } = require("../src/glob");
const { runLintForFiles } = require("../src/run-lint.js");
const { readFiles } = require("../src/read-files");

const args = process.argv.slice(2);
run(args[0]);

async function run(pattern) {
  const filePaths = await glob(pattern);
  const files = await readFiles(filePaths);
  const results = await runLintForFiles(files);
  const text = getLintLog(results);
  if (text) {
    console.log(text);
    process.exit(1);
  }
}
