import faker from "faker";
import nock from "nock";
import {
  QueryLivestockPurchaseArgs,
  LivestockPurchase
} from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory } from "../../../test/builders";
import LivestockPurchaseModel from "../models/LivestockPurchase";
import { LivestockPurchaseFactory } from "../../../test/builders";

function query(variables: QueryLivestockPurchaseArgs) {
  return client.request<LivestockPurchase>(
    `query LivestockPurchase($job: String!) {
      livestockPurchase(job: $job) {
        job {
          number
        }
        quantity
        smallLivestockQuantity
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
    livestockPurchase: {
      job: {
        number: job.No
      },
      comments: null,
      quantity: null,
      smallLivestockQuantity: null,
      totalWeight: null
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await LivestockPurchaseModel.create(
    LivestockPurchaseFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    livestockPurchase: {
      job: {
        number: job.No
      },
      comments: doc.comments,
      quantity: doc.quantity,
      smallLivestockQuantity: doc.smallLivestockQuantity,
      totalWeight: doc.totalWeight
    }
  });
});
