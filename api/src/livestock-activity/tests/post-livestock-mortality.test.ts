import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockMortalityResult,
  MutationPostLivestockMortalityArgs
} from "../../common/graphql";
import {
  LivestockMortalityFactory,
  JobFactory,
  UserSettingsFactory,
  StandardJournalMortalityFactory
} from "../../../test/builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType,
  NavReasonCode
} from "../../common/nav";
import { format, differenceInDays } from "date-fns";
import UserSettingsModel from "../../common/models/UserSettings";
import LivestockMortalityModel from "../models/LivestockMortality";
import { parseNavDate } from "../../common/utils";

function mutation(variables: MutationPostLivestockMortalityArgs) {
  return client.request<LivestockMortalityResult>(
    `mutation PostLivestockMortality($input: PostLivestockMortalityInput!) {
      postLivestockMortality(input: $input) {
        success
        livestockMortality {
          job {
            number
          }
          quantities {
            code
            quantity
          }
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
  const input = LivestockMortalityFactory.build({
    job: job.No,
    ...inputOverrides
  });

  const startWeight = 0.8 * (job.Start_Weight / job.Start_Quantity);
  const growthFactor = job.Barn_Type === "Nursery" ? 0.5 : 1.5;
  const barnDays = differenceInDays(new Date(), parseNavDate(job.Start_Date));
  const weight = startWeight + growthFactor * barnDays;

  const documentNumberRegex = new RegExp(
    `^MORT${user.Full_Name.slice(0, 4)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  const standardJournalLines = input.quantities.map(({ code }) =>
    StandardJournalMortalityFactory.build({ Reason_Code: code })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/StandardItemJournal`)
    .query({
      $filter: `((Journal_Template_Name eq 'MORTALITY') and (Standard_Journal_Code eq '${input.event}'))`
    })
    .basicAuth(auth)
    .reply(200, {
      value: standardJournalLines
    })
    .persist();

  input.quantities.forEach(({ quantity, code }) => {
    if (quantity > 0) {
      const line = standardJournalLines.find(line => line.Reason_Code === code);
      nock(process.env.NAV_BASE_URL)
        .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
          ...line,
          Journal_Batch_Name: NavItemJournalBatch.FarmApp,
          Document_No: documentNumberRegex,
          Description: input.comments || " ",
          Location_Code: job.Site,
          Quantity: quantity,
          Weight: quantity * weight,
          Job_No: input.job,
          Shortcut_Dimension_1_Code: job.Entity,
          Shortcut_Dimension_2_Code: job.Cost_Center,
          Posting_Date: date,
          Document_Date: date
        })
        .basicAuth(auth)
        .reply(200, {});
    }
  });

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: LivestockMortalityFactory.build()
  })
);

test("submits data to NAV and creates new user settings and mortality documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockMortality: {
      success: true,
      livestockMortality: {
        job: {
          number: job.No
        },
        quantities: [],
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        }
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
    _id: expect.anything(),
    livestockJob: job.No
  });

  await expect(
    LivestockMortalityModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "mortality",
    job: job.No
  });
});

test("submits data to NAV and clears existing mortality document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const mortalityDoc = await LivestockMortalityModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    postLivestockMortality: {
      success: true,
      livestockMortality: {
        job: {
          number: job.No
        },
        quantities: [],
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        }
      }
    }
  });

  await expect(
    LivestockMortalityModel.findById(
      mortalityDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "mortality",
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
    postLivestockMortality: {
      success: true,
      livestockMortality: {
        job: {
          number: job.No
        },
        quantities: [],
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        }
      }
    }
  });
});
