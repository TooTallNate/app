import { gql } from "./utils";
import { User, MutationLoginArgs } from "../resolvers/types";

export const userQuery = gql<{ user: User }>(
  `query User {
    user {
      name
      license
    }
  }`
);

export const loginMutation = gql<{ login: User }, MutationLoginArgs>(
  `mutation Login($input: LoginInput!) {
    login(input: $input) {
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
