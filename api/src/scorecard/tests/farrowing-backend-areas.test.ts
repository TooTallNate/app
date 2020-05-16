import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { Job } from "../../common/graphql";
import { JobFactory, ResourceFactory } from "../../../test/builders";
import nock = require("nock");

interface QueryResult {
  farrowingBackendAreas: Job[];
}

function query() {
  return client.request<QueryResult>(`
    {
      farrowingBackendAreas {
        number
        description
        personResponsible {
          name
          number
        }
      }
    }
  `);
}

testUnauthenticated(query);

test("returns areas for the farrowing backend", async () => {
  const { auth } = await mockUser();
  const resources = ResourceFactory.buildList(3);
  const areas = JobFactory.buildList(3);
  areas.forEach((area, i) => (area.Person_Responsible = resources[i].No));

  resources.forEach(resource =>
    nock(process.env.NAV_BASE_URL)
      .get(
        `/Company(%27${process.env.NAV_COMPANY}%27)/Resources(%27${resource.No}%27)`
      )
      .basicAuth(auth)
      .reply(200, resource)
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs`)
    .query({
      $filter: `((Status eq 'Open') and (Job_Posting_Group eq 'FARROW-BE'))`
    })
    .basicAuth(auth)
    .reply(200, { value: areas });

  await expect(query()).resolves.toEqual({
    farrowingBackendAreas: areas.map((area, i) => ({
      number: area.No,
      description: area.Description,
      personResponsible: {
        name: resources[i].Name,
        number: resources[i].No
      }
    }))
  });
});
