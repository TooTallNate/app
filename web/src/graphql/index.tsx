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
};

export type FarrowingBackendScorecard = {
  __typename?: "FarrowingBackendScorecard";
  areas: Array<Job>;
  operators: Array<Resource>;
};

export type FarrowingBackendScorecardInput = {
  area: Scalars["String"];
  operator: Scalars["String"];
  sows: ScorecardEntry;
  piglets: ScorecardEntry;
  feed: ScorecardEntry;
  water: ScorecardEntry;
  crate: ScorecardEntry;
  room: ScorecardEntry;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  description: Scalars["String"];
  personResponsible: Scalars["String"];
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: User;
  logout: Scalars["Boolean"];
  postPigAdjustment: PigActivity;
  postPigGradeOff: PigActivity;
  postPigMortality: PigActivity;
  postPigMove: PigActivity;
  postPigPurchase: PigActivity;
  postPigWean: PigActivity;
  postFarrowingBackendScorecard: Scalars["Boolean"];
  setAreaOperator: FarrowingBackendScorecard;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostPigAdjustmentArgs = {
  input: PigAdjustmentInput;
};

export type MutationPostPigGradeOffArgs = {
  input: PigGradeOffInput;
};

export type MutationPostPigMortalityArgs = {
  input: PigMortalityInput;
};

export type MutationPostPigMoveArgs = {
  input: PigMoveInput;
};

export type MutationPostPigPurchaseArgs = {
  input: PigPurchaseInput;
};

export type MutationPostPigWeanArgs = {
  input: PigWeanInput;
};

export type MutationPostFarrowingBackendScorecardArgs = {
  input: FarrowingBackendScorecardInput;
};

export type MutationSetAreaOperatorArgs = {
  input: SetAreaOperatorInput;
};

export type PigActivity = {
  __typename?: "PigActivity";
  jobs: Array<Job>;
  defaultJob?: Maybe<Job>;
  defaultPrice?: Maybe<Scalars["Float"]>;
};

export type PigAdjustmentInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigGradeOffInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigMortalityInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  naturalQuantity: Scalars["Int"];
  euthanizedQuantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigMoveInput = {
  fromAnimal: Scalars["String"];
  toAnimal: Scalars["String"];
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigPurchaseInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigWeanInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  pigActivity: PigActivity;
  farrowingBackendScorecard: FarrowingBackendScorecard;
};

export type Resource = {
  __typename?: "Resource";
  number: Scalars["String"];
  name: Scalars["String"];
};

export type ScorecardEntry = {
  score: Scalars["Int"];
  comments?: Maybe<Scalars["String"]>;
};

export type SetAreaOperatorInput = {
  area: Scalars["String"];
  operator: Scalars["String"];
};

export type User = {
  __typename?: "User";
  username: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
};

export type PigActivityDefaultsFragment = { __typename?: "PigActivity" } & Pick<
  PigActivity,
  "defaultPrice"
> & { defaultJob: Maybe<{ __typename?: "Job" } & Pick<Job, "number">> };

export type PigActivityQueryVariables = {};

export type PigActivityQuery = { __typename?: "Query" } & {
  pigActivity: { __typename?: "PigActivity" } & {
    jobs: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
  } & PigActivityDefaultsFragment;
};

export type PostPigMoveMutationVariables = {
  input: PigMoveInput;
};

export type PostPigMoveMutation = { __typename?: "Mutation" } & {
  postPigMove: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigAdjustmentMutationVariables = {
  input: PigAdjustmentInput;
};

export type PostPigAdjustmentMutation = { __typename?: "Mutation" } & {
  postPigAdjustment: {
    __typename?: "PigActivity";
  } & PigActivityDefaultsFragment;
};

export type PostPigGradeOffMutationVariables = {
  input: PigGradeOffInput;
};

export type PostPigGradeOffMutation = { __typename?: "Mutation" } & {
  postPigGradeOff: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigWeanMutationVariables = {
  input: PigWeanInput;
};

export type PostPigWeanMutation = { __typename?: "Mutation" } & {
  postPigWean: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigPurchaseMutationVariables = {
  input: PigPurchaseInput;
};

export type PostPigPurchaseMutation = { __typename?: "Mutation" } & {
  postPigPurchase: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigMortalityMutationVariables = {
  input: PigMortalityInput;
};

export type PostPigMortalityMutation = { __typename?: "Mutation" } & {
  postPigMortality: {
    __typename?: "PigActivity";
  } & PigActivityDefaultsFragment;
};

export type FarrowingBackendScorecardQueryVariables = {};

export type FarrowingBackendScorecardQuery = { __typename?: "Query" } & {
  farrowingBackendScorecard: { __typename?: "FarrowingBackendScorecard" } & {
    areas: Array<
      { __typename?: "Job" } & Pick<
        Job,
        "number" | "description" | "personResponsible"
      >
    >;
  };
};

export type PostFarrowingBackendScorecardMutationVariables = {
  input: FarrowingBackendScorecardInput;
};

export type PostFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "postFarrowingBackendScorecard">;

export type UserPartsFragment = { __typename?: "User" } & Pick<
  User,
  "username" | "name"
>;

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & UserPartsFragment;
};

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserPartsFragment>;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export const PigActivityDefaultsFragmentDoc = gql`
  fragment PigActivityDefaults on PigActivity {
    defaultJob {
      number
    }
    defaultPrice
  }
`;
export const UserPartsFragmentDoc = gql`
  fragment UserParts on User {
    username
    name
  }
`;
export const PigActivityDocument = gql`
  query PigActivity {
    pigActivity {
      ...PigActivityDefaults
      jobs {
        number
        description
      }
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;

/**
 * __usePigActivityQuery__
 *
 * To run a query within a React component, call `usePigActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigActivityQuery({
 *   variables: {
 *   },
 * });
 */
export function usePigActivityQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigActivityQuery,
    PigActivityQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PigActivityQuery, PigActivityQueryVariables>(
    PigActivityDocument,
    baseOptions
  );
}
export function usePigActivityLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigActivityQuery,
    PigActivityQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PigActivityQuery,
    PigActivityQueryVariables
  >(PigActivityDocument, baseOptions);
}
export type PigActivityQueryHookResult = ReturnType<typeof usePigActivityQuery>;
export type PigActivityLazyQueryHookResult = ReturnType<
  typeof usePigActivityLazyQuery
>;
export type PigActivityQueryResult = ApolloReactCommon.QueryResult<
  PigActivityQuery,
  PigActivityQueryVariables
>;
export const PostPigMoveDocument = gql`
  mutation PostPigMove($input: PigMoveInput!) {
    postPigMove(input: $input) {
      ...PigActivityDefaults
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;
export type PostPigMoveMutationFn = ApolloReactCommon.MutationFunction<
  PostPigMoveMutation,
  PostPigMoveMutationVariables
>;

/**
 * __usePostPigMoveMutation__
 *
 * To run a mutation, you first call `usePostPigMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPigMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPigMoveMutation, { data, loading, error }] = usePostPigMoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPigMoveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigMoveMutation,
    PostPigMoveMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigMoveMutation,
    PostPigMoveMutationVariables
  >(PostPigMoveDocument, baseOptions);
}
export type PostPigMoveMutationHookResult = ReturnType<
  typeof usePostPigMoveMutation
