import PigMortalityModel from "./PigMortality";

test("job is required", () => {
  const scorecard = new PigMortalityModel();
  scorecard.job = null;
  expect(scorecard).toHaveValidationError("job", "Path `job` is required.");
  scorecard.job = "area";
  expect(scorecard).not.toHaveValidationError("job");
});
