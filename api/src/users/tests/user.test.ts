import nock from "nock";
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
  const { user } = await mockUser();
  const settings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name
    })
  );

  await expect(
    client.request(`{
      user {
        locations {
          type
          list {
            code
            description
          }
        }
      }
    }`)
  ).resolves.toEqual({
    user: {
      locations: {
        type: settings.locations.listType,
        list: settings.locations.list.map(code => ({
          code
        }))
      }
    }
  });
});
