import {
  MutationResolvers,
  QueryResolvers,
  LivestockGradeOffResolvers,
  LivestockGradeOffEventResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import LivestockGradeOffModel from "../models/LivestockGradeOff";
import { postItemJournal, updateUserSettings } from "./livestock-activity";

export const LivestockGradeOff: LivestockGradeOffResolvers = {
  job(livestockGradeOff, _, { dataSources }) {
    return dataSources.navJob.getByNo(livestockGradeOff.job);
  },
  quantities: livestockGradeOff => livestockGradeOff.quantities || [],
  event(livestockGradeOff, _, { dataSources }) {
    if (livestockGradeOff.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockGradeOff.event,
        template: NavItemJournalTemplate.GradeOff
      });
    }
  }
};

export const LivestockGradeOffQueries: QueryResolvers = {
  async livestockGradeOff(_, { job }) {
    return (
      (await LivestockGradeOffModel.findOne({ job })) ||
      new LivestockGradeOffModel({ job })
    );
  },
  async livestockGradeOffEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.GradeOff
    );
  }
};

export const LivestockGradeOffEvent: LivestockGradeOffEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description,
  async reasons(livestockGradeOffEventTypes, _, { dataSources }) {
    const lines = await dataSources.navItemJournal.getStandardJournalLines({
      code: livestockGradeOffEventTypes.Code,
      template: NavItemJournalTemplate.GradeOff
    });
    let reasonCodes = lines.map(line => line.Reason_Code);
    return await dataSources.navConfig.getReasonCodeDescList(reasonCodes);
  }
};

export const LivestockGradeOffMutations: MutationResolvers = {
  async saveLivestockGradeOff(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockGradeOffModel.findOne({
        job: input.job
      })) || new LivestockGradeOffModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: input.job,
      subdomain: navConfig.subdomain
    });

    return { success: true, livestockGradeOff: doc, defaults: userSettings };
  },
  async postLivestockGradeOff(_, { input }, { user, dataSources, navConfig }) {
    const standardJournalLines = await dataSources.navItemJournal.getStandardJournalLines(
      {
        code: input.event,
        template: NavItemJournalTemplate.GradeOff
      }
    );

    if (standardJournalLines.length === 0) {
      throw Error(`Event ${input.event} not found.`);
    }

    const job = await dataSources.navJob.getByNo(input.job);

    for (const entry of input.quantities) {
      const line = standardJournalLines.find(
        standardJournalLines => standardJournalLines.Reason_Code === entry.code
      );
      if (entry.quantity > 0 && line) {
        await postItemJournal(
          {
            ...line,
            Journal_Batch_Name: NavItemJournalBatch.FarmApp,
            Document_No: getDocumentNumber("GRDOFF", user.name),
            Description: input.comments,
            Location_Code: line.Location_Code ? line.Location_Code : job.Site,
            Quantity: entry.quantity,
            Weight: input.livestockWeight * entry.quantity,
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
      (await LivestockGradeOffModel.findOne({
        job: input.job
      })) || new LivestockGradeOffModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, livestockGradeOff: doc, defaults: userSettings };
  }
};
