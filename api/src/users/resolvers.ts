import {
  UserResolvers,
  MutationResolvers,
  QueryResolvers,
  InclusivityMode
} from "../common/graphql";
import { NavUser, Guid, NavErrorCode, NavLocation } from "../common/nav";
import { ErrorCode } from "../common/utils";
import UserSettingsModel, {
  UserSettingsDocument
} from "../common/models/UserSettings";

export const queries: QueryResolvers = {
  async user(_, __, { user, navClient }) {
    if (user) {
      return await navClient
        .resource("User", new Guid(user.securityId))
        .get<NavUser>();
    } else {
      return null;
    }
  }
};

export const mutations: MutationResolvers = {
  async login(_, { input: { username, password } }, { session, navClient }) {
    navClient.auth(username, password);
    try {
      var users = await navClient
        .resource("User")
        .get<NavUser[]>()
        .filter(f => f.equals("User_Name", username));
    } catch (error) {
      switch (error.code) {
        case NavErrorCode.InvalidCredentials:
          throw new Error(ErrorCode.InvalidCredentials);
        case NavErrorCode.NoAvailableLicense:
          throw new Error(ErrorCode.NoAvailableLicense);
        default:
          throw error;
      }
    }
    session.user = {
      username: users[0].User_Name,
      password,
      name: users[0].Full_Name,
      securityId: users[0].User_Security_ID
    };
    return {
      success: true,
      user: users[0]
    };
  },
  async logout(_, __, context) {
    await new Promise((res, rej) =>
      context.session.destroy(err => {
        if (err) rej(err);
        else res();
      })
    );
    return { success: true };
  }
};

export const User: UserResolvers = {
  username: user => user.User_Name,
  name: user => user.Full_Name,
  license: user => user.License_Type,
  async locations(_, __, { navClient, user }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username
    }).lean<UserSettingsDocument>();
    if (settings && settings.locations) {
      let list: NavLocation[] = [];
      if (settings.locations.list.length > 0) {
        list = await navClient
          .resource("Company", process.env.NAV_COMPANY)
          .resource("Locations")
          .get<NavLocation[]>()
          .filter(f =>
            f.or(...settings.locations.list.map(code => f.equals("Code", code)))
          );
      }
      return {
        type: settings.locations.listType as InclusivityMode,
        list
      };
    } else {
      return {
        type: InclusivityMode.Include,
        list: []
      };
    }
  }
};

export const types = {
  User
};
