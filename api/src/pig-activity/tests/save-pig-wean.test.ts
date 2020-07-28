import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { PigWeanResult, MutationPostPigWeanArgs } from "../../common/graphql";
import {
  PigWeanFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import PigWeanModel from "../models/PigWean";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostPigWeanArgs) {
  return client.request<PigWeanResult>(
    `mutation SavePigWean($input: SavePigWeanInput!) {
      savePigWean(input: $input) {
        success
        pigWean {
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
          prices {
            animal
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
  const job = JobFactory.build();
  const input = PigWeanFactory.build({
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
    input: PigWeanFactory.build()
  })
);

test("creates new wean and user settings documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigWean: {
      success: true,
      pigWean: {
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
        prices: [
          {
            animal: input.animal,
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
      "pigJob prices"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    prices: [
      {
        animal: input.animal,
        price: input.price
      }
    ]
  });

  await expect(
    PigWeanModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "wean",
    event: input.event,
    job: job.No,
    animal: input.animal,
    quantity: input.quantity,
    smallPigQuantity: input.smallPigQuantity,
    totalWeight: input.totalWeight,
    price: input.price,
    comments: input.comments
  });
});

test("updates existing wean document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const weanDoc = await PigWeanModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigWean: {
      success: true,
      pigWean: {
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
        prices: [
          {
            animal: input.animal,
            price: input.price
          }
        ]
      }
    }
  });

  await expect(
    PigWeanModel.findById(weanDoc._id, "-__v -createdAt -updatedAt").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "wean",
    event: input.event,
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
      username: user.User_Name,
      prices: [
        {
          animal: input.animal,
          price: faker.random.number({ min: 30, max: 150 })
        }
      ]
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigWean: {
      success: true,
      pigWean: {
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
        prices: [
          {
            animal: input.animal,
            price: input.price
          }
        ]
      }
    }
  });

  await expect(
    UserSettingsModel.findById(
      userSettings._id,
      "username pigJob prices"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    prices: [
      {
        animal: input.animal,
        price: input.price
      }
    ]
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
      username: user.User_Name,
      prices: [
        {
          animal: input.animal,
          price: faker.random.number({ min: 30, max: 150 })
        }
      ]
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigWean: {
      success: true,
      pigWean: {
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
        prices: userSettings.toObject().prices
      }
    }
  });

  await expect(
    UserSettingsModel.findById(
      userSettings._id,
      "username pigJob prices"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    prices: userSettings.toObject().prices
  });
});
