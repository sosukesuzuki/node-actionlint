const fs = require("fs/promises");

/**
 * @typedef {{ path: string; data: string; }} FileData
 */

/**
 * @param {string[]} filePaths
 * @returns {FileData[]}
 */
async function readFiles(filePaths) {
  /** @type {Array<FileData>} */
  const files = await Promise.all(
    filePaths.map(async (filePath) => {
      const data = await fs.readFile(filePath, "utf-8");
      return { path: filePath, data };
    })
  );
  return files;
}

module.exports = { readFiles };
