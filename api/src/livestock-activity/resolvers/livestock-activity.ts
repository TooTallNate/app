import {
  QueryResolvers,
  LivestockActivityDefaultsResolvers,
  InclusivityMode,
  ItemJournalTemplateResolvers,
  MutationResolvers
} from "../../common/graphql";
import {
  AutoPostEnum,
  NavItemJournalBatch,
  NavItemJournalLine
} from "../../common/nav";
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

export const NUMBER_OF_LINES: number = 10000;

export async function postItemJournal(
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
  livestockJob?: string;
  location?: string;
  animal?: string;
  price?: number;
}): Promise<UserSettingsDocument> {
  let settings = await UserSettingsModel.findOne({ username, subdomain });
  if (!settings) {
    settings = new UserSettingsModel({ username, subdomain });
  }

  if (typeof doc.price === "number" && typeof animal === "string") {
    const livestockObj = settings.prices.find(
      livestock => livestock.animal === animal
    );
    if (!livestockObj) {
      const newLivestock = {
        animal: animal,
        price: doc.price
      };
      settings.prices.push(newLivestock);
    } else {
      livestockObj.price = doc.price;
    }
  }
  if (typeof doc.livestockJob === "string") {
    settings.livestockJob = doc.livestockJob;
  }
  if (typeof doc.location === "string") {
    settings.location = doc.location;
  }
  await settings.save();
  return settings;
}

export const LivestockActivityDefaults: LivestockActivityDefaultsResolvers = {
  job(userSettings, _, { dataSources }) {
    if (userSettings && userSettings.livestockJob) {
      return dataSources.navJob.getJobLivestockByNo(userSettings.livestockJob);
    } else {
      return null;
    }
  },
  prices: userSettings => (userSettings ? userSettings.prices : null),
  location(userSettings, _, { dataSources }) {
    if (userSettings && userSettings.location) {
      return dataSources.navLocation.getByCode(userSettings.location);
    } else {
      return null;
    }
  }
};

export const LivestockActivityQueries: QueryResolvers = {
  async itemJournalTemplates(_, __, { dataSources }) {
    return dataSources.navItemJournal.getItemJournalTemplates();
  },
  async animals(_, __, { dataSources }) {
    return dataSources.navConfig.getItems({
      postingGroups: ["SOWS", "MARKET HOGS", "CATTLE"]
    });
  },
  async livestockActivityJobs(
    _,
    { isShipment },
    { user, navConfig, dataSources }
  ) {
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
    console.log(settings.postingGroups);
    if (settings && settings.postingGroups.list) {
      if (settings.postingGroups.mode === InclusivityMode.Include) {
        var includePostingGroups = settings.postingGroups.list;
      } else {
        var excludePostingGroups = settings.postingGroups.list;
      }
    }
    return dataSources.navJob.getAllJobLivestock({
      includeLocations,
      excludeLocations,
      includePostingGroups,
      excludePostingGroups,
      isShipment
    });
  },
  async livestockActivityDefaults(_, __, { user, navConfig }) {
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

export const LivestockActivityMutations: MutationResolvers = {
  async autoPostItemJournal(_, { input }, { dataSources }) {
    const itemJournalTemplate = await dataSources.navItemJournal.getItemJournalTemplateByName(
      input.itemJournalTemplate
    );

    if (
      itemJournalTemplate &&
      itemJournalTemplate.Source_Code === AutoPostEnum.AutoPost
    ) {
      try {
        await dataSources.navItemJournal.autoPostItemJournals(
          input.itemJournalTemplate,
          NavItemJournalBatch.FarmApp,
          NUMBER_OF_LINES
        );
      } catch (e) {}
    }
    return { success: true };
  }
};
