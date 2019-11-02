import { JobResolvers, QueryResolvers, JobDimensionsResolvers } from "./types";

const TABLE_ID = 167;

export const JobQuery: QueryResolvers = {
  async jobs(_, { input: { status, postingGroup } = {} }, { navClient }) {
    return navClient.getJobs({
      Status: status,
      Job_Posting_Group: postingGroup
    });
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
  async dimensions(job, _, { navClient }) {
    return navClient.getDimensions({
      Table_ID: [TABLE_ID],
      No: [job.No]
    });
  }
};
