import PigPurchaseModel from "./PigPurchase";

test("job is required", () => {
  const scorecard = new PigPurchaseModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
