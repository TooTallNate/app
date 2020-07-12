import faker from "faker";
import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { Job } from "../../common/graphql";
import { JobFactory, UserSettingsFactory, oneOf } from "../../../test/builders";
import UserSettingsModel from "../../common/models/UserSettings";
import { assertNonNullType } from "graphql";

interface QueryResult {
  pigActivityDefaults: {
    job: Job;
    prices: {
      animal: String;
      price: number;
    };
  };
}

function query() {
  return client.request<QueryResult>(
    `{
      pigActivityDefaults {
        job {
          number
        }
        prices {
          animal
          price
        }
      }
    }`
  );
}

testUnauthenticated(query);

test("returns default job when set in user settings", async () => {
  const { user, auth } = await mockUser();
  const job = JobFactory.build();
  await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: job.No,
      prices: []
    })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  await expect(query()).resolves.toEqual({
    pigActivityDefaults: {
      job: {
        number: job.No
      },
      prices: []
    }
  });
});

test("returns default price when set in user settings", async () => {
  const { user } = await mockUser();
  const price = faker.random.number({ min: 30, max: 150 });
  const animal = oneOf("01", "02", "03");
  await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: null,
      prices: [
        {
          animal: animal,
          price
        }
      ]
    })
  );

  await expect(query()).resolves.toEqual({
    pigActivityDefaults: {
      job: null,
      prices: [
        {
          animal,
          price
        }
      ]
    }
  });
});
