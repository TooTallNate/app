import {
  MutationResolvers,
  QueryResolvers,
  PigMortalityResolvers,
  PigMortalityEventResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber, parseNavDate } from "../../common/utils";
import PigMortalityModel from "../models/PigMortality";
import { postItemJournal, updateUserSettings } from "./pig-activity";
import { differenceInDays } from "date-fns";
import { LinkedErrors } from "@sentry/node/dist/integrations";

export const PigMortality: PigMortalityResolvers = {
  job(pigMortality, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigMortality.job);
  },
  quantities: pigMortality => pigMortality.quantities || [],
  event(pigMortality, _, { dataSources }) {
    if (pigMortality.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: pigMortality.event,
        template: NavItemJournalTemplate.Mortality
      });
    }
  }
};

export const PigMortalityQueries: QueryResolvers = {
  async pigMortality(_, { job }) {
    console.log(await PigMortalityModel.findOne({ job }));
    return (
      (await PigMortalityModel.findOne({ job })) ||
      new PigMortalityModel({ job })
    );
  },
  async pigMortalityEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Mortality
    );
  }
};

export const PigMortalityEvent: PigMortalityEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description,
  async reasons(pigMortalityEventTypes, _, { dataSources }) {
    const lines = await dataSources.navItemJournal.getStandardJournalLines({
      code: pigMortalityEventTypes.Code,
      template: NavItemJournalTemplate.Mortality
    });
    let reasonCodes = lines.map(line => line.Reason_Code);

    return await dataSources.navConfig.getReasonCodeDescList(reasonCodes);
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
      pigJob: input.job
    });

    return { success: true, pigMortality: doc, defaults: userSettings };
  },
  async postPigMortality(_, { input }, { user, dataSources }) {
    const standardJournalLines = await dataSources.navItemJournal.getStandardJournalLines(
      {
        code: input.event,
        template: NavItemJournalTemplate.Mortality
      }
    );

    if (standardJournalLines.length === 0) {
      throw Error(`Event ${input.event} not found.`);
    }

    const job = await dataSources.navJob.getByNo(input.job);
    const startWeight = 0.8 * (job.Start_Weight / job.Start_Quantity);
    const growthFactor = job.Barn_Type === "Nursery" ? 0.5 : 1.5;
    const barnDays = differenceInDays(new Date(), parseNavDate(job.Start_Date));
    const weight = startWeight + growthFactor * barnDays;

    for (const entry of input.quantities) {
      const line = standardJournalLines.find(
        standardJournalLines => standardJournalLines.Reason_Code === entry.code
      );
      if (entry.quantity > 0 && line) {
        await postItemJournal(
          {
            ...line,
            Journal_Batch_Name: NavItemJournalBatch.FarmApp,
            Document_No: getDocumentNumber("MORT", user.name),
            Description: input.comments,
            Location_Code: job.Site,
            Quantity: entry.quantity,
            Weight: entry.quantity * weight,
            Job_No: input.job,
            Shortcut_Dimension_1_Code: job.Entity,
            Shortcut_Dimension_2_Code: job.Cost_Center
          },
          dataSources.navItemJournal
        );
      }
    }
    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job
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
