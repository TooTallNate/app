import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  site: Scalars["String"];
};

export type JobSearchInput = {
  status?: Maybe<Array<Scalars["String"]>>;
  postingGroup?: Maybe<Array<Scalars["String"]>>;
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: User;
  logout: Scalars["Boolean"];
  postItem: Scalars["Boolean"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostItemArgs = {
  input: PostItemInput;
};

export type PostItemInput = {
  template: Scalars["String"];
  batch: Scalars["String"];
  date: Scalars["Date"];
  entryType: Scalars["String"];
  document: Scalars["String"];
  item: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  location: Scalars["String"];
  quantity: Scalars["Float"];
  amount: Scalars["Float"];
  weight: Scalars["Float"];
  job: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  jobs: Array<Job>;
};

export type QueryJobsArgs = {
  input?: Maybe<JobSearchInput>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  domain: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
};

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "id" | "username" | "name">;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type PostItemMutationVariables = {
  input: PostItemInput;
};

export type PostItemMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "postItem"
>;

export type JobsQueryVariables = {
  input?: Maybe<JobSearchInput>;
};

export type JobsQuery = { __typename?: "Query" } & {
  jobs: Array<{ __typename?: "Job" } & Pick<Job, "number" | "site">>;
};

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username" | "name">>;
};

export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      name
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const PostItemDocument = gql`
  mutation PostItem($input: PostItemInput!) {
    postItem(input: $input)
  }
`;
export type PostItemMutationFn = ApolloReactCommon.MutationFunction<
  PostItemMutation,
  PostItemMutationVariables
>;

/**
 * __usePostItemMutation__
 *
 * To run a mutation, you first call `usePostItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postItemMutation, { data, loading, error }] = usePostItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostItemMutation,
    PostItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostItemMutation,
    PostItemMutationVariables
  >(PostItemDocument, baseOptions);
}
export type PostItemMutationHookResult = ReturnType<typeof usePostItemMutation>;
export type PostItemMutationResult = ApolloReactCommon.MutationResult<
  PostItemMutation
>;
export type PostItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostItemMutation,
  PostItemMutationVariables
>;
export const JobsDocument = gql`
  query Jobs($input: JobSearchInput) {
    jobs(input: $input) {
      number
      site
    }
  }
`;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJobsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<JobsQuery, JobsQueryVariables>
) {
  return ApolloReactHooks.useQuery<JobsQuery, JobsQueryVariables>(
    JobsDocument,
    baseOptions
  );
}
export function useJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    JobsQuery,
    JobsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<JobsQuery, JobsQueryVariables>(
    JobsDocument,
    baseOptions
  );
}
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = ApolloReactCommon.QueryResult<
  JobsQuery,
  JobsQueryVariables
>;
export const UserDocument = gql`
  query User {
    user {
      id
      username
      name
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
