import {
  QueryResolvers,
  PigActivityDefaultsResolvers,
  InclusivityMode
} from "../../common/graphql";
import {
  NavItemJournalEntry,
  ODataClient,
  NavJob,
  NavAnimal
} from "../../common/nav";
import UserSettingsModel, {
  UserSettingsDocument
} from "../../common/models/UserSettings";
import { navDate } from "../../common/utils";
import {
  BooleanFilterExpression,
  FilterFunctionArgument
} from "../../common/nav/filter";

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
  async pigTypes(_, __, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("PigTypes")
      .get<NavAnimal[]>();
  },
  async pigActivityJobs(_, __, { user, navClient }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username
    });
    function filter(f: FilterFunctionArgument) {
      let filters: BooleanFilterExpression[] = [
        f.equals("Status", "Open"),
        f.or(
          f.equals("Job_Posting_Group", "MKT PIGS"),
          f.equals("Job_Posting_Group", "SOWS"),
          f.equals("Job_Posting_Group", "GDU")
        )
      ];

      if (settings && settings.locations.list.length > 0) {
        if (settings.locations.mode === InclusivityMode.Include) {
          filters.push(
            f.or(...settings.locations.list.map(loc => f.equals("Site", loc)))
          );
        } else {
          filters.push(
            f.and(
              ...settings.locations.list.map(loc => f.notEquals("Site", loc))
            )
          );
        }
      }

      return filters;
    }

    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs")
      .get<NavJob[]>()
      .filter(f => f.and(...filter(f)));
  },
  async pigActivityDefaults(_, __, { user }) {
    return (
      (await UserSettingsModel.findOne({
        username: user.username
      })) || new UserSettingsModel({ username: user.username })
    );
  }
};
