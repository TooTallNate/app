import {
  MutationResolvers,
  QueryResolvers,
  ScorecardEntry,
  FarrowingBackendScorecardResolvers,
  ScorecardResolvers,
  ScorecardConfigResolvers
} from "../common/graphql";
import {
  NavJobJournalLine,
  NavJobJournalTemplate,
  NavJobJournalBatch,
  JobTaskNumber,
  WorkTypeCode
} from "../common/nav";
import { navDate, getDocumentNumber } from "../common/utils";
import FarrowingBackendScorecardModel from "./models/FarrowingBackendScorecard";
import NavJobJournalDataSource from "../common/datasources/NavJobJournalDataSource";
import ScorecardModel from "./models/Scorecard";

function postJobJournal(
  entry: Partial<NavJobJournalLine>,
  dataSource: NavJobJournalDataSource
): Promise<NavJobJournalLine> {
  const date = navDate(new Date());
  entry.Posting_Date = date;
  entry.Document_Date = date;
  return dataSource.postEntry(entry);
}

const FarrowingBackendScorecard: FarrowingBackendScorecardResolvers = {
  area(scorecard, _, { dataSources }) {
    return dataSources.navJob.getByNo(scorecard.area);
  },
  operator(scorecard, _, { dataSources }) {
    return scorecard.operator
      ? dataSources.navResource.getByCode(scorecard.operator)
      : null;
  },
  sows: scorecard => scorecard.sows || {},
  piglets: scorecard => scorecard.piglets || {},
  feed: scorecard => scorecard.feed || {},
  water: scorecard => scorecard.water || {},
  crate: scorecard => scorecard.crate || {},
  room: scorecard => scorecard.room || {}
};

const ScorecardConfig: ScorecardConfigResolvers = {
  job: job => job,
  async pages(job, _, { dataSources }) {
    const tasks = await dataSources.navJob.getJobTasks(job.No);
    console.log(tasks);
    const pages = tasks.reduce((pages, task) => {
      if (task.Job_Task_Type === "Heading") {
        pages.push({
          title: task.Description,
          elements: []
        });
      } else if (task.Job_Task_Type === "Posting") {
        const page = pages.slice(-1)[0];
        if (page) {
          page.elements.push({
            id: task.Job_Task_No,
            label: task.Description,
            code: task.Job_Task_No.substring(4),
            order: parseInt(task.Job_Task_No) || 0
          });
        }
      }
      return pages;
    }, []);
    return pages;
  }
};

const Scorecard: ScorecardResolvers = {
  job(scorecard, _, { dataSources }) {
    return dataSources.navJob.getByNo(scorecard.job);
  }
};

export const queries: QueryResolvers = {
  async farrowingBackendScorecard(_, { area }) {
    return (
      (await FarrowingBackendScorecardModel.findOne({ area })) ||
      new FarrowingBackendScorecardModel({ area })
    );
  },
  farrowingBackendAreas(_, __, { dataSources }) {
    return dataSources.navJob.getAll({
      isOpen: true,
      postingGroups: ["FARROW-BE"]
    });
  },
  //refactor to job
  farrowingBackendArea(_, { number }, { dataSources }) {
    return dataSources.navJob.getByNo(number);
  },
  // job(_, { number }, { dataSources }) {
  //   return dataSources.navJob.getByNo(number);
  // },
  farrowingBackendOperators(_, __, { dataSources }) {
    return dataSources.navResource.getAll({
      groups: ["FARROW-BE"]
    });
  },
  async scorecard(_, { job }) {
    return await ScorecardModel.findOne({ job });
  },
  async scorecardConfig(_, { job }, { dataSources }) {
    return await dataSources.navJob.getByNo(job);
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
  async postFarrowingBackendScorecard(_, { input }, { dataSources, user }) {
    const job = await dataSources.navJob.getByNo(input.area);
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
        dataSources.navJobJournal
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
  async saveScorecard(_, { input }) {
    let doc = await ScorecardModel.findOne({
      job: input.job
    });
    if (!doc) {
      doc = new ScorecardModel(input);
    } else {
      doc.overwrite(input);
    }
    await doc.save();
    return { success: true, scorecard: doc };
  },
  async postScorecard(_, { input }, { dataSources, user }) {
    const job = await dataSources.navJob.getByNo(input.job);
    const jobTasks = (await dataSources.navJob.getJobTasks(job.No)).filter(
      task => task.Job_Task_Type === "Posting"
    );

    const docNo = getDocumentNumber("SCR", user.name);
    const caretaker = input.data.find(element =>
      element.elementId.includes("CARETAKER")
    ) || { stringValue: job.Person_Responsible };

    for (const task of jobTasks) {
      const element = input.data.find(
        element => element.elementId === task.Job_Task_No
      );
      if (element) {
        await postJobJournal(
          {
            Journal_Template_Name: NavJobJournalTemplate.Job,
            Journal_Batch_Name: NavJobJournalBatch.FarmApp,
            Document_No: docNo,
            Job_No: job.No,
            Location_Code: job.Site,
            Job_Task_No: task.Job_Task_No,
            No: caretaker.stringValue,
            Quantity: element.numericValue || 1,
            Description: element.stringValue || " "
          },
          dataSources.navJobJournal
        );
      }
    }

    const doc =
      (await ScorecardModel.findOne({
        job: input.job
      })) || new ScorecardModel();
    doc.overwrite({
      job: input.job,
      data: []
    });
    await doc.save();

    return { success: true, scorecard: doc };
  },
  async setAreaOperator(_, { input }, { dataSources }) {
    const area = await dataSources.navJob.updatePersonResponsible(
      input.area,
      input.operator
    );

    return { success: true, area };
  }
};

export const types = {
  Scorecard,
  ScorecardConfig,
  FarrowingBackendScorecard
};
