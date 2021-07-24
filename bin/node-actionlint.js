#!/usr/bin/env node

const { getLintLog } = require("./get-lint-log");
const { glob } = require("./glob");
const { runLintForFiles } = require("./run-lint.js");
const { readFiles } = require("./read-files");

const args = process.argv.slice(2);
run(args[0]);

async function run(pattern) {
  const filePaths = await glob(pattern);
  const files = await readFiles(filePaths);
  const results = await runLintForFiles(files);
  const text = getLintLog(results);
  if (text) {
    console.log(text);
  }
}
