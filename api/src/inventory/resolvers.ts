import { parse } from "date-fns";
import { MutationResolvers, QueryResolvers } from "../common/graphql";
import { NavItemJournalTemplate, NavJobJournalBatch } from "../common/nav";
import { getDocumentNumber, navDate } from "../common/utils";
import { updateUserSettings } from "../livestock-activity/resolvers/livestock-activity";

export const queries: QueryResolvers = {
  items(_, __, { dataSources }) {
    return dataSources.navItemJournal.getFilteredItems();
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
