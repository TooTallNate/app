import { parse } from "date-fns";
import { MutationResolvers, QueryResolvers } from "../common/graphql";
import {
  NavEntryType,
  NavItemJournalBatch,
  NavItemJournalTemplate,
  NavJobJournalBatch,
  NavJobJournalTemplate
} from "../common/nav";
import { getDocumentNumber, navDate } from "../common/utils";
import { postItemJournal } from "../livestock-activity/resolvers/livestock-activity";

// export const FuelAsset: FuelAssetResolvers = {
//   number: navFuelAsset => navFuelAsset.No,
//   code: navFuelAsset => navFuelAsset.Dimension_Code,
//   description: navFuelAsset => navFuelAsset.FA_Description,
//   fuelType: navFuelAsset => navFuelAsset.Item_Description,
//   fuelCost: navFuelAsset => navFuelAsset.Last_Direct_Cost,
//   unitOfMeasureCode: navFuelAsset => navFuelAsset.Unit_of_Measure_Code
// };

export const queries: QueryResolvers = {
  items(_, __, { dataSources }) {
    return dataSources.navItemJournal.getAllItems();
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

    const [
      standardJournal
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: "FE-INVENT",
      template: NavItemJournalTemplate.Inventory
    });

    for (const item of input.itemList) {
      const itemTotal = item.item.cost * item.quantity;

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
        //Work_Type_Code: job.Job_Posting_Group,
        Unit_Cost: item.item.cost,
        Posting_Date: date,
        Document_Date: date,
        Reason_Code: "ADJ"
      });
    }

    return { success: true };
  }
};
