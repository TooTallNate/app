import PigWeanModel from "./PigWean";

test("job is required", () => {
  const scorecard = new PigWeanModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
