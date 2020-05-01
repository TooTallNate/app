import nock from "nock";
import { client, testUnauthenticated, mockUser } from "../utils";
import { NavAnimal } from "../../nav";
import { Animal } from "../../resolvers/types";

interface QueryResult {
  pigTypes: Animal[];
}

function query() {
  return client.request<QueryResult>(
    `{
      pigTypes {
        number
        description
      }
    }`
  );
}

testUnauthenticated(query);

test("returns pig animals", async () => {
  const { auth } = await mockUser();
  const animals: NavAnimal[] = [
    {
      No: "01",
      Description: "Market Hogs"
    },
    {
      No: "02",
      Description: "GDU Pigs"
    }
  ];

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/PigTypes`)
    .basicAuth(auth)
    .reply(200, { value: animals });

  await expect(query()).resolves.toEqual({
    pigTypes: animals.map(animal => ({
      number: animal.No,
      description: animal.Description
    }))
  });
});
