import { format, formatDistanceToNowStrict } from "date-fns";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import {
  MutationResolvers,
  LivestockMortalityEventResolvers,
  LivestockMortalityResolvers,
  QueryResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDateFromWeekNumber, getDocumentNumber } from "../../common/utils";
import LivestockMortalityModel from "../models/LivestockMortality";
import { postItemJournal, updateUserSettings } from "./livestock-activity";

export const LivestockMortality: LivestockMortalityResolvers = {
  job(livestockMortality, _, { dataSources }) {
    return dataSources.navJob.getJobLivestockByNo(livestockMortality.job);
  },
  quantities: livestockMortality => livestockMortality.quantities || [],
  event(livestockMortality, _, { dataSources }) {
    if (livestockMortality.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockMortality.event,
        template: NavItemJournalTemplate.Mortality
      });
    }
  }
};

export const LivestockMortalityQueries: QueryResolvers = {
  async livestockMortality(_, { job }) {
    return (
      (await LivestockMortalityModel.findOne({ job })) ||
      new LivestockMortalityModel({ job })
    );
  },
  async livestockMortalityEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Mortality
    );
  }
};

export const LivestockMortalityEvent: LivestockMortalityEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description,
  async reasons(livestockMortalityEventTypes, _, { dataSources }) {
    const lines = await dataSources.navItemJournal.getStandardJournalLines({
      code: livestockMortalityEventTypes.Code,
      template: NavItemJournalTemplate.Mortality
    });
    let reasonCodes = lines.map(line => line.Reason_Code);

    return await dataSources.navConfig.getReasonCodeDescList(reasonCodes);
  }
};

export const LivestockMortalityMutations: MutationResolvers = {
  async saveLivestockMortality(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockMortalityModel.findOne({
        job: input.job
      })) || new LivestockMortalityModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: input.job,
      subdomain: navConfig.subdomain
    });

    return { success: true, livestockMortality: doc, defaults: userSettings };
  },
  async postLivestockMortality(_, { input }, { user, dataSources, navConfig }) {
    const standardJournalLines = await dataSources.navItemJournal.getStandardJournalLines(
      {
        code: input.event,
        template: NavItemJournalTemplate.Mortality
      }
    );

    if (standardJournalLines.length === 0) {
      throw Error(`Event ${input.event} not found.`);
    }

    const job = await dataSources.navJob.getJobLivestockByNo(input.job);

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
      livestockJob: input.job,
      subdomain: navConfig.subdomain
    });

    const doc =
      (await LivestockMortalityModel.findOne({
        job: input.job
      })) || new LivestockMortalityModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, livestockMortality: doc, defaults: userSettings };
  }
};
