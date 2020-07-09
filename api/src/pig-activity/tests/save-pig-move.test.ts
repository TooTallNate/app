import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { PigMoveResult, MutationPostPigMoveArgs } from "../../common/graphql";
import {
  PigMoveFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import PigMoveModel from "../models/PigMove";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostPigMoveArgs) {
  return client.request<PigMoveResult>(
    `mutation SavePigMove($input: SavePigMoveInput!) {
      savePigMove(input: $input) {
        success
        pigMove {
          fromJob {
            number
          }
          toJob {
            number
          }
          fromAnimal
          toAnimal
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
          pigList {
            pigType
            price
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
  const input = PigMoveFactory.build({
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
    input: PigMoveFactory.build()
  })
);

test("creates new move and user settings documents", async () => {
  const { input, fromJob, toJob, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        fromAnimal: input.fromAnimal,
        toAnimal: input.toAnimal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
        },
        pigList: [
          {
            pigType: input.fromAnimal,
            price: input.price
          }
        ]
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
    pigJob: fromJob.No,
    pigList: [
      {
        pigType: input.fromAnimal,
        price: input.price
      }
    ]
  });

  await expect(
    PigMoveModel.findOne(
      {
        fromJob: fromJob.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "move",
    fromJob: fromJob.No,
    toJob: toJob.No,
    fromAnimal: input.fromAnimal,
    toAnimal: input.toAnimal,
    quantity: input.quantity,
    smallPigQuantity: input.smallPigQuantity,
    totalWeight: input.totalWeight,
    price: input.price,
    comments: input.comments
  });
});

test("updates existing move document", async () => {
  const { input, fromJob, toJob } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const moveDoc = await PigMoveModel.create({
    fromJob: fromJob.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        fromAnimal: input.fromAnimal,
        toAnimal: input.toAnimal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
        },
        pigList: [
          {
            pigType: input.fromAnimal,
            price: input.price
          }
        ]
      }
    }
  });

  await expect(
    PigMoveModel.findById(moveDoc._id, "-__v -createdAt -updatedAt").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "move",
    fromJob: fromJob.No,
    toJob: toJob.No,
    fromAnimal: input.fromAnimal,
    toAnimal: input.toAnimal,
    quantity: input.quantity,
    smallPigQuantity: input.smallPigQuantity,
    totalWeight: input.totalWeight,
    price: input.price,
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
    savePigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        fromAnimal: input.fromAnimal,
        toAnimal: input.toAnimal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
        },
        pigList: [
          {
            pigType: input.fromAnimal,
            price: input.price
          }
        ]
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: fromJob.No,
    pigList: [
      {
        pigType: input.fromAnimal,
        price: input.price
      }
    ]
  });
});

test("does not update price in user settings if not given in input", async () => {
  const { input, fromJob, toJob, user } = await mockTestData({
    input: {
      price: undefined,
      comments: faker.lorem.words(3)
    }
  });
  const userSettings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigList: [
        {
          pigType: input.fromAnimal,
          price: faker.random.number({ min: 30, max: 150 })
        }
      ]
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: {
          number: toJob.No
        },
        fromAnimal: input.fromAnimal,
        toAnimal: input.toAnimal,
        quantity: input.quantity,
        smallPigQuantity: input.smallPigQuantity,
        totalWeight: input.totalWeight,
        price: null,
        comments: input.comments
      },
      defaults: {
        job: {
          number: fromJob.No
        },
        pigList: [
          {
            pigType: input.fromAnimal,
            price: userSettings.price
          }
        ]
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: fromJob.No,
    pigList: [
      {
        pigType: input.fromAnimal,
        price: userSettings.price
      }
    ]
  });
});
