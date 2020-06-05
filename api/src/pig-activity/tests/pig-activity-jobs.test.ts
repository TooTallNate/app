import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { Job, InclusivityMode } from "../../common/graphql";
import { JobFactory, UserSettingsFactory } from "../../../test/builders";
import UserSettingsModel from "../../common/models/UserSettings";

interface QueryResult {
  pigActivityJobs: Job[];
}

function query() {
  return client.request<QueryResult>(
    `{
      pigActivityJobs {
        number
        description
        inventory
        deadQuantity
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
    pigActivityJobs: jobs.map(job => ({
      number: job.No,
      description: job.Description,
      inventory: job.Inventory_Left,
      deadQuantity: job.Dead_Quantity
    }))
  });
});

test("filters jobs by site inclusion", async () => {
  const { auth, user } = await mockUser();
  const jobs = JobFactory.buildList(3);
  await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      locations: {
        mode: InclusivityMode.Include,
        list: ["site1", "site2"]
      }
    })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and ((Job_Posting_Group eq 'MKT PIGS') or (Job_Posting_Group eq 'SOWS') or (Job_Posting_Group eq 'GDU')) and ((Site eq 'site1') or (Site eq 'site2')))`
    })
    .basicAuth(auth)
    .reply(200, { value: jobs });

  await expect(query()).resolves.toEqual({
    pigActivityJobs: jobs.map(job => ({
      number: job.No,
      description: job.Description,
      inventory: job.Inventory_Left,
      deadQuantity: job.Dead_Quantity
    }))
  });
});

test("filters jobs by site exclusion", async () => {
  const { auth, user } = await mockUser();
  const jobs = JobFactory.buildList(3);
  await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      locations: {
        mode: InclusivityMode.Exclude,
        list: ["site1", "site2"]
      }
    })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and ((Job_Posting_Group eq 'MKT PIGS') or (Job_Posting_Group eq 'SOWS') or (Job_Posting_Group eq 'GDU')) and ((Site ne 'site1') and (Site ne 'site2')))`
    })
    .basicAuth(auth)
    .reply(200, { value: jobs });

  await expect(query()).resolves.toEqual({
    pigActivityJobs: jobs.map(job => ({
      number: job.No,
      description: job.Description,
      inventory: job.Inventory_Left,
      deadQuantity: job.Dead_Quantity
    }))
  });
});
