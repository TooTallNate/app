import LivestockMortalityModel from "./LivestockMortality";

test("job is required", () => {
  const scorecard = new LivestockMortalityModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
