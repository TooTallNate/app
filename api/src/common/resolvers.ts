import {
  AnimalResolvers,
  JobResolvers,
  ReasonResolvers,
  ResourceResolvers,
  LocationResolvers
} from "./graphql";
import { NavResource } from "./nav";

const Resource: ResourceResolvers = {
  number: resource => resource.No,
  name: resource => resource.Name
};

const Job: JobResolvers = {
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

const Animal: AnimalResolvers = {
  number: animal => animal.No,
  description: animal => animal.Description
};

const Reason: ReasonResolvers = {
  code: reason => reason.Code,
  description: reason => reason.Description
};

const Location: LocationResolvers = {
  code: location => location.Code,
  name: location => location.Name
};

export const types = {
  Job,
  Animal,
  Resource,
  Reason,
  Location
};
