import LivestockMoveModel from "./LivestockMove";

test("fromJob is required", () => {
  const scorecard = new LivestockMoveModel();
  scorecard.fromJob = null;
  expect(scorecard).toHaveValidationError(
    "fromJob",
    "Path `fromJob` is required."
  );
  scorecard.fromJob = "area";
  expect(scorecard).not.toHaveValidationError("fromJob");
});
