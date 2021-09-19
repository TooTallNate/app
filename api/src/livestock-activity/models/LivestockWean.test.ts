import LivestockWeanModel from "./LivestockWean";

test("job is required", () => {
  const scorecard = new LivestockWeanModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
