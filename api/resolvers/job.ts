import { JobResolvers, QueryResolvers, JobDimensionsResolvers } from "./types";
import nav from "../nav";

const TABLE_ID = 167;

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

export const JobDimensions: JobDimensionsResolvers = {
  costCenter(dimensions) {
    const dim = dimensions.find(dim => dim.Dimension_Code === "COST CENTER");
    if (dim) {
      return dim.Dimension_Value_Code;
    } else {
      return null;
    }
  },
  entity(dimensions) {
    const dim = dimensions.find(dim => dim.Dimension_Code === "ENTITY");
    if (dim) {
      return dim.Dimension_Value_Code;
    } else {
      return null;
    }
  }
};

export const Job: JobResolvers = {
  number: job => job.No,
  site: job => job.Site,
  async dimensions(job, _, { user }) {
    return nav.getDimensions(
      {
        Table_ID: [TABLE_ID],
        No: [job.No]
      },
      user
    );
  }
};
