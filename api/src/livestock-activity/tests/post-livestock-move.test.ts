import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockMoveResult,
  MutationPostLivestockMoveArgs
} from "../../common/graphql";
import {
  LivestockMoveFactory,
  JobFactory,
  UserSettingsFactory,
  StandardJournalMoveFactory
} from "../../../test/builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "../../common/nav";
import { format } from "date-fns";
import UserSettingsModel from "../../common/models/UserSettings";
import LivestockMoveModel from "../models/LivestockMove";

function mutation(variables: MutationPostLivestockMoveArgs) {
  return client.request<LivestockMoveResult>(
    `mutation PostLivestockMove($input: PostLivestockMoveInput!) {
      postLivestockMove(input: $input) {
        success
        livestockMove {
          fromJob {
            number
          }
          toJob {
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
  const fromJob = JobFactory.build();
  const toJob = JobFactory.build();
  const input = LivestockMoveFactory.build({
    fromJob: fromJob.No,
    toJob: toJob.No,
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^MOVE${user.Full_Name.slice(0, 4)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");
  const standardJournalPos = StandardJournalMoveFactory.build({
    Entry_Type: NavEntryType.Positive
  });
  const standardJournalNeg = StandardJournalMoveFactory.build({
    Entry_Type: NavEntryType.Negative
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

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/StandardItemJournal`)
    .query({
      $filter: `((Journal_Template_Name eq 'MOVE') and (Standard_Journal_Code eq '${input.event}'))`
    })
    .basicAuth(auth)
    .reply(200, {
      value: [standardJournalNeg, standardJournalPos]
    })
    .persist();

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      ...standardJournalNeg,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Document_No: documentNumberRegex,
      Description: input.comments || " ",
      Location_Code: fromJob.Site,
      Quantity: input.quantity,
      Weight: input.totalWeight,
      Job_No: input.fromJob,
      Shortcut_Dimension_1_Code: fromJob.Entity,
      Shortcut_Dimension_2_Code: fromJob.Cost_Center,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      ...standardJournalPos,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Document_No: documentNumberRegex,
      Description: input.comments || " ",
      Location_Code: toJob.Site,
      Quantity: input.quantity,
      Weight: input.totalWeight,
      Job_No: input.toJob,
      Shortcut_Dimension_1_Code: toJob.Entity,
      Shortcut_Dimension_2_Code: toJob.Cost_Center,
      Meta: input.smallLivestockQuantity,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, fromJob, toJob, input };
}

testUnauthenticated(() =>
  mutation({
    input: LivestockMoveFactory.build()
  })
);

test("submits data to NAV and creates adjustment document", async () => {
  const { input, fromJob } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockMove: {
      success: true,
      livestockMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        quantity: null,
        smallLivestockQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
        }
      }
    }
  });

  await expect(
    LivestockMoveModel.findOne(
      {
        fromJob: fromJob.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "move",
    fromJob: fromJob.No
  });
});

test("submits data to NAV and clears existing adjustment document", async () => {
  const { input, fromJob, toJob } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const moveDoc = await LivestockMoveModel.create({
    fromJob: fromJob.No,
    toJob: toJob.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockMove: {
      success: true,
      livestockMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        quantity: null,
        smallLivestockQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
        }
      }
    }
  });

  await expect(
    LivestockMoveModel.findById(
      moveDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "move",
    fromJob: fromJob.No
  });
});

test("sets description to an empty string if there are no comments", async () => {
  const { input, fromJob } = await mockTestData({
    input: {
      comments: undefined
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockMove: {
      success: true,
      livestockMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        quantity: null,
        smallLivestockQuantity: null,
        totalWeight: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
        }
      }
    }
  });
});
