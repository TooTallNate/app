import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockMoveResult,
  MutationPostLivestockMoveArgs
} from "../../common/graphql";
import {
  LivestockMoveFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import LivestockMoveModel from "../models/LivestockMove";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostLivestockMoveArgs) {
  return client.request<LivestockMoveResult>(
    `mutation SaveLivestockMove($input: SaveLivestockMoveInput!) {
      saveLivestockMove(input: $input) {
        success
        livestockMove {
          fromJob {
            number
          }
          toJob {
            number
          }
          quantity
          smallLivestockQuantity
          totalWeight
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
  const fromJob = JobFactory.build();
  const toJob = JobFactory.build();
  const input = LivestockMoveFactory.build({
    fromJob: fromJob.No,
    toJob: toJob.No,
    ...inputOverrides
  });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${fromJob.No}%27)`)
    .basicAuth(auth)
    .reply(200, fromJob)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${toJob.No}%27)`)
    .basicAuth(auth)
    .reply(200, toJob)
    .persist();

  return { user, fromJob, toJob, input };
}

testUnauthenticated(() =>
  mutation({
    input: LivestockMoveFactory.build()
  })
);

test("creates new move and user settings documents", async () => {
  const { input, fromJob, toJob, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockMove: {
      success: true,
      livestockMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
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
    livestockJob: fromJob.No
  });

  await expect(
    LivestockMoveModel.findOne(
      {
        fromJob: fromJob.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "move",
    event: input.event,
    fromJob: fromJob.No,
    toJob: toJob.No,
    quantity: input.quantity,
    smallLivestockQuantity: input.smallLivestockQuantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});

test("updates existing move document", async () => {
  const { input, fromJob, toJob } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const moveDoc = await LivestockMoveModel.create({
    fromJob: fromJob.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockMove: {
      success: true,
      livestockMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
        }
      }
    }
  });

  await expect(
    LivestockMoveModel.findById(
      moveDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "move",
    event: input.event,
    fromJob: fromJob.No,
    toJob: toJob.No,
    quantity: input.quantity,
    smallLivestockQuantity: input.smallLivestockQuantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});

test("updates existing user settings document", async () => {
  const { input, fromJob, toJob, user } = await mockTestData({
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
    saveLivestockMove: {
      success: true,
      livestockMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
        }
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username livestockJob").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    livestockJob: fromJob.No
  });
});
