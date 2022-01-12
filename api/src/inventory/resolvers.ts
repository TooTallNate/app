import { parse } from "date-fns";
import { MutationResolvers, QueryResolvers } from "../common/graphql";
import { NavEntryType, NavItemJournalBatch } from "../common/nav";
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
    const docNo = getDocumentNumber("MEDS", user.name);
    const date = navDate(
      input.postingDate
        ? parse(input.postingDate, "yyyy-MM-dd", new Date())
        : new Date()
    );
    for (const item of input.itemList) {
      await postItemJournal(
        {
          //...standardJournal,
          Journal_Batch_Name: NavItemJournalBatch.FarmApp,
          Entry_Type: NavEntryType.Positive,
          Item_No: item.item.number,
          Document_No: docNo,
          Description: input.comments,
          Location_Code: input.location,
          Quantity: item.quantity,
          Posting_Date: date,
          Job_No: input.group,
          Unit_Amount: item.item.cost
          // Shortcut_Dimension_1_Code: standardJournal.Shortcut_Dimension_1_Code
          //   ? standardJournal.Shortcut_Dimension_1_Code
          //   : job.Entity,
          // Shortcut_Dimension_2_Code: standardJournal.Shortcut_Dimension_2_Code
          //   ? standardJournal.Shortcut_Dimension_2_Code
          //   : job.Cost_Center
        },
        dataSources.navItemJournal
      );
    }

    return { success: true };
  }
};
