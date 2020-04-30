import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../utils";
import {
  PostPigMortalityResult,
  MutationPostPigMortalityArgs
} from "../../resolvers/types";
import {
  PigMortalityFactory,
  JobFactory,
  UserSettingsFactory
} from "../builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType,
  NavReasonCode
} from "../../nav";
import { format, differenceInDays } from "date-fns";
import UserSettingsModel from "../../models/UserSettings";
import PigMortalityModel from "../../models/PigMortality";
import { parseNavDate } from "../../resolvers/utils";

function mutation(variables: MutationPostPigMortalityArgs) {
  return client.request<PostPigMortalityResult>(
    `mutation PostPigMortality($input: PostPigMortalityInput!) {
      postPigMortality(input: $input) {
        success
        pigMortality {
          job {
            number
          }
          animal
          naturalQuantity
          euthanizedQuantity
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
  const input = PigMortalityFactory.build({
    job: job.No,
    ...inputOverrides
  });
  const startWeight = 0.8 * (job.Start_Weight / job.Start_Quantity);
  const growthFactor = job.Barn_Type === "Nursery" ? 0.5 : 1.5;
  const barnDays = differenceInDays(new Date(), parseNavDate(job.Start_Date));
  const euthanizedWeight =
    input.euthanizedQuantity * (startWeight + growthFactor * barnDays);
  const naturalWeight =
    input.naturalQuantity * (startWeight + growthFactor * barnDays);

  const documentNumberRegex = new RegExp(
    `^MORT${user.Full_Name.slice(0, 4)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.Mortality,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Entry_Type: NavEntryType.Negative,
      Document_No: documentNumberRegex,
      Item_No: input.animal,
      Description: input.comments || " ",
      Location_Code: job.Site,
      Quantity: input.euthanizedQuantity,
      Unit_Amount: input.price,
      Weight: euthanizedWeight,
      Job_No: input.job,
      Shortcut_Dimension_1_Code: job.Entity,
      Shortcut_Dimension_2_Code: job.Cost_Center,
      Posting_Date: date,
      Document_Date: date,
      Reason_Code: NavReasonCode.Euthanized
    })
    .basicAuth(auth)
    .reply(200, {});

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.Mortality,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Entry_Type: NavEntryType.Negative,
      Document_No: documentNumberRegex,
      Item_No: input.animal,
      Description: input.comments || " ",
      Location_Code: job.Site,
      Quantity: input.naturalQuantity,
      Unit_Amount: input.price,
      Weight: naturalWeight,
      Job_No: input.job,
      Shortcut_Dimension_1_Code: job.Entity,
      Shortcut_Dimension_2_Code: job.Cost_Center,
      Posting_Date: date,
      Document_Date: date,
      Reason_Code: NavReasonCode.NaturalDeath
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigMortalityFactory.build()
  })
);

test("submits data to NAV and creates new user settings and mortality documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: null,
        naturalQuantity: null,
        euthanizedQuantity: null,
        price: null,
        comments: null
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
    PigMortalityModel.findOne(
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

test("submits data to NAV and updates existing user settings document", async () => {
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
    postPigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: null,
        naturalQuantity: null,
        euthanizedQuantity: null,
        price: null,
        comments: null
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

test("submits data to NAV and clears existing mortality document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const mortalityDoc = await PigMortalityModel.create({
    job: job.No,
    naturalQuantity: input.naturalQuantity
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: null,
        naturalQuantity: null,
        euthanizedQuantity: null,
        price: null,
        comments: null
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
    PigMortalityModel.findById(
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
    postPigMortality: {
      success: true,
      pigMortality: {
        job: {
          number: job.No
        },
        animal: null,
        naturalQuantity: null,
        euthanizedQuantity: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        price: input.price
      }
    }
  });
});