>;
export type PostPigMoveMutationResult = ApolloReactCommon.MutationResult<
  PostPigMoveMutation
>;
export type PostPigMoveMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigMoveMutation,
  PostPigMoveMutationVariables
>;
export const PostPigAdjustmentDocument = gql`
  mutation PostPigAdjustment($input: PigAdjustmentInput!) {
    postPigAdjustment(input: $input) {
      ...PigActivityDefaults
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;
export type PostPigAdjustmentMutationFn = ApolloReactCommon.MutationFunction<
  PostPigAdjustmentMutation,
  PostPigAdjustmentMutationVariables
>;

/**
 * __usePostPigAdjustmentMutation__
 *
 * To run a mutation, you first call `usePostPigAdjustmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPigAdjustmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPigAdjustmentMutation, { data, loading, error }] = usePostPigAdjustmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPigAdjustmentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigAdjustmentMutation,
    PostPigAdjustmentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigAdjustmentMutation,
    PostPigAdjustmentMutationVariables
  >(PostPigAdjustmentDocument, baseOptions);
}
export type PostPigAdjustmentMutationHookResult = ReturnType<
  typeof usePostPigAdjustmentMutation
>;
export type PostPigAdjustmentMutationResult = ApolloReactCommon.MutationResult<
  PostPigAdjustmentMutation
