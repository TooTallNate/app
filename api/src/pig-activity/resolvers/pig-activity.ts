import {
  QueryResolvers,
  PigActivityDefaultsResolvers,
  InclusivityMode,
  ItemJournalTemplateResolvers
} from "../../common/graphql";
import { NavItemJournalLine } from "../../common/nav";
import UserSettingsModel, {
  UserSettingsDocument
} from "../../common/models/UserSettings";
import { navDate } from "../../common/utils";
import NavItemJournalDataSource from "../../common/datasources/NavItemJournalDataSource";

export const ItemJournalTemplate: ItemJournalTemplateResolvers = {
  name: itemJournalTemplate => itemJournalTemplate.Name,
  description: itemJournalTemplate => itemJournalTemplate.Description,
  type: itemJournalTemplate => itemJournalTemplate.Type,
  sourceCode: itemJournalTemplate => itemJournalTemplate.Source_Code,
  reasonCode: itemJournalTemplate => itemJournalTemplate.Reason_Code
};

export function getItemJournalTemplate(
  entry: Partial<NavItemJournalLine>,
  dataSource: NavItemJournalDataSource
): Promise<NavItemJournalLine> {
  const date = navDate(new Date());
  entry.Document_Date = date;
  entry.Posting_Date = entry.Posting_Date || date;
  entry.Description = entry.Description || " ";
  return dataSource.postJournalLine(entry);
}

export function postItemJournal(
  entry: Partial<NavItemJournalLine>,
  dataSource: NavItemJournalDataSource
): Promise<NavItemJournalLine> {
  const date = navDate(new Date());
  entry.Document_Date = date;
  entry.Posting_Date = entry.Posting_Date || date;
  entry.Description = entry.Description || " ";
  return dataSource.postJournalLine(entry);
}

export async function updateUserSettings({
  username,
  animal,
  subdomain,
  ...doc
}: {
  username: string;
  subdomain: string;
  pigJob?: string;
  animal?: string;
  price?: number;
}): Promise<UserSettingsDocument> {
  let settings = await UserSettingsModel.findOne({ username, subdomain });
  if (!settings) {
    settings = new UserSettingsModel({ username, subdomain });
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
  async itemJournalTemplates(_, __, { dataSources }) {
    return dataSources.navItemJournal.getItemJournalTemplate();
  },
  async animals(_, __, { dataSources }) {
    return dataSources.navConfig.getItems({
      postingGroups: ["SOWS", "MARKET HOGS"]
    });
  },
  async pigActivityJobs(_, __, { user, navConfig, dataSources }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
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
  async pigActivityDefaults(_, __, { user, navConfig }) {
    return (
      (await UserSettingsModel.findOne({
        username: user.username,
        subdomain: navConfig.subdomain
      })) ||
      new UserSettingsModel({
        username: user.username,
        subdomain: navConfig.subdomain
      })
    );
  }
};
