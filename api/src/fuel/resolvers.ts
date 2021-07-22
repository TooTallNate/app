import { parse } from "date-fns";
import {
  FuelAssetResolvers,
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
  fuelCost: navFuelAsset => navFuelAsset.Last_Direct_Cost
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
    return { success: true };
  }
};

export const types = {
  FuelAsset
};
