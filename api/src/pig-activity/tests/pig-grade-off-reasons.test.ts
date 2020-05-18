import faker from "faker";
import nock from "nock";
import { Reason } from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory, ReasonFactory } from "../../../test/builders";
import PigGradeOffModel from "../models/PigGradeOff";
import { PigGradeOffFactory } from "../../../test/builders";

function query() {
  return client.request<Reason[]>(
    `query PigGradeOffReasons {
      pigGradeOffReasons {
        code
        description
      }
    }`
  );
}

testUnauthenticated(query);

async function mockTestData() {
  const { user, auth } = await mockUser();
  const reasons = ReasonFactory.buildList(3);

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/ReasonCodes`)
    .query({
      $filter: `startswith(Code, 'GR-')`
    })
    .basicAuth(auth)
    .reply(200, { value: reasons })
    .persist();

  return { user, reasons };
}

test("reason codes for grade off", async () => {
  const { reasons } = await mockTestData();

  await expect(query()).resolves.toEqual({
    pigGradeOffReasons: reasons.map(reason => ({
      code: reason.Code,
      description: reason.Description
    }))
  });
});
