import { parse } from "date-fns";
import {
  FuelAssetResolvers,
  FuelHistoryAssetResolvers,
  InclusivityMode,
  MutationResolvers,
  QueryResolvers
} from "../common/graphql";
import UserSettingsModel from "../common/models/UserSettings";
import { NavJobJournalBatch, NavJobJournalTemplate } from "../common/nav";
import { getDocumentNumber, navDate } from "../common/utils";

export const FuelAsset: FuelAssetResolvers = {
  number: navFuelAsset => navFuelAsset.No,
  code: navFuelAsset => navFuelAsset.Dimension_Code,
  description: navFuelAsset => navFuelAsset.FA_Description,
  fuelType: navFuelAsset => navFuelAsset.Item_Description,
  fuelCost: navFuelAsset => navFuelAsset.Last_Direct_Cost,
  unitOfMeasureCode: navFuelAsset => navFuelAsset.Unit_of_Measure_Code
};

export const FuelHistoryAsset: FuelHistoryAssetResolvers = {
  entry: navFuelHistoryAsset => navFuelHistoryAsset.Entry_No,
  number: navFuelHistoryAsset => navFuelHistoryAsset.FA_No,
  amount: navFuelHistoryAsset => navFuelHistoryAsset.Amount,
  maintenanceCode: navFuelHistoryAsset => navFuelHistoryAsset.Maintenance_Code,
  reasonCode: navFuelHistoryAsset => navFuelHistoryAsset.Reason_Code,
  postingDate: navFuelHistoryAsset => navFuelHistoryAsset.Posting_Date,
  quantity: navFuelHistoryAsset => navFuelHistoryAsset.Quantity,
  description: navFuelHistoryAsset => navFuelHistoryAsset.Description,
  meta: navFuelHistoryAsset => navFuelHistoryAsset.Meta
};

export const queries: QueryResolvers = {
  async fuelAssets(_, __, { user, navConfig, dataSources }) {
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
    return await dataSources.navFuelAsset.getAll({
      includeLocations,
      excludeLocations
    });
  },
  async fuelHistoryAsset(_, { number }, { dataSources }) {
    return await dataSources.navFuelAsset.getHistory(number);
  },
  async fuelAsset(_, { number }, { dataSources }) {
    return await dataSources.navFuelAsset.getByNo(number);
  }
};

export const mutations: MutationResolvers = {
  async postFuel(_, { input }, { dataSources, user }) {
    const fuelAsset = await dataSources.navFuelAsset.getByNo(input.asset);
    const docNo = getDocumentNumber("FUEL", user.name);
    const account = await dataSources.navFuelAsset.getExpenseByCode(
      fuelAsset.Dimension_Code
    );
    const date = navDate(
      input.postingDate
        ? parse(input.postingDate, "yyyy-MM-dd", new Date())
        : new Date()
    );

    const totalAmount: number = input.gallons * fuelAsset.Last_Direct_Cost;

    try {
      await dataSources.navFuelMaintenanceJournal.postEntry({
        Journal_Template_Name: NavJobJournalTemplate.Asset,
        Journal_Batch_Name: NavJobJournalBatch.FarmApp,
        Document_No: docNo,
        Posting_Date: date,
        Account_Type: "Fixed Asset",
        Account_No: input.asset,
        FA_Posting_Type: "Maintenance",
        Maintenance_Code: fuelAsset.Dimension_Code,
        Bal_Account_No: account.Maintenance_Expense_Account,
        Shortcut_Dimension_1_Code: fuelAsset.Global_Dimension_1_Code,
        Shortcut_Dimension_2_Code: fuelAsset.Global_Dimension_2_Code,
        Quantity: input.gallons,
        Meta: input.mileage,
        Amount: totalAmount,
        Description: input.comments
      });
    } catch (e) {}

    return { success: true };
  },
  async autoPostFuelMaintenance(_, __, { dataSources }) {
    try {
      await dataSources.navFuelMaintenanceJournal.autoPostFAJournals(
        NavJobJournalTemplate.Asset,
        NavJobJournalBatch.FarmApp,
        10000
      );
    } catch (e) {}

    return { success: true };
  }
};

export const types = {
  FuelAsset,
  FuelHistoryAsset
};
