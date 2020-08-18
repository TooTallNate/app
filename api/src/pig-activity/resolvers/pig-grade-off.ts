import {
  MutationResolvers,
  QueryResolvers,
  PigGradeOffResolvers,
  PigGradeOffEventResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavReason,
  NavReasonCode
} from "../../common/nav";
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
  async pigGradeOffReasons(_, __, { dataSources }) {
    return dataSources.navConfig.getReasonCodes("GR-");
  },
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
  reasons: journal => {
    // 1. Fetch the journal lines from NAV.
    // 2. Extract reason codes
    // 3. Fetch the reason objects from NAV.
    return [];
  }
};

export const PigGradeOffMutations: MutationResolvers = {
  async savePigGradeOff(_, { input }, { user }) {
    const doc =
      (await PigGradeOffModel.findOne({
        job: input.job
      })) || new PigGradeOffModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job
    });

    return { success: true, pigGradeOff: doc, defaults: userSettings };
  },
  async postPigGradeOff(_, { input }, { user, dataSources }) {
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
      const line = {}; // use input.code to select the line from the standardJournalLines
      if (entry.quantity > 0 && line) {
        await postItemJournal(
          {
            ...line,
            Journal_Batch_Name: NavItemJournalBatch.FarmApp,
            Entry_Type: NavEntryType.Negative,
            Document_No: getDocumentNumber("GRDOFF", user.name),
            Description: input.comments,
            Location_Code: job.Site,
            Quantity: entry.quantity,
            Weight: input.pigWeight * entry.quantity,
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
