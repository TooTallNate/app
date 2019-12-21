import { User, UserQuery, UserMutation } from "./user";
import { Job, JobDimensions, JobQuery } from "./job";
import { ItemJournalMutation } from "./item-journal";
import { JobJournalMutation } from "./job-journal";
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
    ...DefaultsMutation,
    ...JobJournalMutation
  },
  User,
  Job,
  JobDimensions,
  Defaults
};
