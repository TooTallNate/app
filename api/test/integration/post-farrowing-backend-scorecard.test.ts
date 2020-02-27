import { client, testUnauthenticated, mockUser } from "../utils";
import {
  PostFarrowingBackendScorecardMutation,
  PostFarrowingBackendScorecardMutationVariables,
  ScorecardEntry
} from "../../resolvers/types";
import { JobFactory, FarrowingBackendScorecardInputFactory } from "../builders";
import {
  NavJobJournalTemplate,
  NavJobJournalBatch,
  WorkTypeCode,
  JobTaskNumber
} from "../../nav";
import { format } from "date-fns";
import nock = require("nock");

function mutation(variables: PostFarrowingBackendScorecardMutationVariables) {
  return client.request<PostFarrowingBackendScorecardMutation>(
    `mutation PostFarrowingBackendScorecard($input: FarrowingBackendScorecardInput!) {
      postFarrowingBackendScorecard(input: $input) {
        success
      }
    }`,
    variables
  );
}

testUnauthenticated(() =>
  mutation({ input: FarrowingBackendScorecardInputFactory.build() })
);

test("submits scores to NAV", async () => {
  const { user, auth } = await mockUser();
  const area = JobFactory.build();
  const input = FarrowingBackendScorecardInputFactory.build({
    area: area.No
  });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${area.No}%27)`)
    .basicAuth(auth)
    .reply(200, area);

  const documentNumberRegex = new RegExp(
    `^FBE${user.Full_Name.slice(0, 5)}${format(new Date(), "yyMMddHH")}\\d{4}$`
  );

  const date = format(new Date(), "YYY-MM-dd");

  function mockScorePost(task: JobTaskNumber, entry: ScorecardEntry) {
    nock(process.env.NAV_BASE_URL)
      .post(`/Company(%27${process.env.NAV_COMPANY}%27)/JobJournal`, {
        Journal_Template_Name: NavJobJournalTemplate.Job,
        Journal_Batch_Name: NavJobJournalBatch.FarrowBackend,
        Document_No: documentNumberRegex,
        Job_No: area.No,
        Location_Code: area.Site,
        Job_Task_No: task,
        No: input.operator,
        Work_Type_Code: WorkTypeCode.FarrowBackend,
        Quantity: entry.score,
        Description: entry.comments,
        Posting_Date: date,
        Document_Date: date
      })
      .basicAuth(auth)
      .reply(200, {});
  }

  mockScorePost(JobTaskNumber.Crate, input.crate);
  mockScorePost(JobTaskNumber.GeneralRoom, input.room);
  mockScorePost(JobTaskNumber.PigletCare, input.piglets);
  mockScorePost(JobTaskNumber.SowCare, input.sows);
  mockScorePost(JobTaskNumber.SowFeed, input.feed);
  mockScorePost(JobTaskNumber.Water, input.water);

  await expect(mutation({ input })).resolves.toEqual({
    postFarrowingBackendScorecard: {
      success: true
    }
  });
});
