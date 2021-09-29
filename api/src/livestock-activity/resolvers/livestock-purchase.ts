import {
  MutationResolvers,
  QueryResolvers,
  LivestockPurchaseResolvers,
  LivestockPurchaseEventResolvers
} from "../../common/graphql";
import UserSettingsModel from "../../common/models/UserSettings";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import LivestockPurchaseModel from "../models/LivestockPurchase";
import { postItemJournal, updateUserSettings } from "./livestock-activity";

export const LivestockPurchase: LivestockPurchaseResolvers = {
  job(livestockPurchase, _, { dataSources }) {
    return dataSources.navJob.getJobLivestockByNo(livestockPurchase.job);
  },
  event(livestockPurchase, _, { dataSources }) {
    if (livestockPurchase.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockPurchase.event,
        template: NavItemJournalTemplate.Purchase
      });
    }
  }
};

export const LivestockPurchaseQueries: QueryResolvers = {
  async livestockPurchase(_, { job }) {
    return (
      (await LivestockPurchaseModel.findOne({ job })) ||
      new LivestockPurchaseModel({ job })
    );
  },
  async livestockPurchaseEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Purchase
    );
  }
};

export const LivestockPurchaseEvent: LivestockPurchaseEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const LivestockPurchaseMutations: MutationResolvers = {
  async saveLivestockPurchase(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockPurchaseModel.findOne({
        job: input.job
      })) || new LivestockPurchaseModel();
    doc.set(input);
    await doc.save();

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    return {
      success: true,
      livestockPurchase: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  },
  async postLivestockPurchase(_, { input }, { user, dataSources, navConfig }) {
    const [
      standardJournalLines
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Purchase
    });

    if (!standardJournalLines) {
      throw Error(`Event ${input.event} not found`);
    }

    const job = await dataSources.navJob.getJobLivestockByNo(input.job);

    await postItemJournal(
      {
        ...standardJournalLines,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("PURCH", user.name),
        Description: input.comments || " ",
        Location_Code: standardJournalLines.Location_Code
          ? standardJournalLines.Location_Code
          : job.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: standardJournalLines.Shortcut_Dimension_1_Code
          ? standardJournalLines.Shortcut_Dimension_1_Code
          : job.Entity,
        Shortcut_Dimension_2_Code: standardJournalLines.Shortcut_Dimension_2_Code
          ? standardJournalLines.Shortcut_Dimension_2_Code
          : job.Cost_Center,
        Meta: input.smallLivestockQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    const doc =
      (await LivestockPurchaseModel.findOne({
        job: input.job
      })) || new LivestockPurchaseModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return {
      success: true,
      livestockPurchase: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  }
};
