const { runLint } = require("../build/run-lint");

describe("run actionlint via wasm", () => {
  it("returns linting error", async () => {
    const invalidWorkflowCode = `hogehoge  `;
    const result = await runLint(invalidWorkflowCode, "test.yml");
    expect(result).toEqual([
      {
        column: 1,
        kind: "syntax-check",
        line: 1,
        message: "workflow is scalar node but mapping node is expected",
      },
      {
        column: 1,
        kind: "syntax-check",
        line: 1,
        message: '"jobs" section is missing in workflow',
      },
    ]);
  });
});
