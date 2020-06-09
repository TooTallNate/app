import {
  QueryResolvers,
  PigActivityDefaultsResolvers,
  InclusivityMode
} from "../../common/graphql";
import { NavItemJournalEntry } from "../../common/nav";
import UserSettingsModel, {
  UserSettingsDocument
} from "../../common/models/UserSettings";
import { navDate } from "../../common/utils";
import NavItemJournalDataSource from "../../common/datasources/NavItemJournalDataSource";

export function postItemJournal(
  entry: Partial<NavItemJournalEntry>,
  dataSource: NavItemJournalDataSource
): Promise<NavItemJournalEntry> {
  const date = navDate(new Date());
  entry.Posting_Date = date;
  entry.Document_Date = date;
  entry.Description = entry.Description || " ";
  return dataSource.postEntry(entry);
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
  job(userSettings, _, { dataSources }) {
    if (userSettings && userSettings.pigJob) {
      return dataSources.navJob.getByNo(userSettings.pigJob);
    } else {
      return null;
    }
  },
  price: userSettings => (userSettings ? userSettings.price : null)
};

export const PigActivityQueries: QueryResolvers = {
  async pigTypes(_, __, { dataSources }) {
    return dataSources.navConfig.getItems({
      postingGroups: ["SOWS", "MARKET HOGS"]
    });
  },
  async pigActivityJobs(_, __, { user, dataSources }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username
    });
    if (settings && settings.locations.list) {
      if (settings.locations.mode === InclusivityMode.Include) {
        var includeLocations = settings.locations.list;
      } else {
        var excludeLocations = settings.locations.list;
      }
    }
    return dataSources.navJob.getAll({
      isOpen: true,
      postingGroups: ["MKT PIGS", "SOWS", "GDU"],
      includeLocations,
      excludeLocations
    });
  },
  async pigActivityDefaults(_, __, { user }) {
    return (
      (await UserSettingsModel.findOne({
        username: user.username
      })) || new UserSettingsModel({ username: user.username })
    );
  }
};
