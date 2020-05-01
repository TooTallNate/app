import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../utils";
import { Job } from "../../resolvers/types";
import { JobFactory } from "../builders";

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
