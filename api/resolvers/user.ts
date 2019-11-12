import { MutationResolvers, UserResolvers, QueryResolvers } from "./types";
import createNavClient, { hashPassword } from "../nav";

export const UserQuery: QueryResolvers = {
  async user(_, __, { navClient }) {
    if (navClient) {
      return await navClient.getUser();
    } else {
      return null;
    }
  }
};

export const UserMutation: MutationResolvers = {
  async login(_, { input }, context) {
    const [ntPassword, lmPassword] = hashPassword(input.password);
    const navClient = createNavClient({
      username: input.username,
      ntPassword,
      lmPassword
    });
    const user = await navClient.getUser();
    if (user) {
      const sessionUser = {
        license: user.License_Type,
        name: user.Full_Name,
        username: input.username,
        ntPassword: Array.from(ntPassword),
        lmPassword: Array.from(lmPassword)
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
  id: user => user.User_Security_ID,
  license: user => user.License_Type,
  name: user => user.Full_Name,
  username: (_, __, { user }) => user.username.split("\\")[1],
  domain: (_, __, { user }) => user.username.split("\\")[0]
};
