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
  area: Job;
  operator?: Maybe<Resource>;
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
  personResponsible: Resource;
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type LoginResult = {
  __typename?: "LoginResult";
  success: Scalars["Boolean"];
  user: User;
};

export type LogoutResult = {
  __typename?: "LogoutResult";
  success: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: LoginResult;
  logout: LogoutResult;
  postPigAdjustment: PostPigAdjustmentResult;
  savePigAdjustment: SavePigAdjustmentResult;
  postPigGradeOff: PostPigGradeOffResult;
  savePigGradeOff: SavePigGradeOffResult;
  postPigMortality: PostPigMortalityResult;
  savePigMortality: SavePigMortalityResult;
  postPigMove: PostPigMoveResult;
  savePigMove: SavePigMoveResult;
  postPigPurchase: PostPigPurchaseResult;
  savePigPurchase: SavePigPurchaseResult;
  postPigWean: PostPigWeanResult;
  savePigWean: SavePigWeanResult;
  postFarrowingBackendScorecard: PostFarrowingBackendScorecardResult;
  saveFarrowingBackendScorecard: SaveFarrowingBackendScorecardResult;
  setAreaOperator: SetAreaOperatorResult;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostPigAdjustmentArgs = {
  input: PostPigAdjustmentInput;
};

export type MutationSavePigAdjustmentArgs = {
  input: SavePigAdjustmentInput;
};

export type MutationPostPigGradeOffArgs = {
  input: PostPigGradeOffInput;
};

export type MutationSavePigGradeOffArgs = {
  input: SavePigGradeOffInput;
};

export type MutationPostPigMortalityArgs = {
  input: PostPigMortalityInput;
};

export type MutationSavePigMortalityArgs = {
  input: SavePigMortalityInput;
};

export type MutationPostPigMoveArgs = {
  input: PostPigMoveInput;
};

export type MutationSavePigMoveArgs = {
  input: SavePigMoveInput;
};

export type MutationPostPigPurchaseArgs = {
  input: PostPigPurchaseInput;
};

export type MutationSavePigPurchaseArgs = {
  input: SavePigPurchaseInput;
};

export type MutationPostPigWeanArgs = {
  input: PostPigWeanInput;
};

export type MutationSavePigWeanArgs = {
  input: SavePigWeanInput;
};

export type MutationPostFarrowingBackendScorecardArgs = {
  input: PostFarrowingBackendScorecardInput;
};

export type MutationSaveFarrowingBackendScorecardArgs = {
  input: SaveFarrowingBackendScorecardInput;
};

export type MutationSetAreaOperatorArgs = {
  input: SetAreaOperatorInput;
};

export type PigActivityDefaults = {
  __typename?: "PigActivityDefaults";
  job?: Maybe<Job>;
  price?: Maybe<Scalars["Float"]>;
};

export type PigAdjustment = {
  __typename?: "PigAdjustment";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigGradeOff = {
  __typename?: "PigGradeOff";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMortality = {
  __typename?: "PigMortality";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMove = {
  __typename?: "PigMove";
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigPurchase = {
  __typename?: "PigPurchase";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigWean = {
  __typename?: "PigWean";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostFarrowingBackendScorecardInput = {
  area: Scalars["String"];
  operator: Scalars["String"];
  sows: ScorecardEntryInput;
  piglets: ScorecardEntryInput;
  feed: ScorecardEntryInput;
  water: ScorecardEntryInput;
  crate: ScorecardEntryInput;
  room: ScorecardEntryInput;
};

export type PostFarrowingBackendScorecardResult = {
  __typename?: "PostFarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
};

export type PostPigAdjustmentInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigAdjustmentResult = {
  __typename?: "PostPigAdjustmentResult";
  success: Scalars["Boolean"];
  pigAdjustment: PigAdjustment;
  defaults: PigActivityDefaults;
};

export type PostPigGradeOffInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigGradeOffResult = {
  __typename?: "PostPigGradeOffResult";
  success: Scalars["Boolean"];
  pigGradeOff: PigGradeOff;
  defaults: PigActivityDefaults;
};

export type PostPigMortalityInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  naturalQuantity: Scalars["Int"];
  euthanizedQuantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMortalityResult = {
  __typename?: "PostPigMortalityResult";
  success: Scalars["Boolean"];
  pigMortality: PigMortality;
  defaults: PigActivityDefaults;
};

export type PostPigMoveInput = {
  fromAnimal: Scalars["String"];
  toAnimal: Scalars["String"];
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMoveResult = {
  __typename?: "PostPigMoveResult";
  success: Scalars["Boolean"];
  pigMove: PigMove;
  defaults: PigActivityDefaults;
};

export type PostPigPurchaseInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigPurchaseResult = {
  __typename?: "PostPigPurchaseResult";
  success: Scalars["Boolean"];
  pigPurchase: PigPurchase;
  defaults: PigActivityDefaults;
};

export type PostPigWeanInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigWeanResult = {
  __typename?: "PostPigWeanResult";
  success: Scalars["Boolean"];
  pigWean: PigWean;
  defaults: PigActivityDefaults;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  pigActivityJobs: Array<Job>;
  pigActivityDefaults: PigActivityDefaults;
  pigAdjustment?: Maybe<PigAdjustment>;
  pigGradeOff?: Maybe<PigGradeOff>;
  pigMortality?: Maybe<PigMortality>;
  pigMove?: Maybe<PigMove>;
  pigPurchase?: Maybe<PigPurchase>;
  pigWean?: Maybe<PigWean>;
  farrowingBackendScorecard?: Maybe<FarrowingBackendScorecard>;
  farrowingBackendAreas: Array<Job>;
  farrowingBackendArea?: Maybe<Job>;
  farrowingBackendOperators: Array<Resource>;
};

export type QueryPigAdjustmentArgs = {
  job: Scalars["String"];
};

export type QueryPigGradeOffArgs = {
  job: Scalars["String"];
};

export type QueryPigMortalityArgs = {
  job: Scalars["String"];
};

export type QueryPigMoveArgs = {
  job: Scalars["String"];
};

export type QueryPigPurchaseArgs = {
  job: Scalars["String"];
};

export type QueryPigWeanArgs = {
  job: Scalars["String"];
};

export type QueryFarrowingBackendScorecardArgs = {
  area: Scalars["String"];
};

export type QueryFarrowingBackendAreaArgs = {
  number: Scalars["String"];
};

export type Resource = {
  __typename?: "Resource";
  number: Scalars["String"];
  name: Scalars["String"];
};

export type SaveFarrowingBackendScorecardInput = {
  area: Scalars["String"];
  operator?: Maybe<Scalars["String"]>;
  sows?: Maybe<ScorecardEntryInput>;
  piglets?: Maybe<ScorecardEntryInput>;
  feed?: Maybe<ScorecardEntryInput>;
  water?: Maybe<ScorecardEntryInput>;
  crate?: Maybe<ScorecardEntryInput>;
  room?: Maybe<ScorecardEntryInput>;
};

export type SaveFarrowingBackendScorecardResult = {
  __typename?: "SaveFarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
};

export type SavePigAdjustmentInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigAdjustmentResult = {
  __typename?: "SavePigAdjustmentResult";
  success: Scalars["Boolean"];
  pigAdjustment: PigAdjustment;
  defaults: PigActivityDefaults;
};

export type SavePigGradeOffInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigGradeOffResult = {
  __typename?: "SavePigGradeOffResult";
  success: Scalars["Boolean"];
  pigGradeOff: PigGradeOff;
  defaults: PigActivityDefaults;
};

export type SavePigMortalityInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMortalityResult = {
  __typename?: "SavePigMortalityResult";
  success: Scalars["Boolean"];
  pigMortality: PigMortality;
  defaults: PigActivityDefaults;
};

export type SavePigMoveInput = {
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMoveResult = {
  __typename?: "SavePigMoveResult";
  success: Scalars["Boolean"];
  pigMove: PigMove;
  defaults: PigActivityDefaults;
};

export type SavePigPurchaseInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigPurchaseResult = {
  __typename?: "SavePigPurchaseResult";
  success: Scalars["Boolean"];
  pigPurchase: PigPurchase;
  defaults: PigActivityDefaults;
};

export type SavePigWeanInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigWeanResult = {
  __typename?: "SavePigWeanResult";
  success: Scalars["Boolean"];
  pigWean: PigWean;
  defaults: PigActivityDefaults;
};

export type ScorecardEntry = {
  __typename?: "ScorecardEntry";
  score?: Maybe<Scalars["Int"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type ScorecardEntryInput = {
  score: Scalars["Int"];
  comments?: Maybe<Scalars["String"]>;
};

export type SetAreaOperatorInput = {
  area: Scalars["String"];
  operator: Scalars["String"];
};

export type SetAreaOperatorResult = {
  __typename?: "SetAreaOperatorResult";
  success: Scalars["Boolean"];
  area: Job;
};

export type User = {
  __typename?: "User";
  username: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
};

export type PigActivityDefaultsFragmentFragment = {
  __typename?: "PigActivityDefaults";
} & Pick<PigActivityDefaults, "price"> & {
    job: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  };

export type PigActivityQueryVariables = {};

export type PigActivityQuery = { __typename?: "Query" } & {
  pigActivityJobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "description">
  >;
  pigActivityDefaults: {
    __typename?: "PigActivityDefaults";
  } & PigActivityDefaultsFragmentFragment;
};

export type PostPigMoveMutationVariables = {
  input: PostPigMoveInput;
};

export type PostPigMoveMutation = { __typename?: "Mutation" } & {
  postPigMove: { __typename?: "PostPigMoveResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
  };
};

export type PostPigAdjustmentMutationVariables = {
  input: PostPigAdjustmentInput;
};

export type PostPigAdjustmentMutation = { __typename?: "Mutation" } & {
  postPigAdjustment: { __typename?: "PostPigAdjustmentResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
  };
};

export type PostPigGradeOffMutationVariables = {
  input: PostPigGradeOffInput;
};

export type PostPigGradeOffMutation = { __typename?: "Mutation" } & {
  postPigGradeOff: { __typename?: "PostPigGradeOffResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
  };
};

export type PostPigWeanMutationVariables = {
  input: PostPigWeanInput;
};

export type PostPigWeanMutation = { __typename?: "Mutation" } & {
  postPigWean: { __typename?: "PostPigWeanResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
  };
};

export type PostPigPurchaseMutationVariables = {
  input: PostPigPurchaseInput;
};

export type PostPigPurchaseMutation = { __typename?: "Mutation" } & {
  postPigPurchase: { __typename?: "PostPigPurchaseResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
  };
};

export type PostPigMortalityMutationVariables = {
  input: PostPigMortalityInput;
};

export type PostPigMortalityMutation = { __typename?: "Mutation" } & {
  postPigMortality: { __typename?: "PostPigMortalityResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
  };
};

export type FarrowingBackendAreaFieldsFragment = { __typename?: "Job" } & Pick<
  Job,
  "number" | "description"
> & {
    personResponsible: { __typename?: "Resource" } & Pick<
      Resource,
      "name" | "number"
    >;
  };

export type FarrowingBackendScorecardFieldsFragment = {
  __typename?: "FarrowingBackendScorecard";
} & {
  area: { __typename?: "Job" } & Pick<Job, "number">;
  operator: Maybe<{ __typename?: "Resource" } & Pick<Resource, "number">>;
  sows: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  piglets: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  feed: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  water: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  crate: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  room: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
};

export type FarrowingBackendScorecardAreasQueryVariables = {};

export type FarrowingBackendScorecardAreasQuery = { __typename?: "Query" } & {
  areas: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
};

export type FarrowingBackendScorecardQueryVariables = {
  area: Scalars["String"];
};

export type FarrowingBackendScorecardQuery = { __typename?: "Query" } & {
  area: Maybe<
    { __typename?: "Job" } & Pick<Job, "number" | "description"> & {
        personResponsible: { __typename?: "Resource" } & Pick<
          Resource,
          "number"
        >;
      }
  >;
  operators: Array<
    { __typename?: "Resource" } & Pick<Resource, "number" | "name">
  >;
  scorecard: Maybe<
    {
      __typename?: "FarrowingBackendScorecard";
    } & FarrowingBackendScorecardFieldsFragment
  >;
};

export type FarrowingBackendOperatorsQueryVariables = {
  area: Scalars["String"];
};

export type FarrowingBackendOperatorsQuery = { __typename?: "Query" } & {
  area: Maybe<{ __typename?: "Job" } & FarrowingBackendAreaFieldsFragment>;
  operators: Array<
    { __typename?: "Resource" } & Pick<Resource, "number" | "name">
  >;
};

export type PostFarrowingBackendScorecardMutationVariables = {
  input: PostFarrowingBackendScorecardInput;
};

export type PostFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & {
  postFarrowingBackendScorecard: {
    __typename?: "PostFarrowingBackendScorecardResult";
  } & Pick<PostFarrowingBackendScorecardResult, "success"> & {
      scorecard: {
        __typename?: "FarrowingBackendScorecard";
      } & FarrowingBackendScorecardFieldsFragment;
    };
};

export type SaveFarrowingBackendScorecardMutationVariables = {
  input: SaveFarrowingBackendScorecardInput;
};

export type SaveFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & {
  saveFarrowingBackendScorecard: {
    __typename?: "SaveFarrowingBackendScorecardResult";
  } & Pick<SaveFarrowingBackendScorecardResult, "success"> & {
      scorecard: {
        __typename?: "FarrowingBackendScorecard";
      } & FarrowingBackendScorecardFieldsFragment;
    };
};

export type SetAreaOperatorMutationVariables = {
  input: SetAreaOperatorInput;
};

export type SetAreaOperatorMutation = { __typename?: "Mutation" } & {
  setAreaOperator: { __typename?: "SetAreaOperatorResult" } & {
    area: { __typename?: "Job" } & FarrowingBackendAreaFieldsFragment;
  };
};

export type UserPartsFragment = { __typename?: "User" } & Pick<
  User,
  "username" | "name"
>;

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResult" } & {
    user: { __typename?: "User" } & UserPartsFragment;
  };
};

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserPartsFragment>;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout: { __typename?: "LogoutResult" } & Pick<LogoutResult, "success">;
};

export const PigActivityDefaultsFragmentFragmentDoc = gql`
  fragment PigActivityDefaultsFragment on PigActivityDefaults {
    job {
      number
    }
    price
  }
`;
export const FarrowingBackendAreaFieldsFragmentDoc = gql`
  fragment FarrowingBackendAreaFields on Job {
    number
    description
    personResponsible {
      name
      number
    }
  }
`;
export const FarrowingBackendScorecardFieldsFragmentDoc = gql`
  fragment FarrowingBackendScorecardFields on FarrowingBackendScorecard {
    area {
      number
    }
    operator {
      number
    }
    sows {
      score
      comments
    }
    piglets {
      score
      comments
    }
    feed {
      score
      comments
    }
    water {
      score
      comments
    }
    crate {
      score
      comments
    }
    room {
      score
      comments
    }
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
    pigActivityJobs {
      number
      description
    }
    pigActivityDefaults {
      ...PigActivityDefaultsFragment
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
  mutation PostPigMove($input: PostPigMoveInput!) {
    postPigMove(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
  mutation PostPigAdjustment($input: PostPigAdjustmentInput!) {
    postPigAdjustment(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
  mutation PostPigGradeOff($input: PostPigGradeOffInput!) {
    postPigGradeOff(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
  mutation PostPigWean($input: PostPigWeanInput!) {
    postPigWean(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
  mutation PostPigPurchase($input: PostPigPurchaseInput!) {
    postPigPurchase(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
  mutation PostPigMortality($input: PostPigMortalityInput!) {
    postPigMortality(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
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
export const FarrowingBackendScorecardAreasDocument = gql`
  query FarrowingBackendScorecardAreas {
    areas: farrowingBackendAreas {
      number
      description
    }
  }
`;

/**
 * __useFarrowingBackendScorecardAreasQuery__
 *
 * To run a query within a React component, call `useFarrowingBackendScorecardAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarrowingBackendScorecardAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarrowingBackendScorecardAreasQuery({
 *   variables: {
 *   },
 * });
 */
export function useFarrowingBackendScorecardAreasQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >(FarrowingBackendScorecardAreasDocument, baseOptions);
}
export function useFarrowingBackendScorecardAreasLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >(FarrowingBackendScorecardAreasDocument, baseOptions);
}
export type FarrowingBackendScorecardAreasQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardAreasQuery
>;
export type FarrowingBackendScorecardAreasLazyQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardAreasLazyQuery
>;
export type FarrowingBackendScorecardAreasQueryResult = ApolloReactCommon.QueryResult<
  FarrowingBackendScorecardAreasQuery,
  FarrowingBackendScorecardAreasQueryVariables
>;
export const FarrowingBackendScorecardDocument = gql`
  query FarrowingBackendScorecard($area: String!) {
    area: farrowingBackendArea(number: $area) {
      number
      description
      personResponsible {
        number
      }
    }
    operators: farrowingBackendOperators {
      number
      name
    }
    scorecard: farrowingBackendScorecard(area: $area) {
      ...FarrowingBackendScorecardFields
    }
  }
  ${FarrowingBackendScorecardFieldsFragmentDoc}
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
 *      area: // value for 'area'
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
export const FarrowingBackendOperatorsDocument = gql`
  query FarrowingBackendOperators($area: String!) {
    area: farrowingBackendArea(number: $area) {
      ...FarrowingBackendAreaFields
    }
    operators: farrowingBackendOperators {
      number
      name
    }
  }
  ${FarrowingBackendAreaFieldsFragmentDoc}
`;

/**
 * __useFarrowingBackendOperatorsQuery__
 *
 * To run a query within a React component, call `useFarrowingBackendOperatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarrowingBackendOperatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarrowingBackendOperatorsQuery({
 *   variables: {
 *      area: // value for 'area'
 *   },
 * });
 */
export function useFarrowingBackendOperatorsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >(FarrowingBackendOperatorsDocument, baseOptions);
}
export function useFarrowingBackendOperatorsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >(FarrowingBackendOperatorsDocument, baseOptions);
}
export type FarrowingBackendOperatorsQueryHookResult = ReturnType<
  typeof useFarrowingBackendOperatorsQuery
>;
export type FarrowingBackendOperatorsLazyQueryHookResult = ReturnType<
  typeof useFarrowingBackendOperatorsLazyQuery
>;
export type FarrowingBackendOperatorsQueryResult = ApolloReactCommon.QueryResult<
  FarrowingBackendOperatorsQuery,
  FarrowingBackendOperatorsQueryVariables
>;
export const PostFarrowingBackendScorecardDocument = gql`
  mutation PostFarrowingBackendScorecard(
    $input: PostFarrowingBackendScorecardInput!
  ) {
    postFarrowingBackendScorecard(input: $input) {
      success
      scorecard {
        ...FarrowingBackendScorecardFields
      }
    }
  }
  ${FarrowingBackendScorecardFieldsFragmentDoc}
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
export const SaveFarrowingBackendScorecardDocument = gql`
  mutation SaveFarrowingBackendScorecard(
    $input: SaveFarrowingBackendScorecardInput!
  ) {
    saveFarrowingBackendScorecard(input: $input) {
      success
      scorecard {
        ...FarrowingBackendScorecardFields
      }
    }
  }
  ${FarrowingBackendScorecardFieldsFragmentDoc}
`;
export type SaveFarrowingBackendScorecardMutationFn = ApolloReactCommon.MutationFunction<
  SaveFarrowingBackendScorecardMutation,
  SaveFarrowingBackendScorecardMutationVariables
>;

/**
 * __useSaveFarrowingBackendScorecardMutation__
 *
 * To run a mutation, you first call `useSaveFarrowingBackendScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveFarrowingBackendScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveFarrowingBackendScorecardMutation, { data, loading, error }] = useSaveFarrowingBackendScorecardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveFarrowingBackendScorecardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SaveFarrowingBackendScorecardMutation,
    SaveFarrowingBackendScorecardMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SaveFarrowingBackendScorecardMutation,
    SaveFarrowingBackendScorecardMutationVariables
  >(SaveFarrowingBackendScorecardDocument, baseOptions);
}
export type SaveFarrowingBackendScorecardMutationHookResult = ReturnType<
  typeof useSaveFarrowingBackendScorecardMutation
>;
export type SaveFarrowingBackendScorecardMutationResult = ApolloReactCommon.MutationResult<
  SaveFarrowingBackendScorecardMutation
>;
export type SaveFarrowingBackendScorecardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SaveFarrowingBackendScorecardMutation,
  SaveFarrowingBackendScorecardMutationVariables
>;
export const SetAreaOperatorDocument = gql`
  mutation SetAreaOperator($input: SetAreaOperatorInput!) {
    setAreaOperator(input: $input) {
      area {
        ...FarrowingBackendAreaFields
      }
    }
  }
  ${FarrowingBackendAreaFieldsFragmentDoc}
`;
export type SetAreaOperatorMutationFn = ApolloReactCommon.MutationFunction<
  SetAreaOperatorMutation,
  SetAreaOperatorMutationVariables
>;

/**
 * __useSetAreaOperatorMutation__
 *
 * To run a mutation, you first call `useSetAreaOperatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAreaOperatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAreaOperatorMutation, { data, loading, error }] = useSetAreaOperatorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAreaOperatorMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetAreaOperatorMutation,
    SetAreaOperatorMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetAreaOperatorMutation,
    SetAreaOperatorMutationVariables
  >(SetAreaOperatorDocument, baseOptions);
}
export type SetAreaOperatorMutationHookResult = ReturnType<
  typeof useSetAreaOperatorMutation
>;
export type SetAreaOperatorMutationResult = ApolloReactCommon.MutationResult<
  SetAreaOperatorMutation
>;
export type SetAreaOperatorMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetAreaOperatorMutation,
  SetAreaOperatorMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserParts
      }
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
    logout {
      success
    }
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
