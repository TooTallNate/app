import {
  MutationResolvers,
  QueryResolvers,
  PigAdjustmentResolvers,
  PigAdjustmentEventResolvers
} from "../../common/graphql";
import UserSettingsModel from "../../common/models/UserSettings";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigAdjustmentModel from "../models/PigAdjustment";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigAdjustment: PigAdjustmentResolvers = {
  job(pigAdjustment, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigAdjustment.job);
  },
  event(pigAdjustment, _, { dataSources }) {
    if (pigAdjustment.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: pigAdjustment.event,
        template: NavItemJournalTemplate.Adjustment
      });
    }
  }
};

export const PigAdjustmentQueries: QueryResolvers = {
  async pigAdjustment(_, { job }) {
    return (
      (await PigAdjustmentModel.findOne({ job })) ||
      new PigAdjustmentModel({ job })
    );
  },
  async pigAdjustmentEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Adjustment
    );
  }
};

export const PigAdjustmentEvent: PigAdjustmentEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const PigAdjustmentMutations: MutationResolvers = {
  async savePigAdjustment(_, { input }, { user }) {
    const doc =
      (await PigAdjustmentModel.findOne({
        job: input.job
      })) || new PigAdjustmentModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job
    });

    return {
      success: true,
      pigAdjustment: doc,
      defaults: userSettings
    };
  },
  async postPigAdjustment(_, { input }, { user, dataSources }) {
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
        Location_Code: job.Site,
        Quantity: Math.abs(input.quantity),
        Weight: input.totalWeight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: job.Entity,
        Shortcut_Dimension_2_Code: job.Cost_Center
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job
    });

    const doc =
      (await PigAdjustmentModel.findOne({
        job: input.job
      })) || new PigAdjustmentModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigAdjustment: doc, defaults: userSettings };
  }
};
