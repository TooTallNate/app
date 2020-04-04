import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../utils";
import {
  PostPigMoveResult,
  MutationPostPigMoveArgs
} from "../../resolvers/types";
import {
  PigMoveFactory,
  JobFactory,
  DimensionFactory,
  UserSettingsFactory
} from "../builders";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType,
  NavDimensionCode,
  NavTableID
} from "../../nav";
import { format } from "date-fns";
import UserSettingsModel from "../../models/UserSettings";
import PigMoveModel from "../../models/PigMove";

function mutation(variables: MutationPostPigMoveArgs) {
  return client.request<PostPigMoveResult>(
    `mutation PostPigMove($input: PostPigMoveInput!) {
      postPigMove(input: $input) {
        success
        pigMove {
          fromAnimal
          toAnimal
          fromJob {
            number
          }
          toJob {
            number
          }
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
  const fromJob = JobFactory.build();
  const toJob = JobFactory.build();
  const fromEntityDimension = DimensionFactory.build({
    Dimension_Code: NavDimensionCode.Entity
  });
  const fromCostCenterDimension = DimensionFactory.build({
    Dimension_Code: NavDimensionCode.CostCenter
  });
  const toEntityDimension = DimensionFactory.build({
    Dimension_Code: NavDimensionCode.Entity
  });
  const toCostCenterDimension = DimensionFactory.build({
    Dimension_Code: NavDimensionCode.CostCenter
  });
  const input = PigMoveFactory.build({
    fromJob: fromJob.No,
    toJob: toJob.No,
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^MOVE${user.Full_Name.slice(0, 4)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

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
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Dimensions(Table_ID=${
        NavTableID.Job
      },No=%27${fromJob.No}%27,Dimension_Code=%27${encodeURIComponent(
        NavDimensionCode.Entity
      )}%27)`
    )
    .basicAuth(auth)
    .reply(200, fromEntityDimension);

  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Dimensions(Table_ID=${
        NavTableID.Job
      },No=%27${toJob.No}%27,Dimension_Code=%27${encodeURIComponent(
        NavDimensionCode.Entity
      )}%27)`
    )
    .basicAuth(auth)
    .reply(200, toEntityDimension);

  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Dimensions(Table_ID=${
        NavTableID.Job
      },No=%27${fromJob.No}%27,Dimension_Code=%27${encodeURIComponent(
        NavDimensionCode.CostCenter
      )}%27)`
    )
    .basicAuth(auth)
    .reply(200, fromCostCenterDimension);

  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Dimensions(Table_ID=${
        NavTableID.Job
      },No=%27${toJob.No}%27,Dimension_Code=%27${encodeURIComponent(
        NavDimensionCode.CostCenter
      )}%27)`
    )
    .basicAuth(auth)
    .reply(200, toCostCenterDimension);

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.Move,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Entry_Type: NavEntryType.Negative,
      Document_No: documentNumberRegex,
      Item_No: input.fromAnimal,
      Description: input.comments || " ",
      Location_Code: fromJob.Site,
      Quantity: input.quantity,
      Unit_Amount: input.price,
      Weight: input.weight,
      Job_No: input.fromJob,
      Shortcut_Dimension_1_Code: fromEntityDimension.Dimension_Value_Code,
      Shortcut_Dimension_2_Code: fromCostCenterDimension.Dimension_Value_Code,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.Move,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Entry_Type: NavEntryType.Positive,
      Document_No: documentNumberRegex,
      Item_No: input.toAnimal,
      Description: input.comments || " ",
      Location_Code: toJob.Site,
      Quantity: input.quantity,
      Unit_Amount: input.price,
      Weight: input.weight,
      Job_No: input.toJob,
      Shortcut_Dimension_1_Code: toEntityDimension.Dimension_Value_Code,
      Shortcut_Dimension_2_Code: toCostCenterDimension.Dimension_Value_Code,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, fromJob, toJob, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigMoveFactory.build()
  })
);

test("submits data to NAV and creates new user settings and adjustment documents", async () => {
  const { input, fromJob, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        fromAnimal: null,
        toAnimal: null,
        quantity: null,
        weight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
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
    pigJob: fromJob.No,
    price: input.price
  });

  await expect(
    PigMoveModel.findOne(
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

test("submits data to NAV and updates existing user settings document", async () => {
  const { input, fromJob, user } = await mockTestData({
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
    postPigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        fromAnimal: null,
        toAnimal: null,
        quantity: null,
        weight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
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
    pigJob: fromJob.No,
    price: input.price
  });
});

test("submits data to NAV and clears existing adjustment document", async () => {
  const { input, fromJob, toJob } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const moveDoc = await PigMoveModel.create({
    fromJob: fromJob.No,
    toJob: toJob.No,
    quantity: input.quantity,
    weight: input.weight
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        fromAnimal: null,
        toAnimal: null,
        quantity: null,
        weight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
        },
        price: input.price
      }
    }
  });

  await expect(
    PigMoveModel.findById(moveDoc._id, "-__v -createdAt -updatedAt").lean()
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
    postPigMove: {
      success: true,
      pigMove: {
        fromJob: {
          number: fromJob.No
        },
        toJob: null,
        fromAnimal: null,
        toAnimal: null,
        quantity: null,
        weight: null,
        price: null,
        comments: null
      },
      defaults: {
        job: {
          number: fromJob.No
        },
        price: input.price
      }
    }
  });
});
