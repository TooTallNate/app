import { parse } from "date-fns";
import {
  ItemConsumptionResolvers,
  MutationResolvers,
  QueryResolvers
} from "../common/graphql";
import { NavItemJournalTemplate, NavJobJournalBatch } from "../common/nav";
import { getDocumentNumber, navDate } from "../common/utils";
import { updateUserSettings } from "../livestock-activity/resolvers/livestock-activity";

const ItemConsumption: ItemConsumptionResolvers = {
  number: item => item.Item_No,
  location: item => item.Location_Code,
  balance: item => item.BalanceQty,
  description: item => item.Description,
  cost: item => item.Last_Direct_Cost,
  unit: item => item.Base_Unit_of_Measure,
  type: item => item.Gen_Prod_Posting_Group
};

export const queries: QueryResolvers = {
  items(_, { location }, { dataSources }) {
    console.log("=============");
    const x = dataSources.navItemJournal.getFilteredItems(location);
    console.log(x);
    return x;
  }
};

export const mutations: MutationResolvers = {
  async postInventory(_, { input }, { dataSources, user, navConfig }) {
    const docNo = getDocumentNumber("INV", user.name);
    const date = navDate(
      input.postingDate
        ? parse(input.postingDate, "yyyy-MM-dd", new Date())
        : new Date()
    );

    const job = await dataSources.navJob.getByNo(input.group);

    for (const item of input.itemList) {
      await dataSources.navJobJournal.postEntry({
        Journal_Template_Name: NavItemJournalTemplate.Inventory,
        Journal_Batch_Name: NavJobJournalBatch.FarmApp,
        Type: "ITEM",
        No: item.item.number,
        Document_No: docNo,
        Job_No: job.No,
        Location_Code: input.location,
        Job_Task_No: item.item.type,
        Quantity: item.quantity,
        Description: input.comments ? input.comments : item.item.description,
        Unit_Cost: item.item.cost,
        Posting_Date: date,
        Document_Date: date,
        Reason_Code: "ADJ"
      });
    }

    const userSettings = await updateUserSettings({
      username: user.username,
      livestockJob: job.No,
      location: input.location,
      subdomain: navConfig.subdomain
    });

    return { success: true, defaults: userSettings };
  }
};

export const types = {
  ItemConsumption
};
