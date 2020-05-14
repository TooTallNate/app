import {
  MutationResolvers,
  QueryResolvers,
  PigGradeOffResolvers
} from "./types";
import {
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavEntryType,
  NavJob,
  NavReason,
  NavReasonCode
} from "../nav";
import { getDocumentNumber } from "./utils";
import PigGradeOffModel from "../models/PigGradeOff";
import { postItemJournal, updateUserSettings } from "./pig-activity";

export const PigGradeOff: PigGradeOffResolvers = {
  job(pigGradeoff, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", pigGradeoff.job)
      .get<NavJob>();
  }
};

export const PigGradeOffQueries: QueryResolvers = {
  async pigGradeOffReasons(_, __, { navClient }) {
    return await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("ReasonCodes")
      .get<NavReason[]>()
      .filter(f => f.startsWith("Code", "GR-"));
  },
  async pigGradeOff(_, { job }) {
    return (
      (await PigGradeOffModel.findOne({ job })) || new PigGradeOffModel({ job })
    );
  }
};

export const PigGradeOffMutations: MutationResolvers = {
  async savePigGradeOff(_, { input }, { user }) {
    const doc =
      (await PigGradeOffModel.findOne({
        job: input.job
      })) || new PigGradeOffModel();
    doc.set(input);
    await doc.save();

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job
    });

    return { success: true, pigGradeOff: doc, defaults: userSettings };
  },
  async postPigGradeOff(_, { input }, { user, navClient }) {
    const job = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", input.job)
      .get<NavJob>();

    async function postGradeOff(
      reason: NavReasonCode,
      quantity?: number
    ): Promise<void> {
      if (quantity > 0) {
        await postItemJournal(
          {
            Journal_Template_Name: NavItemJournalTemplate.GradeOff,
            Journal_Batch_Name: NavItemJournalBatch.FarmApp,
            Entry_Type: NavEntryType.Negative,
            Document_No: getDocumentNumber("GRDOFF", user.name),
            Item_No: input.animal,
            Description: input.comments,
            Location_Code: job.Site,
            Reason_Code: reason,
            Quantity: quantity,
            Weight: input.pigWeight * quantity,
            Job_No: input.job,
            Shortcut_Dimension_1_Code: job.Entity,
            Shortcut_Dimension_2_Code: job.Cost_Center
          },
          navClient
        );
      }
    }

    await postGradeOff(
      NavReasonCode.GradeOffBellyRupture,
      input.bellyRuptureQuantity
    );
    await postGradeOff(NavReasonCode.GradeOffLame, input.lameQuantity);
    await postGradeOff(
      NavReasonCode.GradeOffRespitory,
      input.respitoryQuantity
    );
    await postGradeOff(NavReasonCode.GradeOffScours, input.scoursQuantity);
    await postGradeOff(
      NavReasonCode.GradeOffScrotumRupture,
      input.scrotumRuptureQuantity
    );
    await postGradeOff(NavReasonCode.GradeOffSmall, input.smallQuantity);
    await postGradeOff(
      NavReasonCode.GradeOffUnthrifty,
      input.unthriftyQuantity
    );

    const userSettings = await updateUserSettings({
      username: user.username,
      pigJob: input.job
    });

    const doc =
      (await PigGradeOffModel.findOne({
        job: input.job
      })) || new PigGradeOffModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return { success: true, pigGradeOff: doc, defaults: userSettings };
  }
};