>;
export type PostPigAdjustmentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigAdjustmentMutation,
  PostPigAdjustmentMutationVariables
>;
export const PostPigGradeOffDocument = gql`
  mutation PostPigGradeOff($input: PigGradeOffInput!) {
    postPigGradeOff(input: $input) {
      ...PigActivityDefaults
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;
export type PostPigGradeOffMutationFn = ApolloReactCommon.MutationFunction<
  PostPigGradeOffMutation,
  PostPigGradeOffMutationVariables
>;

/**
 * __usePostPigGradeOffMutation__
 *
 * To run a mutation, you first call `usePostPigGradeOffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPigGradeOffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPigGradeOffMutation, { data, loading, error }] = usePostPigGradeOffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPigGradeOffMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigGradeOffMutation,
    PostPigGradeOffMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigGradeOffMutation,
    PostPigGradeOffMutationVariables
  >(PostPigGradeOffDocument, baseOptions);
}
export type PostPigGradeOffMutationHookResult = ReturnType<
  typeof usePostPigGradeOffMutation
>;
export type PostPigGradeOffMutationResult = ApolloReactCommon.MutationResult<
  PostPigGradeOffMutation
>;
export type PostPigGradeOffMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigGradeOffMutation,
  PostPigGradeOffMutationVariables
>;
export const PostPigWeanDocument = gql`
  mutation PostPigWean($input: PigWeanInput!) {
    postPigWean(input: $input) {
      ...PigActivityDefaults
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;
export type PostPigWeanMutationFn = ApolloReactCommon.MutationFunction<
  PostPigWeanMutation,
  PostPigWeanMutationVariables
>;

/**
 * __usePostPigWeanMutation__
 *
 * To run a mutation, you first call `usePostPigWeanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPigWeanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPigWeanMutation, { data, loading, error }] = usePostPigWeanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPigWeanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigWeanMutation,
    PostPigWeanMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigWeanMutation,
    PostPigWeanMutationVariables
  >(PostPigWeanDocument, baseOptions);
}
export type PostPigWeanMutationHookResult = ReturnType<
  typeof usePostPigWeanMutation
>;
export type PostPigWeanMutationResult = ApolloReactCommon.MutationResult<
  PostPigWeanMutation
>;
export type PostPigWeanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigWeanMutation,
  PostPigWeanMutationVariables
>;
export const PostPigPurchaseDocument = gql`
  mutation PostPigPurchase($input: PigPurchaseInput!) {
    postPigPurchase(input: $input) {
      ...PigActivityDefaults
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;
export type PostPigPurchaseMutationFn = ApolloReactCommon.MutationFunction<
  PostPigPurchaseMutation,
  PostPigPurchaseMutationVariables
>;

/**
 * __usePostPigPurchaseMutation__
 *
 * To run a mutation, you first call `usePostPigPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPigPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPigPurchaseMutation, { data, loading, error }] = usePostPigPurchaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPigPurchaseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigPurchaseMutation,
    PostPigPurchaseMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigPurchaseMutation,
    PostPigPurchaseMutationVariables
  >(PostPigPurchaseDocument, baseOptions);
}
export type PostPigPurchaseMutationHookResult = ReturnType<
  typeof usePostPigPurchaseMutation
>;
export type PostPigPurchaseMutationResult = ApolloReactCommon.MutationResult<
  PostPigPurchaseMutation
