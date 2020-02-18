import {
  MutationResolvers,
  QueryResolvers,
  FarrowingBackendScorecardResolvers,
  ScorecardEntry
} from "./types";
import {
  NavJob,
  NavJobJournalEntry,
  ODataClient,
  NavJobJournalTemplate,
  NavJobJournalBatch,
  JobTaskNumber,
  WorkTypeCode
} from "../nav";
import { navDate, getDocumentNumber } from "./utils";

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
  areas(_, __, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs")
      .get<NavJob[]>()
      .filter(f =>
        f.and(
          f.equals("Status", "Open"),
          f.equals("Job_Posting_Group", "FARROW-BE")
        )
      );
  }
};

export const ScorecardQueries: QueryResolvers = {
  farrowingBackendScorecard: () => ({})
};

export const ScorecardMutations: MutationResolvers = {
  async postFarrowingBackendScorecard(_, { input }, { navClient, user }) {
    const job = await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Jobs", input.area)
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
    return true;
  }
};
