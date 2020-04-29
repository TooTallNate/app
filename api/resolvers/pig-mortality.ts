import {
  MutationResolvers,
  QueryResolvers,
  PigMortalityResolvers
} from "./types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob
} from "../nav";
import { getDocumentNumber } from "./utils";
import PigMortalityModel from "../models/PigMortality";
import { findJob, postItemJournal, updateUserSettings } from "./pig-activity";

export const PigMortality: PigMortalityResolvers = {
  job(pigMortality, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", pigMortality.job)
      .get<NavJob>();
  }
};

export const PigMortalityQueries: QueryResolvers = {
  async pigMortality(_, { job }) {
    return (
      (await PigMortalityModel.findOne({ job })) ||
      new PigMortalityModel({ job })
    );
  }
};

export const PigMortalityMutations: MutationResolvers = {
  async savePigMortality(_, { input }, { user }) {
    const doc =
      (await PigMortalityModel.findOne({
        job: input.job
      })) || new PigMortalityModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      ...(input.price && { price: input.price })
    });

    return { success: true, pigMortality: doc, defaults: userSettings };
  },
  async postPigMortality(_, { input }, { user, navClient }) {
    const docNo = getDocumentNumber("MORT", user.name);
    const job = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", input.job)
      .get<NavJob>();
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Mortality,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.naturalQuantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: job.Entity,
        Shortcut_Dimension_2_Code: job.Cost_Center
      },
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Mortality,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.euthanizedQuantity,
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
      (await PigMortalityModel.findOne({
        job: input.job
      })) || new PigMortalityModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigMortality: doc, defaults: userSettings };
  }
};
