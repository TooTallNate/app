import {
  MutationResolvers,
  QueryResolvers,
  ScorecardResolvers,
  ScorecardConfigResolvers,
  ScorecardGroupResolvers
} from "../common/graphql";
import { NavJobJournalTemplate, NavJobJournalBatch } from "../common/nav";
import { navDate, getDocumentNumber } from "../common/utils";
import ScorecardModel from "./Scorecard";

const ScorecardGroup: ScorecardGroupResolvers = {
  code: group => group.Code,
  description: group => group.Description
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
  async scorecardGroups(_, __, { dataSources }) {
    return await dataSources.navJob.getPostingGroups("SURVEY");
  },
  async scorecard(_, { job }) {
    return await ScorecardModel.findOne({ job });
  },
  async scorecardConfig(_, { job }, { dataSources }) {
    return await dataSources.navJob.getByNo(job);
  }
};

export const mutations: MutationResolvers = {
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
    const date = navDate(new Date());

    for (const task of jobTasks) {
      const element = input.data.find(
        element => element.elementId === task.Job_Task_No
      );
      if (element) {
        await dataSources.navJobJournal.postEntry({
          Journal_Template_Name: NavJobJournalTemplate.Job,
          Journal_Batch_Name: NavJobJournalBatch.FarmApp,
          Document_No: docNo,
          Job_No: job.No,
          Location_Code: job.Site,
          Job_Task_No: task.Job_Task_No,
          No: caretaker.stringValue,
          Quantity: element.numericValue || 1,
          Description: element.stringValue || " ",
          Work_Type_Code: job.Job_Posting_Group,
          Posting_Date: date,
          Document_Date: date
        });
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
  }
};

export const types = {
  Scorecard,
  ScorecardConfig,
  ScorecardGroup
};
