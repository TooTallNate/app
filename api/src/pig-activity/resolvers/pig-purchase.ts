import {
  MutationResolvers,
  QueryResolvers,
  PigPurchaseResolvers,
  PigPurchaseEventResolvers
} from "../../common/graphql";
import UserSettingsModel from "../../common/models/UserSettings";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigPurchaseModel from "../models/PigPurchase";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigPurchase: PigPurchaseResolvers = {
  job(pigPurchase, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigPurchase.job);
  },
  event(pigPurchase, _, { dataSources }) {
    if (pigPurchase.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: pigPurchase.event,
        template: NavItemJournalTemplate.Purchase
      });
    }
  }
};

export const PigPurchaseQueries: QueryResolvers = {
  async pigPurchase(_, { job }) {
    return (
      (await PigPurchaseModel.findOne({ job })) || new PigPurchaseModel({ job })
    );
  },
  async pigPurchaseEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Purchase
    );
  }
};

export const PigPurchaseEvent: PigPurchaseEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const PigPurchaseMutations: MutationResolvers = {
  async savePigPurchase(_, { input }, { user }) {
    const doc =
      (await PigPurchaseModel.findOne({
        job: input.job
      })) || new PigPurchaseModel();
    doc.set(input);
    await doc.save();

    const userSettings = await UserSettingsModel.findOne({
      username: user.username
    });

    return {
      success: true,
      pigPurchase: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  },
  async postPigPurchase(_, { input }, { user, dataSources }) {
    const [
      standardJournalLines
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Purchase
    });

    if (!standardJournalLines) {
      throw Error(`Event ${input.event} not found`);
    }

    const job = await dataSources.navJob.getByNo(input.job);

    await postItemJournal(
      {
        ...standardJournalLines,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("PURCH", user.name),
        Description: input.comments || " ",
        Location_Code: job.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: job.Entity,
        Shortcut_Dimension_2_Code: job.Cost_Center,
        Meta: input.smallPigQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username
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

    return {
      success: true,
      pigPurchase: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  }
};
