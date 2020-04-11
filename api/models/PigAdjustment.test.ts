import PigAdjustmentModel from "./PigAdjustment";

test("job is required", () => {
  const scorecard = new PigAdjustmentModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
