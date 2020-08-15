import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import { PigWeanResult, MutationPostPigWeanArgs } from "../../common/graphql";
import {
  PigWeanFactory,
  JobFactory,
  UserSettingsFactory,
  StandardJournalWeanFactory
} from "../../../test/builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "../../common/nav";
import { format } from "date-fns";
import UserSettingsModel from "../../common/models/UserSettings";
import PigWeanModel from "../models/PigWean";

function mutation(variables: MutationPostPigWeanArgs) {
  return client.request<PigWeanResult>(
    `mutation PostPigWean($input: PostPigWeanInput!) {
      postPigWean(input: $input) {
        success
        pigWean {
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
  const input = PigWeanFactory.build({
    job: job.No,
    event: "FE-DEFAULT",
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^WEAN${user.Full_Name.slice(0, 4)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

  const standardJournal = StandardJournalWeanFactory.build();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/StandardItemJournal`)
    .query({
      $filter: `((Journal_Template_Name eq 'WEAN') and (Standard_Journal_Code eq '${input.event}'))`
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
      Posting_Date: date,
      Document_Date: date,
      Meta: input.smallPigQuantity
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigWeanFactory.build()
  })
);

test("submits data to NAV and creates new wean document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigWean: {
      success: true,
      pigWean: {
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
    PigWeanModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "wean",
    job: job.No
  });
});

test("submits data to NAV and clears existing wean document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const weanDoc = await PigWeanModel.create({
    job: job.No,
    quantity: input.quantity,
    totalWeight: input.totalWeight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigWean: {
      success: true,
      pigWean: {
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
    PigWeanModel.findById(weanDoc._id, "-__v -createdAt -updatedAt").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "wean",
    job: job.No
  });
});

test("sets description to an empty string if there are no comments", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: undefined
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigWean: {
      success: true,
      pigWean: {
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
