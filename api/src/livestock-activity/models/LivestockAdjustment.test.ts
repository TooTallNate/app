import LivestockAdjustmentModel from "./LivestockAdjustment";

test("job is required", () => {
  const scorecard = new LivestockAdjustmentModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
