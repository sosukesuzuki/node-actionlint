#!/usr/bin/env node

const { run } = require("../build/cli");

const args = process.argv.slice(2);
run(args[0]);
