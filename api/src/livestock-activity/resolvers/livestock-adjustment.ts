import {
  MutationResolvers,
  QueryResolvers,
  LivestockAdjustmentResolvers,
  LivestockAdjustmentEventResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import LivestockAdjustmentModel from "../models/LivestockAdjustment";
import { postItemJournal, updateUserSettings } from "./livestock-activity";

export const LivestockAdjustment: LivestockAdjustmentResolvers = {
  job(livestockAdjustment, _, { dataSources }) {
    return dataSources.navJob.getByNo(livestockAdjustment.job);
  },
  event(livestockAdjustment, _, { dataSources }) {
    if (livestockAdjustment.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockAdjustment.event,
        template: NavItemJournalTemplate.Adjustment
      });
    }
  }
};

export const LivestockAdjustmentQueries: QueryResolvers = {
  async livestockAdjustment(_, { job }) {
    return (
      (await LivestockAdjustmentModel.findOne({ job })) ||
      new LivestockAdjustmentModel({ job })
    );
  },
  async livestockAdjustmentEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Adjustment
    );
  }
};

export const LivestockAdjustmentEvent: LivestockAdjustmentEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const LivestockAdjustmentMutations: MutationResolvers = {
  async saveLivestockAdjustment(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockAdjustmentModel.findOne({
        job: input.job
      })) || new LivestockAdjustmentModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: input.job,
      subdomain: navConfig.subdomain
    });

    return {
      success: true,
      livestockAdjustment: doc,
      defaults: userSettings
    };
  },
  async postLivestockAdjustment(
    _,
    { input },
    { user, dataSources, navConfig }
  ) {
    const job = await dataSources.navJob.getByNo(input.job);

    const [
      standardJournal
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Adjustment
    });

    if (!standardJournal) {
      throw Error(`Event ${input.event} not found.`);
    }

    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type:
          input.quantity >= 0 ? NavEntryType.Positive : NavEntryType.Negative,
        Document_No: getDocumentNumber("ADJ", user.name),
        Description: input.comments,
        Location_Code: standardJournal.Location_Code
          ? standardJournal.Location_Code
          : job.Site,
        Quantity: Math.abs(input.quantity),
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: standardJournal.Shortcut_Dimension_1_Code
          ? standardJournal.Shortcut_Dimension_1_Code
          : job.Entity,
        Shortcut_Dimension_2_Code: standardJournal.Shortcut_Dimension_2_Code
          ? standardJournal.Shortcut_Dimension_2_Code
          : job.Cost_Center
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: input.job,
      subdomain: navConfig.subdomain
    });

    const doc =
      (await LivestockAdjustmentModel.findOne({
        job: input.job
      })) || new LivestockAdjustmentModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, livestockAdjustment: doc, defaults: userSettings };
  }
};
