import nock from "nock";
import faker from "faker";
import { client, mockUser } from "../../../test/utils";
import UserSettingsModel from "../../common/models/UserSettings";
import { UserSettingsFactory } from "../../../test/builders";

test("returns null if unauthenticated", async () => {
  await expect(
    client.request(`{
      user {
        name
      }
    }`)
  ).resolves.toEqual({
    user: null
  });
});

test("returns user data for a logged in user", async () => {
  const { user, auth } = await mockUser();

  nock(process.env.NAV_BASE_URL)
    .get(`/User(${user.User_Security_ID})`)
    .basicAuth(auth)
    .reply(200, user);

  await expect(
    client.request(`{
      user {
        name
        username
        license
      }
    }`)
  ).resolves.toEqual({
    user: {
      username: user.User_Name,
      name: user.Full_Name,
      license: user.License_Type
    }
  });
});

test("returns users locations from database", async () => {
  const { user, auth } = await mockUser();
  const settings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name
    })
  );

  const locations = settings.locations.list.map(code => ({
    Code: code,
    Name: faker.random.word()
  }));

  nock(process.env.NAV_BASE_URL)
    .get(`/User(${user.User_Security_ID})`)
    .basicAuth(auth)
    .reply(200, user);

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Locations`)
    .query({
      $filter: `(${locations
        .map(location => `(Code eq '${location.Code}')`)
        .join(" or ")})`
    })
    .basicAuth(auth)
    .reply(200, locations);

  await expect(
    client.request(`{
      user {
        locations {
          mode
          list {
            code
            name
          }
        }
      }
    }`)
  ).resolves.toEqual({
    user: {
      locations: {
        mode: settings.locations.mode,
        list: locations.map(location => ({
          code: location.Code,
          name: location.Name
        }))
      }
    }
  });
});
