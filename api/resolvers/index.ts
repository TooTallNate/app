import { User, UserQuery, UserMutation } from "./user";
import { Job, JobQuery } from "./job";

export default {
  Query: {
    ...UserQuery,
    ...JobQuery
  },
  Mutation: {
    ...UserMutation
  },
  User,
  Job
};
