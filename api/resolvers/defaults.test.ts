import { expectUnauthorized, login, navMock } from "../test/utils";
import { defaultsQuery, updateDefaultsMutation } from "../test/gql";
import UserSettingsModel from "../models/user-settings";

describe("defaults query", () => {
  test("returns error if not logged in", () =>
    expectUnauthorized(defaultsQuery));

  test("defaults are null if no settings in database", async () => {
    await login();
    const { errors, data } = await defaultsQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      defaults: {
        job: null
      }
    });
  });

  test("defaults are returned from the database when defined", async () => {
    const username = navMock.credentials.username;
    const job = navMock.jobs[0].No;
    await UserSettingsModel.create({ username, job });
    await login();
    const { errors, data } = await defaultsQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      defaults: { job }
    });
  });
});

describe("update defaults mutation", () => {
  test("returns error if not logged in", () =>
    expectUnauthorized(() => updateDefaultsMutation({ input: {} })));

  test("creates settings record if it does not exist", async () => {
    await login();
    const { errors, data } = await updateDefaultsMutation({ input: {} });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: {
        job: null
      }
    });
    const updatedSettings = await UserSettingsModel.findOne({
      username: navMock.credentials.username
    });
    expect(updatedSettings).toBeTruthy();
  });

  test("makes no changes by default", async () => {
    const username = navMock.credentials.username;
    const job = navMock.jobs[0].No;
    const settings = await UserSettingsModel.create({ username, job });
    await login();
    const { errors, data } = await updateDefaultsMutation({ input: {} });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { job }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({ username, job });
  });

  test("resets defaults", async () => {
    const username = navMock.credentials.username;
    const job = navMock.jobs[0].No;
    const settings = await UserSettingsModel.create({ username, job });
    await login();
    const { errors, data } = await updateDefaultsMutation({
      input: { job: null }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { job: null }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({ username, job: null });
  });

  test("updates default job", async () => {
    const username = navMock.credentials.username;
    const settings = await UserSettingsModel.create({
      username,
      job: navMock.jobs[0].No
    });
    await login();
    const job = navMock.jobs[1].No;
    const { errors, data } = await updateDefaultsMutation({ input: { job } });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { job }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({ username, job });
  });
});
