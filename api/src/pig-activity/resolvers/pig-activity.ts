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
import { template } from "@babel/core";

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
  animal,
  ...doc
}: {
  username: string;
  pigJob?: string;
  animal?: string;
  price?: number;
}): Promise<UserSettingsDocument> {
  let settings = await UserSettingsModel.findOne({ username });
  if (!settings) {
    settings = new UserSettingsModel({ username });
  }

  if (typeof doc.price === "number" && typeof animal === "string") {
    const pigObj = settings.prices.find(pig => pig.animal === animal);
    if (!pigObj) {
      const newPig = {
        animal: animal,
        price: doc.price
      };
      settings.prices.push(newPig);
    } else {
      pigObj.price = doc.price;
    }
  }
  if (typeof doc.pigJob === "string") {
    settings.pigJob = doc.pigJob;
  }
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
  prices: userSettings => (userSettings ? userSettings.prices : null)
};

export const PigActivityQueries: QueryResolvers = {
  async animals(_, __, { dataSources }) {
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
