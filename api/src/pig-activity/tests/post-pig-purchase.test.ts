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
  UserSettingsFactory,
  StandardJournalPurchaseFactory
} from "../../../test/builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "../../common/nav";
import { format } from "date-fns";
import UserSettingsModel from "../../common/models/UserSettings";
import PigPurchaseModel from "../models/PigPurchase";

function mutation(variables: MutationPostPigPurchaseArgs) {
  return client.request<PigPurchaseResult>(
    `mutation PostPigPurchase($input: PostPigPurchaseInput!) {
      postPigPurchase(input: $input) {
        success
        pigPurchase {
          job {
            number
          }
          quantity
          smallPigQuantity
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
  const input = PigPurchaseFactory.build({
    job: job.No,
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^PURCH${user.Full_Name.slice(0, 3)}${format(
      new Date(),
      "yyMMddHH"
    )}\\d{4}$`
  );

  const standardJournal = StandardJournalPurchaseFactory.build();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/StandardItemJournal`)
    .query({
      $filter: `((Journal_Template_Name eq 'PURCHASE') and (Standard_Journal_Code eq '${input.event}'))`
    })
    .basicAuth(auth)
    .reply(200, {
      value: [standardJournal]
    })
    .persist();

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      ...standardJournal,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Document_No: documentNumberRegex,
      Description: input.comments || " ",
      Location_Code: job.Site,
      Quantity: input.quantity,
      Weight: input.totalWeight,
      Job_No: input.job,
      Shortcut_Dimension_1_Code: job.Entity,
      Shortcut_Dimension_2_Code: job.Cost_Center,
      Meta: input.smallPigQuantity
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigPurchaseFactory.build()
  })
);

test("submits data to NAV and creates new user settings and purchase documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        totalWeight: null,
        smallPigQuantity: null,
        comments: null
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    UserSettingsModel.findOne(
      {
        username: user.User_Name
      },
      "pigJob"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything()
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
      pigJob: undefined
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    postPigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        smallPigQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    UserSettingsModel.findById(userSettings._id, "username pigJob").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: userSettings.pigJob
  });
});

test("submits data to NAV and clears existing purchase document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const purchaseDoc = await PigPurchaseModel.create({
    job: job.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        smallPigQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: null
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
    job: purchaseDoc.job
  });
});

test("sets description to an empty string if there are no comments", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: undefined
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigPurchase: {
      success: true,
      pigPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        smallPigQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: null
      }
    }
  });
});
