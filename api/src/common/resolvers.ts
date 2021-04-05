import { format } from "date-fns";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import { getDateFromWeekNumber } from "../common/utils";
import {
  ItemResolvers,
  JobResolvers,
  LocationResolvers,
  QueryResolvers,
  ReasonResolvers,
  ResourceResolvers
} from "./graphql";

const DATE_FORMAT = "yyyy-MM-dd";

const Resource: ResourceResolvers = {
  number: resource => resource.No,
  name: resource => resource.Name,
  unitPrice: resource => resource.Unit_Price
};

const Job: JobResolvers = {
  number: job => job.No,
  description: job => job.Description,
  personResponsible(job, _, { dataSources }) {
    return dataSources.navResource.getByCode(job.Person_Responsible);
  },
  inventory: job => job.Inventory_Left,
  deadQuantity: job => job.Dead_Quantity,
  startDate: job => job.Start_Date,
  groupStartDate: job => {
    const year = Number("20" + job.No.substring(0, 2));
    const week = Number(job.No.substring(2, 4));
    const date = getDateFromWeekNumber(week, year);
    const startDate = lastDayOfWeek(date, { weekStartsOn: 2 });
    const groupStartDate = format(startDate, DATE_FORMAT);
    return groupStartDate;
  },
  async location(job, _, { dataSources }) {
    return dataSources.navLocation.getByCode(job.Site);
  },
  async projectManager(job, _, { dataSources }) {
    if (job.Project_Manager)
      return dataSources.navUser.getByUsername(job.Project_Manager);
  }
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

export const queries: QueryResolvers = {
  jobs(_, { input }, { dataSources }) {
    return dataSources.navJob.getAll({
      isOpen: true,
      ...(input.groups && { postingGroups: input.groups }),
      ...(input.locations && { includeLocations: input.locations })
    });
  },
  job(_, { number }, { dataSources }) {
    return dataSources.navJob.getByNo(number);
  },
  resources(_, { input }, { dataSources }) {
    return dataSources.navResource.getAll({
      ...(input.group && { groups: [input.group] }),
      ...(input.type && { type: input.type })
    });
  },
  async resource(_, { code }, { dataSources }) {
    const result = await dataSources.navResource.getByCode(code);
    console.log(result);
    return result;
  }
};

export const types = {
  Job,
  Item,
  Resource,
  Reason,
  Location
};
