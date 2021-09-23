import LivestockPurchaseModel from "./LivestockPurchase";

test("job is required", () => {
  const scorecard = new LivestockPurchaseModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
