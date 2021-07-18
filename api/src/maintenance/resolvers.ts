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
import { getItemJournalTemplate } from "../pig-activity/resolvers/pig-activity";

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
    navMaintenanceInterval.Unit_of_Measure_Code
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
      maintenanceAsset.FA_Class_Code
    );
    // const date = navDate(
    //   input.postingDate
    //     ? parse(input.postingDate, "MM/dd/yyyy", new Date())
    //     : new Date()
    // );

    const totalAmount: number = input.mileage;

    await dataSources.navFuelMaintenanceJournal.postEntry({
      Journal_Template_Name: NavJobJournalTemplate.Asset,
      Journal_Batch_Name: NavJobJournalBatch.FarmApp,
      Document_No: docNo,
      Posting_Date: input.postingDate,
      Account_Type: "Fixed Asset",
      Account_No: input.asset,
      FA_Posting_Type: "Maintenance",
      Maintenance_Code: maintenanceAsset.FA_Class_Code,
      Bal_Account_No: account.Maintenance_Expense_Account,
      Shortcut_Dimension_1_Code: maintenanceAsset.Global_Dimension_1_Code,
      Shortcut_Dimension_2_Code: maintenanceAsset.Global_Dimension_2_Code,
      Quantity: input.mileage,
      Meta: input.mileage,
      //Amount: totalAmount,
      Description: input.comments
    });
    return { success: true };
  }
};

export const types = {
  MaintenanceAsset,
  MaintenanceInterval
};
