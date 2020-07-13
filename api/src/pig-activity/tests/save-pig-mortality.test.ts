import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  PigMortalityResult,
  MutationPostPigMortalityArgs
} from "../../common/graphql";
import {
  PigMortalityFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import PigMortalityModel from "../models/PigMortality";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostPigMortalityArgs) {
  return client.request<PigMortalityResult>(
    `mutation SavePigMortality($input: SavePigMortalityInput!) {
      savePigMortality(input: $input) {
        success
        pigMortality {
          job {
            number
          }
          animal
          naturalQuantity
          euthanizedQuantity
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
  const input = PigMortalityFactory.build({
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
    input: PigMortalityFactory.build()
  })
);

test("creates new mortality and user settings documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: input.animal,
        naturalQuantity: input.naturalQuantity,
        euthanizedQuantity: input.euthanizedQuantity,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
        prices: []
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
    pigJob: job.No,
    prices: []
  });

  await expect(
    PigMortalityModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "mortality",
    job: job.No,
    animal: input.animal,
    naturalQuantity: input.naturalQuantity,
    euthanizedQuantity: input.euthanizedQuantity,
    comments: input.comments
  });
});

test("updates existing mortality document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const mortalityDoc = await PigMortalityModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: input.animal,
        naturalQuantity: input.naturalQuantity,
        euthanizedQuantity: input.euthanizedQuantity,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
        prices: []
      }
    }
  });

  await expect(
    PigMortalityModel.findById(
      mortalityDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "mortality",
    job: job.No,
    animal: input.animal,
    naturalQuantity: input.naturalQuantity,
    euthanizedQuantity: input.euthanizedQuantity,
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
    savePigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: input.animal,
        naturalQuantity: input.naturalQuantity,
        euthanizedQuantity: input.euthanizedQuantity,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
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
    pigJob: job.No,
    prices: userSettings.toObject().prices
  });
});
