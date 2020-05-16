import {
  MutationResolvers,
  QueryResolvers,
  PigMoveResolvers
} from "../../resolvers/types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob
} from "../../nav";
import { getDocumentNumber } from "../../resolvers/utils";
import PigMoveModel from "../models/PigMove";
import { postItemJournal, updateUserSettings } from "./pig-activity";

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
  async pigMove(_, { job: fromJob }) {
    return (
      (await PigMoveModel.findOne({ fromJob })) || new PigMoveModel({ fromJob })
    );
  }
};

export const PigMoveMutations: MutationResolvers = {
  async savePigMove(_, { input }, { user }) {
    const doc =
      (await PigMoveModel.findOne({
        fromJob: input.fromJob
      })) || new PigMoveModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.fromJob,
      ...(input.price && { price: input.price })
    });

    return { success: true, pigMove: doc, defaults: userSettings };
  },
  async postPigMove(_, { input }, { user, navClient }) {
    const docNo = getDocumentNumber("MOVE", user.name);
    const fromJob = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", input.fromJob)
      .get<NavJob>();
    const toJob = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", input.toJob)
      .get<NavJob>();
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Move,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Item_No: input.fromAnimal,
        Description: input.comments,
        Location_Code: fromJob.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Job_No: input.fromJob,
        Shortcut_Dimension_1_Code: fromJob.Entity,
        Shortcut_Dimension_2_Code: fromJob.Cost_Center
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
        Location_Code: toJob.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.totalWeight,
        Job_No: input.toJob,
        Shortcut_Dimension_1_Code: toJob.Entity,
        Shortcut_Dimension_2_Code: toJob.Cost_Center,
        Meta: input.smallPigQuantity
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
