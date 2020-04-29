import {
  MutationResolvers,
  QueryResolvers,
  PigAdjustmentResolvers
} from "./types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob
} from "../nav";
import { getDocumentNumber } from "./utils";
import PigAdjustmentModel from "../models/PigAdjustment";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigAdjustment: PigAdjustmentResolvers = {
  job(pigAdjustment, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", pigAdjustment.job)
      .get<NavJob>();
  }
};

export const PigAdjustmentQueries: QueryResolvers = {
  async pigAdjustment(_, { job }) {
    return (
      (await PigAdjustmentModel.findOne({ job })) ||
      new PigAdjustmentModel({ job })
    );
  }
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
      pigJob: input.job,
      ...(input.price && { price: input.price })
    });

    return { success: true, pigAdjustment: doc, defaults: userSettings };
  },
  async postPigAdjustment(_, { input }, { user, navClient }) {
    const job = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", input.job)
      .get<NavJob>();

    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Adjustment,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type:
          input.quantity >= 0 ? NavEntryType.Positive : NavEntryType.Negative,
        Document_No: getDocumentNumber("ADJ", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: Math.abs(input.quantity),
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: job.Entity,
        Shortcut_Dimension_2_Code: job.Cost_Center
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      price: input.price
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