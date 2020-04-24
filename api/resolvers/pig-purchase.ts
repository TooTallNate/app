import {
  MutationResolvers,
  QueryResolvers,
  PigPurchaseResolvers
} from "./types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob
} from "../nav";
import { getDocumentNumber } from "./utils";
import PigPurchaseModel from "../models/PigPurchase";
import { findJob, postItemJournal, updateUserSettings } from "./pig-activity";

export const PigPurchase: PigPurchaseResolvers = {
  job(pigPurchase, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2", pigPurchase.job)
      .get<NavJob>();
  }
};

export const PigPurchaseQueries: QueryResolvers = {
  async pigPurchase(_, { job }) {
    return (
      (await PigPurchaseModel.findOne({ job })) || new PigPurchaseModel({ job })
    );
  }
};

export const PigPurchaseMutations: MutationResolvers = {
  async savePigPurchase(_, { input }, { user }) {
    const doc =
      (await PigPurchaseModel.findOne({
        job: input.job
      })) || new PigPurchaseModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      ...(input.price && { price: input.price })
    });

    return { success: true, pigPurchase: doc, defaults: userSettings };
  },
  async postPigPurchase(_, { input }, { user, navClient }) {
    const job = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2", input.job)
      .get<NavJob>();
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Wean,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Positive,
        Document_No: getDocumentNumber("PURCH", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
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
      price: input.price
    });

    const doc =
      (await PigPurchaseModel.findOne({
        job: input.job
      })) || new PigPurchaseModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigPurchase: doc, defaults: userSettings };
  }
};
