import {
  MutationResolvers,
  QueryResolvers,
  LivestockMoveResolvers,
  LivestockMoveEventResolvers
} from "../../common/graphql";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType
} from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import LivestockMoveModel from "../models/LivestockMove";
import { postItemJournal, updateUserSettings } from "./livestock-activity";

export const LivestockMove: LivestockMoveResolvers = {
  fromJob(livestockMove, _, { dataSources }) {
    return dataSources.navJob.getJobLivestockByNo(livestockMove.fromJob);
  },
  toJob(livestockMove, _, { dataSources }) {
    if (livestockMove.toJob) {
      return dataSources.navJob.getJobLivestockByNo(livestockMove.toJob);
    }
  },
  event(livestockMove, _, { dataSources }) {
    if (livestockMove.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockMove.event,
        template: NavItemJournalTemplate.Move
      });
    }
  }
};

export const LivestockMoveQueries: QueryResolvers = {
  async livestockMove(_, { job: fromJob }) {
    return (
      (await LivestockMoveModel.findOne({ fromJob })) ||
      new LivestockMoveModel({ fromJob })
    );
  },
  async livestockMoveEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Move
    );
  }
};

export const LivestockMoveEvent: LivestockMoveEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const LivestockMoveMutations: MutationResolvers = {
  async saveLivestockMove(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockMoveModel.findOne({
        fromJob: input.fromJob
      })) || new LivestockMoveModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: input.fromJob,
      subdomain: navConfig.subdomain
    });

    return { success: true, livestockMove: doc, defaults: userSettings };
  },
  async postLivestockMove(_, { input }, { user, dataSources, navConfig }) {
    const standardJournal = await dataSources.navItemJournal.getStandardJournalLines(
      {
        code: input.event,
        template: NavItemJournalTemplate.Move
      }
    );

    const standardJournalPos = standardJournal.find(
      item => item.Entry_Type === NavEntryType.Positive
    );

    const standardJournalNeg = standardJournal.find(
      item => item.Entry_Type === NavEntryType.Negative
    );

    if (!standardJournalNeg || !standardJournalPos) {
      throw Error(`Event ${input.event} not found.`);
    }

    const docNo = getDocumentNumber("MOVE", user.name);
    const fromJob = await dataSources.navJob.getJobLivestockByNo(input.fromJob);
    const toJob = await dataSources.navJob.getJobLivestockByNo(input.toJob);

    await postItemJournal(
      {
        ...standardJournalNeg,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: docNo,
        Description: input.comments,
        Location_Code: standardJournalNeg.Location_Code
          ? standardJournalNeg.Location_Code
          : fromJob.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.fromJob,
        Shortcut_Dimension_1_Code: standardJournalNeg.Shortcut_Dimension_1_Code
          ? standardJournalNeg.Shortcut_Dimension_1_Code
          : fromJob.Entity,
        Shortcut_Dimension_2_Code: standardJournalNeg.Shortcut_Dimension_2_Code
          ? standardJournalNeg.Shortcut_Dimension_2_Code
          : fromJob.Cost_Center
      },
      dataSources.navItemJournal
    );
    await postItemJournal(
      {
        ...standardJournalPos,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: docNo,
        Description: input.comments,
        Location_Code: toJob.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.toJob,
        Shortcut_Dimension_1_Code: standardJournalPos.Shortcut_Dimension_1_Code
          ? standardJournalPos.Shortcut_Dimension_1_Code
          : fromJob.Entity,
        Shortcut_Dimension_2_Code: standardJournalPos.Shortcut_Dimension_2_Code
          ? standardJournalPos.Shortcut_Dimension_2_Code
          : fromJob.Cost_Center,
        Meta: input.smallLivestockQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: input.fromJob,
      subdomain: navConfig.subdomain
    });

    const doc =
      (await LivestockMoveModel.findOne({
        fromJob: input.fromJob
      })) || new LivestockMoveModel();
    doc.overwrite({
      activity: doc.activity,
      fromJob: input.fromJob
    });
    await doc.save();

    return { success: true, livestockMove: doc, defaults: userSettings };
  }
};
