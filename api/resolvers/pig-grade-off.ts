import {
  MutationResolvers,
  QueryResolvers,
  PigGradeOffResolvers
} from "./types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob
} from "../nav";
import { getDocumentNumber } from "./utils";
import PigGradeOffModel from "../models/PigGradeOff";
import { findJob, postItemJournal, updateUserSettings } from "./pig-activity";

export const PigGradeOff: PigGradeOffResolvers = {
  job(pigGradeoff, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", pigGradeoff.job)
      .get<NavJob>();
  }
};

export const PigGradeOffQueries: QueryResolvers = {
  async pigGradeOff(_, { job }) {
    return (
      (await PigGradeOffModel.findOne({ job })) || new PigGradeOffModel({ job })
    );
  }
};

export const PigGradeOffMutations: MutationResolvers = {
  async postPigGradeOff(_, { input }, { user, navClient }) {
    const { job, costCenterDimension, entityDimension } = await findJob(
      input.job,
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.GradeOff,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Negative,
        Document_No: getDocumentNumber("GRDOFF", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job,
      price: input.price
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
