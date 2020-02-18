import {
  MutationResolvers,
  QueryResolvers,
  PigActivityResolvers
} from "./types";
import {
  NavItemJournalEntry,
  ODataClient,
  NavJob,
  NavDimension,
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavTableID,
  NavDimensionCode
} from "../nav";
import UserSettingsModel, {
  UserSettingsDocument
} from "../models/user-settings";
import { navDate, getDocumentNumber } from "./utils";

function postItemJournal(
  entry: Partial<NavItemJournalEntry>,
  navClient: ODataClient
): Promise<NavItemJournalEntry> {
  const date = navDate(new Date());
  entry.Posting_Date = date;
  entry.Document_Date = date;
  entry.Description = entry.Description || " ";
  return navClient
    .resource("Company", process.env.NAV_COMPANY)
    .resource("ItemJournal")
    .post(entry);
}

async function findJob(no: string, navClient: ODataClient) {
  const job = await navClient
    .resource("Company", process.env.NAV_COMPANY)
    .resource("Jobs", no)
    .get<NavJob>();
  const costCenterDimension = await navClient
    .resource("Company", process.env.NAV_COMPANY)
    .resource("Dimensions", {
      Table_ID: NavTableID.Job,
      No: no,
      Dimension_Code: NavDimensionCode.CostCenter
    })
    .get<NavDimension>();
  const entityDimension = await navClient
    .resource("Company", process.env.NAV_COMPANY)
    .resource("Dimensions", {
      Table_ID: NavTableID.Job,
      No: no,
      Dimension_Code: NavDimensionCode.Entity
    })
    .get<NavDimension>();
  return { job, costCenterDimension, entityDimension };
}

async function updateUserSettings({
  username,
  ...doc
}: {
  username: string;
  pigJob?: string;
  price?: number;
}): Promise<UserSettingsDocument> {
  let settings = await UserSettingsModel.findOne({ username });
  if (!settings) {
    settings = new UserSettingsModel({ username });
  }
  settings.set(doc);
  await settings.save();
  return settings;
}

export const PigActivity: PigActivityResolvers = {
  jobs(_, __, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs")
      .get<NavJob[]>()
      .filter(f =>
        f.and(
          f.equals("Status", "Open"),
          f.or(
            f.equals("Job_Posting_Group", "MKT PIGS"),
            f.equals("Job_Posting_Group", "SOWS"),
            f.equals("Job_Posting_Group", "GDU")
          )
        )
      );
  },
  defaultJob({ userSettings }, _, { navClient }) {
    if (userSettings && userSettings.pigJob) {
      return navClient
        .resource("Company", process.env.NAV_COMPANY)
        .resource("Jobs", userSettings.pigJob)
        .get<NavJob>();
    } else {
      return null;
    }
  },
  defaultPrice: ({ userSettings }) => (userSettings ? userSettings.price : null)
};

export const PigActivityQueries: QueryResolvers = {
  async pigActivity(_, __, { navClient, user }) {
    const userSettings = await UserSettingsModel.findOne({
      username: user.username
    });
    return { userSettings };
  }
};

export const PigActivityMutations: MutationResolvers = {
  async postPigAdjustment(_, { input }, { user, navClient }) {
    const { job, costCenterDimension, entityDimension } = await findJob(
      input.job,
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Adjustment,
        Journal_Batch_Name: NavItemJournalBatch.Default,
        Entry_Type:
          input.quantity >= 0 ? NavEntryType.Positive : NavEntryType.Negative,
        Document_No: getDocumentNumber("ADJ", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: Math.abs(input.quantity),
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      price: input.price
    });

    return { userSettings };
  },
  async postPigGradeOff(_, { input }, { user, navClient }) {
    const { job, costCenterDimension, entityDimension } = await findJob(
      input.job,
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.GradeOff,
        Journal_Batch_Name: NavItemJournalBatch.Default,
        Entry_Type: NavEntryType.Negative,
        Document_No: getDocumentNumber("GRDOFF", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      price: input.price
    });

    return { userSettings };
  },
  async postPigMortality(_, { input }, { user, navClient }) {
    const docNo = getDocumentNumber("MORT", user.name);
    const { job, costCenterDimension, entityDimension } = await findJob(
      input.job,
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Mortality,
        Journal_Batch_Name: NavItemJournalBatch.Mortality,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.naturalQuantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Mortality,
        Journal_Batch_Name: NavItemJournalBatch.Mortality,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.euthanizedQuantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      price: input.price
    });

    return { userSettings };
  },
  async postPigMove(_, { input }, { user, navClient }) {
    const docNo = getDocumentNumber("MOVE", user.name);
    const from = await findJob(input.fromJob, navClient);
    const to = await findJob(input.toJob, navClient);
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Move,
        Journal_Batch_Name: NavItemJournalBatch.Move,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.fromAnimal,
        Description: input.comments,
        Location_Code: from.job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.fromJob,
        Shortcut_Dimension_1_Code: from.entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: from.costCenterDimension.Dimension_Value_Code
      },
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Move,
        Journal_Batch_Name: NavItemJournalBatch.Move,
        Entry_Type: NavEntryType.Positive,
        Document_No: docNo,
        Item_No: input.toAnimal,
        Description: input.comments,
        Location_Code: to.job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.toJob,
        Shortcut_Dimension_1_Code: to.entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: to.costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.fromJob,
      price: input.price
    });

    return { userSettings };
  },
  async postPigPurchase(_, { input }, { user, navClient }) {
    const { job, costCenterDimension, entityDimension } = await findJob(
      input.job,
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Wean,
        Journal_Batch_Name: NavItemJournalBatch.Wean,
        Entry_Type: NavEntryType.Positive,
        Document_No: getDocumentNumber("PURCH", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      price: input.price
    });

    return { userSettings };
  },
  async postPigWean(_, { input }, { user, navClient }) {
    const { job, costCenterDimension, entityDimension } = await findJob(
      input.job,
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Wean,
        Journal_Batch_Name: NavItemJournalBatch.Wean,
        Entry_Type: NavEntryType.Positive,
        Document_No: getDocumentNumber("WEAN", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Gen_Prod_Posting_Group: "WEAN PIGS",
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      price: input.price
    });

    return { userSettings };
  }
};
