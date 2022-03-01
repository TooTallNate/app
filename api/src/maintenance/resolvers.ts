import { parse } from "date-fns";
import {
  InclusivityMode,
  MaintenanceAssetResolvers,
  MaintenanceHistoryAssetResolvers,
  MutationResolvers,
  QueryResolvers
} from "../common/graphql";
import UserSettingsModel from "../common/models/UserSettings";
import { NavJobJournalBatch, NavJobJournalTemplate } from "../common/nav";
import { getDocumentNumber, navDate } from "../common/utils";

export const MaintenanceAsset: MaintenanceAssetResolvers = {
  number: navMaintenanceAsset => navMaintenanceAsset.No,
  description: navMaintenanceAsset => navMaintenanceAsset.FADescription,
  classCode: navMaintenanceAsset => navMaintenanceAsset.FA_Class_Code,
  code: navMaintenanceAsset => navMaintenanceAsset.Maintenance_Code,
  interval: navMaintenanceAsset => navMaintenanceAsset.MaintenanceInterval,
  unitType: navMaintenanceAsset => navMaintenanceAsset.Unit_of_Measure_Code,
  maintenanceDesc: navMaintenanceAsset =>
    navMaintenanceAsset.MaintenanceDescription
};

export const MaintenanceHistoryAsset: MaintenanceHistoryAssetResolvers = {
  entry: navMaintenanceHistoryAsset => navMaintenanceHistoryAsset.Entry_No,
  number: navMaintenanceHistoryAsset => navMaintenanceHistoryAsset.FA_No,
  amount: navMaintenanceHistoryAsset => navMaintenanceHistoryAsset.Amount,
  maintenanceCode: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.Maintenance_Code,
  reasonCode: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.Reason_Code,
  postingDate: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.Posting_Date,
  quantity: navMaintenanceHistoryAsset => navMaintenanceHistoryAsset.Quantity,
  description: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.Description,
  meta: navMaintenanceHistoryAsset => navMaintenanceHistoryAsset.Meta,
  codeDescription: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.CodeDescription,
  payToName: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.Pay_to_Name,
  documentNo: navMaintenanceHistoryAsset =>
    navMaintenanceHistoryAsset.AuxiliaryIndex2
};

export const queries: QueryResolvers = {
  async maintenanceAssets(_, __, { user, navConfig, dataSources }) {
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
    const assetList = await dataSources.navMaintenanceAsset.getAll({
      includeLocations,
      excludeLocations
    });

    //filtering assetList to remove duplicates
    return assetList.filter(
      (asset, index, array) =>
        array.findIndex(asset2 => asset2.No === asset.No) === index
    );
  },
  async maintenanceHistoryAsset(_, { number }, { dataSources }) {
    return await dataSources.navMaintenanceAsset.getHistory(number);
  },
  async maintenanceAsset(_, { number }, { dataSources }) {
    return await dataSources.navMaintenanceAsset.getByNo(number);
  },
  async maintenanceAssetsByNo(_, { assetNo }, { dataSources }) {
    return await dataSources.navMaintenanceAsset.getAssetsByNo(assetNo);
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
        ? parse(input.postingDate, "yyyy-MM-dd", new Date())
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

    dataSources.navFuelMaintenanceJournal.autoPostFAJournals(
      NavJobJournalTemplate.Asset,
      NavJobJournalBatch.FarmApp,
      10000
    );

    return { success: true };
  }
};

export const types = {
  MaintenanceAsset,
  MaintenanceHistoryAsset
};
