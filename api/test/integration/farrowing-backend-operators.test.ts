import { client, testUnauthenticated, mockUser } from "../utils";
import { Resource } from "../../resolvers/types";
import { ResourceFactory } from "../builders";
import nock = require("nock");

interface QueryResult {
  farrowingBackendOperators: Resource[];
}

function query() {
  return client.request<QueryResult>(`
    query FarrowingBackendOperators {
      farrowingBackendOperators {
        name
        number
      }
    }
  `);
}

testUnauthenticated(query);

test("returns areas for the farrowing backend", async () => {
  const { auth } = await mockUser();
  const resources = ResourceFactory.buildList(3);

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Resources`)
    .query({
      $filter: `(Resource_Group_No eq 'FARROW-BE')`
    })
    .basicAuth(auth)
    .reply(200, { value: resources });

  await expect(query()).resolves.toEqual({
    farrowingBackendOperators: resources.map(resource => ({
      name: resource.Name,
      number: resource.No
    }))
  });
});
