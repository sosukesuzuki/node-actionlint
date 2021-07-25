import path from "path";
import chalk from "chalk";
import { codeFrameColumns } from "@babel/code-frame";
import { Result } from "./types";

export function getLintLog(results: Result[]): string {
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
