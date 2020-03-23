import FarrowingBackendScorecard from "./farrowing-backend-scorecard";

test("area is required", () => {
  const scorecard = new FarrowingBackendScorecard();
  scorecard.area = null;
  expect(scorecard).toHaveValidationError("area", "Path `area` is required.");
  scorecard.area = "area";
  expect(scorecard).not.toHaveValidationError("area");
});

test("sows.score defaults to an empty object", () => {
  const scorecard = new FarrowingBackendScorecard();
  expect(scorecard.toObject().sows).toEqual({});
});

test("sows.score is an integer between 0 and 10", () => {
  const scorecard = new FarrowingBackendScorecard({ sows: {} });
  scorecard.sows.score = -1;
  expect(scorecard).toHaveValidationError(
    "sows.score",
    "Path `score` must be an integer between 0 and 10."
  );
  scorecard.sows.score = 11;
  expect(scorecard).toHaveValidationError(
    "sows.score",
    "Path `score` must be an integer between 0 and 10."
  );
});

test("piglets.score defaults to an empty object", () => {
  const scorecard = new FarrowingBackendScorecard();
  expect(scorecard.toObject().piglets).toEqual({});
});

test("piglets.score is an integer between 0 and 10", () => {
  const scorecard = new FarrowingBackendScorecard({ piglets: {} });
  scorecard.piglets.score = -1;
  expect(scorecard).toHaveValidationError(
    "piglets.score",
    "Path `score` must be an integer between 0 and 10."
  );
  scorecard.piglets.score = 11;
  expect(scorecard).toHaveValidationError(
    "piglets.score",
    "Path `score` must be an integer between 0 and 10."
  );
});

test("feed.score defaults to an empty object", () => {
  const scorecard = new FarrowingBackendScorecard();
  expect(scorecard.toObject().feed).toEqual({});
});

test("feed.score is an integer between 0 and 10", () => {
  const scorecard = new FarrowingBackendScorecard({ feed: {} });
  scorecard.feed.score = -1;
  expect(scorecard).toHaveValidationError(
    "feed.score",
    "Path `score` must be an integer between 0 and 10."
  );
  scorecard.feed.score = 11;
  expect(scorecard).toHaveValidationError(
    "feed.score",
    "Path `score` must be an integer between 0 and 10."
  );
});

test("water.score defaults to an empty object", () => {
  const scorecard = new FarrowingBackendScorecard();
  expect(scorecard.toObject().water).toEqual({});
});

test("water.score is an integer between 0 and 10", () => {
  const scorecard = new FarrowingBackendScorecard({ water: {} });
  scorecard.water.score = -1;
  expect(scorecard).toHaveValidationError(
    "water.score",
    "Path `score` must be an integer between 0 and 10."
  );
  scorecard.water.score = 11;
  expect(scorecard).toHaveValidationError(
    "water.score",
    "Path `score` must be an integer between 0 and 10."
  );
});

test("crate.score defaults to an empty object", () => {
  const scorecard = new FarrowingBackendScorecard();
  expect(scorecard.toObject().crate).toEqual({});
});

test("crate.score is an integer between 0 and 10", () => {
  const scorecard = new FarrowingBackendScorecard({ crate: {} });
  scorecard.crate.score = -1;
  expect(scorecard).toHaveValidationError(
    "crate.score",
    "Path `score` must be an integer between 0 and 10."
  );
  scorecard.crate.score = 11;
  expect(scorecard).toHaveValidationError(
    "crate.score",
    "Path `score` must be an integer between 0 and 10."
  );
});

test("room.score defaults to an empty object", () => {
  const scorecard = new FarrowingBackendScorecard();
  expect(scorecard.toObject().room).toEqual({});
});

test("room.score is an integer between 0 and 10", () => {
  const scorecard = new FarrowingBackendScorecard({ room: {} });
  scorecard.room.score = -1;
  expect(scorecard).toHaveValidationError(
    "room.score",
    "Path `score` must be an integer between 0 and 10."
  );
  scorecard.room.score = 11;
  expect(scorecard).toHaveValidationError(
    "room.score",
    "Path `score` must be an integer between 0 and 10."
  );
});
