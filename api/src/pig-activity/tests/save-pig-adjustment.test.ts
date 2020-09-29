import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  PigAdjustmentResult,
  MutationPostPigAdjustmentArgs
} from "../../common/graphql";
import {
  PigAdjustmentFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import PigAdjustmentModel from "../models/PigAdjustment";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostPigAdjustmentArgs) {
  return client.request<PigAdjustmentResult>(
    `mutation SavePigAdjustment($input: SavePigAdjustmentInput!) {
      savePigAdjustment(input: $input) {
        success
        pigAdjustment {
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
  const input = PigAdjustmentFactory.build({
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
    input: PigAdjustmentFactory.build()
  })
);

test("creates new adjustment document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigAdjustment: {
      success: true,
      pigAdjustment: {
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
    PigAdjustmentModel.findOne(
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
  const adjustmentDoc = await PigAdjustmentModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigAdjustment: {
      success: true,
      pigAdjustment: {
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
    PigAdjustmentModel.findById(
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
