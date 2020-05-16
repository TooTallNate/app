import { client, testUnauthenticated, mockUser } from "../../test/utils";
import {
  FarrowingBackendScorecardResult,
  MutationPostFarrowingBackendScorecardArgs,
  ScorecardEntry
} from "../../common/graphql";
import {
  JobFactory,
  PostFarrowingBackendScorecardInputFactory
} from "../../test/builders";
import {
  NavJobJournalTemplate,
  NavJobJournalBatch,
  WorkTypeCode,
  JobTaskNumber
} from "../../common/nav";
import { format } from "date-fns";
import FarrowingBackendScorecardModel from "../models/FarrowingBackendScorecard";
import nock = require("nock");

function mutation(variables: MutationPostFarrowingBackendScorecardArgs) {
  return client.request<FarrowingBackendScorecardResult>(
    `mutation PostFarrowingBackendScorecard($input: PostFarrowingBackendScorecardInput!) {
      postFarrowingBackendScorecard(input: $input) {
        success
      }
    }`,
    variables
  );
}

testUnauthenticated(() =>
  mutation({ input: PostFarrowingBackendScorecardInputFactory.build() })
);

test("submits scores to NAV", async () => {
  const { user, auth } = await mockUser();
  const area = JobFactory.build();
  const input = PostFarrowingBackendScorecardInputFactory.build({
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

test("saves new empty scorecard to database", async () => {
  const { user, auth } = await mockUser();
  const area = JobFactory.build();
  const input = PostFarrowingBackendScorecardInputFactory.build({
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

  await expect(
    FarrowingBackendScorecardModel.findOne({ area: input.area }).lean()
  ).resolves.toMatchObject({
    area: input.area
  });
});

test("clears scorecard from database", async () => {
  const { user, auth } = await mockUser();
  const area = JobFactory.build();
  const input = PostFarrowingBackendScorecardInputFactory.build({
    area: area.No
  });
  const scorecard = await FarrowingBackendScorecardModel.create(input);

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

  await expect(
    FarrowingBackendScorecardModel.findOne({ area: input.area }).lean()
  ).resolves.toMatchObject({
    _id: scorecard._id,
    area: input.area
  });
});
