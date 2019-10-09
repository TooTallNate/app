import { User, UserQuery, UserMutation } from "./user";

export default {
  Query: {
    ...UserQuery
  },
  Mutation: {
    ...UserMutation
  },
  User
};
