import {
  MutationResolvers,
  QueryResolvers,
  ScorecardEntry,
  FarrowingBackendScorecardResolvers
} from "../common/graphql";
import {
  NavJob,
  NavJobJournalEntry,
  NavResource,
  ODataClient,
  NavJobJournalTemplate,
  NavJobJournalBatch,
  JobTaskNumber,
  WorkTypeCode
} from "../common/nav";
import { navDate, getDocumentNumber } from "../common/utils";
import FarrowingBackendScorecardModel from "./models/FarrowingBackendScorecard";

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

const FarrowingBackendScorecard: FarrowingBackendScorecardResolvers = {
  area(scorecard, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", scorecard.area)
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

export const queries: QueryResolvers = {
  async farrowingBackendScorecard(_, { area }) {
    return (
      (await FarrowingBackendScorecardModel.findOne({ area })) ||
      new FarrowingBackendScorecardModel({ area })
    );
  },
  farrowingBackendAreas(_, __, { dataSources }) {
    return dataSources.farrowBackendJobNavApi.getAll();
  },
  farrowingBackendArea(_, { number }, { dataSources }) {
    return dataSources.farrowBackendJobNavApi.getByNo(number);
  },
  farrowingBackendOperators(_, __, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Resources")
      .get<NavResource[]>()
      .filter(f => f.equals("Resource_Group_No", "FARROW-BE"));
  }
};

export const mutations: MutationResolvers = {
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
  async postFarrowingBackendScorecard(
    _,
    { input },
    { dataSources, navClient, user }
  ) {
    const job = await dataSources.farrowBackendJobNavApi.getByNo(input.area);
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
  async setAreaOperator(_, { input }, { dataSources }) {
    const area = await dataSources.farrowBackendJobNavApi.updatePersonResponsible(
      input.area,
      input.operator
    );

    return { success: true, area };
  }
};

export const types = {
  FarrowingBackendScorecard
};
