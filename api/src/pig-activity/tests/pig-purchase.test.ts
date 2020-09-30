import faker from "faker";
import nock from "nock";
import { QueryPigPurchaseArgs, PigPurchase } from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory } from "../../../test/builders";
import PigPurchaseModel from "../models/PigPurchase";
import { PigPurchaseFactory } from "../../../test/builders";

function query(variables: QueryPigPurchaseArgs) {
  return client.request<PigPurchase>(
    `query PigPurchase($job: String!) {
      pigPurchase(job: $job) {
        job {
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
  const job = JobFactory.build();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  return { user, job };
}

test("returns default form if no record in the database", async () => {
  const { job } = await mockTestData();

  await expect(query({ job: job.No })).resolves.toEqual({
    pigPurchase: {
      job: {
        number: job.No
      },
      comments: null,
      quantity: null,
      smallPigQuantity: null,
      totalWeight: null
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await PigPurchaseModel.create(
    PigPurchaseFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    pigPurchase: {
      job: {
        number: job.No
      },
      comments: doc.comments,
      quantity: doc.quantity,
      smallPigQuantity: doc.smallPigQuantity,
      totalWeight: doc.totalWeight
    }
  });
});
