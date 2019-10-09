import { MutationResolvers, UserResolvers, QueryResolvers } from "./types";
import nav from "../nav";

export const UserQuery: QueryResolvers = {
  async user(_, __, { user: { username, password } }) {
    return await nav.getUser(username, { username, password });
  }
};

export const UserMutation: MutationResolvers = {
  async login(_, { input: { username, password } }, context) {
    const user = await nav.getUser(username, { username, password });
    if (user) {
      const sessionUser = {
        license: user.License_Type,
        name: user.Full_Name,
        username,
        password
      };
      context.session.user = sessionUser;
      context.user = sessionUser;
      return user;
    } else {
      throw new Error("Login failed");
    }
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
  license: user => user.License_Type,
  name: user => user.Full_Name
};
