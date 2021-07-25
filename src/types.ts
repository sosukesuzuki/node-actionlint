export type LintResult = {
  message: string;
  line: number;
  column: number;
  kind: string;
};

export type FileData = {
  path: string;
  data: string;
};

export type Result = LintResult & FileData;
