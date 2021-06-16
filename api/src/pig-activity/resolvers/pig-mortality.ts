import { format, formatDistanceToNowStrict } from "date-fns";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import {
  MutationResolvers,
  PigMortalityEventResolvers,
  PigMortalityResolvers,
  QueryResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDateFromWeekNumber, getDocumentNumber } from "../../common/utils";
import PigMortalityModel from "../models/PigMortality";
import { postItemJournal, updateUserSettings } from "./pig-activity";

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
  async savePigMortality(_, { input }, { user, navConfig }) {
    const doc =
      (await PigMortalityModel.findOne({
        job: input.job
      })) || new PigMortalityModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      subdomain: navConfig.subdomain
    });

    return { success: true, pigMortality: doc, defaults: userSettings };
  },
  async postPigMortality(_, { input }, { user, dataSources, navConfig }) {
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

    let tempWeeks;

    try {
      const jobYear = Number("20" + job.No.substring(0, 2));
      const jobWeek = Number(job.No.substring(2, 4));
      const date = getDateFromWeekNumber(jobWeek, jobYear);
      const startDate = lastDayOfWeek(date, { weekStartsOn: 2 });
      const groupStartDate = format(startDate, "yyyy-MM-dd");
      const diff = formatDistanceToNowStrict(new Date(groupStartDate), {
        unit: "day"
      }).split(" ")[0];
      tempWeeks = Math.min(24, Math.floor(Math.ceil(Number(diff)) / 7));
    } catch {
      tempWeeks = 24;
      console.log("Date unable to be parsed");
    }
    const resourceNo = `${tempWeeks}MORTALITY`;
    const resource = await dataSources.navResource.getByCode(resourceNo);
    const weight = Number(resource.Unit_Price);

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
            Location_Code: line.Location_Code ? line.Location_Code : job.Site,
            Quantity: entry.quantity,
            Weight: entry.quantity * weight,
            Posting_Date: input.postingDate,
            Job_No: input.job,
            Shortcut_Dimension_1_Code: line.Shortcut_Dimension_1_Code
              ? line.Shortcut_Dimension_1_Code
              : job.Entity,
            Shortcut_Dimension_2_Code: line.Shortcut_Dimension_2_Code
              ? line.Shortcut_Dimension_2_Code
              : job.Cost_Center
          },
          dataSources.navItemJournal
        );
      }
    }

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      subdomain: navConfig.subdomain
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
