import { gql } from "./utils";
import {
  User,
  Job,
  Defaults,
  MutationUpdateDefaultsArgs,
  MutationLoginArgs,
  QueryJobsArgs,
  MutationPostJobJournalArgs,
  MutationPostItemJournalArgs
} from "../resolvers/types";

export const userQuery = gql<{ user: User }>(
  `query User {
    user {
      id
      username
      domain
      name
      license
    }
  }`
);

export const loginMutation = gql<{ login: User }, MutationLoginArgs>(
  `mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      domain
      name
      license
    }
  }`
);

export const logoutMutation = gql<{ logout: Boolean }>(
  `mutation Logout {
    logout
  }`
);

export const jobsQuery = gql<{ jobs: Job }, QueryJobsArgs>(
  `query Jobs($input: JobSearchInput) {
    jobs(input: $input) {
      number
      site
      dimensions {
        costCenter
        entity
      }
    }
  }`
);

export const postItemMutation = gql<
  { postItemEntry: Boolean },
  MutationPostItemJournalArgs
>(
  `mutation PostItem($input: PostItemJournalInput!) {
    postItemJournal(input: $input)
  }`
);

export const postJobMutation = gql<
  { postJobEntry: Boolean },
  MutationPostJobJournalArgs
>(
  `mutation PostJob($input: PostJobJournalInput!) {
    postJobJournal(input: $input)
  }`
);

export const defaultsQuery = gql<{ defaults: Defaults }>(
  `query Defaults {
    defaults {
      pigJob
      scorecardJob
      price
    }
  }`
);

export const updateDefaultsMutation = gql<
  { updateDefaults: Defaults },
  MutationUpdateDefaultsArgs
>(
  `mutation UpdateDefaults($input: DefaultsInput!) {
    updateDefaults(input: $input) {
      pigJob
      scorecardJob
      price
    }
  }`
);
