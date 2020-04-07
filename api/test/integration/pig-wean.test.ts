import faker from "faker";
import nock from "nock";
import { QueryPigWeanArgs, PigWean } from "../../resolvers/types";
import { client, testUnauthenticated, mockUser } from "../utils";
import { JobFactory } from "../builders";
import PigWeanModel from "../../models/PigWean";
import { PigWeanFactory } from "../builders";

function query(variables: QueryPigWeanArgs) {
  return client.request<PigWean>(
    `query PigWean($job: String!) {
      pigWean(job: $job) {
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
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  return { user, job };
}

test("returns default form if no record in the database", async () => {
  const { job } = await mockTestData();

  await expect(query({ job: job.No })).resolves.toEqual({
    pigWean: {
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
  const doc = await PigWeanModel.create(
    PigWeanFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    pigWean: {
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
