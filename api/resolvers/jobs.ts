import { JobResolvers } from "./types";
import { NavResource } from "../nav";

export const Job: JobResolvers = {
  number: job => job.No,
  description: job => job.Description,
  personResponsible(job, _, { navClient }) {
    return navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Resources", job.Person_Responsible)
      .get<NavResource>();
  },
  inventory: job => job.Inventory_Left,
  deadQuantity: job => job.Dead_Quantity
};
