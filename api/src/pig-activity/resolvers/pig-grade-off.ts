import {
  MutationResolvers,
  QueryResolvers,
  PigGradeOffResolvers
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
  quantities: pigGradeOff => pigGradeOff.quantities || []
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
    const job = await dataSources.navJob.getByNo(input.job);

    for (const entry of input.quantities) {
      if (entry.quantity > 0) {
        await postItemJournal(
          {
            Journal_Template_Name: NavItemJournalTemplate.GradeOff,
            Journal_Batch_Name: NavItemJournalBatch.FarmApp,
            Entry_Type: NavEntryType.Negative,
            Document_No: getDocumentNumber("GRDOFF", user.name),
            Item_No: input.animal,
            Description: input.comments,
            Location_Code: job.Site,
            Reason_Code: entry.code as NavReasonCode,
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
