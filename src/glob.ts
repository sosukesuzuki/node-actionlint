import fg from "fast-glob";

function getPattern(pattern: string) {
  if (pattern) {
    return pattern;
  }
  return "./.github/workflows/**.{yml,yaml}";
}

export function glob(pattern: string): Promise<string[]> {
  return fg(getPattern(pattern), { dot: true, absolute: true });
}
