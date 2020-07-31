import {
  MutationResolvers,
  QueryResolvers,
  PigWeanResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavStandardItemJournal
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigWeanModel from "../models/PigWean";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigWean: PigWeanResolvers = {
  job(pigWean, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigWean.job);
  } //,
  // event() {
  //   // Request standard journal from NAV
  // }
};

export const PigWeanQueries: QueryResolvers = {
  async pigWean(_, { job }) {
    return (await PigWeanModel.findOne({ job })) || new PigWeanModel({ job });
  },
  async pigWeanEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Wean
    );
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
      ...(input.animal && { animal: input.animal }),
      ...(input.price && { price: input.price })
    });

    return { success: true, pigWean: doc, defaults: userSettings };
  },
  async postPigWean(_, { input }, { user, dataSources }) {
    const [
      standardJournal
    ] = (await dataSources.navItemJournal.getStandardJournal({
      code: input.event,
      template: NavItemJournalTemplate.Wean
    })) as any;

    const job = await dataSources.navJob.getByNo(input.job);
    console.log({
      ...standardJournal,
      Journal_Batch_Name: NavItemJournalBatch.FarmApp,
      Document_No: getDocumentNumber("WEAN", user.name),
      Item_No: input.animal,
      Description: input.comments,
      Location_Code: job.Site,
      Quantity: input.quantity,
      Unit_Amount: input.price,
      Weight: input.totalWeight,
      Job_No: input.job,
      Meta: input.smallPigQuantity
    });
    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("WEAN", user.name),
        Item_No: input.animal,
        Description: input.comments,
        Location_Code: job.Site,
        Quantity: input.quantity,
        Unit_Amount: input.price,
        Weight: input.totalWeight,
        Job_No: input.job,
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
