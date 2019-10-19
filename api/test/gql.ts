import { gql } from "./utils";
import {
  User,
  Job,
  MutationLoginArgs,
  QueryJobsArgs,
  MutationPostItemArgs
} from "../resolvers/types";

export const userQuery = gql<{ user: User }>(
  `query User {
    user {
      id
      name
      license
    }
  }`
);

export const loginMutation = gql<{ login: User }, MutationLoginArgs>(
  `mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
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
    }
  }`
);

export const postItemMutation = gql<
  { postItemEntry: Boolean },
  MutationPostItemArgs
>(
  `mutation PostItem($input: PostItemInput!) {
    postItem(input: $input)
  }`
);
