import {
  MutationResolvers,
  QueryResolvers,
  PigPurchaseResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigPurchaseModel from "../models/PigPurchase";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigPurchase: PigPurchaseResolvers = {
  job(pigPurchase, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigPurchase.job);
  }
};

export const PigPurchaseQueries: QueryResolvers = {
  async pigPurchase(_, { job }) {
    return (
      (await PigPurchaseModel.findOne({ job })) || new PigPurchaseModel({ job })
    );
  }
};

export const PigPurchaseMutations: MutationResolvers = {
  async savePigPurchase(_, { input }, { user }) {
    const doc =
      (await PigPurchaseModel.findOne({
        job: input.job
      })) || new PigPurchaseModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      ...(input.animal && { animal: input.animal }),
      ...(input.price && { price: input.price })
    });

    return { success: true, pigPurchase: doc, defaults: userSettings };
  },
  async postPigPurchase(_, { input }, { user, dataSources }) {
    const job = await dataSources.navJob.getByNo(input.job);
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Wean,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Positive,
        Document_No: getDocumentNumber("PURCH", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.totalWeight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: job.Entity,
        Shortcut_Dimension_2_Code: job.Cost_Center,
        Meta: input.smallPigQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      animal: input.animal,
      price: input.price
    });

    const doc =
      (await PigPurchaseModel.findOne({
        job: input.job
      })) || new PigPurchaseModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigPurchase: doc, defaults: userSettings };
  }
};
