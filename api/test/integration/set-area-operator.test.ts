import nock from "nock";
import faker from "faker";
import { client, mockUser, testUnauthenticated } from "../utils";
import {
  MutationSetAreaOperatorArgs,
  SetAreaOperatorResult
} from "../../resolvers/types";
import { NavJob } from "../../nav";
import { JobFactory, ResourceFactory } from "../builders";

function mutation(variables: MutationSetAreaOperatorArgs) {
  return client.request<SetAreaOperatorResult>(
    `mutation Login($input: SetAreaOperatorInput!) {
      setAreaOperator(input: $input) {
        success
        area {
          number
          description
          personResponsible {
            name
            number
          }
        }
      }
    }`,
    variables
  );
}

testUnauthenticated(() =>
  mutation({
    input: {
      area: `area_${faker.random.alphaNumeric(8)}`,
      operator: `operator_${faker.random.alphaNumeric(8)}`
    }
  })
);

test("returns updated area", async () => {
  const { auth } = await mockUser();
  const area = JobFactory.build();
  const operator = ResourceFactory.build();
  const updatedArea: NavJob = {
    ...area,
    Person_Responsible: operator.No
  };
  const etag = `etag_${faker.random.alphaNumeric(12)}`;

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs2(%27${area.No}%27)`)
    .basicAuth(auth)
    .reply(200, {
      "@odata.etag": etag,
      ...area
    });
  nock(process.env.NAV_BASE_URL)
    .patch(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Jobs2(%27${area.No}%27)`,
      { Person_Responsible: operator.No }
    )
    .matchHeader("if-match", etag)
    .basicAuth(auth)
    .reply(200, updatedArea);
  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Resources(%27${operator.No}%27)`
    )
    .basicAuth(auth)
    .reply(200, operator);

  await expect(
    mutation({ input: { area: area.No, operator: operator.No } })
  ).resolves.toEqual({
    setAreaOperator: {
      success: true,
      area: {
        number: area.No,
        description: area.Description,
        personResponsible: {
          number: operator.No,
          name: operator.Name
        }
      }
    }
  });
});
