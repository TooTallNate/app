import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockGradeOffResult,
  MutationPostLivestockGradeOffArgs
} from "../../common/graphql";
import {
  LivestockGradeOffFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import LivestockGradeOffModel from "../models/LivestockGradeOff";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostLivestockGradeOffArgs) {
  return client.request<LivestockGradeOffResult>(
    `mutation SaveLivestockGradeOff($input: SaveLivestockGradeOffInput!) {
      saveLivestockGradeOff(input: $input) {
        success
        livestockGradeOff {
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
        defaults { 
          job {
            number
          }
        }
      }
    }`,
    variables
  );
}

async function mockTestData({ input: inputOverrides = {} } = {}) {
  const { user, auth } = await mockUser();
  const job = JobFactory.build();
  const input = LivestockGradeOffFactory.build({
    job: job.No,
    ...inputOverrides
  });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: LivestockGradeOffFactory.build()
  })
);

test("creates new gradeOff and user settings documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockGradeOff: {
      success: true,
      livestockGradeOff: {
        job: {
          number: job.No
        },
        quantities: input.quantities,
        livestockWeight: input.livestockWeight,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        }
      }
    }
  });

  await expect(
    UserSettingsModel.findOne(
      {
        username: user.User_Name
      },
      "livestockJob"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    livestockJob: job.No
  });

  await expect(
    LivestockGradeOffModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    event: input.event,
    activity: "gradeoff",
    job: job.No,
    quantities: input.quantities,
    livestockWeight: input.livestockWeight,
    comments: input.comments
  });
});

test("updates existing gradeOff document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const gradeOffDoc = await LivestockGradeOffModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockGradeOff: {
      success: true,
      livestockGradeOff: {
        job: {
          number: job.No
        },
        quantities: input.quantities,
        livestockWeight: input.livestockWeight,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        }
      }
    }
  });

  await expect(
    LivestockGradeOffModel.findById(
      gradeOffDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    event: input.event,
    activity: "gradeoff",
    job: job.No,
    quantities: input.quantities,
    livestockWeight: input.livestockWeight,
    comments: input.comments
  });
});

//How would you update the userSettings price if there is no price in the input?
test("updates existing user settings document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const userSettings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockGradeOff: {
      success: true,
      livestockGradeOff: {
        job: {
          number: job.No
        },
        quantities: input.quantities,
        livestockWeight: input.livestockWeight,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        }
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username livestockJob").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    livestockJob: job.No
  });
});
