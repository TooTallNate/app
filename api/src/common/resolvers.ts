import { format } from "date-fns";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import { getDateFromWeekNumber } from "../common/utils";
import {
  InclusivityMode,
  ItemResolvers,
  JobJournalTemplateResolvers,
  JobResolvers,
  LocationResolvers,
  MenuOptionResolvers,
  QueryResolvers,
  ReasonResolvers,
  ResourceResolvers
} from "./graphql";
import UserSettingsModel from "./models/UserSettings";

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
  description: animal => animal.Description,
  type: animal => animal.Gen_Prod_Posting_Group,
  cost: animal => animal.Last_Direct_Cost
};

const Reason: ReasonResolvers = {
  code: reason => reason.Code,
  description: reason => reason.Description
};

const Location: LocationResolvers = {
  code: location => location.Code,
  name: location => location.Name
};

const MenuOption: MenuOptionResolvers = {
  name: menuOption => menuOption.Name,
  route: menuOption => menuOption.Route
};

export const JobJournalTemplate: JobJournalTemplateResolvers = {
  name: jobJournalTemplate => jobJournalTemplate.Name,
  description: jobJournalTemplate => jobJournalTemplate.Description,
  sourceCode: jobJournalTemplate => jobJournalTemplate.Source_Code,
  reasonCode: jobJournalTemplate => jobJournalTemplate.Reason_Code
};

export const queries: QueryResolvers = {
  async jobs(_, { input }, { user, navConfig, dataSources }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });
    if (settings && settings.locations.list) {
      if (settings.locations.mode === InclusivityMode.Include) {
        var includeLocations = settings.locations.list;
      } else {
        var excludeLocations = settings.locations.list;
      }
    }
    return dataSources.navJob.getAll({
      isOpen: true,
      ...(input.groups && { postingGroups: input.groups }),
      //...(input.locations && { includeLocations: input.locations }),
      includeLocations,
      excludeLocations
    });
  },
  job(_, { number }, { dataSources }) {
    const x = dataSources.navJob.getByNo(number);
    return x;
  },
  livestockJobs(_, { input }, { dataSources }) {
    return dataSources.navJob.getAllJobLivestock({
      ...(input.locations && { includeLocations: input.locations })
    });
  },
  livestockJob(_, { number }, { dataSources }) {
    return dataSources.navJob.getJobLivestockByNo(number);
  },
  resources(_, { input }, { dataSources }) {
    return dataSources.navResource.getAll({
      ...(input.group && { groups: [input.group] }),
      ...(input.type && { type: input.type })
    });
  },
  async resource(_, { code }, { dataSources }) {
    const result = await dataSources.navResource.getByCode(code);
    return result;
  },
  jobJournalTemplates(_, __, { dataSources }) {
    return dataSources.navJobJournal.getJobJournalTemplates();
  },
  jobJournalTemplate(_, { name }, { dataSources }) {
    return dataSources.navJobJournal.getJobJournalTemplate(name);
  }
};

export const types = {
  Job,
  Item,
  Resource,
  Reason,
  Location,
  MenuOption,
  JobJournalTemplate
};
