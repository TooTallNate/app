import { client, testUnauthenticated, mockUser } from "../utils";
import { FarrowingBackendScorecardQuery } from "../../resolvers/types";
import { JobFactory } from "../builders";
import nock = require("nock");

function query() {
  return client.request<FarrowingBackendScorecardQuery>(`
    {
      farrowingBackendScorecard {
        areas {
          number
          description
          personResponsible
        }
      }
    }
  `);
}

testUnauthenticated(query);

test("returns areas for the farrowing backend", async () => {
  const { auth } = await mockUser();
  const areas = JobFactory.buildList(3);

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and (Job_Posting_Group eq 'FARROW-BE'))`
    })
    .basicAuth(auth)
    .reply(200, { value: areas });

  await expect(query()).resolves.toEqual({
    farrowingBackendScorecard: {
      areas: areas.map(area => ({
        number: area.No,
        description: area.Description,
        personResponsible: area.Person_Responsible
      }))
    }
  });
});
