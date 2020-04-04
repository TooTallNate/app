import PigMoveModel from "./PigMove";

test("fromJob is required", () => {
  const scorecard = new PigMoveModel();
  scorecard.fromJob = null;
  expect(scorecard).toHaveValidationError(
    "fromJob",
    "Path `fromJob` is required."
  );
  scorecard.fromJob = "area";
  expect(scorecard).not.toHaveValidationError("fromJob");
});
