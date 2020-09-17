import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  MutationPostPigGradeOffArgs,
  PigGradeOffResult
} from "../../common/graphql";
import {
  PigGradeOffFactory,
  JobFactory,
  UserSettingsFactory,
  StandardJournalGradeOffFactory
} from "../../../test/builders";
import { NavItemJournalBatch } from "../../common/nav";
import { format } from "date-fns";
import UserSettingsModel from "../../common/models/UserSettings";
import PigGradeOffModel from "../models/PigGradeOff";

function mutation(variables: MutationPostPigGradeOffArgs) {
  return client.request<PigGradeOffResult>(
    `mutation PostPigGradeOff($input: PostPigGradeOffInput!) {
      postPigGradeOff(input: $input) {
        success
        pigGradeOff {
          job {
            number
          }
          quantities {
            code
            quantity
          }
          pigWeight
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

  const standardJournalLines = input.quantities.map(({ code }) =>
    StandardJournalGradeOffFactory.build({ Reason_Code: code })
  );

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/StandardItemJournal`)
    .query({
      $filter: `((Journal_Template_Name eq 'GRADE OFF') and (Standard_Journal_Code eq '${input.event}'))`
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
          Weight: input.pigWeight * quantity,
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
        quantities: [],
        pigWeight: null,
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
      "pigJob"
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

test("does not quantity if not positive", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      quantities: [{ code: "GR-BRUPT", quantity: 0 }],
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
        quantities: [],
        pigWeight: null,
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
      "pigJob"
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
        quantities: [],
        pigWeight: null,
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
    UserSettingsModel.findById(userSettings._id, "username pigJob").lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    username: user.User_Name,
    pigJob: job.No
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
    pigWeight: input.pigWeight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigGradeOff: {
      success: true,
      pigGradeOff: {
        job: {
          number: job.No
        },
        quantities: [],
        pigWeight: null,
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
        quantities: [],
        pigWeight: null,
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
