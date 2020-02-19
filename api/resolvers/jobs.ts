import { JobResolvers } from "./types";

export const Job: JobResolvers = {
  number: job => job.No,
  description: job => job.Description,
  personResponsible: job => job.Person_Responsible
};
