import UserSettingsModel from "./user-settings";

test("username is required", () => {
  const settings = new UserSettingsModel();
  settings.username = null;
  expect(settings.validateSync("username").errors.username.message).toEqual(
    "Path `username` is required."
  );
  settings.username = "username";
  expect(settings.validateSync("username")).toBeFalsy();
});
