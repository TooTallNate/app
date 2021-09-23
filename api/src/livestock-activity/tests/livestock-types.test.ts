import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { NavItem } from "../../common/nav";
import { Item } from "../../common/graphql";

interface QueryResult {
  animals: Item[];
}

function query() {
  return client.request<QueryResult>(
    `{
      animals {
        number
        description
      }
    }`
  );
}

testUnauthenticated(query);

test("returns livestock animals", async () => {
  const { auth } = await mockUser();
  const animals: NavItem[] = [
    {
      No: "01",
      Description: "Market Hogs"
    },
    {
      No: "02",
      Description: "GDU Livestocks"
    }
  ];

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Items`)
    .query({
      $select: "No, Description",
      $filter: `((Gen_Prod_Posting_Group eq 'SOWS') or (Gen_Prod_Posting_Group eq 'MARKET HOGS'))`
    })
    .basicAuth(auth)
    .reply(200, { value: animals });

  await expect(query()).resolves.toEqual({
    animals: animals.map(animal => ({
      number: animal.No,
      description: animal.Description
    }))
  });
});
