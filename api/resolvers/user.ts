import { UserResolvers, MutationResolvers, QueryResolvers } from "./types";
import { NavUser, Guid } from "../nav";

export const UserQueries: QueryResolvers = {
  user(_, __, { user, navClient }) {
    if (user) {
      return navClient
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
    const users = await navClient
      .resource("User")
      .get<NavUser[]>()
      .filter(f => f.equals("User_Name", username));
    session.user = {
      username,
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
