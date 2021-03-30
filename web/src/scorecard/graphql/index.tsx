import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
  startDate?: Maybe<Scalars["String"]>;
  groupStartDate?: Maybe<Scalars["String"]>;
  location: Location;
  projectManager?: Maybe<User>;
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
  unitPrice?: Maybe<Scalars["Float"]>;
};

export type Location = {
  __typename?: "Location";
  code: Scalars["String"];
  name: Scalars["String"];
};

export type JobFilter = {
  groups?: Maybe<Array<Scalars["String"]>>;
  locations?: Maybe<Array<Scalars["String"]>>;
};

export type ResourceFilter = {
  group?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  animals: Array<Item>;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  locations: Array<Location>;
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
  resource?: Maybe<Resource>;
  resources: Array<Resource>;
  scorecard?: Maybe<Scorecard>;
  scorecardConfig?: Maybe<ScorecardConfig>;
  scorecardGroups: Array<ScorecardGroup>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryJobArgs = {
  number: Scalars["String"];
};

export type QueryJobsArgs = {
  input?: Maybe<JobFilter>;
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

export type QueryResourceArgs = {
  code: Scalars["String"];
};

export type QueryResourcesArgs = {
  input?: Maybe<ResourceFilter>;
};

export type QueryScorecardArgs = {
  job: Scalars["String"];
};

export type QueryScorecardConfigArgs = {
  job: Scalars["String"];
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
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigAdjustmentInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigAdjustmentInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
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
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantities: Array<PigQuantity>;
  pigWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigGradeOffInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities: Array<PigQuantityInput>;
  pigWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigGradeOffInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
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
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantities?: Maybe<Array<PigQuantity>>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMortalityInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities?: Maybe<Array<PigQuantityInput>>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMortalityInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
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
  postingDate?: Maybe<Scalars["String"]>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMoveInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMoveInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
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
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigPurchaseInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigPurchaseInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
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
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigWeanInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigWeanInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
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

export type Mutation = {
  __typename?: "Mutation";
  login: LoginResult;
  logout: LogoutResult;
  postPigAdjustment: PigAdjustmentResult;
  postPigGradeOff: PigGradeOffResult;
  postPigMortality: PigMortalityResult;
  postPigMove: PigMoveResult;
  postPigPurchase: PigPurchaseResult;
  postPigWean: PigWeanResult;
  postScorecard: ScorecardResult;
  savePigAdjustment: PigAdjustmentResult;
  savePigGradeOff: PigGradeOffResult;
  savePigMortality: PigMortalityResult;
  savePigMove: PigMoveResult;
  savePigPurchase: PigPurchaseResult;
  savePigWean: PigWeanResult;
  saveScorecard: ScorecardResult;
  updateUserLocations: UpdateUserLocationsResult;
};

export type MutationLoginArgs = {
  input: LoginInput;
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

export type MutationPostScorecardArgs = {
  input: PostScorecardInput;
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
  input: PostScorecardInput;
};

export type MutationUpdateUserLocationsArgs = {
  input: UpdateUserLocationsInput;
};

export type ScorecardGroup = {
  __typename?: "ScorecardGroup";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type ScorecardElement = {
  __typename?: "ScorecardElement";
  id: Scalars["ID"];
  label: Scalars["String"];
  code: Scalars["String"];
  order: Scalars["Int"];
};

export type ScorecardPage = {
  __typename?: "ScorecardPage";
  title?: Maybe<Scalars["String"]>;
  elements: Array<ScorecardElement>;
};

export type ScorecardConfig = {
  __typename?: "ScorecardConfig";
  job: Job;
  pages: Array<ScorecardPage>;
};

export type ScorecardElementResponseInput = {
  elementId: Scalars["ID"];
  numericValue?: Maybe<Scalars["Float"]>;
  stringValue?: Maybe<Scalars["String"]>;
};

export type PostScorecardInput = {
  job: Scalars["String"];
  data: Array<ScorecardElementResponseInput>;
};

export type ScorecardResult = {
  __typename?: "ScorecardResult";
  success: Scalars["Boolean"];
  scorecard?: Maybe<Scorecard>;
};

export type ScorecardElementResponse = {
  __typename?: "ScorecardElementResponse";
  elementId: Scalars["ID"];
  numericValue?: Maybe<Scalars["Float"]>;
  stringValue?: Maybe<Scalars["String"]>;
};

export type Scorecard = {
  __typename?: "Scorecard";
  job: Job;
  data: Array<ScorecardElementResponse>;
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

export type ScorecardFieldsFragment = { __typename?: "Scorecard" } & {
  job: { __typename?: "Job" } & Pick<Job, "number">;
  data: Array<
    { __typename?: "ScorecardElementResponse" } & Pick<
      ScorecardElementResponse,
      "elementId" | "numericValue" | "stringValue"
    >
  >;
};

export type ScorecardGroupsQueryVariables = {};

export type ScorecardGroupsQuery = { __typename?: "Query" } & {
  scorecardGroups: Array<
    { __typename?: "ScorecardGroup" } & Pick<
      ScorecardGroup,
      "code" | "description"
    >
  >;
};

export type ScorecardTargetTempQueryVariables = {
  code: Scalars["String"];
};

export type ScorecardTargetTempQuery = { __typename?: "Query" } & {
  resource?: Maybe<
    { __typename?: "Resource" } & Pick<
      Resource,
      "number" | "name" | "unitPrice"
    >
  >;
};

export type ScorecardPigJobQueryVariables = {
  job: Scalars["String"];
};

export type ScorecardPigJobQuery = { __typename?: "Query" } & {
  job?: Maybe<
    { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "startDate" | "groupStartDate" | "deadQuantity"
    >
  >;
};

export type ScorecardJobsQueryVariables = {
  group: Scalars["String"];
};

export type ScorecardJobsQuery = { __typename?: "Query" } & {
  jobs: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
};

export type ScorecardPigJobsQueryVariables = {
  location: Scalars["String"];
};

export type ScorecardPigJobsQuery = { __typename?: "Query" } & {
  jobs: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
};

export type ScorecardPeopleQueryVariables = {};

export type ScorecardPeopleQuery = { __typename?: "Query" } & {
  people: Array<
    { __typename?: "Resource" } & Pick<Resource, "number" | "name">
  >;
};

export type ScorecardUsersQueryVariables = {};

export type ScorecardUsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<User, "username" | "name">>;
};

export type ScorecardQueryVariables = {
  job: Scalars["String"];
};

export type ScorecardQuery = { __typename?: "Query" } & {
  job?: Maybe<
    { __typename?: "Job" } & Pick<Job, "number"> & {
        location: { __typename?: "Location" } & Pick<Location, "code">;
        personResponsible: { __typename?: "Resource" } & Pick<
          Resource,
          "number"
        >;
        projectManager?: Maybe<
          { __typename?: "User" } & Pick<User, "username">
        >;
      }
  >;
  scorecardConfig?: Maybe<
    { __typename?: "ScorecardConfig" } & {
      job: { __typename?: "Job" } & Pick<Job, "number">;
      pages: Array<
        { __typename?: "ScorecardPage" } & Pick<ScorecardPage, "title"> & {
            elements: Array<
              { __typename?: "ScorecardElement" } & Pick<
                ScorecardElement,
                "id" | "label" | "code" | "order"
              >
            >;
          }
      >;
    }
  >;
  scorecard?: Maybe<{ __typename?: "Scorecard" } & ScorecardFieldsFragment>;
};

export type SaveScorecardMutationVariables = {
  input: PostScorecardInput;
};

export type SaveScorecardMutation = { __typename?: "Mutation" } & {
  saveScorecard: { __typename?: "ScorecardResult" } & Pick<
    ScorecardResult,
    "success"
  > & {
      scorecard?: Maybe<{ __typename?: "Scorecard" } & ScorecardFieldsFragment>;
    };
};

export type PostScorecardMutationVariables = {
  input: PostScorecardInput;
};

export type PostScorecardMutation = { __typename?: "Mutation" } & {
  postScorecard: { __typename?: "ScorecardResult" } & Pick<
    ScorecardResult,
    "success"
  > & {
      scorecard?: Maybe<{ __typename?: "Scorecard" } & ScorecardFieldsFragment>;
    };
};

export const ScorecardFieldsFragmentDoc = gql`
  fragment scorecardFields on Scorecard {
    job {
      number
    }
    data {
      elementId
      numericValue
      stringValue
    }
  }
`;
export const ScorecardGroupsDocument = gql`
  query ScorecardGroups {
    scorecardGroups {
      code
      description
    }
  }
`;

/**
 * __useScorecardGroupsQuery__
 *
 * To run a query within a React component, call `useScorecardGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useScorecardGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ScorecardGroupsQuery,
    ScorecardGroupsQueryVariables
  >
) {
  return Apollo.useQuery<ScorecardGroupsQuery, ScorecardGroupsQueryVariables>(
    ScorecardGroupsDocument,
    baseOptions
  );
}
export function useScorecardGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardGroupsQuery,
    ScorecardGroupsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardGroupsQuery,
    ScorecardGroupsQueryVariables
  >(ScorecardGroupsDocument, baseOptions);
}
export type ScorecardGroupsQueryHookResult = ReturnType<
  typeof useScorecardGroupsQuery
>;
export type ScorecardGroupsLazyQueryHookResult = ReturnType<
  typeof useScorecardGroupsLazyQuery
>;
export type ScorecardGroupsQueryResult = Apollo.QueryResult<
  ScorecardGroupsQuery,
  ScorecardGroupsQueryVariables
>;
export const ScorecardTargetTempDocument = gql`
  query ScorecardTargetTemp($code: String!) {
    resource(code: $code) {
      number
      name
      unitPrice
    }
  }
`;

/**
 * __useScorecardTargetTempQuery__
 *
 * To run a query within a React component, call `useScorecardTargetTempQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardTargetTempQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardTargetTempQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useScorecardTargetTempQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScorecardTargetTempQuery,
    ScorecardTargetTempQueryVariables
  >
) {
  return Apollo.useQuery<
    ScorecardTargetTempQuery,
    ScorecardTargetTempQueryVariables
  >(ScorecardTargetTempDocument, baseOptions);
}
export function useScorecardTargetTempLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardTargetTempQuery,
    ScorecardTargetTempQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardTargetTempQuery,
    ScorecardTargetTempQueryVariables
  >(ScorecardTargetTempDocument, baseOptions);
}
export type ScorecardTargetTempQueryHookResult = ReturnType<
  typeof useScorecardTargetTempQuery
>;
export type ScorecardTargetTempLazyQueryHookResult = ReturnType<
  typeof useScorecardTargetTempLazyQuery
>;
export type ScorecardTargetTempQueryResult = Apollo.QueryResult<
  ScorecardTargetTempQuery,
  ScorecardTargetTempQueryVariables
>;
export const ScorecardPigJobDocument = gql`
  query ScorecardPigJob($job: String!) {
    job(number: $job) {
      number
      description
      startDate
      groupStartDate
      deadQuantity
    }
  }
`;

/**
 * __useScorecardPigJobQuery__
 *
 * To run a query within a React component, call `useScorecardPigJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardPigJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardPigJobQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useScorecardPigJobQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScorecardPigJobQuery,
    ScorecardPigJobQueryVariables
  >
) {
  return Apollo.useQuery<ScorecardPigJobQuery, ScorecardPigJobQueryVariables>(
    ScorecardPigJobDocument,
    baseOptions
  );
}
export function useScorecardPigJobLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardPigJobQuery,
    ScorecardPigJobQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardPigJobQuery,
    ScorecardPigJobQueryVariables
  >(ScorecardPigJobDocument, baseOptions);
}
export type ScorecardPigJobQueryHookResult = ReturnType<
  typeof useScorecardPigJobQuery
>;
export type ScorecardPigJobLazyQueryHookResult = ReturnType<
  typeof useScorecardPigJobLazyQuery
>;
export type ScorecardPigJobQueryResult = Apollo.QueryResult<
  ScorecardPigJobQuery,
  ScorecardPigJobQueryVariables
>;
export const ScorecardJobsDocument = gql`
  query ScorecardJobs($group: String!) {
    jobs(input: { groups: [$group] }) {
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
 *      group: // value for 'group'
 *   },
 * });
 */
export function useScorecardJobsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScorecardJobsQuery,
    ScorecardJobsQueryVariables
  >
) {
  return Apollo.useQuery<ScorecardJobsQuery, ScorecardJobsQueryVariables>(
    ScorecardJobsDocument,
    baseOptions
  );
}
export function useScorecardJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardJobsQuery,
    ScorecardJobsQueryVariables
  >
) {
  return Apollo.useLazyQuery<ScorecardJobsQuery, ScorecardJobsQueryVariables>(
    ScorecardJobsDocument,
    baseOptions
  );
}
export type ScorecardJobsQueryHookResult = ReturnType<
  typeof useScorecardJobsQuery
>;
export type ScorecardJobsLazyQueryHookResult = ReturnType<
  typeof useScorecardJobsLazyQuery
>;
export type ScorecardJobsQueryResult = Apollo.QueryResult<
  ScorecardJobsQuery,
  ScorecardJobsQueryVariables
>;
export const ScorecardPigJobsDocument = gql`
  query ScorecardPigJobs($location: String!) {
    jobs(
      input: { groups: ["SOWS", "GDU", "MKT PIGS"], locations: [$location] }
    ) {
      number
      description
    }
  }
`;

/**
 * __useScorecardPigJobsQuery__
 *
 * To run a query within a React component, call `useScorecardPigJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardPigJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardPigJobsQuery({
 *   variables: {
 *      location: // value for 'location'
 *   },
 * });
 */
export function useScorecardPigJobsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScorecardPigJobsQuery,
    ScorecardPigJobsQueryVariables
  >
) {
  return Apollo.useQuery<ScorecardPigJobsQuery, ScorecardPigJobsQueryVariables>(
    ScorecardPigJobsDocument,
    baseOptions
  );
}
export function useScorecardPigJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardPigJobsQuery,
    ScorecardPigJobsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardPigJobsQuery,
    ScorecardPigJobsQueryVariables
  >(ScorecardPigJobsDocument, baseOptions);
}
export type ScorecardPigJobsQueryHookResult = ReturnType<
  typeof useScorecardPigJobsQuery
>;
export type ScorecardPigJobsLazyQueryHookResult = ReturnType<
  typeof useScorecardPigJobsLazyQuery
>;
export type ScorecardPigJobsQueryResult = Apollo.QueryResult<
  ScorecardPigJobsQuery,
  ScorecardPigJobsQueryVariables
>;
export const ScorecardPeopleDocument = gql`
  query ScorecardPeople {
    people: resources(input: { type: "Person" }) {
      number
      name
    }
  }
`;

/**
 * __useScorecardPeopleQuery__
 *
 * To run a query within a React component, call `useScorecardPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardPeopleQuery({
 *   variables: {
 *   },
 * });
 */
export function useScorecardPeopleQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ScorecardPeopleQuery,
    ScorecardPeopleQueryVariables
  >
) {
  return Apollo.useQuery<ScorecardPeopleQuery, ScorecardPeopleQueryVariables>(
    ScorecardPeopleDocument,
    baseOptions
  );
}
export function useScorecardPeopleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardPeopleQuery,
    ScorecardPeopleQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardPeopleQuery,
    ScorecardPeopleQueryVariables
  >(ScorecardPeopleDocument, baseOptions);
}
export type ScorecardPeopleQueryHookResult = ReturnType<
  typeof useScorecardPeopleQuery
