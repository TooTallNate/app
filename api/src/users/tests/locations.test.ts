import nock from "nock";
import { client, mockUser, testUnauthenticated } from "../../../test/utils";
import { Location } from "../../common/graphql";
import { LocationFactory } from "../../../test/builders";

function query() {
  return client.request<Location[]>(
    `query Locations {
      locations {
        code
        name
      }
    }`
  );
}

testUnauthenticated(query);

test("returns locations from NAV", async () => {
  const { auth } = await mockUser();
  const locations = LocationFactory.buildList(6);

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Locations`)
    .basicAuth(auth)
    .reply(200, locations);

  await expect(query()).resolves.toEqual({
    locations: locations.map(loc => ({
      name: loc.Name,
      code: loc.Code
    }))
  });
});
