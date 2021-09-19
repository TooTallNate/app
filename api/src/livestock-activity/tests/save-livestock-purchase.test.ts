import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockPurchaseResult,
  MutationPostLivestockPurchaseArgs
} from "../../common/graphql";
import {
  LivestockPurchaseFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import LivestockPurchaseModel from "../models/LivestockPurchase";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostLivestockPurchaseArgs) {
  return client.request<LivestockPurchaseResult>(
    `mutation SaveLivestockPurchase($input: SaveLivestockPurchaseInput!) {
      saveLivestockPurchase(input: $input) {
        success
        livestockPurchase {
          job {
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
  const job = JobFactory.build();
  const input = LivestockPurchaseFactory.build({
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
    input: LivestockPurchaseFactory.build()
  })
);

test("creates new user settings document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    LivestockPurchaseModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "purchase",
    event: input.event,
    job: job.No,
    quantity: input.quantity,
    smallLivestockQuantity: input.smallLivestockQuantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});

test("updates existing purchase document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const purchaseDoc = await LivestockPurchaseModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    LivestockPurchaseModel.findById(
      purchaseDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "purchase",
    event: input.event,
    job: job.No,
    quantity: input.quantity,
    smallLivestockQuantity: input.smallLivestockQuantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});

test("updates existing user settings document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const userSettings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      livestockJob: undefined,
      username: user.User_Name
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username livestockJob").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name
  });
});
