import faker from "faker";
import nock from "nock";
import {
  QueryLivestockGradeOffArgs,
  LivestockGradeOff
} from "../../common/graphql";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { JobFactory } from "../../../test/builders";
import LivestockGradeOffModel from "../models/LivestockGradeOff";
import { LivestockGradeOffFactory } from "../../../test/builders";

function query(variables: QueryLivestockGradeOffArgs) {
  return client.request<LivestockGradeOff>(
    `query LivestockGradeOff($job: String!) {
      livestockGradeOff(job: $job) {
        job {
          number
        }
        quantities {
          code
          quantity
        }
        livestockWeight
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
    livestockGradeOff: {
      job: {
        number: job.No
      },
      comments: null,
      quantities: [],
      livestockWeight: null
    }
  });
});

test("returns from from the database", async () => {
  const { job } = await mockTestData();
  const doc = await LivestockGradeOffModel.create(
    LivestockGradeOffFactory.build({
      job: job.No,
      comments: faker.random.words(2)
    })
  );

  await expect(query({ job: job.No })).resolves.toEqual({
    livestockGradeOff: {
      job: {
        number: job.No
      },
      comments: doc.comments,
      quantities: Array.from(doc.toObject().quantities),
      livestockWeight: doc.livestockWeight
    }
  });
});