>;
export type PostPigPurchaseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigPurchaseMutation,
  PostPigPurchaseMutationVariables
>;
export const PostPigMortalityDocument = gql`
  mutation PostPigMortality($input: PigMortalityInput!) {
    postPigMortality(input: $input) {
      ...PigActivityDefaults
    }
  }
  ${PigActivityDefaultsFragmentDoc}
`;
export type PostPigMortalityMutationFn = ApolloReactCommon.MutationFunction<
  PostPigMortalityMutation,
  PostPigMortalityMutationVariables
>;

/**
 * __usePostPigMortalityMutation__
 *
 * To run a mutation, you first call `usePostPigMortalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPigMortalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPigMortalityMutation, { data, loading, error }] = usePostPigMortalityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPigMortalityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigMortalityMutation,
    PostPigMortalityMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigMortalityMutation,
    PostPigMortalityMutationVariables
  >(PostPigMortalityDocument, baseOptions);
}
export type PostPigMortalityMutationHookResult = ReturnType<
  typeof usePostPigMortalityMutation
>;
export type PostPigMortalityMutationResult = ApolloReactCommon.MutationResult<
  PostPigMortalityMutation
>;
export type PostPigMortalityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigMortalityMutation,
  PostPigMortalityMutationVariables
>;
export const FarrowingBackendScorecardDocument = gql`
  query FarrowingBackendScorecard {
    farrowingBackendScorecard {
      areas {
        number
        description
        personResponsible
      }
    }
  }
`;

/**
 * __useFarrowingBackendScorecardQuery__
 *
 * To run a query within a React component, call `useFarrowingBackendScorecardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarrowingBackendScorecardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarrowingBackendScorecardQuery({
 *   variables: {
 *   },
 * });
 */
export function useFarrowingBackendScorecardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >(FarrowingBackendScorecardDocument, baseOptions);
}
export function useFarrowingBackendScorecardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >(FarrowingBackendScorecardDocument, baseOptions);
}
export type FarrowingBackendScorecardQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardQuery
>;
export type FarrowingBackendScorecardLazyQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardLazyQuery
>;
export type FarrowingBackendScorecardQueryResult = ApolloReactCommon.QueryResult<
  FarrowingBackendScorecardQuery,
  FarrowingBackendScorecardQueryVariables
>;
export const PostFarrowingBackendScorecardDocument = gql`
  mutation PostFarrowingBackendScorecard(
    $input: FarrowingBackendScorecardInput!
  ) {
    postFarrowingBackendScorecard(input: $input)
  }
`;
export type PostFarrowingBackendScorecardMutationFn = ApolloReactCommon.MutationFunction<
  PostFarrowingBackendScorecardMutation,
  PostFarrowingBackendScorecardMutationVariables
>;

/**
 * __usePostFarrowingBackendScorecardMutation__
 *
 * To run a mutation, you first call `usePostFarrowingBackendScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostFarrowingBackendScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postFarrowingBackendScorecardMutation, { data, loading, error }] = usePostFarrowingBackendScorecardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostFarrowingBackendScorecardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostFarrowingBackendScorecardMutation,
    PostFarrowingBackendScorecardMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostFarrowingBackendScorecardMutation,
    PostFarrowingBackendScorecardMutationVariables
  >(PostFarrowingBackendScorecardDocument, baseOptions);
}
export type PostFarrowingBackendScorecardMutationHookResult = ReturnType<
  typeof usePostFarrowingBackendScorecardMutation
>;
export type PostFarrowingBackendScorecardMutationResult = ApolloReactCommon.MutationResult<
  PostFarrowingBackendScorecardMutation
>;
export type PostFarrowingBackendScorecardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostFarrowingBackendScorecardMutation,
  PostFarrowingBackendScorecardMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...UserParts
    }
  }
  ${UserPartsFragmentDoc}
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
export const UserDocument = gql`
  query User {
    user {
      ...UserParts
    }
  }
  ${UserPartsFragmentDoc}
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
