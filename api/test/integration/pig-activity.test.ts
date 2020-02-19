import faker from "faker";
import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../utils";
import { PigActivityQuery } from "../../resolvers/types";
import { JobFactory, UserSettingsFactory } from "../builders";
import UserSettings from "../../models/user-settings";

function query() {
  return client.request<PigActivityQuery>(
    `{
      pigActivity {
        jobs {
          number
          description
        }
        defaultJob {
          number
        }
        defaultPrice
      }
    }`
  );
}

testUnauthenticated(query);

test("returns jobs for pig activity", async () => {
  const { auth } = await mockUser();
  const jobs = JobFactory.buildList(3);

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and ((Job_Posting_Group eq 'MKT PIGS') or (Job_Posting_Group eq 'SOWS') or (Job_Posting_Group eq 'GDU')))`
    })
    .basicAuth(auth)
    .reply(200, { value: jobs });

  await expect(query()).resolves.toEqual({
    pigActivity: {
      jobs: jobs.map(job => ({
        number: job.No,
        description: job.Description
      })),
      defaultJob: null,
      defaultPrice: null
    }
  });
});

test("returns default job when set in user settings", async () => {
  const { user, auth } = await mockUser();
  const jobs = JobFactory.buildList(3);
  const defaultJob = jobs[1];
  await UserSettings.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: defaultJob.No,
      price: null
    })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and ((Job_Posting_Group eq 'MKT PIGS') or (Job_Posting_Group eq 'SOWS') or (Job_Posting_Group eq 'GDU')))`
    })
    .basicAuth(auth)
    .reply(200, { value: jobs });

  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${defaultJob.No}%27)`
    )
    .basicAuth(auth)
    .reply(200, defaultJob);

  await expect(query()).resolves.toEqual({
    pigActivity: {
      jobs: jobs.map(job => ({
        number: job.No,
        description: job.Description
      })),
      defaultJob: {
        number: defaultJob.No
      },
      defaultPrice: null
    }
  });
});

test("returns default price when set in user settings", async () => {
  const { user, auth } = await mockUser();
  const jobs = JobFactory.buildList(3);
  const defaultPrice = faker.random.number({ min: 30, max: 150 });
  await UserSettings.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: null,
      price: defaultPrice
    })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and ((Job_Posting_Group eq 'MKT PIGS') or (Job_Posting_Group eq 'SOWS') or (Job_Posting_Group eq 'GDU')))`
    })
    .basicAuth(auth)
    .reply(200, { value: jobs });

  await expect(query()).resolves.toEqual({
    pigActivity: {
      jobs: jobs.map(job => ({
        number: job.No,
        description: job.Description
      })),
      defaultJob: null,
      defaultPrice
    }
  });
});
