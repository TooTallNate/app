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

export type Animal = {
  __typename?: "Animal";
  number: Scalars["String"];
  description: Scalars["String"];
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
  inventory?: Maybe<Scalars["Int"]>;
  deadQuantity?: Maybe<Scalars["Int"]>;
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
  lameQuantity?: Maybe<Scalars["Int"]>;
  respitoryQuantity?: Maybe<Scalars["Int"]>;
  bellyRuptureQuantity?: Maybe<Scalars["Int"]>;
  scrotumRuptureQuantity?: Maybe<Scalars["Int"]>;
  scoursQuantity?: Maybe<Scalars["Int"]>;
  smallQuantity?: Maybe<Scalars["Int"]>;
  unthriftyQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMortality = {
  __typename?: "PigMortality";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMove = {
  __typename?: "PigMove";
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
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
  smallPigQuantity?: Maybe<Scalars["Int"]>;
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
  price?: Maybe<Scalars["Float"]>;
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
  lameQuantity?: Maybe<Scalars["Int"]>;
  respitoryQuantity?: Maybe<Scalars["Int"]>;
  bellyRuptureQuantity?: Maybe<Scalars["Int"]>;
  scrotumRuptureQuantity?: Maybe<Scalars["Int"]>;
  scoursQuantity?: Maybe<Scalars["Int"]>;
  smallQuantity?: Maybe<Scalars["Int"]>;
  unthriftyQuantity?: Maybe<Scalars["Int"]>;
  weight: Scalars["Float"];
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
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
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
  smallPigQuantity?: Maybe<Scalars["Int"]>;
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
  smallPigQuantity?: Maybe<Scalars["Int"]>;
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
  pigTypes: Array<Animal>;
  pigActivityJobs: Array<Job>;
  pigActivityDefaults: PigActivityDefaults;
  pigAdjustment: PigAdjustment;
  pigGradeOff: PigGradeOff;
  pigMortality: PigMortality;
  pigMove: PigMove;
  pigPurchase: PigPurchase;
  pigWean: PigWean;
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
  lameQuantity?: Maybe<Scalars["Int"]>;
  respitoryQuantity?: Maybe<Scalars["Int"]>;
  bellyRuptureQuantity?: Maybe<Scalars["Int"]>;
  scrotumRuptureQuantity?: Maybe<Scalars["Int"]>;
  scoursQuantity?: Maybe<Scalars["Int"]>;
  smallQuantity?: Maybe<Scalars["Int"]>;
  unthriftyQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
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
  smallPigQuantity?: Maybe<Scalars["Int"]>;
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
  smallPigQuantity?: Maybe<Scalars["Int"]>;
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