import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockAdjustmentResult,
  MutationPostLivestockAdjustmentArgs
} from "../../common/graphql";
import {
  LivestockAdjustmentFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import LivestockAdjustmentModel from "../models/LivestockAdjustment";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostLivestockAdjustmentArgs) {
  return client.request<LivestockAdjustmentResult>(
    `mutation SaveLivestockAdjustment($input: SaveLivestockAdjustmentInput!) {
      saveLivestockAdjustment(input: $input) {
        success
        livestockAdjustment {
          job {
            number
          }
          quantity
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
  const job = JobFactory.build();
  const input = LivestockAdjustmentFactory.build({
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
    input: LivestockAdjustmentFactory.build()
  })
);

test("creates new adjustment document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockAdjustment: {
      success: true,
      livestockAdjustment: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        totalWeight: input.totalWeight,
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
    LivestockAdjustmentModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "adjustment",
    event: input.event,
    job: job.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});

test("updates existing adjustment document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const adjustmentDoc = await LivestockAdjustmentModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockAdjustment: {
      success: true,
      livestockAdjustment: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        totalWeight: input.totalWeight,
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
    LivestockAdjustmentModel.findById(
      adjustmentDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "adjustment",
    event: input.event,
    job: job.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});
