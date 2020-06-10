import {
  JobResolvers,
  ReasonResolvers,
  ResourceResolvers,
  LocationResolvers,
  ItemResolvers
} from "./graphql";

const Resource: ResourceResolvers = {
  number: resource => resource.No,
  name: resource => resource.Name
};

const Job: JobResolvers = {
  number: job => job.No,
  description: job => job.Description,
  personResponsible(job, _, { dataSources }) {
    return dataSources.navResource.getByCode(job.Person_Responsible);
  },
  inventory: job => job.Inventory_Left,
  deadQuantity: job => job.Dead_Quantity
};

const Item: ItemResolvers = {
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
  Item,
  Resource,
  Reason,
  Location
};
