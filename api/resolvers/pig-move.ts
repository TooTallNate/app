import { MutationResolvers, QueryResolvers, PigMoveResolvers } from "./types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob
} from "../nav";
import { getDocumentNumber } from "./utils";
import PigMoveModel from "../models/PigMove";
import { findJob, postItemJournal, updateUserSettings } from "./pig-activity";

export const PigMove: PigMoveResolvers = {
  fromJob(pigMove, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", pigMove.fromJob)
      .get<NavJob>();
  },
  toJob(pigMove, _, { navClient }) {
    return (
      pigMove.toJob &&
      navClient
        .resource("Company", process.env.NAV_COMPANY)
        .resource("Jobs", pigMove.toJob)
        .get<NavJob>()
    );
  }
};

export const PigMoveQueries: QueryResolvers = {
  async pigMove(_, { job }) {
    return (await PigMoveModel.findOne({ job })) || new PigMoveModel({ job });
  }
};

export const PigMoveMutations: MutationResolvers = {
  async postPigMove(_, { input }, { user, navClient }) {
    const docNo = getDocumentNumber("MOVE", user.name);
    const from = await findJob(input.fromJob, navClient);
    const to = await findJob(input.toJob, navClient);
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Move,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.fromAnimal,
        Description: input.comments,
        Location_Code: from.job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.fromJob,
        Shortcut_Dimension_1_Code: from.entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: from.costCenterDimension.Dimension_Value_Code
      },
      navClient
    );
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Move,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Positive,
        Document_No: docNo,
        Item_No: input.toAnimal,
        Description: input.comments,
        Location_Code: to.job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.weight,
        Job_No: input.toJob,
        Shortcut_Dimension_1_Code: to.entityDimension.Dimension_Value_Code,
        Shortcut_Dimension_2_Code: to.costCenterDimension.Dimension_Value_Code
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.fromJob,
      price: input.price
    });

    const doc =
      (await PigMoveModel.findOne({
        fromJob: input.fromJob
      })) || new PigMoveModel();
    doc.overwrite({
      activity: doc.activity,
      fromJob: input.fromJob
    });
    await doc.save();

    return { success: true, pigMove: doc, defaults: userSettings };
  }
};
