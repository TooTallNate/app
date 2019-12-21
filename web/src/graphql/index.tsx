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

export type Defaults = {
  __typename?: "Defaults";
  pigJob?: Maybe<Scalars["String"]>;
  scorecardJob?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type DefaultsInput = {
  pigJob?: Maybe<Scalars["String"]>;
  scorecardJob?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  site: Scalars["String"];
  dimensions: JobDimensions;
};

export type JobDimensions = {
  __typename?: "JobDimensions";
  costCenter?: Maybe<Scalars["String"]>;
  entity?: Maybe<Scalars["String"]>;
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
  updateDefaults: Defaults;
  postItemJournal: Scalars["Boolean"];
  postJobJournal: Scalars["Boolean"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationUpdateDefaultsArgs = {
  input: DefaultsInput;
};

export type MutationPostItemJournalArgs = {
  input: PostItemJournalInput;
};

export type MutationPostJobJournalArgs = {
  input: PostJobJournalInput;
};

export type PostItemJournalInput = {
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
  prodPostingGroup?: Maybe<Scalars["String"]>;
  costCenterCode?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
};

export type PostJobJournalInput = {
  template: Scalars["String"];
  batch: Scalars["String"];
  date: Scalars["Date"];
  document: Scalars["String"];
  job: Scalars["String"];
  location: Scalars["String"];
  task: Scalars["String"];
  number: Scalars["String"];
  workType: Scalars["String"];
  quantity: Scalars["Float"];
  unitPrice: Scalars["Float"];
  description?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  defaults: Defaults;
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
  input: PostItemJournalInput;
};

export type PostItemMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "postItemJournal"
>;

export type PostJobJournalMutationVariables = {
  input: PostJobJournalInput;
};

export type PostJobJournalMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "postJobJournal"
>;

export type PostJobMutationVariables = {
  input: PostJobJournalInput;
};

export type PostJobMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "postJobJournal"
>;

export type UpdateDefaultsMutationVariables = {
  input: DefaultsInput;
};

export type UpdateDefaultsMutation = { __typename?: "Mutation" } & {
  updateDefaults: { __typename?: "Defaults" } & Pick<
    Defaults,
    "pigJob" | "scorecardJob" | "price"
  >;
};

export type DefaultsQueryVariables = {};

export type DefaultsQuery = { __typename?: "Query" } & {
  defaults: { __typename?: "Defaults" } & Pick<
    Defaults,
    "pigJob" | "scorecardJob" | "price"
  >;
};

export type JobsQueryVariables = {
  input?: Maybe<JobSearchInput>;
};

export type JobsQuery = { __typename?: "Query" } & {
  jobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "site"> & {
        dimensions: { __typename?: "JobDimensions" } & Pick<
          JobDimensions,
          "costCenter" | "entity"
        >;
      }
  >;
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
  mutation PostItem($input: PostItemJournalInput!) {
    postItemJournal(input: $input)
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
export const PostJobJournalDocument = gql`
  mutation PostJobJournal($input: PostJobJournalInput!) {
    postJobJournal(input: $input)
  }
`;
export type PostJobJournalMutationFn = ApolloReactCommon.MutationFunction<
  PostJobJournalMutation,
  PostJobJournalMutationVariables
>;

/**
 * __usePostJobJournalMutation__
 *
 * To run a mutation, you first call `usePostJobJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostJobJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postJobJournalMutation, { data, loading, error }] = usePostJobJournalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostJobJournalMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostJobJournalMutation,
    PostJobJournalMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostJobJournalMutation,
    PostJobJournalMutationVariables
  >(PostJobJournalDocument, baseOptions);
}
export type PostJobJournalMutationHookResult = ReturnType<
  typeof usePostJobJournalMutation
>;
export type PostJobJournalMutationResult = ApolloReactCommon.MutationResult<
  PostJobJournalMutation
>;
export type PostJobJournalMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostJobJournalMutation,
  PostJobJournalMutationVariables
>;
export const PostJobDocument = gql`
  mutation PostJob($input: PostJobJournalInput!) {
    postJobJournal(input: $input)
  }
`;
export type PostJobMutationFn = ApolloReactCommon.MutationFunction<
  PostJobMutation,
  PostJobMutationVariables
>;

/**
 * __usePostJobMutation__
 *
 * To run a mutation, you first call `usePostJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postJobMutation, { data, loading, error }] = usePostJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostJobMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostJobMutation,
    PostJobMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostJobMutation,
    PostJobMutationVariables
  >(PostJobDocument, baseOptions);
}
export type PostJobMutationHookResult = ReturnType<typeof usePostJobMutation>;
export type PostJobMutationResult = ApolloReactCommon.MutationResult<
  PostJobMutation
>;
export type PostJobMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostJobMutation,
  PostJobMutationVariables
>;
export const UpdateDefaultsDocument = gql`
  mutation UpdateDefaults($input: DefaultsInput!) {
    updateDefaults(input: $input) {
      pigJob
      scorecardJob
      price
    }
  }
`;
export type UpdateDefaultsMutationFn = ApolloReactCommon.MutationFunction<
  UpdateDefaultsMutation,
  UpdateDefaultsMutationVariables
>;

/**
 * __useUpdateDefaultsMutation__
 *
 * To run a mutation, you first call `useUpdateDefaultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDefaultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDefaultsMutation, { data, loading, error }] = useUpdateDefaultsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDefaultsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateDefaultsMutation,
    UpdateDefaultsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateDefaultsMutation,
    UpdateDefaultsMutationVariables
  >(UpdateDefaultsDocument, baseOptions);
}
export type UpdateDefaultsMutationHookResult = ReturnType<
  typeof useUpdateDefaultsMutation
>;
export type UpdateDefaultsMutationResult = ApolloReactCommon.MutationResult<
  UpdateDefaultsMutation
>;
export type UpdateDefaultsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateDefaultsMutation,
  UpdateDefaultsMutationVariables
>;
export const DefaultsDocument = gql`
  query Defaults {
    defaults {
      pigJob
      scorecardJob
      price
    }
  }
`;

/**
 * __useDefaultsQuery__
 *
 * To run a query within a React component, call `useDefaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefaultsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    DefaultsQuery,
    DefaultsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<DefaultsQuery, DefaultsQueryVariables>(
    DefaultsDocument,
    baseOptions
  );
}
export function useDefaultsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    DefaultsQuery,
    DefaultsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<DefaultsQuery, DefaultsQueryVariables>(
    DefaultsDocument,
    baseOptions
  );
}
export type DefaultsQueryHookResult = ReturnType<typeof useDefaultsQuery>;
export type DefaultsLazyQueryHookResult = ReturnType<
  typeof useDefaultsLazyQuery
>;
export type DefaultsQueryResult = ApolloReactCommon.QueryResult<
  DefaultsQuery,
  DefaultsQueryVariables
>;
export const JobsDocument = gql`
  query Jobs($input: JobSearchInput) {
    jobs(input: $input) {
      number
      site
      dimensions {
        costCenter
        entity
      }
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
