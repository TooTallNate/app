import faker from "faker";
import nock from "nock";
import {
  QueryLivestockMortalityArgs,
  LivestockMortality
} from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory } from "../../../test/builders";
import LivestockMortalityModel from "../models/LivestockMortality";
import { LivestockMortalityFactory } from "../../../test/builders";

function query(variables: QueryLivestockMortalityArgs) {
  return client.request<LivestockMortality>(
    `query LivestockMortality($job: String!) {
      livestockMortality(job: $job) {
        job {
          number
        }
        quantities {
          code
          quantity
        }
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
    livestockMortality: {
      job: {
        number: job.No
      },
      comments: null,
      quantities: []
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await LivestockMortalityModel.create(
    LivestockMortalityFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    livestockMortality: {
      job: {
        number: job.No
      },
      quantities: Array.from(doc.toObject().quantities),
      comments: doc.comments
    }
  });
});
