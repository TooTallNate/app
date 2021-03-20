import {
  MutationResolvers,
  QueryResolvers,
  PigGradeOffResolvers,
  PigGradeOffEventResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigGradeOffModel from "../models/PigGradeOff";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigGradeOff: PigGradeOffResolvers = {
  job(pigGradeOff, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigGradeOff.job);
  },
  quantities: pigGradeOff => pigGradeOff.quantities || [],
  event(pigGradeOff, _, { dataSources }) {
    if (pigGradeOff.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: pigGradeOff.event,
        template: NavItemJournalTemplate.GradeOff
      });
    }
  }
};

export const PigGradeOffQueries: QueryResolvers = {
  async pigGradeOff(_, { job }) {
    return (
      (await PigGradeOffModel.findOne({ job })) || new PigGradeOffModel({ job })
    );
  },
  async pigGradeOffEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.GradeOff
    );
  }
};

export const PigGradeOffEvent: PigGradeOffEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description,
  async reasons(pigGradeOffEventTypes, _, { dataSources }) {
    const lines = await dataSources.navItemJournal.getStandardJournalLines({
      code: pigGradeOffEventTypes.Code,
      template: NavItemJournalTemplate.GradeOff
    });
    let reasonCodes = lines.map(line => line.Reason_Code);
    return await dataSources.navConfig.getReasonCodeDescList(reasonCodes);
  }
};

export const PigGradeOffMutations: MutationResolvers = {
  async savePigGradeOff(_, { input }, { user, navConfig }) {
    const doc =
      (await PigGradeOffModel.findOne({
        job: input.job
      })) || new PigGradeOffModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      subdomain: navConfig.subdomain
    });

    return { success: true, pigGradeOff: doc, defaults: userSettings };
  },
  async postPigGradeOff(_, { input }, { user, dataSources, navConfig }) {
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
            Weight: input.pigWeight * entry.quantity,
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
      (await PigGradeOffModel.findOne({
        job: input.job
      })) || new PigGradeOffModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigGradeOff: doc, defaults: userSettings };
  }
};
