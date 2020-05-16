import faker from "faker";
import nock from "nock";
import { QueryPigMortalityArgs, PigMortality } from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../utils";
import { JobFactory } from "../builders";
import PigMortalityModel from "../../pig-activity/models/PigMortality";
import { PigMortalityFactory } from "../builders";

function query(variables: QueryPigMortalityArgs) {
  return client.request<PigMortality>(
    `query PigMortality($job: String!) {
      pigMortality(job: $job) {
        job {
          number
        }
        animal
        euthanizedQuantity
        naturalQuantity
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
    pigMortality: {
      job: {
        number: job.No
      },
      animal: null,
      comments: null,
      euthanizedQuantity: null,
      naturalQuantity: null
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await PigMortalityModel.create(
    PigMortalityFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    pigMortality: {
      job: {
        number: job.No
      },
      animal: doc.animal,
      comments: doc.comments,
      euthanizedQuantity: doc.euthanizedQuantity,
      naturalQuantity: doc.naturalQuantity
    }
  });
});
