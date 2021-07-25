import fs from "fs/promises";
import { FileData } from "./types";

export async function readFiles(filePaths: string[]): Promise<FileData[]> {
  const files = await Promise.all(
    filePaths.map(async (filePath) => {
      const data = await fs.readFile(filePath, "utf-8");
      return { path: filePath, data };
    })
  );
  return files;
}
