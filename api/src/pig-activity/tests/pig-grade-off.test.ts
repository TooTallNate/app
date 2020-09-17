import faker from "faker";
import nock from "nock";
import { QueryPigGradeOffArgs, PigGradeOff } from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory } from "../../../test/builders";
import PigGradeOffModel from "../models/PigGradeOff";
import { PigGradeOffFactory } from "../../../test/builders";

function query(variables: QueryPigGradeOffArgs) {
  return client.request<PigGradeOff>(
    `query PigGradeOff($job: String!) {
      pigGradeOff(job: $job) {
        job {
          number
        }
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
      comments: doc.comments,
      quantities: Array.from(doc.toObject().quantities),
      pigWeight: doc.pigWeight
    }
  });
});
