import faker from "faker";
import nock from "nock";
import { QueryPigGradeOffArgs, PigGradeOff } from "../../resolvers/types";
import { client, testUnauthenticated, mockUser } from "../utils";
import { JobFactory } from "../builders";
import PigGradeOffModel from "../../pig-activity/models/PigGradeOff";
import { PigGradeOffFactory } from "../builders";

function query(variables: QueryPigGradeOffArgs) {
  return client.request<PigGradeOff>(
    `query PigGradeOff($job: String!) {
      pigGradeOff(job: $job) {
        job {
          number
        }
        animal
        quantities {
          code
          quantity
        }
        pigWeight
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
    pigGradeOff: {
      job: {
        number: job.No
      },
      animal: null,
      comments: null,
      quantities: [],
      pigWeight: null
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await PigGradeOffModel.create(
    PigGradeOffFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    pigGradeOff: {
      job: {
        number: job.No
      },
      animal: doc.animal,
      comments: doc.comments,
      quantities: Array.from(doc.toObject().quantities),
      pigWeight: doc.pigWeight
    }
  });
});
