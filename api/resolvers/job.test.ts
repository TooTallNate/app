import { login, expectUnauthorized, navMock } from "../test/utils";
import { jobsQuery } from "../test/gql";

describe("jobs query", () => {
  test("returns error if not logged in", () => expectUnauthorized(jobsQuery));

  test("returns job info for each job", async () => {
    await login();
    const { data, errors } = await jobsQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      jobs: navMock.jobs.map(j => ({ number: j.No, site: j.Site }))
    });
    expect(navMock.getJobs).toHaveBeenCalledWith(
      { Status: undefined, Job_Posting_Group: undefined },
      expect.objectContaining(navMock.credentials)
    );
  });

  test("can filter results", async () => {
    await login();
    const { data, errors } = await jobsQuery({
      input: {
        status: ["Open"],
        postingGroup: ["SOWS"]
      }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      jobs: navMock.jobs
        .filter(
          job => job.Job_Posting_Group === "SOWS" && job.Status === "Open"
        )
        .map(j => ({ number: j.No, site: j.Site }))
    });
    expect(navMock.getJobs).toHaveBeenCalledWith(
      { Status: ["Open"], Job_Posting_Group: ["SOWS"] },
      expect.objectContaining(navMock.credentials)
    );
  });
});
