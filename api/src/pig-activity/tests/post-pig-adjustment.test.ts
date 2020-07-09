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
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "../../common/nav";
import { format } from "date-fns";
import PigAdjustmentModel from "../models/PigAdjustment";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostPigAdjustmentArgs) {
  return client.request<PigAdjustmentResult>(
    `mutation PostPigAdjustment($input: PostPigAdjustmentInput!) {
      postPigAdjustment(input: $input) {
        success
        pigAdjustment {
          job {
            number
          }
          animal
          quantity
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
  const job = JobFactory.build();
  const input = PigAdjustmentFactory.build({
    job: job.No,
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^ADJ${user.Full_Name.slice(0, 5)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.Adjustment,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Entry_Type:
        input.quantity >= 0 ? NavEntryType.Positive : NavEntryType.Negative,
      Document_No: documentNumberRegex,
      Item_No: input.animal,
      Description: input.comments || " ",
      Location_Code: job.Site,
      Quantity: Math.abs(input.quantity),
      Weight: input.totalWeight,
      Job_No: input.job,
      Shortcut_Dimension_1_Code: job.Entity,
      Shortcut_Dimension_2_Code: job.Cost_Center,
      Posting_Date: date,
      Document_Date: date,
      ...(input.quantity > 0 && { Unit_Amount: input.price })
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigAdjustmentFactory.build()
  })
);

test("submits data to NAV and creates new user settings and adjustment documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigAdjustment: {
      success: true,
      pigAdjustment: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        totalWeight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        pigList: []
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
    pigList: []
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
    job: job.No
  });
});

test("submits data to NAV and updates existing user settings document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const userSettings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigList: [
        {
          pigType: input.animal,
          price: faker.random.number({ min: 30, max: 150 })
        }
      ]
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    postPigAdjustment: {
      success: true,
      pigAdjustment: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        totalWeight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        pigList: userSettings.toObject().pigList
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob price").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: job.No,
    pigList: userSettings.toObject().pigList
  });
});

test("submits data to NAV and clears existing adjustment document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const adjustmentDoc = await PigAdjustmentModel.create({
    job: job.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigAdjustment: {
      success: true,
      pigAdjustment: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        totalWeight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        pigList: []
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
    job: job.No
  });
});

test("sets entry type to negative adjustment if quantity is negative", async () => {
  const { input, job } = await mockTestData({
    input: {
      quantity: faker.random.number({ min: -10, max: -1 })
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigAdjustment: {
      success: true,
      pigAdjustment: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        totalWeight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        pigList: []
      }
    }
  });
});

test("sets description to an empty string if there are no comments", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: undefined
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigAdjustment: {
      success: true,
      pigAdjustment: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        totalWeight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        pigList: []
      }
    }
  });
});
