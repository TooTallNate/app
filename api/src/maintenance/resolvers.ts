import { parse } from "date-fns";
import {
  MaintenanceAssetResolvers,
  MaintenanceIntervalResolvers,
  MutationResolvers,
  QueryResolvers
} from "../common/graphql";
import {
  NavJobJournalBatch,
  NavJobJournalTemplate,
  NavMaintenanceInterval
} from "../common/nav";
import { getDocumentNumber, navDate } from "../common/utils";

export const MaintenanceAsset: MaintenanceAssetResolvers = {
  number: navMaintenanceAsset => navMaintenanceAsset.No,
  description: navMaintenanceAsset => navMaintenanceAsset.Description,
  classCode: navMaintenanceAsset => navMaintenanceAsset.FA_Class_Code
};

export const MaintenanceInterval: MaintenanceIntervalResolvers = {
  code: navMaintenanceInterval => navMaintenanceInterval.Maintenance_Code,
  asset: navMaintenanceInterval => navMaintenanceInterval.Fixed_Asset_No,
  interval: navMaintenanceInterval =>
    navMaintenanceInterval.MaintenanceInterval,
  unitType: navMaintenanceInterval =>
    navMaintenanceInterval.Unit_of_Measure_Code,
  description: navMaintenanceInterval => navMaintenanceInterval.Description
};

export const queries: QueryResolvers = {
  async maintenanceAssets(_, __, { dataSources }) {
    return await dataSources.navMaintenanceAsset.getAll();
  },
  async maintenanceAsset(_, { number }, { dataSources }) {
    return await dataSources.navMaintenanceAsset.getByNo(number);
  },
  async maintenanceIntervals(_, { assetNo }, { dataSources }) {
    return await dataSources.navMaintenanceAsset.getMaintenanceIntervalByAsset(
      assetNo
    );
  },
  item(_, { number }, { dataSources }) {
    return dataSources.navItemJournal.getItem(number);
  }
};

export const mutations: MutationResolvers = {
  async postMaintenance(_, { input }, { dataSources, user }) {
    const maintenanceAsset = await dataSources.navMaintenanceAsset.getByNo(
      input.asset
    );
    const docNo = getDocumentNumber("MAIN", user.name);
    const account = await dataSources.navMaintenanceAsset.getExpenseByCode(
      input.type
    );
    const laborCost = await (await dataSources.navItemJournal.getItem("LABOR"))
      .Last_Direct_Cost;

    const date = navDate(
      input.postingDate
        ? parse(input.postingDate, "MM/dd/yyyy", new Date())
        : new Date()
    );
    const totalAmount: number = laborCost * input.workHours;

    await dataSources.navFuelMaintenanceJournal.postEntry({
      Journal_Template_Name: NavJobJournalTemplate.Asset,
      Journal_Batch_Name: NavJobJournalBatch.FarmApp,
      Document_No: docNo,
      Posting_Date: date,
      Account_Type: "Fixed Asset",
      Account_No: input.asset,
      FA_Posting_Type: "Maintenance",
      Maintenance_Code: input.type,
      Bal_Account_No: account.Maintenance_Expense_Account,
      Shortcut_Dimension_1_Code: maintenanceAsset.Global_Dimension_1_Code,
      Shortcut_Dimension_2_Code: maintenanceAsset.Global_Dimension_2_Code,
      Quantity: input.workHours,
      Meta: input.mileage,
      Amount: totalAmount,
      Description: input.comments
    });
    return { success: true };
  }
};

export const types = {
  MaintenanceAsset,
  MaintenanceInterval
};
