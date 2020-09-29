import {
  MutationResolvers,
  QueryResolvers,
  PigMoveResolvers,
  PigMoveEventResolvers
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
  },
  event(pigMove, _, { dataSources }) {
    if (pigMove.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: pigMove.event,
        template: NavItemJournalTemplate.Move
      });
    }
  }
};

export const PigMoveQueries: QueryResolvers = {
  async pigMove(_, { job: fromJob }) {
    return (
      (await PigMoveModel.findOne({ fromJob })) || new PigMoveModel({ fromJob })
    );
  },
  async pigMoveEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Move
    );
  }
};

export const PigMoveEvent: PigMoveEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
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
      username: user.username
    });

    return { success: true, pigMove: doc, defaults: userSettings };
  },
  async postPigMove(_, { input }, { user, dataSources }) {
    const [
      standardJournal
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Move
    });

    if (!standardJournal) {
      throw Error(`Event ${input.event} not found.`);
    }

    const docNo = getDocumentNumber("MOVE", user.name);
    const fromJob = await dataSources.navJob.getByNo(input.fromJob);
    const toJob = await dataSources.navJob.getByNo(input.toJob);
    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Negative,
        Document_No: docNo,
        Description: input.comments,
        Location_Code: fromJob.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Job_No: input.fromJob
      },
      dataSources.navItemJournal
    );
    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Entry_Type: NavEntryType.Positive,
        Document_No: docNo,
        Description: input.comments,
        Location_Code: toJob.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Job_No: input.toJob,
        Meta: input.smallPigQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await updateUserSettings({
      username: user.username
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