>;
export type ScorecardPeopleLazyQueryHookResult = ReturnType<
  typeof useScorecardPeopleLazyQuery
>;
export type ScorecardPeopleQueryResult = Apollo.QueryResult<
  ScorecardPeopleQuery,
  ScorecardPeopleQueryVariables
>;
export const ScorecardUsersDocument = gql`
  query ScorecardUsers {
    users {
      username
      name
    }
  }
`;

/**
 * __useScorecardUsersQuery__
 *
 * To run a query within a React component, call `useScorecardUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useScorecardUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ScorecardUsersQuery,
    ScorecardUsersQueryVariables
  >
) {
  return Apollo.useQuery<ScorecardUsersQuery, ScorecardUsersQueryVariables>(
    ScorecardUsersDocument,
    baseOptions
  );
}
export function useScorecardUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardUsersQuery,
    ScorecardUsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<ScorecardUsersQuery, ScorecardUsersQueryVariables>(
    ScorecardUsersDocument,
    baseOptions
  );
}
export type ScorecardUsersQueryHookResult = ReturnType<
  typeof useScorecardUsersQuery
>;
export type ScorecardUsersLazyQueryHookResult = ReturnType<
  typeof useScorecardUsersLazyQuery
>;
export type ScorecardUsersQueryResult = Apollo.QueryResult<
  ScorecardUsersQuery,
  ScorecardUsersQueryVariables
>;
export const ScorecardDocument = gql`
  query Scorecard($job: String!) {
    job: job(number: $job) {
      number
      location {
        code
      }
      personResponsible {
        number
      }
      projectManager {
        username
      }
    }
    scorecardConfig(job: $job) {
      job {
        number
      }
      pages {
        title
        elements {
          id
          label
          code
          order
        }
      }
    }
    scorecard(job: $job) {
      ...scorecardFields
    }
  }
  ${ScorecardFieldsFragmentDoc}
`;

/**
 * __useScorecardQuery__
 *
 * To run a query within a React component, call `useScorecardQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useScorecardQuery(
  baseOptions: Apollo.QueryHookOptions<ScorecardQuery, ScorecardQueryVariables>
) {
  return Apollo.useQuery<ScorecardQuery, ScorecardQueryVariables>(
    ScorecardDocument,
    baseOptions
  );
}
export function useScorecardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardQuery,
    ScorecardQueryVariables
  >
) {
  return Apollo.useLazyQuery<ScorecardQuery, ScorecardQueryVariables>(
    ScorecardDocument,
    baseOptions
  );
}
export type ScorecardQueryHookResult = ReturnType<typeof useScorecardQuery>;
export type ScorecardLazyQueryHookResult = ReturnType<
  typeof useScorecardLazyQuery
>;
export type ScorecardQueryResult = Apollo.QueryResult<
  ScorecardQuery,
  ScorecardQueryVariables
>;
export const SaveScorecardDocument = gql`
  mutation SaveScorecard($input: PostScorecardInput!) {
    saveScorecard(input: $input) {
      success
      scorecard {
        ...scorecardFields
      }
    }
  }
  ${ScorecardFieldsFragmentDoc}
`;
export type SaveScorecardMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    SaveScorecardMutation,
    SaveScorecardMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveScorecardMutation,
    SaveScorecardMutationVariables
  >(SaveScorecardDocument, baseOptions);
}
export type SaveScorecardMutationHookResult = ReturnType<
  typeof useSaveScorecardMutation
>;
export type SaveScorecardMutationResult = Apollo.MutationResult<
  SaveScorecardMutation
>;
export type SaveScorecardMutationOptions = Apollo.BaseMutationOptions<
  SaveScorecardMutation,
  SaveScorecardMutationVariables
>;
export const PostScorecardDocument = gql`
  mutation PostScorecard($input: PostScorecardInput!) {
    postScorecard(input: $input) {
      success
      scorecard {
        ...scorecardFields
      }
    }
  }
  ${ScorecardFieldsFragmentDoc}
`;
export type PostScorecardMutationFn = Apollo.MutationFunction<
  PostScorecardMutation,
  PostScorecardMutationVariables
>;

/**
 * __usePostScorecardMutation__
 *
 * To run a mutation, you first call `usePostScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postScorecardMutation, { data, loading, error }] = usePostScorecardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostScorecardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostScorecardMutation,
    PostScorecardMutationVariables
  >
) {
  return Apollo.useMutation<
    PostScorecardMutation,
    PostScorecardMutationVariables
  >(PostScorecardDocument, baseOptions);
}
export type PostScorecardMutationHookResult = ReturnType<
  typeof usePostScorecardMutation
>;
export type PostScorecardMutationResult = Apollo.MutationResult<
  PostScorecardMutation
>;
export type PostScorecardMutationOptions = Apollo.BaseMutationOptions<
  PostScorecardMutation,
  PostScorecardMutationVariables
>;
