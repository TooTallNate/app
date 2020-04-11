import {
  MutationResolvers,
  QueryResolvers,
  PigActivityDefaultsResolvers
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
} from "../models/UserSettings";
import { navDate, getDocumentNumber } from "./utils";

export function postItemJournal(
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

export async function findJob(no: string, navClient: ODataClient) {
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

export async function updateUserSettings({
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

export const PigActivityDefaults: PigActivityDefaultsResolvers = {
  job(userSettings, _, { navClient }) {
    if (userSettings && userSettings.pigJob) {
      return navClient
        .resource("Company", process.env.NAV_COMPANY)
        .resource("Jobs", userSettings.pigJob)
        .get<NavJob>();
    } else {
      return null;
    }
  },
  price: userSettings => (userSettings ? userSettings.price : null)
};

export const PigActivityQueries: QueryResolvers = {
  async pigActivityJobs(_, __, { navClient }) {
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
  async pigActivityDefaults(_, __, { user }) {
    return (
      (await UserSettingsModel.findOne({
        username: user.username
      })) || new UserSettingsModel({ username: user.username })
    );
  }
};
