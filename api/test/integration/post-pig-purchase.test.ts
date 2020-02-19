import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../utils";
import {
  PostPigPurchaseMutation,
  PostPigPurchaseMutationVariables
} from "../../resolvers/types";
import {
  PigPurchaseInputFactory,
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

function mutation(variables: PostPigPurchaseMutationVariables) {
  return client.request<PostPigPurchaseMutation>(
    `mutation PostPigPurchase($input: PigPurchaseInput!) {
      postPigPurchase(input: $input) {
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
  const input = PigPurchaseInputFactory.build({
    job: job.No,
    ...inputOverrides
  });

  const documentNumberRegex = new RegExp(
    `^PURCH${user.Full_Name.slice(0, 3)}${format(
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
      Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
      Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code,
      Posting_Date: date,
      Document_Date: date
    })
    .basicAuth(auth)
    .reply(200, {});

  return { user, job, entityDimension, costCenterDimension, input };
}

testUnauthenticated(() =>
  mutation({
    input: PigPurchaseInputFactory.build()
  })
);

test("submits data to NAV and creates new user settings document", async () => {
  const { input, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    postPigPurchase: {
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
    postPigPurchase: {
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
    postPigPurchase: {
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
