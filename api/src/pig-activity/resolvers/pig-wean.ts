import {
  MutationResolvers,
  QueryResolvers,
  PigWeanResolvers,
  PigWeanEventResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import PigWeanModel from "../models/PigWean";
import UserSettingsModel from "../../common/models/UserSettings";
import { postItemJournal } from "./pig-activity";

export const PigWean: PigWeanResolvers = {
  job(pigWean, _, { dataSources }) {
    return dataSources.navJob.getByNo(pigWean.job);
  },
  event(pigWean, _, { dataSources }) {
    if (pigWean.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: pigWean.event,
        template: NavItemJournalTemplate.Wean
      });
    }
  }
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

export const PigWeanEvent: PigWeanEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const PigWeanMutations: MutationResolvers = {
  async savePigWean(_, { input }, { user, navConfig }) {
    const doc =
      (await PigWeanModel.findOne({
        job: input.job
      })) || new PigWeanModel();
    doc.set(input);
    await doc.save();

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    return {
      success: true,
      pigWean: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  },
  async postPigWean(_, { input }, { user, dataSources, navConfig }) {
    const [
      standardJournal
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Wean
    });

    if (!standardJournal) {
      throw Error(`Event ${input.event} not found.`);
    }

    const job = await dataSources.navJob.getByNo(input.job);
    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("WEAN", user.name),
        Description: input.comments,
        Location_Code: standardJournal.Location_Code
          ? standardJournal.Location_Code
          : job.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.job,
        Meta: input.smallPigQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
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

    return {
      success: true,
      pigWean: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  }
};
