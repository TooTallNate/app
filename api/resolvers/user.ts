import { UserResolvers, MutationResolvers, QueryResolvers } from "./types";
import { NavUser, Guid, NavErrorCode } from "../nav";
import { ErrorCode } from "./utils";

export const UserQueries: QueryResolvers = {
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

export const UserMutations: MutationResolvers = {
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
    return users[0];
  },
  async logout(_, __, context) {
    await new Promise((res, rej) =>
      context.session.destroy(err => {
        if (err) rej(err);
        else res();
      })
    );
    return true;
  }
};

export const User: UserResolvers = {
  username: user => user.User_Name,
  name: user => user.Full_Name,
  license: user => user.License_Type
};
