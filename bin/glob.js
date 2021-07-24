const fg = require("fast-glob");
const path = require("path");

function getPattern(pattern) {
  if (pattern) {
    return pattern;
  }
  return "./.github/workflows/**.{yml,yaml}";
}

function glob(pattern) {
  return fg(getPattern(pattern), { dot: true, absolute: true });
}

module.exports = { glob };
