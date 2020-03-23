import UserSettingsModel from "./user-settings";

test("username is required", () => {
  const settings = new UserSettingsModel();
  settings.username = null;
  expect(settings).toHaveValidationError(
    "username",
    "Path `username` is required."
  );
  settings.username = "username";
  expect(settings).not.toHaveValidationError("username");
});
