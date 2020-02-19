import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../utils";
import {
  PostPigWeanMutation,
  PostPigWeanMutationVariables
} from "../../resolvers/types";
import {
  PigWeanInputFactory,
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
import UserSettings from "../../models/user-settings";

function mutation(variables: PostPigWeanMutationVariables) {
  return client.request<PostPigWeanMutation>(
    `mutation PostPigWean($input: PigWeanInput!) {
      postPigWean(input: $input) {
        defaultJob {
          number
        }
        defaultPrice
      }
    }`,
    variables
  );
}

async function mockTestData({ input: inputOverrides = {} } = {}) {
  const { user, auth } = await mockUser();
  const job = JobFactory.build();
  const entityDimension = DimensionFactory.build({
    Dimension_Code: NavDimensionCode.Entity
  });
  const costCenterDimension = DimensionFactory.build({
    Dimension_Code: NavDimensionCode.CostCenter
  });
  const input = PigWeanInputFactory.build({
    job: job.No,
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^WEAN${user.Full_Name.slice(0, 4)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );
  const date = format(new Date(), "YYY-MM-dd");

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Dimensions(Table_ID=${
        NavTableID.Job
      },No=%27${job.No}%27,Dimension_Code=%27${encodeURIComponent(
        NavDimensionCode.Entity
      )}%27)`
    )
    .basicAuth(auth)
    .reply(200, entityDimension);

  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Dimensions(Table_ID=${
        NavTableID.Job
      },No=%27${job.No}%27,Dimension_Code=%27${encodeURIComponent(
        NavDimensionCode.CostCenter
      )}%27)`
    )
    .basicAuth(auth)
    .reply(200, costCenterDimension);

  nock(process.env.NAV_BASE_URL)
    .post(`/Company(%27${process.env.NAV_COMPANY}%27)/ItemJournal`, {
      Journal_Template_Name: NavItemJournalTemplate.Wean,
      Journal_Batch_Name: NavItemJournalBatch.Wean,
      Entry_Type: NavEntryType.Positive,
      Document_No: documentNumberRegex,
      Item_No: input.animal,
      Description: input.comments || " ",
      Location_Code: job.Site,
      Quantity: input.quantity,
      Unit_Amount: input.price,
      Weight: input.weight,
      Job_No: input.job,
      Gen_Prod_Posting_Group: "WEAN PIGS",
      Shortcut_Dimension_1_Code: "213",
      Shortcut_Dimension_2_Code: "2",
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, entityDimension, costCenterDimension, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigWeanInputFactory.build()
  })
);

test("submits data to NAV and creates new user settings document", async () => {
  const { input, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigWean: {
      defaultJob: null,
      defaultPrice: input.price
    }
  });

  await expect(
    UserSettings.findOne({
      username: user.User_Name
    }).lean()
  ).resolves.toMatchObject({
    price: input.price
  });
});

test("submits data to NAV and updates existing user settings document", async () => {
  const { input, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const userSettings = await UserSettings.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      pigJob: undefined
    })
  );

  await expect(mutation({ input })).resolves.toEqual({
    postPigWean: {
      defaultJob: null,
      defaultPrice: input.price
    }
  });

  await expect(
    UserSettings.findById(userSettings._id).lean()
  ).resolves.toMatchObject({
    username: user.User_Name,
    price: input.price
  });
});

test("sets description to an empty string if there are no comments", async () => {
  const { input, user } = await mockTestData({
    input: {
      comments: undefined
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigWean: {
      defaultJob: null,
      defaultPrice: input.price
    }
  });

  await expect(
    UserSettings.findOne({
      username: user.User_Name
    }).lean()
  ).resolves.toMatchObject({
    price: input.price
  });
});
