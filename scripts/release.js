#!/usr/bin/env node

const minimist = require("minimist");
const execa = require("execa");
const fs = require("fs/promises");
const path = require("path");

(async () => {
  const { release } = minimist(process.argv.slice(2));

  assertRelease(release);

  await execa("npm", ["version", release]);

  console.log("Running 'git push origin HEAD'...");
  await execa("git", ["push", "origin", "HEAD"]);

  console.log("Running 'git push origin --tags'...");
  await execa("git", ["push", "origin", "--tags"]);

  const pkg = JSON.parse(
    await fs.readFile(path.resolve(process.cwd(), "package.json"), "utf-8")
  );

  console.log("Done!");

  console.log(
    `Open https://github.com/sosukesuzuki/node-actionlint/releases/new?tag=v${pkg.version} and create new release.`
  );

  /**
   * @param {unknown} value
   * @return {asserts value is "major" | "minor" | "patch"}
   */
  function assertRelease(value) {
    if (!["major", "minor", "patch"].includes(value)) {
      throw new Error(
        `${value} is not valid release. Must be 'major' or 'minor' or 'patch'.`
      );
    }
  }
})();
