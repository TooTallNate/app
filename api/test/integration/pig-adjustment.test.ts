import faker from "faker";
import nock from "nock";
import { QueryPigAdjustmentArgs, PigAdjustment } from "../../resolvers/types";
import { client, testUnauthenticated, mockUser } from "../utils";
import { JobFactory } from "../builders";
import PigAdjustmentModel from "../../models/PigAdjustment";
import { PigAdjustmentFactory } from "../builders";

function query(variables: QueryPigAdjustmentArgs) {
  return client.request<PigAdjustment>(
    `query PigAdjustment($job: String!) {
      pigAdjustment(job: $job) {
        job {
          number
        }
        animal
        quantity
        weight
        price
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
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs2(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  return { user, job };
}

test("returns default form if no record in the database", async () => {
  const { job } = await mockTestData();

  await expect(query({ job: job.No })).resolves.toEqual({
    pigAdjustment: {
      job: {
        number: job.No
      },
      animal: null,
      comments: null,
      price: null,
      quantity: null,
      weight: null
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await PigAdjustmentModel.create(
    PigAdjustmentFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    pigAdjustment: {
      job: {
        number: job.No
      },
      animal: doc.animal,
      comments: doc.comments,
      price: doc.price,
      quantity: doc.quantity,
      weight: doc.weight
    }
  });
});
