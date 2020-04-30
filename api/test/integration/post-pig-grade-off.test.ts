import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../utils";
import {
  MutationPostPigGradeOffArgs,
  PostPigGradeOffResult
} from "../../resolvers/types";
import {
  PigGradeOffFactory,
  JobFactory,
  UserSettingsFactory
} from "../builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "../../nav";
import { format } from "date-fns";
import UserSettingsModel from "../../models/UserSettings";
import PigGradeOffModel from "../../models/PigGradeOff";

function mutation(variables: MutationPostPigGradeOffArgs) {
  return client.request<PostPigGradeOffResult>(
    `mutation PostPigGradeOff($input: PostPigGradeOffInput!) {
      postPigGradeOff(input: $input) {
        success
        pigGradeOff {
          job {
            number
          }
          animal
          quantity
          weight
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

  const documentNumberRegex = new RegExp(
    `^GRDOFF${user.Full_Name.slice(0, 2)}${format(
      new Date(),
      "yyMMddHH"
    )}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.GradeOff,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Entry_Type: NavEntryType.Negative,
      Document_No: documentNumberRegex,
      Item_No: input.animal,
      Description: input.comments || " ",
      Location_Code: job.Site,
      Quantity: input.quantity,
      Weight: input.weight,
      Job_No: input.job,
      Shortcut_Dimension_1_Code: job.Entity,
      Shortcut_Dimension_2_Code: job.Cost_Center,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigGradeOffFactory.build()
  })
);

test("submits data to NAV and creates new user settings and grade off documents", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        weight: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        price: null
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
    pigJob: job.No
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
    postPigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        weight: null,
        comments: null
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

test("submits data to NAV and clears existing grade off document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const adjustmentDoc = await PigGradeOffModel.create({
    job: job.No,
    quantity: input.quantity,
    weight: input.weight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        weight: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        price: null
      }
    }
  });

  await expect(
    PigGradeOffModel.findById(
      adjustmentDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "gradeoff",
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
    postPigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        animal: null,
        quantity: null,
        weight: null,
        comments: null
      },
      defaults: {
        job: {
          number: job.No
        },
        price: null
      }
    }
  });
});
