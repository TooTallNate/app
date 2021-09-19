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
import LivestockPurchaseModel from "../models/LivestockPurchase";

function mutation(variables: MutationPostLivestockPurchaseArgs) {
  return client.request<LivestockPurchaseResult>(
    `mutation PostLivestockPurchase($input: PostLivestockPurchaseInput!) {
      postLivestockPurchase(input: $input) {
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
  const date = format(new Date(), "YYY-MM-dd");

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
      Meta: input.smallLivestockQuantity,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: LivestockPurchaseFactory.build()
  })
);

test("submits data to NAV and creates new user settings and purchase documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        totalWeight: null,
        smallLivestockQuantity: null,
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
      "livestockJob"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything()
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
      livestockJob: undefined
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        smallLivestockQuantity: null,
        totalWeight: null,
        comments: null
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
    username: user.User_Name,
    livestockJob: userSettings.livestockJob
  });
});

test("submits data to NAV and clears existing purchase document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const purchaseDoc = await LivestockPurchaseModel.create({
    job: job.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        smallLivestockQuantity: null,
        totalWeight: null,
        comments: null
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
    postLivestockPurchase: {
      success: true,
      livestockPurchase: {
        job: {
          number: job.No
        },
        quantity: null,
        smallLivestockQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: null
      }
    }
  });
});
