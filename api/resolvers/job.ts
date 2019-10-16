import { JobResolvers, QueryResolvers } from "./types";
import nav from "../nav";

export const JobQuery: QueryResolvers = {
  async jobs(_, { input: { status, postingGroup } = {} }, { user }) {
    const jobs = await nav.getJobs(
      {
        Status: status,
        Job_Posting_Group: postingGroup
      },
      user
    );
    if (jobs) {
      return jobs;
    } else {
      throw new Error("Failed to fetch jobs.");
    }
  }
};

export const Job: JobResolvers = {
  number: job => job.No,
  site: job => job.Site
};
