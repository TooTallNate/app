import {
  MutationResolvers,
  QueryResolvers,
  PigMoveResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigMoveModel from "../models/PigMove";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigMove: PigMoveResolvers = {
  fromJob(pigMove, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigMove.fromJob);
  },
  toJob(pigMove, _, { dataSources }) {
    if (pigMove.toJob) {
      return dataSources.navJob.getByNo(pigMove.toJob);
    }
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
  async postPigMove(_, { input }, { user, dataSources, navClient }) {
    const docNo = getDocumentNumber("MOVE", user.name);
    const fromJob = await dataSources.navJob.getByNo(input.fromJob);
    const toJob = await dataSources.navJob.getByNo(input.toJob);
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
