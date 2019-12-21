import faker from "faker";
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
        pigJob: null,
        scorecardJob: null,
        price: null
      }
    });
  });

  test("defaults are returned from the database when defined", async () => {
    const username = navMock.credentials.username;
    const pigJob = navMock.jobs[0].No;
    const scorecardJob = navMock.jobs[1].No;
    const price = faker.random.number();
    await UserSettingsModel.create({ username, pigJob, scorecardJob, price });
    await login();
    const { errors, data } = await defaultsQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      defaults: { pigJob, scorecardJob, price }
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
        pigJob: null,
        scorecardJob: null,
        price: null
      }
    });
    const updatedSettings = await UserSettingsModel.findOne({
      username: navMock.credentials.username
    });
    expect(updatedSettings).toBeTruthy();
  });

  test("makes no changes by default", async () => {
    const username = navMock.credentials.username;
    const pigJob = navMock.jobs[0].No;
    const scorecardJob = navMock.jobs[1].No;
    const price = faker.random.number();
    const settings = await UserSettingsModel.create({
      username,
      pigJob,
      scorecardJob,
      price
    });
    await login();
    const { errors, data } = await updateDefaultsMutation({ input: {} });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { pigJob, scorecardJob, price }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({
      username,
      pigJob,
      scorecardJob,
      price
    });
  });

  test("resets defaults", async () => {
    const username = navMock.credentials.username;
    const pigJob = navMock.jobs[0].No;
    const scorecardJob = navMock.jobs[1].No;
    const price = faker.random.number();
    const settings = await UserSettingsModel.create({
      username,
      pigJob,
      scorecardJob,
      price
    });
    await login();
    const { errors, data } = await updateDefaultsMutation({
      input: { pigJob: null, scorecardJob: null, price: null }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { pigJob: null, scorecardJob: null, price: null }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({
      username,
      pigJob: null,
      scorecardJob: null,
      price: null
    });
  });

  test("updates default pig job", async () => {
    const username = navMock.credentials.username;
    const settings = await UserSettingsModel.create({
      username,
      pigJob: navMock.jobs[0].No
    });
    await login();
    const pigJob = navMock.jobs[1].No;
    const { errors, data } = await updateDefaultsMutation({
      input: { pigJob }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { pigJob, price: null, scorecardJob: null }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({ username, pigJob });
  });

  test("updates default scorecard job", async () => {
    const username = navMock.credentials.username;
    const settings = await UserSettingsModel.create({
      username,
      scorecardJob: navMock.jobs[0].No
    });
    await login();
    const scorecardJob = navMock.jobs[1].No;
    const { errors, data } = await updateDefaultsMutation({
      input: { scorecardJob }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { scorecardJob, price: null, pigJob: null }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({ username, scorecardJob });
  });

  test("updates default price", async () => {
    const username = navMock.credentials.username;
    const settings = await UserSettingsModel.create({
      username,
      price: faker.random.number()
    });
    await login();
    const price = faker.random.number();
    const { errors, data } = await updateDefaultsMutation({ input: { price } });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      updateDefaults: { price, pigJob: null, scorecardJob: null }
    });
    const updatedSettings = await UserSettingsModel.findById(settings._id);
    expect(updatedSettings).toMatchObject({ username, price });
  });
});
