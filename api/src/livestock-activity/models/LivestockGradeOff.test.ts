import LivestockGradeOffModel from "./LivestockGradeOff";

test("job is required", () => {
  const scorecard = new LivestockGradeOffModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
