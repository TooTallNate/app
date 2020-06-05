import {
  UserResolvers,
  MutationResolvers,
  QueryResolvers,
  InclusivityMode
} from "../common/graphql";
import { NavLocation } from "../common/nav";
import UserSettingsModel, {
  UserSettingsDocument
} from "../common/models/UserSettings";

export const queries: QueryResolvers = {
  async user(_, __, { user, dataSources }) {
    if (user) {
      return await dataSources.navUser.getBySecurityID(user.securityId);
    } else {
      return null;
    }
  },
  locations(_, __, { dataSources }) {
    return dataSources.navLocation.getAll();
  }
};

export const mutations: MutationResolvers = {
  async login(_, { input: { username, password } }, context) {
    context.user = {
      username,
      password
    } as any;
    const { dataSources, session } = context;
    const user = await dataSources.navUser.getByUsername(username);
    const sessionUser = {
      username: user.User_Name,
      password,
      name: user.Full_Name,
      securityId: user.User_Security_ID
    };
    context.user = sessionUser;
    session.user = sessionUser;
    return {
      success: true,
      user
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
  },
  async updateUserLocations(_, { input }, { user, dataSources }) {
    const settings =
      (await UserSettingsModel.findOne({ username: user.username })) ||
      new UserSettingsModel({ username: user.username });
    if (input.add) {
      settings.locations.list.push(...input.add);
    }
    if (input.remove) {
      settings.locations.list = settings.locations.list.filter(
        code => !input.remove.includes(code)
      );
    }
    if (input.mode) {
      settings.locations.mode = input.mode;
    }
    await settings.save();

    let list: NavLocation[] = [];
    if (settings.locations.list.length > 0) {
      list = await dataSources.navLocation.getAllByCode(
        settings.locations.list
      );
    }
    return {
      success: true,
      locations: {
        mode: settings.locations.mode || InclusivityMode.Include,
        list: list
      }
    };
  }
};

export const User: UserResolvers = {
  username: user => user.User_Name,
  name: user => user.Full_Name,
  license: user => user.License_Type,
  async locations(_, __, { dataSources, user }) {
    const settings = await UserSettingsModel.findOne({
      username: user.username
    }).lean<UserSettingsDocument>();
    if (settings && settings.locations) {
      let list: NavLocation[] = [];
      if (settings.locations.list.length > 0) {
        list = await dataSources.navLocation.getAllByCode(
          settings.locations.list
        );
      }
      return {
        mode:
          (settings.locations.mode as InclusivityMode) ||
          InclusivityMode.Include,
        list
      };
    } else {
      return {
        mode: InclusivityMode.Include,
        list: []
      };
    }
  }
};

export const types = {
  User
};
