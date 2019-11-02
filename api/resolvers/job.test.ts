import { login, expectUnauthorized, navMock } from "../test/utils";
import { jobsQuery } from "../test/gql";

describe("jobs query", () => {
  test("returns error if not logged in", () => expectUnauthorized(jobsQuery));

  test.only("returns job info for each job", async () => {
    await login();
    const { data, errors } = await jobsQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      jobs: navMock.jobs.map(j => ({
        number: j.No,
        site: j.Site,
        dimensions: {
          costCenter: navMock.dimensions.find(
            dim =>
              dim.Table_ID === 167 &&
              dim.No === j.No &&
              dim.Dimension_Code === "COST CENTER"
          ).Dimension_Value_Code,
          entity: navMock.dimensions.find(
            dim =>
              dim.Table_ID === 167 &&
              dim.No === j.No &&
              dim.Dimension_Code === "ENTITY"
          ).Dimension_Value_Code
        }
      }))
    });
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
        .map(j => ({
          number: j.No,
          site: j.Site,
          dimensions: {
            costCenter: navMock.dimensions.find(
              dim =>
                dim.Table_ID === 167 &&
                dim.No === j.No &&
                dim.Dimension_Code === "COST CENTER"
            ).Dimension_Value_Code,
            entity: navMock.dimensions.find(
              dim =>
                dim.Table_ID === 167 &&
                dim.No === j.No &&
                dim.Dimension_Code === "ENTITY"
            ).Dimension_Value_Code
          }
        }))
    });
  });
});
