import faker from "faker";
import nock from "nock";
import { QueryPigMoveArgs, PigMove } from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory } from "../../../test/builders";
import PigMoveModel from "../models/PigMove";
import { PigMoveFactory } from "../../../test/builders";

function query(variables: QueryPigMoveArgs) {
  return client.request<PigMove>(
    `query PigMove($job: String!) {
      pigMove(job: $job) {
        fromJob {
          number
        }
        toJob {
          number
        }
        quantity
        smallPigQuantity
        totalWeight
        comments
      }
    }`,
    variables
  );
}

testUnauthenticated(() => query({ job: `job_${faker.random.word()}` }));

async function mockTestData() {
  const { user, auth } = await mockUser();
  const fromJob = JobFactory.build();
  const toJob = JobFactory.build();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${fromJob.No}%27)`)
    .basicAuth(auth)
    .reply(200, fromJob)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${toJob.No}%27)`)
    .basicAuth(auth)
    .reply(200, toJob)
    .persist();

  return { user, fromJob, toJob };
}

test("returns default form if no record in the database", async () => {
  const { fromJob } = await mockTestData();

  await expect(query({ job: fromJob.No })).resolves.toEqual({
    pigMove: {
      fromJob: {
        number: fromJob.No
      },
      toJob: null,
      comments: null,
      quantity: null,
      smallPigQuantity: null,
      totalWeight: null
    }
  });
});

test("returns from from the database", async () => {
  const { fromJob, toJob } = await mockTestData();
  const doc = await PigMoveModel.create(
    PigMoveFactory.build({
      fromJob: fromJob.No,
      toJob: toJob.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: fromJob.No })).resolves.toEqual({
    pigMove: {
      fromJob: {
        number: fromJob.No
      },
      toJob: {
        number: toJob.No
      },
      comments: doc.comments,
      quantity: doc.quantity,
      smallPigQuantity: doc.smallPigQuantity,
      totalWeight: doc.totalWeight
    }
  });
});
