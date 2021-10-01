import {
  MutationResolvers,
  QueryResolvers,
  LivestockWeanResolvers,
  LivestockWeanEventResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import LivestockWeanModel from "../models/LivestockWean";
import UserSettingsModel from "../../common/models/UserSettings";
import { postItemJournal } from "./livestock-activity";

export const LivestockWean: LivestockWeanResolvers = {
  job(livestockWean, _, { dataSources }) {
    return dataSources.navJob.getJobLivestockByNo(livestockWean.job);
  },
  event(livestockWean, _, { dataSources }) {
    if (livestockWean.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockWean.event,
        template: NavItemJournalTemplate.Wean
      });
    }
  }
};

export const LivestockWeanQueries: QueryResolvers = {
  async livestockWean(_, { job }) {
    return (
      (await LivestockWeanModel.findOne({ job })) ||
      new LivestockWeanModel({ job })
    );
  },
  async livestockWeanEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Wean
    );
  }
};

export const LivestockWeanEvent: LivestockWeanEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const LivestockWeanMutations: MutationResolvers = {
  async saveLivestockWean(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockWeanModel.findOne({
        job: input.job
      })) || new LivestockWeanModel();
    doc.set(input);
    await doc.save();

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    return {
      success: true,
      livestockWean: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  },
  async postLivestockWean(_, { input }, { user, dataSources, navConfig }) {
    const [
      standardJournal
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Wean
    });

    if (!standardJournal) {
      throw Error(`Event ${input.event} not found.`);
    }

    const job = await dataSources.navJob.getJobLivestockByNo(input.job);
    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("WEAN", user.name),
        Description: input.comments,
        Location_Code: standardJournal.Location_Code
          ? standardJournal.Location_Code
          : job.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.job,
        Meta: input.smallLivestockQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    const doc =
      (await LivestockWeanModel.findOne({
        job: input.job
      })) || new LivestockWeanModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return {
      success: true,
      livestockWean: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  }
};
