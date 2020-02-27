import faker from "faker";
import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../utils";
import { PigActivityQuery } from "../../resolvers/types";
import { JobFactory, UserSettingsFactory } from "../builders";
import UserSettings from "../../models/user-settings";

function query() {
  return client.request<PigActivityQuery>(
    `{
      pigActivityDefaults {
        job {
          number
        }
        price
      }
    }`
  );
}

testUnauthenticated(query);

test("returns default job when set in user settings", async () => {
  const { user, auth } = await mockUser();
  const job = JobFactory.build();
  await UserSettings.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: job.No,
      price: null
    })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job);

  await expect(query()).resolves.toEqual({
    pigActivityDefaults: {
      job: {
        number: job.No
      },
      price: null
    }
  });
});

test("returns default price when set in user settings", async () => {
  const { user } = await mockUser();
  const price = faker.random.number({ min: 30, max: 150 });
  await UserSettings.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: null,
      price: price
    })
  );

  await expect(query()).resolves.toEqual({
    pigActivityDefaults: {
      job: null,
      price
    }
  });
});
