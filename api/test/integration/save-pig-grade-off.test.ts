import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../utils";
import {
  PostPigGradeOffResult,
  MutationPostPigGradeOffArgs
} from "../../resolvers/types";
import {
  PigGradeOffFactory,
  JobFactory,
  UserSettingsFactory
} from "../builders";
import PigGradeOffModel from "../../models/PigGradeOff";
import UserSettingsModel from "../../models/UserSettings";

function mutation(variables: MutationPostPigGradeOffArgs) {
  return client.request<PostPigGradeOffResult>(
    `mutation SavePigGradeOff($input: SavePigGradeOffInput!) {
      savePigGradeOff(input: $input) {
        success
        pigGradeOff {
          job {
            number
          }
          animal
          quantity
          weight
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
  const input = PigGradeOffFactory.build({
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
    input: PigGradeOffFactory.build()
  })
);

test("creates new gradeOff and user settings documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        weight: input.weight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
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
    pigJob: job.No,
    price: input.price
  });

  await expect(
    PigGradeOffModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "gradeoff",
    job: job.No,
    animal: input.animal,
    quantity: input.quantity,
    weight: input.weight,
    price: input.price,
    comments: input.comments
  });
});

test("updates existing gradeOff document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const gradeOffDoc = await PigGradeOffModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    savePigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        weight: input.weight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
        price: input.price
      }
    }
  });

  await expect(
    PigGradeOffModel.findById(
      gradeOffDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "gradeoff",
    job: job.No,
    animal: input.animal,
    quantity: input.quantity,
    weight: input.weight,
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
      username: user.User_Name
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        weight: input.weight,
        price: input.price,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
        price: input.price
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: job.No,
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
      username: user.User_Name
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    savePigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: input.animal,
        quantity: input.quantity,
        weight: input.weight,
        price: null,
        comments: input.comments
      },
      defaults: {
        job: {
          number: job.No
        },
        price: userSettings.price
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: job.No,
    price: userSettings.price
  });
});