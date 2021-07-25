import fs from "fs/promises";
import path from "path";
import { FileData, LintResult, Result } from "./types";

type RunActionLint = (src: string, path: string) => Array<LintResult>;
async function initialize(): Promise<RunActionLint> {
  // @ts-ignore
  global.throwError = function throwError(msg: string) {
    throw new Error(msg);
  };
  require("../wasm_exec.js");
  // @ts-ignore
  const go = new global.Go();
  // @ts-ignore
  const { instance } = await WebAssembly.instantiate(
    await fs.readFile(path.join(__dirname, "../main.wasm")),
    go.importObject
  );
  go.run(instance);
  // @ts-ignore
  return global.runActionlint as RunActionLint;
}

let runActionlint: RunActionLint | undefined;
export async function runLint(fileData: string, filePath: string) {
  if (!runActionlint) {
    runActionlint = await initialize();
  }
  return runActionlint(fileData, filePath);
}

export async function runLintForFiles(
  files: FileData[]
): Promise<Array<Result>> {
  const results = (
    await Promise.all(
      files.map(async (file) => {
        const lintResults = await runLint(file.data, file.path);
        return lintResults.map((result) => ({ ...result, ...file }));
      })
    )
  )
    .flat()
    .filter((result) => !!result.message);
  return results;
}
