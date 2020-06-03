import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  PigPurchaseResult,
  MutationPostPigPurchaseArgs
} from "../../common/graphql";
import {
  PigPurchaseFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import PigPurchaseModel from "../models/PigPurchase";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostPigPurchaseArgs) {
  return client.request<PigPurchaseResult>(
    `mutation SavePigPurchase($input: SavePigPurchaseInput!) {
      savePigPurchase(input: $input) {
        success
        pigPurchase {
          job {
            number
          }
          animal
          quantity
          smallPigQuantity
          totalWeight
          price
          comments
        }
        defaults { 
          job {
            number
          }
          price
        }
      }
    }`,
    variables
  );
}

async function mockTestData({ input: inputOverrides = {} } = {}) {
  const { user, auth } = await mockUser();
  const job = JobFactory.build();
  const input = PigPurchaseFactory.build({
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
    input: PigPurchaseFactory.build()
  })
);

test("creates new purchase and user settings documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: null,
        price: input.price
      }
    }
  });

  await expect(
    UserSettingsModel.findOne(
      {
        username: user.User_Name
      },
      "pigJob price"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    price: input.price
  });

  await expect(
    PigPurchaseModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "purchase",
    job: job.No,
    animal: input.animal,
    quantity: input.quantity,
    smallPigQuantity: input.smallPigQuantity,
    totalWeight: input.totalWeight,
    price: input.price,
    comments: input.comments
  });
});

test("updates existing purchase document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const purchaseDoc = await PigPurchaseModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: null,
        price: input.price
      }
    }
  });

  await expect(
    PigPurchaseModel.findById(
      purchaseDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "purchase",
    job: job.No,
    animal: input.animal,
    quantity: input.quantity,
    smallPigQuantity: input.smallPigQuantity,
    totalWeight: input.totalWeight,
    price: input.price,
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
      pigJob: undefined,
      username: user.User_Name
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: null,
        price: input.price
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    price: input.price
  });
});

test("does not update price in user settings if not given in input", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      price: undefined,
      comments: faker.lorem.words(3)
    }
  });
  const userSettings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      pigJob: undefined,
      username: user.User_Name
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: null,
        comments: input.comments
      },
      defaults: {
        job: null,
        price: userSettings.price
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    price: userSettings.price
  });
});
