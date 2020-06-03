import {
  MutationResolvers,
  QueryResolvers,
  PigWeanResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigWeanModel from "../models/PigWean";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigWean: PigWeanResolvers = {
  job(pigWean, _, { dataSources }) {
    return dataSources.pigJobNavApi.getByNo(pigWean.job);
  }
};

export const PigWeanQueries: QueryResolvers = {
  async pigWean(_, { job }) {
    return (await PigWeanModel.findOne({ job })) || new PigWeanModel({ job });
  }
};

export const PigWeanMutations: MutationResolvers = {
  async savePigWean(_, { input }, { user }) {
    const doc =
      (await PigWeanModel.findOne({
        job: input.job
      })) || new PigWeanModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      ...(input.price && { price: input.price })
    });

    return { success: true, pigWean: doc, defaults: userSettings };
  },
  async postPigWean(_, { input }, { user, dataSources, navClient }) {
    const job = await dataSources.pigJobNavApi.getByNo(input.job);
    await postItemJournal(
      {
        Journal_Template_Name: NavItemJournalTemplate.Wean,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Positive,
        Document_No: getDocumentNumber("WEAN", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.totalWeight,
        Job_No: input.job,
        Gen_Prod_Posting_Group: "WEAN PIGS",
        Shortcut_Dimension_1_Code: "2",
        Shortcut_Dimension_2_Code: "213",
        Meta: input.smallPigQuantity
      },
      navClient
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      price: input.price
    });

    const doc =
      (await PigWeanModel.findOne({
        job: input.job
      })) || new PigWeanModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigWean: doc, defaults: userSettings };
  }
};
