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
import { getDocumentNumber, parseNavDate } from "./utils";
import PigMortalityModel from "../models/PigMortality";
import { postItemJournal, updateUserSettings } from "./pig-activity";
import { differenceInDays } from "date-fns";

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
    const startWeight = 0.8 * (job.Start_Weight / job.Start_Quantity);
    const growthFactor = job.Barn_Type === "Nursery" ? 0.5 : 1.5;
    const barnDays = differenceInDays(new Date(), parseNavDate(job.Start_Date));
    const weight = startWeight + growthFactor * barnDays;
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
        Weight: input.naturalQuantity * weight,
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
        Weight: input.euthanizedQuantity * weight,
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
