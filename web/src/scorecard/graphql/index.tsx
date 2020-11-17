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

export enum InclusivityMode {
  Include = "INCLUDE",
  Exclude = "EXCLUDE"
}

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  description: Scalars["String"];
  personResponsible: Resource;
  inventory?: Maybe<Scalars["Int"]>;
  deadQuantity?: Maybe<Scalars["Int"]>;
};

export type Item = {
  __typename?: "Item";
  number: Scalars["String"];
  description: Scalars["String"];
};

export type Reason = {
  __typename?: "Reason";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type Resource = {
  __typename?: "Resource";
  number: Scalars["String"];
  name: Scalars["String"];
};

export type Location = {
  __typename?: "Location";
  code: Scalars["String"];
  name: Scalars["String"];
};

export type PigActivityDefaults = {
  __typename?: "PigActivityDefaults";
  job?: Maybe<Job>;
  prices: Array<PriceEntry>;
};

export type PigWeanEvent = {
  __typename?: "PigWeanEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type PigGradeOffEvent = {
  __typename?: "PigGradeOffEvent";
  code: Scalars["String"];
  description: Scalars["String"];
  reasons: Array<Reason>;
};

export type PigMoveEvent = {
  __typename?: "PigMoveEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type PigPurchaseEvent = {
  __typename?: "PigPurchaseEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type PigAdjustmentEvent = {
  __typename?: "PigAdjustmentEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type PigMortalityEvent = {
  __typename?: "PigMortalityEvent";
  code: Scalars["String"];
  description: Scalars["String"];
  reasons: Array<Reason>;
};

export type PriceEntry = {
  __typename?: "PriceEntry";
  animal: Scalars["String"];
  price?: Maybe<Scalars["Float"]>;
};

export type PigQuantity = {
  __typename?: "PigQuantity";
  code: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
};

export type PigQuantityInput = {
  code: Scalars["String"];
  quantity: Scalars["Int"];
};

export type PigOptionalQuantityInput = {
  code: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
};

export type PigAdjustment = {
  __typename?: "PigAdjustment";
  event?: Maybe<PigAdjustmentEvent>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigAdjustmentInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigAdjustmentInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigAdjustmentResult = {
  __typename?: "PigAdjustmentResult";
  success: Scalars["Boolean"];
  pigAdjustment: PigAdjustment;
  defaults: PigActivityDefaults;
};

export type PigGradeOff = {
  __typename?: "PigGradeOff";
  event?: Maybe<PigGradeOffEvent>;
  job: Job;
  quantities: Array<PigQuantity>;
  pigWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigGradeOffInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantities: Array<PigQuantityInput>;
  pigWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigGradeOffInput = {
  event?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities?: Maybe<Array<PigOptionalQuantityInput>>;
  pigWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigGradeOffResult = {
  __typename?: "PigGradeOffResult";
  success: Scalars["Boolean"];
  pigGradeOff: PigGradeOff;
  defaults: PigActivityDefaults;
};

export type PigMortality = {
  __typename?: "PigMortality";
  event?: Maybe<PigMortalityEvent>;
  job: Job;
  quantities?: Maybe<Array<PigQuantity>>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMortalityInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantities?: Maybe<Array<PigQuantityInput>>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMortalityInput = {
  event?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities?: Maybe<Array<PigOptionalQuantityInput>>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMortalityResult = {
  __typename?: "PigMortalityResult";
  success: Scalars["Boolean"];
  pigMortality: PigMortality;
  defaults: PigActivityDefaults;
};

export type PigMove = {
  __typename?: "PigMove";
  event?: Maybe<PigMoveEvent>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMoveInput = {
  event: Scalars["String"];
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMoveInput = {
  event?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMoveResult = {
  __typename?: "PigMoveResult";
  success: Scalars["Boolean"];
  pigMove: PigMove;
  defaults: PigActivityDefaults;
};

export type PigPurchase = {
  __typename?: "PigPurchase";
  event?: Maybe<PigPurchaseEvent>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigPurchaseInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigPurchaseInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigPurchaseResult = {
  __typename?: "PigPurchaseResult";
  success: Scalars["Boolean"];
  pigPurchase: PigPurchase;
  defaults: PigActivityDefaults;
};

export type PigWean = {
  __typename?: "PigWean";
  event?: Maybe<PigWeanEvent>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigWeanInput = {
  event: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigWeanInput = {
  event?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigWeanResult = {
  __typename?: "PigWeanResult";
  success: Scalars["Boolean"];
  pigWean: PigWean;
  defaults: PigActivityDefaults;
};

export type Query = {
  __typename?: "Query";
  animals: Array<Item>;
  farrowingBackendArea?: Maybe<Job>;
  farrowingBackendAreas: Array<Job>;
  farrowingBackendOperators: Array<Resource>;
  farrowingBackendScorecard?: Maybe<FarrowingBackendScorecard>;
  growFinishJob?: Maybe<Job>;
  growFinishJobs: Array<Job>;
  listJobs: Array<Job>;
  locations: Array<Location>;
  personResponsible: Array<Resource>;
  pigActivityDefaults: PigActivityDefaults;
  pigActivityJobs: Array<Job>;
  pigAdjustment: PigAdjustment;
  pigAdjustmentEventTypes: Array<PigAdjustmentEvent>;
  pigGradeOff: PigGradeOff;
  pigGradeOffEventTypes: Array<PigGradeOffEvent>;
  pigMortality: PigMortality;
  pigMortalityEventTypes: Array<PigMortalityEvent>;
  pigMove: PigMove;
  pigMoveEventTypes: Array<PigMoveEvent>;
  pigPurchase: PigPurchase;
  pigPurchaseEventTypes: Array<PigPurchaseEvent>;
  pigWean: PigWean;
  pigWeanEventTypes: Array<PigWeanEvent>;
  scorecardPages: Array<ScorecardPage>;
  user?: Maybe<User>;
};

export type QueryFarrowingBackendAreaArgs = {
  number: Scalars["String"];
};

export type QueryFarrowingBackendScorecardArgs = {
  area: Scalars["String"];
};

export type QueryGrowFinishJobArgs = {
  number: Scalars["String"];
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

export type QueryScorecardPagesArgs = {
  job: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: LoginResult;
  logout: LogoutResult;
  postFarrowingBackendScorecard: FarrowingBackendScorecardResult;
  postPigAdjustment: PigAdjustmentResult;
  postPigGradeOff: PigGradeOffResult;
  postPigMortality: PigMortalityResult;
  postPigMove: PigMoveResult;
  postPigPurchase: PigPurchaseResult;
  postPigWean: PigWeanResult;
  saveFarrowingBackendScorecard: FarrowingBackendScorecardResult;
  savePigAdjustment: PigAdjustmentResult;
  savePigGradeOff: PigGradeOffResult;
  savePigMortality: PigMortalityResult;
  savePigMove: PigMoveResult;
  savePigPurchase: PigPurchaseResult;
  savePigWean: PigWeanResult;
  saveScorecard: ScorecardResult;
  setAreaOperator: SetAreaOperatorResult;
  updateUserLocations: UpdateUserLocationsResult;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostFarrowingBackendScorecardArgs = {
  input: PostFarrowingBackendScorecardInput;
};

export type MutationPostPigAdjustmentArgs = {
  input: PostPigAdjustmentInput;
};

export type MutationPostPigGradeOffArgs = {
  input: PostPigGradeOffInput;
};

export type MutationPostPigMortalityArgs = {
  input: PostPigMortalityInput;
};

export type MutationPostPigMoveArgs = {
  input: PostPigMoveInput;
};

export type MutationPostPigPurchaseArgs = {
  input: PostPigPurchaseInput;
};

export type MutationPostPigWeanArgs = {
  input: PostPigWeanInput;
};

export type MutationSaveFarrowingBackendScorecardArgs = {
  input: SaveFarrowingBackendScorecardInput;
};

export type MutationSavePigAdjustmentArgs = {
  input: SavePigAdjustmentInput;
};

export type MutationSavePigGradeOffArgs = {
  input: SavePigGradeOffInput;
};

export type MutationSavePigMortalityArgs = {
  input: SavePigMortalityInput;
};

export type MutationSavePigMoveArgs = {
  input: SavePigMoveInput;
};

export type MutationSavePigPurchaseArgs = {
  input: SavePigPurchaseInput;
};

export type MutationSavePigWeanArgs = {
  input: SavePigWeanInput;
};

export type MutationSaveScorecardArgs = {
  input: SaveScorecardInput;
};

export type MutationSetAreaOperatorArgs = {
  input: SetAreaOperatorInput;
};

export type MutationUpdateUserLocationsArgs = {
  input: UpdateUserLocationsInput;
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

export type FarrowingBackendScorecardResult = {
  __typename?: "FarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
};

export type ScorecardElement = {
  __typename?: "ScorecardElement";
  label: Scalars["String"];
  code: Scalars["String"];
};

export type ScorecardPage = {
  __typename?: "ScorecardPage";
  title?: Maybe<Scalars["String"]>;
  elements: Array<ScorecardElement>;
};

export type ScorecardJob = {
  __typename?: "ScorecardJob";
  number: Scalars["String"];
  personResponsible: Scalars["String"];
};

export type PostScorecardInput = {
  job: Scalars["String"];
  operator: Scalars["String"];
};

export type SaveScorecardInput = {
  job: Scalars["String"];
  operator: Scalars["String"];
};

export type ScorecardResult = {
  __typename?: "ScorecardResult";
  success: Scalars["Boolean"];
  scorecard: Scorecard;
};

export type Scorecard = {
  __typename?: "Scorecard";
  job: Job;
  date?: Maybe<Scalars["String"]>;
  operator?: Maybe<Resource>;
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

export type UserLocations = {
  __typename?: "UserLocations";
  mode: InclusivityMode;
  list: Array<Location>;
};

export type User = {
  __typename?: "User";
  username: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
  locations: UserLocations;
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

export type UpdateUserLocationsInput = {
  add?: Maybe<Array<Scalars["String"]>>;
  remove?: Maybe<Array<Scalars["String"]>>;
  mode?: Maybe<InclusivityMode>;
};

export type UpdateUserLocationsResult = {
  __typename?: "UpdateUserLocationsResult";
  success: Scalars["Boolean"];
  locations: UserLocations;
};

export type GrowFinishJobFieldsFragment = { __typename?: "Job" } & Pick<
  Job,
  "number" | "description"
>;

export type ScorecardFieldsFragment = { __typename?: "Scorecard" } & Pick<
  Scorecard,
  "date"
> & {
    job: { __typename?: "Job" } & Pick<Job, "number">;
    operator?: Maybe<{ __typename?: "Resource" } & Pick<Resource, "number">>;
  };

export type ScorecardJobsQueryVariables = {};

export type ScorecardJobsQuery = { __typename?: "Query" } & {
  jobs: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
};

export type PersonResponsibleQueryVariables = {};

export type PersonResponsibleQuery = { __typename?: "Query" } & {
  personResponsible: Array<
    { __typename?: "Resource" } & Pick<Resource, "name" | "number">
  >;
};

export type NurseryFinisherScorecardQueryVariables = {
  job: Scalars["String"];
};

export type NurseryFinisherScorecardQuery = { __typename?: "Query" } & {
  job?: Maybe<
    { __typename?: "Job" } & Pick<Job, "number"> & {
        personResponsible: { __typename?: "Resource" } & Pick<
          Resource,
          "name" | "number"
        >;
      }
  >;
};

export type SaveScorecardMutationVariables = {
  input: SaveScorecardInput;
};

export type SaveScorecardMutation = { __typename?: "Mutation" } & {
  saveScorecard: { __typename?: "ScorecardResult" } & Pick<
    ScorecardResult,
    "success"
  > & { scorecard: { __typename?: "Scorecard" } & ScorecardFieldsFragment };
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
  operator?: Maybe<{ __typename?: "Resource" } & Pick<Resource, "number">>;
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
  area?: Maybe<
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
  scorecard?: Maybe<
    {
      __typename?: "FarrowingBackendScorecard";
    } & FarrowingBackendScorecardFieldsFragment
  >;
};

export type FarrowingBackendOperatorsQueryVariables = {
  area: Scalars["String"];
};

export type FarrowingBackendOperatorsQuery = { __typename?: "Query" } & {
  area?: Maybe<{ __typename?: "Job" } & FarrowingBackendAreaFieldsFragment>;
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
    __typename?: "FarrowingBackendScorecardResult";
  } & Pick<FarrowingBackendScorecardResult, "success"> & {
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
    __typename?: "FarrowingBackendScorecardResult";
  } & Pick<FarrowingBackendScorecardResult, "success"> & {
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

export const GrowFinishJobFieldsFragmentDoc = gql`
  fragment GrowFinishJobFields on Job {
    number
    description
  }
`;
export const ScorecardFieldsFragmentDoc = gql`
  fragment ScorecardFields on Scorecard {
    job {
      number
    }
    date
    operator {
      number
    }
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
export const ScorecardJobsDocument = gql`
  query ScorecardJobs {
    jobs: listJobs {
      number
      description
    }
  }
`;

/**
 * __useScorecardJobsQuery__
 *
 * To run a query within a React component, call `useScorecardJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useScorecardJobsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ScorecardJobsQuery,
    ScorecardJobsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ScorecardJobsQuery,
    ScorecardJobsQueryVariables
  >(ScorecardJobsDocument, baseOptions);
}
export function useScorecardJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ScorecardJobsQuery,
    ScorecardJobsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ScorecardJobsQuery,
    ScorecardJobsQueryVariables
  >(ScorecardJobsDocument, baseOptions);
}
export type ScorecardJobsQueryHookResult = ReturnType<
  typeof useScorecardJobsQuery
>;
export type ScorecardJobsLazyQueryHookResult = ReturnType<
  typeof useScorecardJobsLazyQuery
>;
export type ScorecardJobsQueryResult = ApolloReactCommon.QueryResult<
  ScorecardJobsQuery,
  ScorecardJobsQueryVariables
>;
export const PersonResponsibleDocument = gql`
  query PersonResponsible {
    personResponsible {
      name
      number
    }
  }
`;

/**
 * __usePersonResponsibleQuery__
 *
 * To run a query within a React component, call `usePersonResponsibleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonResponsibleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonResponsibleQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonResponsibleQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PersonResponsibleQuery,
    PersonResponsibleQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PersonResponsibleQuery,
    PersonResponsibleQueryVariables
  >(PersonResponsibleDocument, baseOptions);
}
export function usePersonResponsibleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PersonResponsibleQuery,
    PersonResponsibleQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PersonResponsibleQuery,
    PersonResponsibleQueryVariables
  >(PersonResponsibleDocument, baseOptions);
}
export type PersonResponsibleQueryHookResult = ReturnType<
  typeof usePersonResponsibleQuery
>;
export type PersonResponsibleLazyQueryHookResult = ReturnType<
  typeof usePersonResponsibleLazyQuery
>;
export type PersonResponsibleQueryResult = ApolloReactCommon.QueryResult<
  PersonResponsibleQuery,
  PersonResponsibleQueryVariables
>;
export const NurseryFinisherScorecardDocument = gql`
  query NurseryFinisherScorecard($job: String!) {
    job: growFinishJob(number: $job) {
      number
      personResponsible {
        name
        number
      }
    }
  }
`;

/**
 * __useNurseryFinisherScorecardQuery__
 *
 * To run a query within a React component, call `useNurseryFinisherScorecardQuery` and pass it any options that fit your needs.
 * When your component renders, `useNurseryFinisherScorecardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNurseryFinisherScorecardQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useNurseryFinisherScorecardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    NurseryFinisherScorecardQuery,
    NurseryFinisherScorecardQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    NurseryFinisherScorecardQuery,
    NurseryFinisherScorecardQueryVariables
  >(NurseryFinisherScorecardDocument, baseOptions);
}
export function useNurseryFinisherScorecardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    NurseryFinisherScorecardQuery,
    NurseryFinisherScorecardQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    NurseryFinisherScorecardQuery,
    NurseryFinisherScorecardQueryVariables
  >(NurseryFinisherScorecardDocument, baseOptions);
}
export type NurseryFinisherScorecardQueryHookResult = ReturnType<
  typeof useNurseryFinisherScorecardQuery
>;
export type NurseryFinisherScorecardLazyQueryHookResult = ReturnType<
  typeof useNurseryFinisherScorecardLazyQuery
>;
export type NurseryFinisherScorecardQueryResult = ApolloReactCommon.QueryResult<
  NurseryFinisherScorecardQuery,
  NurseryFinisherScorecardQueryVariables
>;
export const SaveScorecardDocument = gql`
  mutation saveScorecard($input: SaveScorecardInput!) {
    saveScorecard(input: $input) {
      success
      scorecard {
        ...ScorecardFields
      }
    }
  }
  ${ScorecardFieldsFragmentDoc}
`;
export type SaveScorecardMutationFn = ApolloReactCommon.MutationFunction<
  SaveScorecardMutation,
  SaveScorecardMutationVariables
>;

/**
 * __useSaveScorecardMutation__
 *
 * To run a mutation, you first call `useSaveScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveScorecardMutation, { data, loading, error }] = useSaveScorecardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveScorecardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SaveScorecardMutation,
    SaveScorecardMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SaveScorecardMutation,
    SaveScorecardMutationVariables
  >(SaveScorecardDocument, baseOptions);
}
export type SaveScorecardMutationHookResult = ReturnType<
  typeof useSaveScorecardMutation
>;
export type SaveScorecardMutationResult = ApolloReactCommon.MutationResult<
  SaveScorecardMutation
>;
export type SaveScorecardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SaveScorecardMutation,
  SaveScorecardMutationVariables
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
