import { User, UserQuery, UserMutation } from "./user";
import { Job, JobQuery } from "./job";
import { ItemJournalMutation } from "./item-journal";

export default {
  Query: {
    ...UserQuery,
    ...JobQuery
  },
  Mutation: {
    ...UserMutation,
    ...ItemJournalMutation
  },
  User,
  Job
};
