import faker from "faker";
import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../utils";
import { PigActivityQuery } from "../../resolvers/types";
import { JobFactory } from "../builders";

function query() {
  return client.request<PigActivityQuery>(
    `{
      pigActivityJobs {
        number
        description
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
      description: job.Description
    }))
  });
});
