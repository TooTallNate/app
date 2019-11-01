import { User, UserQuery, UserMutation } from "./user";
import { Job, JobDimensions, JobQuery } from "./job";
import { ItemJournalMutation } from "./item-journal";
import { Defaults, DefaultsQuery, DefaultsMutation } from "./defaults";

export default {
  Query: {
    ...UserQuery,
    ...JobQuery,
    ...DefaultsQuery
  },
  Mutation: {
    ...UserMutation,
    ...ItemJournalMutation,
    ...DefaultsMutation
  },
  User,
  Job,
  JobDimensions,
  Defaults
};
