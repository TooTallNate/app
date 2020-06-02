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
      return await dataSources.userNavApi.getBySecurityID(user.securityId);
    } else {
      return null;
    }
  },
  async locations(_, __, { navClient }) {
    return await navClient
      .resource("Company", process.env.NAV_COMPANY)
      .resource("Locations")
      .get<NavLocation[]>();
  }
};

export const mutations: MutationResolvers = {
  async login(_, { input: { username, password } }, context) {
    context.user = {
      username,
      password
    } as any;
    const { dataSources, session } = context;
    const user = await dataSources.userNavApi.getByUsername(username);
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
  async updateUserLocations(_, { input }, { user, navClient }) {
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
      list = await navClient
        .resource("Company", process.env.NAV_COMPANY)
        .resource("Locations")
        .get<NavLocation[]>()
        .filter(f =>
          f.or(...settings.locations.list.map(code => f.equals("Code", code)))
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
