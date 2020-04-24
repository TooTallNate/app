import {
  MutationResolvers,
  QueryResolvers,
  ScorecardEntry,
  FarrowingBackendScorecardResolvers
} from "./types";
import {
  NavJob,
  NavJobJournalEntry,
  NavResource,
  ODataClient,
  NavJobJournalTemplate,
  NavJobJournalBatch,
  JobTaskNumber,
  WorkTypeCode
} from "../nav";
import { navDate, getDocumentNumber } from "./utils";
import FarrowingBackendScorecardModel from "../models/FarrowingBackendScorecard";

function postJobJournal(
  entry: Partial<NavJobJournalEntry>,
  navClient: ODataClient
): Promise<NavJobJournalEntry> {
  const date = navDate(new Date());
  entry.Posting_Date = date;
  entry.Document_Date = date;
  return navClient
    .resource("Company", process.env.NAV_COMPANY)
    .resource("JobJournal")
    .post(entry);
}

export const FarrowingBackendScorecard: FarrowingBackendScorecardResolvers = {
  area(scorecard, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2", scorecard.area)
      .get<NavJob>();
  },
  operator(scorecard, _, { navClient }) {
    return scorecard.operator
      ? navClient
          .resource("Company", process.env.NAV_COMPANY)
          .resource("Resources", scorecard.operator)
          .get<NavResource>()
      : null;
  },
  sows: scorecard => scorecard.sows || {},
  piglets: scorecard => scorecard.piglets || {},
  feed: scorecard => scorecard.feed || {},
  water: scorecard => scorecard.water || {},
  crate: scorecard => scorecard.crate || {},
  room: scorecard => scorecard.room || {}
};

export const ScorecardQueries: QueryResolvers = {
  async farrowingBackendScorecard(_, { area }) {
    return (
      (await FarrowingBackendScorecardModel.findOne({ area })) ||
      new FarrowingBackendScorecardModel({ area })
    );
  },
  farrowingBackendAreas(_, __, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2")
      .get<NavJob[]>()
      .filter(f =>
        f.and(
          f.equals("Status", "Open"),
          f.equals("Job_Posting_Group", "FARROW-BE")
        )
      );
  },
  farrowingBackendArea(_, { number }, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2", number)
      .get<NavJob>();
  },
  farrowingBackendOperators(_, __, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Resources")
      .get<NavResource[]>()
      .filter(f => f.equals("Resource_Group_No", "FARROW-BE"));
  }
};

export const ScorecardMutations: MutationResolvers = {
  async saveFarrowingBackendScorecard(_, { input }) {
    let doc = await FarrowingBackendScorecardModel.findOne({
      area: input.area
    });
    if (!doc) {
      doc = new FarrowingBackendScorecardModel(input);
    } else {
      doc.overwrite(input);
    }
    await doc.save();
    return { success: true, scorecard: doc };
  },
  async postFarrowingBackendScorecard(_, { input }, { navClient, user }) {
    const job = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2", input.area)
      .get<NavJob>();
    const docNo = getDocumentNumber("FBE", user.name);

    function postScore(task: string, entry: ScorecardEntry) {
      return postJobJournal(
        {
          Journal_Template_Name: NavJobJournalTemplate.Job,
          Journal_Batch_Name: NavJobJournalBatch.FarrowBackend,
          Document_No: docNo,
          Job_No: job.No,
          Location_Code: job.Site,
          Job_Task_No: task,
          No: input.operator,
          Work_Type_Code: WorkTypeCode.FarrowBackend,
          Quantity: entry.score,
          Description: entry.comments || " "
        },
        navClient
      );
    }

    await postScore(JobTaskNumber.Crate, input.crate);
    await postScore(JobTaskNumber.GeneralRoom, input.room);
    await postScore(JobTaskNumber.PigletCare, input.piglets);
    await postScore(JobTaskNumber.SowCare, input.sows);
    await postScore(JobTaskNumber.SowFeed, input.feed);
    await postScore(JobTaskNumber.Water, input.water);

    const doc =
      (await FarrowingBackendScorecardModel.findOne({
        area: input.area
      })) || new FarrowingBackendScorecardModel();
    if (doc) {
      doc.overwrite({
        area: input.area
      });
      await doc.save();
    }

    return { success: true, scorecard: doc };
  },
  async setAreaOperator(_, { input }, { navClient }) {
    const area = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs2", input.area)
      .patch<NavJob>({
        Person_Responsible: input.operator
      });

    return { success: true, area };
  }
};
