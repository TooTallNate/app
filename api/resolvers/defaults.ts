import { DefaultsResolvers, QueryResolvers, MutationResolvers } from "./types";
import UserSettingsModel from "../models/user-settings";

export const DefaultsQuery: QueryResolvers = {
  async defaults(_, __, { user }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username
    });
    return settings || new UserSettingsModel();
  }
};

export const DefaultsMutation: MutationResolvers = {
  async updateDefaults(_, { input }, { user }) {
    let settings = await UserSettingsModel.findOne({
      username: user.username
    });
    if (!settings) {
      settings = new UserSettingsModel({ username: user.username });
    }
    if (input.hasOwnProperty("pigJob")) {
      settings.pigJob = input.pigJob;
    }
    if (input.hasOwnProperty("scorecardJob")) {
      settings.scorecardJob = input.scorecardJob;
    }
    if (input.hasOwnProperty("price")) {
      settings.price = input.price;
    }
    await settings.save();
    return settings;
  }
};

export const Defaults: DefaultsResolvers = {};
