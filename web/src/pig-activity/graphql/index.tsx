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
  cost?: Maybe<Scalars["Int"]>;
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
  fuelAsset?: Maybe<FuelAsset>;
  fuelAssets: Array<FuelAsset>;
  item?: Maybe<Item>;
  itemJournalTemplates?: Maybe<Array<ItemJournalTemplate>>;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  locations: Array<Location>;
  maintenanceAsset?: Maybe<MaintenanceAsset>;
  maintenanceAssets: Array<MaintenanceAsset>;
  maintenanceIntervals: Array<MaintenanceInterval>;
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

export type QueryFuelAssetArgs = {
  number: Scalars["String"];
};

export type QueryItemArgs = {
  number: Scalars["String"];
};

export type QueryJobArgs = {
  number: Scalars["String"];
};

export type QueryJobsArgs = {
  input?: Maybe<JobFilter>;
};

export type QueryMaintenanceAssetArgs = {
  number: Scalars["String"];
};

export type QueryMaintenanceIntervalsArgs = {
  assetNo: Scalars["String"];
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

export type FuelAsset = {
  __typename?: "FuelAsset";
  number: Scalars["String"];
  code: Scalars["String"];
  description: Scalars["String"];
  fuelType: Scalars["String"];
  fuelCost: Scalars["Float"];
};

export type PostFuelInput = {
  asset: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  gallons: Scalars["Float"];
  mileage: Scalars["Int"];
  comments?: Maybe<Scalars["String"]>;
};

export type FuelResult = {
  __typename?: "FuelResult";
  success: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: LoginResult;
  logout: LogoutResult;
  postFuel: FuelResult;
  postMaintenance: MaintenanceResult;
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

export type MutationPostFuelArgs = {
  input: PostFuelInput;
};

export type MutationPostMaintenanceArgs = {
  input: PostMaintenanceInput;
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

export type MaintenanceAsset = {
  __typename?: "MaintenanceAsset";
  number: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  classCode?: Maybe<Scalars["String"]>;
};

export type MaintenanceInterval = {
  __typename?: "MaintenanceInterval";
  code: Scalars["String"];
  asset: Scalars["String"];
  interval?: Maybe<Scalars["Int"]>;
  unitType?: Maybe<Scalars["String"]>;
};

export type PostMaintenanceInput = {
  asset: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  mileage: Scalars["Int"];
  workHours: Scalars["Int"];
  comments?: Maybe<Scalars["String"]>;
};

export type MaintenanceResult = {
  __typename?: "MaintenanceResult";
  success: Scalars["Boolean"];
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

export type ItemJournalTemplate = {
  __typename?: "ItemJournalTemplate";
  name: Scalars["String"];
  description: Scalars["String"];
  type: Scalars["String"];
  sourceCode: Scalars["String"];
  reasonCode: Scalars["String"];
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

export type PigActivityDefaultsFragmentFragment = {
  __typename?: "PigActivityDefaults";
} & {
  job?: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  prices: Array<
    { __typename?: "PriceEntry" } & Pick<PriceEntry, "animal" | "price">
  >;
};

export type PigActivityJobsQueryVariables = {};

export type PigActivityJobsQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & {
    job?: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  };
  itemJournalTemplates?: Maybe<
    Array<
      { __typename?: "ItemJournalTemplate" } & Pick<
        ItemJournalTemplate,
        "name" | "description" | "type" | "reasonCode" | "sourceCode"
      >
    >
  >;
  pigActivityJobs: Array<
    { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >
  >;
};

export type PigAdjustmentFragmentFragment = {
  __typename?: "PigAdjustment";
} & Pick<
  PigAdjustment,
  "postingDate" | "quantity" | "totalWeight" | "comments"
> & {
    event?: Maybe<
      { __typename?: "PigAdjustmentEvent" } & Pick<PigAdjustmentEvent, "code">
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

export type PigAdjustmentQueryVariables = {
  job: Scalars["String"];
};

export type PigAdjustmentQuery = { __typename?: "Query" } & {
  pigAdjustmentEventTypes: Array<
    { __typename?: "PigAdjustmentEvent" } & Pick<
      PigAdjustmentEvent,
      "code" | "description"
    >
  >;
  pigAdjustment: {
    __typename?: "PigAdjustment";
  } & PigAdjustmentFragmentFragment;
};

export type SavePigAdjustmentMutationVariables = {
  input: SavePigAdjustmentInput;
};

export type SavePigAdjustmentMutation = { __typename?: "Mutation" } & {
  savePigAdjustment: { __typename?: "PigAdjustmentResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigAdjustment: {
      __typename?: "PigAdjustment";
    } & PigAdjustmentFragmentFragment;
  };
};

export type PostPigAdjustmentMutationVariables = {
  input: PostPigAdjustmentInput;
};

export type PostPigAdjustmentMutation = { __typename?: "Mutation" } & {
  postPigAdjustment: { __typename?: "PigAdjustmentResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigAdjustment: {
      __typename?: "PigAdjustment";
    } & PigAdjustmentFragmentFragment;
  };
};

export type PigGradeOffFragmentFragment = { __typename?: "PigGradeOff" } & Pick<
  PigGradeOff,
  "postingDate" | "pigWeight" | "comments"
> & {
    event?: Maybe<
      { __typename?: "PigGradeOffEvent" } & Pick<PigGradeOffEvent, "code">
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
    quantities: Array<
      { __typename?: "PigQuantity" } & Pick<PigQuantity, "code" | "quantity">
    >;
  };

export type PigGradeOffQueryVariables = {
  job: Scalars["String"];
};

export type PigGradeOffQuery = { __typename?: "Query" } & {
  pigGradeOffEventTypes: Array<
    { __typename?: "PigGradeOffEvent" } & Pick<
      PigGradeOffEvent,
      "code" | "description"
    > & {
        reasons: Array<
          { __typename?: "Reason" } & Pick<Reason, "code" | "description">
        >;
      }
  >;
  pigGradeOff: { __typename?: "PigGradeOff" } & PigGradeOffFragmentFragment;
};

export type SavePigGradeOffMutationVariables = {
  input: SavePigGradeOffInput;
};

export type SavePigGradeOffMutation = { __typename?: "Mutation" } & {
  savePigGradeOff: { __typename?: "PigGradeOffResult" } & {
    pigGradeOff: { __typename?: "PigGradeOff" } & PigGradeOffFragmentFragment;
  };
};

export type PostPigGradeOffMutationVariables = {
  input: PostPigGradeOffInput;
};

export type PostPigGradeOffMutation = { __typename?: "Mutation" } & {
  postPigGradeOff: { __typename?: "PigGradeOffResult" } & {
    pigGradeOff: { __typename?: "PigGradeOff" } & PigGradeOffFragmentFragment;
  };
};

export type PigMortalityFragmentFragment = {
  __typename?: "PigMortality";
} & Pick<PigMortality, "postingDate" | "comments"> & {
    event?: Maybe<
      { __typename?: "PigMortalityEvent" } & Pick<PigMortalityEvent, "code">
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
    quantities?: Maybe<
      Array<
        { __typename?: "PigQuantity" } & Pick<PigQuantity, "code" | "quantity">
      >
    >;
  };

export type PigMortalityQueryVariables = {
  job: Scalars["String"];
};

export type PigMortalityQuery = { __typename?: "Query" } & {
  pigMortalityEventTypes: Array<
    { __typename?: "PigMortalityEvent" } & Pick<
      PigMortalityEvent,
      "code" | "description"
    > & {
        reasons: Array<
          { __typename?: "Reason" } & Pick<Reason, "code" | "description">
        >;
      }
  >;
  pigMortality: { __typename?: "PigMortality" } & PigMortalityFragmentFragment;
};

export type SavePigMortalityMutationVariables = {
  input: SavePigMortalityInput;
};

export type SavePigMortalityMutation = { __typename?: "Mutation" } & {
  savePigMortality: { __typename?: "PigMortalityResult" } & {
    pigMortality: {
      __typename?: "PigMortality";
    } & PigMortalityFragmentFragment;
  };
};

export type PostPigMortalityMutationVariables = {
  input: PostPigMortalityInput;
};

export type PostPigMortalityMutation = { __typename?: "Mutation" } & {
  postPigMortality: { __typename?: "PigMortalityResult" } & {
    pigMortality: {
      __typename?: "PigMortality";
    } & PigMortalityFragmentFragment;
  };
};

export type PigMoveFragmentFragment = { __typename?: "PigMove" } & Pick<
  PigMove,
  "postingDate" | "quantity" | "smallPigQuantity" | "totalWeight" | "comments"
> & {
    event?: Maybe<{ __typename?: "PigMoveEvent" } & Pick<PigMoveEvent, "code">>;
    fromJob: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
    toJob?: Maybe<
      { __typename?: "Job" } & Pick<
        Job,
        "number" | "description" | "inventory" | "deadQuantity"
      >
    >;
  };

export type PigMoveQueryVariables = {
  job: Scalars["String"];
};

export type PigMoveQuery = { __typename?: "Query" } & {
  pigMoveEventTypes: Array<
    { __typename?: "PigMoveEvent" } & Pick<PigMoveEvent, "code" | "description">
  >;
  pigActivityJobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "description">
  >;
  pigMove: { __typename?: "PigMove" } & PigMoveFragmentFragment;
};

export type PigJobQueryVariables = {
  job: Scalars["String"];
};

export type PigJobQuery = { __typename?: "Query" } & {
  job?: Maybe<
    { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >
  >;
};

export type SavePigMoveMutationVariables = {
  input: SavePigMoveInput;
};

export type SavePigMoveMutation = { __typename?: "Mutation" } & {
  savePigMove: { __typename?: "PigMoveResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigMove: { __typename?: "PigMove" } & PigMoveFragmentFragment;
  };
};

export type PostPigMoveMutationVariables = {
  input: PostPigMoveInput;
};

export type PostPigMoveMutation = { __typename?: "Mutation" } & {
  postPigMove: { __typename?: "PigMoveResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigMove: { __typename?: "PigMove" } & PigMoveFragmentFragment;
  };
};

export type PigPurchaseFragmentFragment = { __typename?: "PigPurchase" } & Pick<
  PigPurchase,
  "postingDate" | "quantity" | "smallPigQuantity" | "totalWeight" | "comments"
> & {
    event?: Maybe<
      { __typename?: "PigPurchaseEvent" } & Pick<PigPurchaseEvent, "code">
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

export type PigPurchaseQueryVariables = {
  job: Scalars["String"];
};

export type PigPurchaseQuery = { __typename?: "Query" } & {
  pigPurchaseEventTypes: Array<
    { __typename?: "PigPurchaseEvent" } & Pick<
      PigPurchaseEvent,
      "code" | "description"
    >
  >;
  pigPurchase: { __typename?: "PigPurchase" } & PigPurchaseFragmentFragment;
};

export type SavePigPurchaseMutationVariables = {
  input: SavePigPurchaseInput;
};

export type SavePigPurchaseMutation = { __typename?: "Mutation" } & {
  savePigPurchase: { __typename?: "PigPurchaseResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigPurchase: { __typename?: "PigPurchase" } & PigPurchaseFragmentFragment;
  };
};

export type PostPigPurchaseMutationVariables = {
  input: PostPigPurchaseInput;
};

export type PostPigPurchaseMutation = { __typename?: "Mutation" } & {
  postPigPurchase: { __typename?: "PigPurchaseResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigPurchase: { __typename?: "PigPurchase" } & PigPurchaseFragmentFragment;
  };
};

export type PigWeanFragmentFragment = { __typename?: "PigWean" } & Pick<
  PigWean,
  "postingDate" | "quantity" | "smallPigQuantity" | "totalWeight" | "comments"
> & {
    event?: Maybe<{ __typename?: "PigWeanEvent" } & Pick<PigWeanEvent, "code">>;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

export type PigWeanQueryVariables = {
  job: Scalars["String"];
};

export type PigWeanQuery = { __typename?: "Query" } & {
  pigWeanEventTypes: Array<
    { __typename?: "PigWeanEvent" } & Pick<PigWeanEvent, "code" | "description">
  >;
  pigWean: { __typename?: "PigWean" } & PigWeanFragmentFragment;
};

export type SavePigWeanMutationVariables = {
  input: SavePigWeanInput;
};

export type SavePigWeanMutation = { __typename?: "Mutation" } & {
  savePigWean: { __typename?: "PigWeanResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigWean: { __typename?: "PigWean" } & PigWeanFragmentFragment;
  };
};

export type PostPigWeanMutationVariables = {
  input: PostPigWeanInput;
};

export type PostPigWeanMutation = { __typename?: "Mutation" } & {
  postPigWean: { __typename?: "PigWeanResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigWean: { __typename?: "PigWean" } & PigWeanFragmentFragment;
  };
};

export const PigActivityDefaultsFragmentFragmentDoc = gql`
  fragment PigActivityDefaultsFragment on PigActivityDefaults {
    job {
      number
    }
    prices {
      animal
      price
    }
  }
`;
export const PigAdjustmentFragmentFragmentDoc = gql`
  fragment PigAdjustmentFragment on PigAdjustment {
    event {
      code
    }
    job {
      number
      description
      inventory
      deadQuantity
    }
    postingDate
    quantity
    totalWeight
    comments
  }
`;
export const PigGradeOffFragmentFragmentDoc = gql`
  fragment PigGradeOffFragment on PigGradeOff {
    event {
      code
    }
    job {
      number
      description
      inventory
      deadQuantity
    }
    quantities {
      code
      quantity
    }
    postingDate
    pigWeight
    comments
  }
`;
export const PigMortalityFragmentFragmentDoc = gql`
  fragment PigMortalityFragment on PigMortality {
    event {
      code
    }
    job {
      number
      description
      inventory
      deadQuantity
    }
    quantities {
      code
      quantity
    }
    postingDate
    comments
  }
`;
export const PigMoveFragmentFragmentDoc = gql`
  fragment PigMoveFragment on PigMove {
    event {
      code
    }
    fromJob {
      number
      description
      inventory
      deadQuantity
    }
    toJob {
      number
      description
      inventory
      deadQuantity
    }
    postingDate
    quantity
    smallPigQuantity
    totalWeight
    comments
  }
`;
export const PigPurchaseFragmentFragmentDoc = gql`
  fragment PigPurchaseFragment on PigPurchase {
    event {
      code
    }
    job {
      number
      description
      inventory
      deadQuantity
    }
    postingDate
    quantity
    smallPigQuantity
    totalWeight
    comments
  }
`;
export const PigWeanFragmentFragmentDoc = gql`
  fragment PigWeanFragment on PigWean {
    event {
      code
    }
    job {
      number
      description
      inventory
      deadQuantity
    }
    postingDate
    quantity
    smallPigQuantity
    totalWeight
    comments
  }
`;
export const PigActivityJobsDocument = gql`
  query PigActivityJobs {
    pigActivityDefaults {
      job {
        number
      }
    }
    itemJournalTemplates {
      name
      description
      type
      reasonCode
      sourceCode
    }
    pigActivityJobs {
      number
      description
      inventory
      deadQuantity
    }
  }
`;

/**
 * __usePigActivityJobsQuery__
 *
 * To run a query within a React component, call `usePigActivityJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigActivityJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigActivityJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePigActivityJobsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PigActivityJobsQuery,
    PigActivityJobsQueryVariables
  >
) {
  return Apollo.useQuery<PigActivityJobsQuery, PigActivityJobsQueryVariables>(
    PigActivityJobsDocument,
    baseOptions
  );
}
export function usePigActivityJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PigActivityJobsQuery,
    PigActivityJobsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    PigActivityJobsQuery,
    PigActivityJobsQueryVariables
  >(PigActivityJobsDocument, baseOptions);
}
export type PigActivityJobsQueryHookResult = ReturnType<
  typeof usePigActivityJobsQuery
>;
export type PigActivityJobsLazyQueryHookResult = ReturnType<
  typeof usePigActivityJobsLazyQuery
>;
export type PigActivityJobsQueryResult = Apollo.QueryResult<
  PigActivityJobsQuery,
  PigActivityJobsQueryVariables
>;
export const PigAdjustmentDocument = gql`
  query PigAdjustment($job: String!) {
    pigAdjustmentEventTypes {
      code
      description
    }
    pigAdjustment(job: $job) {
      ...PigAdjustmentFragment
    }
  }
  ${PigAdjustmentFragmentFragmentDoc}
`;

/**
 * __usePigAdjustmentQuery__
 *
 * To run a query within a React component, call `usePigAdjustmentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigAdjustmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigAdjustmentQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigAdjustmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    PigAdjustmentQuery,
    PigAdjustmentQueryVariables
  >
) {
  return Apollo.useQuery<PigAdjustmentQuery, PigAdjustmentQueryVariables>(
    PigAdjustmentDocument,
    baseOptions
  );
}
export function usePigAdjustmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PigAdjustmentQuery,
    PigAdjustmentQueryVariables
  >
) {
  return Apollo.useLazyQuery<PigAdjustmentQuery, PigAdjustmentQueryVariables>(
    PigAdjustmentDocument,
    baseOptions
  );
}
export type PigAdjustmentQueryHookResult = ReturnType<
  typeof usePigAdjustmentQuery
>;
export type PigAdjustmentLazyQueryHookResult = ReturnType<
  typeof usePigAdjustmentLazyQuery
>;
export type PigAdjustmentQueryResult = Apollo.QueryResult<
  PigAdjustmentQuery,
  PigAdjustmentQueryVariables
>;
export const SavePigAdjustmentDocument = gql`
  mutation SavePigAdjustment($input: SavePigAdjustmentInput!) {
    savePigAdjustment(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigAdjustment {
        ...PigAdjustmentFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigAdjustmentFragmentFragmentDoc}
`;
export type SavePigAdjustmentMutationFn = Apollo.MutationFunction<
  SavePigAdjustmentMutation,
  SavePigAdjustmentMutationVariables
>;

/**
 * __useSavePigAdjustmentMutation__
 *
 * To run a mutation, you first call `useSavePigAdjustmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePigAdjustmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePigAdjustmentMutation, { data, loading, error }] = useSavePigAdjustmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePigAdjustmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SavePigAdjustmentMutation,
    SavePigAdjustmentMutationVariables
  >
) {
  return Apollo.useMutation<
    SavePigAdjustmentMutation,
    SavePigAdjustmentMutationVariables
  >(SavePigAdjustmentDocument, baseOptions);
}
export type SavePigAdjustmentMutationHookResult = ReturnType<
  typeof useSavePigAdjustmentMutation
>;
export type SavePigAdjustmentMutationResult = Apollo.MutationResult<
  SavePigAdjustmentMutation
>;
export type SavePigAdjustmentMutationOptions = Apollo.BaseMutationOptions<
  SavePigAdjustmentMutation,
  SavePigAdjustmentMutationVariables
>;
export const PostPigAdjustmentDocument = gql`
  mutation PostPigAdjustment($input: PostPigAdjustmentInput!) {
    postPigAdjustment(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigAdjustment {
        ...PigAdjustmentFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigAdjustmentFragmentFragmentDoc}
`;
export type PostPigAdjustmentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PostPigAdjustmentMutation,
    PostPigAdjustmentMutationVariables
  >
) {
  return Apollo.useMutation<
    PostPigAdjustmentMutation,
    PostPigAdjustmentMutationVariables
  >(PostPigAdjustmentDocument, baseOptions);
}
export type PostPigAdjustmentMutationHookResult = ReturnType<
  typeof usePostPigAdjustmentMutation
>;
export type PostPigAdjustmentMutationResult = Apollo.MutationResult<
  PostPigAdjustmentMutation
>;
export type PostPigAdjustmentMutationOptions = Apollo.BaseMutationOptions<
  PostPigAdjustmentMutation,
  PostPigAdjustmentMutationVariables
>;
export const PigGradeOffDocument = gql`
  query PigGradeOff($job: String!) {
    pigGradeOffEventTypes {
      code
      description
      reasons {
        code
        description
      }
    }
    pigGradeOff(job: $job) {
      ...PigGradeOffFragment
    }
  }
  ${PigGradeOffFragmentFragmentDoc}
`;

/**
 * __usePigGradeOffQuery__
 *
 * To run a query within a React component, call `usePigGradeOffQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigGradeOffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigGradeOffQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigGradeOffQuery(
  baseOptions: Apollo.QueryHookOptions<
    PigGradeOffQuery,
    PigGradeOffQueryVariables
  >
) {
  return Apollo.useQuery<PigGradeOffQuery, PigGradeOffQueryVariables>(
    PigGradeOffDocument,
    baseOptions
  );
}
export function usePigGradeOffLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PigGradeOffQuery,
    PigGradeOffQueryVariables
  >
) {
  return Apollo.useLazyQuery<PigGradeOffQuery, PigGradeOffQueryVariables>(
    PigGradeOffDocument,
    baseOptions
  );
}
export type PigGradeOffQueryHookResult = ReturnType<typeof usePigGradeOffQuery>;
export type PigGradeOffLazyQueryHookResult = ReturnType<
  typeof usePigGradeOffLazyQuery
>;
export type PigGradeOffQueryResult = Apollo.QueryResult<
  PigGradeOffQuery,
  PigGradeOffQueryVariables
>;
export const SavePigGradeOffDocument = gql`
  mutation SavePigGradeOff($input: SavePigGradeOffInput!) {
    savePigGradeOff(input: $input) {
      pigGradeOff {
        ...PigGradeOffFragment
      }
    }
  }
  ${PigGradeOffFragmentFragmentDoc}
`;
export type SavePigGradeOffMutationFn = Apollo.MutationFunction<
  SavePigGradeOffMutation,
  SavePigGradeOffMutationVariables
>;

/**
 * __useSavePigGradeOffMutation__
 *
 * To run a mutation, you first call `useSavePigGradeOffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePigGradeOffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePigGradeOffMutation, { data, loading, error }] = useSavePigGradeOffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePigGradeOffMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SavePigGradeOffMutation,
    SavePigGradeOffMutationVariables
  >
) {
  return Apollo.useMutation<
    SavePigGradeOffMutation,
    SavePigGradeOffMutationVariables
  >(SavePigGradeOffDocument, baseOptions);
}
export type SavePigGradeOffMutationHookResult = ReturnType<
  typeof useSavePigGradeOffMutation
>;
export type SavePigGradeOffMutationResult = Apollo.MutationResult<
  SavePigGradeOffMutation
>;
export type SavePigGradeOffMutationOptions = Apollo.BaseMutationOptions<
  SavePigGradeOffMutation,
  SavePigGradeOffMutationVariables
>;
export const PostPigGradeOffDocument = gql`
  mutation PostPigGradeOff($input: PostPigGradeOffInput!) {
    postPigGradeOff(input: $input) {
      pigGradeOff {
        ...PigGradeOffFragment
      }
    }
  }
  ${PigGradeOffFragmentFragmentDoc}
`;
export type PostPigGradeOffMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PostPigGradeOffMutation,
    PostPigGradeOffMutationVariables
  >
) {
  return Apollo.useMutation<
    PostPigGradeOffMutation,
    PostPigGradeOffMutationVariables
  >(PostPigGradeOffDocument, baseOptions);
}
export type PostPigGradeOffMutationHookResult = ReturnType<
  typeof usePostPigGradeOffMutation
>;
export type PostPigGradeOffMutationResult = Apollo.MutationResult<
  PostPigGradeOffMutation
>;
export type PostPigGradeOffMutationOptions = Apollo.BaseMutationOptions<
  PostPigGradeOffMutation,
  PostPigGradeOffMutationVariables
>;
export const PigMortalityDocument = gql`
  query PigMortality($job: String!) {
    pigMortalityEventTypes {
      code
      description
      reasons {
        code
        description
      }
    }
    pigMortality(job: $job) {
      ...PigMortalityFragment
    }
  }
  ${PigMortalityFragmentFragmentDoc}
`;

/**
 * __usePigMortalityQuery__
 *
 * To run a query within a React component, call `usePigMortalityQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigMortalityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigMortalityQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigMortalityQuery(
  baseOptions: Apollo.QueryHookOptions<
    PigMortalityQuery,
    PigMortalityQueryVariables
  >
) {
  return Apollo.useQuery<PigMortalityQuery, PigMortalityQueryVariables>(
    PigMortalityDocument,
    baseOptions
  );
}
export function usePigMortalityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PigMortalityQuery,
    PigMortalityQueryVariables
  >
) {
  return Apollo.useLazyQuery<PigMortalityQuery, PigMortalityQueryVariables>(
    PigMortalityDocument,
    baseOptions
  );
}
export type PigMortalityQueryHookResult = ReturnType<
  typeof usePigMortalityQuery
>;
export type PigMortalityLazyQueryHookResult = ReturnType<
  typeof usePigMortalityLazyQuery
>;
export type PigMortalityQueryResult = Apollo.QueryResult<
  PigMortalityQuery,
  PigMortalityQueryVariables
>;
export const SavePigMortalityDocument = gql`
  mutation SavePigMortality($input: SavePigMortalityInput!) {
    savePigMortality(input: $input) {
      pigMortality {
        ...PigMortalityFragment
      }
    }
  }
  ${PigMortalityFragmentFragmentDoc}
`;
export type SavePigMortalityMutationFn = Apollo.MutationFunction<
  SavePigMortalityMutation,
  SavePigMortalityMutationVariables
>;

/**
 * __useSavePigMortalityMutation__
 *
 * To run a mutation, you first call `useSavePigMortalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePigMortalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePigMortalityMutation, { data, loading, error }] = useSavePigMortalityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePigMortalityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SavePigMortalityMutation,
    SavePigMortalityMutationVariables
  >
) {
  return Apollo.useMutation<
    SavePigMortalityMutation,
    SavePigMortalityMutationVariables
  >(SavePigMortalityDocument, baseOptions);
}
export type SavePigMortalityMutationHookResult = ReturnType<
  typeof useSavePigMortalityMutation
>;
export type SavePigMortalityMutationResult = Apollo.MutationResult<
  SavePigMortalityMutation
>;
export type SavePigMortalityMutationOptions = Apollo.BaseMutationOptions<
  SavePigMortalityMutation,
  SavePigMortalityMutationVariables
>;
export const PostPigMortalityDocument = gql`
  mutation PostPigMortality($input: PostPigMortalityInput!) {
    postPigMortality(input: $input) {
      pigMortality {
        ...PigMortalityFragment
      }
    }
  }
  ${PigMortalityFragmentFragmentDoc}
`;
export type PostPigMortalityMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PostPigMortalityMutation,
    PostPigMortalityMutationVariables
  >
) {
  return Apollo.useMutation<
    PostPigMortalityMutation,
    PostPigMortalityMutationVariables
  >(PostPigMortalityDocument, baseOptions);
}
export type PostPigMortalityMutationHookResult = ReturnType<
  typeof usePostPigMortalityMutation
>;
export type PostPigMortalityMutationResult = Apollo.MutationResult<
  PostPigMortalityMutation
>;
export type PostPigMortalityMutationOptions = Apollo.BaseMutationOptions<
  PostPigMortalityMutation,
  PostPigMortalityMutationVariables
>;
export const PigMoveDocument = gql`
  query PigMove($job: String!) {
    pigMoveEventTypes {
      code
      description
    }
    pigActivityJobs {
      number
      description
    }
    pigMove(job: $job) {
      ...PigMoveFragment
    }
  }
  ${PigMoveFragmentFragmentDoc}
`;

/**
 * __usePigMoveQuery__
 *
 * To run a query within a React component, call `usePigMoveQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigMoveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigMoveQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigMoveQuery(
  baseOptions: Apollo.QueryHookOptions<PigMoveQuery, PigMoveQueryVariables>
) {
  return Apollo.useQuery<PigMoveQuery, PigMoveQueryVariables>(
    PigMoveDocument,
    baseOptions
  );
}
export function usePigMoveLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PigMoveQuery, PigMoveQueryVariables>
) {
  return Apollo.useLazyQuery<PigMoveQuery, PigMoveQueryVariables>(
    PigMoveDocument,
    baseOptions
  );
}
export type PigMoveQueryHookResult = ReturnType<typeof usePigMoveQuery>;
export type PigMoveLazyQueryHookResult = ReturnType<typeof usePigMoveLazyQuery>;
export type PigMoveQueryResult = Apollo.QueryResult<
  PigMoveQuery,
  PigMoveQueryVariables
>;
export const PigJobDocument = gql`
  query PigJob($job: String!) {
    job(number: $job) {
      number
      description
      inventory
      deadQuantity
    }
  }
`;

/**
 * __usePigJobQuery__
 *
 * To run a query within a React component, call `usePigJobQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigJobQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigJobQuery(
  baseOptions: Apollo.QueryHookOptions<PigJobQuery, PigJobQueryVariables>
) {
  return Apollo.useQuery<PigJobQuery, PigJobQueryVariables>(
    PigJobDocument,
    baseOptions
  );
}
export function usePigJobLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PigJobQuery, PigJobQueryVariables>
) {
  return Apollo.useLazyQuery<PigJobQuery, PigJobQueryVariables>(
    PigJobDocument,
    baseOptions
  );
}
export type PigJobQueryHookResult = ReturnType<typeof usePigJobQuery>;
export type PigJobLazyQueryHookResult = ReturnType<typeof usePigJobLazyQuery>;
export type PigJobQueryResult = Apollo.QueryResult<
  PigJobQuery,
  PigJobQueryVariables
>;
export const SavePigMoveDocument = gql`
  mutation SavePigMove($input: SavePigMoveInput!) {
    savePigMove(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigMove {
        ...PigMoveFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigMoveFragmentFragmentDoc}
`;
export type SavePigMoveMutationFn = Apollo.MutationFunction<
  SavePigMoveMutation,
  SavePigMoveMutationVariables
>;

/**
 * __useSavePigMoveMutation__
 *
 * To run a mutation, you first call `useSavePigMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePigMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePigMoveMutation, { data, loading, error }] = useSavePigMoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePigMoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SavePigMoveMutation,
    SavePigMoveMutationVariables
  >
) {
  return Apollo.useMutation<SavePigMoveMutation, SavePigMoveMutationVariables>(
    SavePigMoveDocument,
    baseOptions
  );
}
export type SavePigMoveMutationHookResult = ReturnType<
  typeof useSavePigMoveMutation
>;
export type SavePigMoveMutationResult = Apollo.MutationResult<
  SavePigMoveMutation
>;
export type SavePigMoveMutationOptions = Apollo.BaseMutationOptions<
  SavePigMoveMutation,
  SavePigMoveMutationVariables
>;
export const PostPigMoveDocument = gql`
  mutation PostPigMove($input: PostPigMoveInput!) {
    postPigMove(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigMove {
        ...PigMoveFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigMoveFragmentFragmentDoc}
`;
export type PostPigMoveMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PostPigMoveMutation,
    PostPigMoveMutationVariables
  >
) {
  return Apollo.useMutation<PostPigMoveMutation, PostPigMoveMutationVariables>(
    PostPigMoveDocument,
    baseOptions
  );
}
export type PostPigMoveMutationHookResult = ReturnType<
  typeof usePostPigMoveMutation
>;
export type PostPigMoveMutationResult = Apollo.MutationResult<
  PostPigMoveMutation
>;
export type PostPigMoveMutationOptions = Apollo.BaseMutationOptions<
  PostPigMoveMutation,
  PostPigMoveMutationVariables
>;
export const PigPurchaseDocument = gql`
  query PigPurchase($job: String!) {
    pigPurchaseEventTypes {
      code
      description
    }
    pigPurchase(job: $job) {
      ...PigPurchaseFragment
    }
  }
  ${PigPurchaseFragmentFragmentDoc}
`;

/**
 * __usePigPurchaseQuery__
 *
 * To run a query within a React component, call `usePigPurchaseQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigPurchaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigPurchaseQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigPurchaseQuery(
  baseOptions: Apollo.QueryHookOptions<
    PigPurchaseQuery,
    PigPurchaseQueryVariables
  >
) {
  return Apollo.useQuery<PigPurchaseQuery, PigPurchaseQueryVariables>(
    PigPurchaseDocument,
    baseOptions
  );
}
export function usePigPurchaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PigPurchaseQuery,
    PigPurchaseQueryVariables
  >
) {
  return Apollo.useLazyQuery<PigPurchaseQuery, PigPurchaseQueryVariables>(
    PigPurchaseDocument,
    baseOptions
  );
}
export type PigPurchaseQueryHookResult = ReturnType<typeof usePigPurchaseQuery>;
export type PigPurchaseLazyQueryHookResult = ReturnType<
  typeof usePigPurchaseLazyQuery
>;
export type PigPurchaseQueryResult = Apollo.QueryResult<
  PigPurchaseQuery,
  PigPurchaseQueryVariables
>;
export const SavePigPurchaseDocument = gql`
  mutation SavePigPurchase($input: SavePigPurchaseInput!) {
    savePigPurchase(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigPurchase {
        ...PigPurchaseFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigPurchaseFragmentFragmentDoc}
`;
export type SavePigPurchaseMutationFn = Apollo.MutationFunction<
  SavePigPurchaseMutation,
  SavePigPurchaseMutationVariables
>;

/**
 * __useSavePigPurchaseMutation__
 *
 * To run a mutation, you first call `useSavePigPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePigPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePigPurchaseMutation, { data, loading, error }] = useSavePigPurchaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePigPurchaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SavePigPurchaseMutation,
    SavePigPurchaseMutationVariables
  >
) {
  return Apollo.useMutation<
    SavePigPurchaseMutation,
    SavePigPurchaseMutationVariables
  >(SavePigPurchaseDocument, baseOptions);
}
export type SavePigPurchaseMutationHookResult = ReturnType<
  typeof useSavePigPurchaseMutation
>;
export type SavePigPurchaseMutationResult = Apollo.MutationResult<
  SavePigPurchaseMutation
>;
export type SavePigPurchaseMutationOptions = Apollo.BaseMutationOptions<
  SavePigPurchaseMutation,
  SavePigPurchaseMutationVariables
>;
export const PostPigPurchaseDocument = gql`
  mutation PostPigPurchase($input: PostPigPurchaseInput!) {
    postPigPurchase(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigPurchase {
        ...PigPurchaseFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigPurchaseFragmentFragmentDoc}
`;
export type PostPigPurchaseMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PostPigPurchaseMutation,
    PostPigPurchaseMutationVariables
  >
) {
  return Apollo.useMutation<
    PostPigPurchaseMutation,
    PostPigPurchaseMutationVariables
  >(PostPigPurchaseDocument, baseOptions);
}
export type PostPigPurchaseMutationHookResult = ReturnType<
  typeof usePostPigPurchaseMutation
>;
export type PostPigPurchaseMutationResult = Apollo.MutationResult<
  PostPigPurchaseMutation
>;
export type PostPigPurchaseMutationOptions = Apollo.BaseMutationOptions<
  PostPigPurchaseMutation,
  PostPigPurchaseMutationVariables
>;
export const PigWeanDocument = gql`
  query PigWean($job: String!) {
    pigWeanEventTypes {
      code
      description
    }
    pigWean(job: $job) {
      ...PigWeanFragment
    }
  }
  ${PigWeanFragmentFragmentDoc}
`;

/**
 * __usePigWeanQuery__
 *
 * To run a query within a React component, call `usePigWeanQuery` and pass it any options that fit your needs.
 * When your component renders, `usePigWeanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePigWeanQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function usePigWeanQuery(
  baseOptions: Apollo.QueryHookOptions<PigWeanQuery, PigWeanQueryVariables>
) {
  return Apollo.useQuery<PigWeanQuery, PigWeanQueryVariables>(
    PigWeanDocument,
    baseOptions
  );
}
export function usePigWeanLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PigWeanQuery, PigWeanQueryVariables>
) {
  return Apollo.useLazyQuery<PigWeanQuery, PigWeanQueryVariables>(
    PigWeanDocument,
    baseOptions
  );
}
export type PigWeanQueryHookResult = ReturnType<typeof usePigWeanQuery>;
export type PigWeanLazyQueryHookResult = ReturnType<typeof usePigWeanLazyQuery>;
export type PigWeanQueryResult = Apollo.QueryResult<
  PigWeanQuery,
  PigWeanQueryVariables
>;
export const SavePigWeanDocument = gql`
  mutation SavePigWean($input: SavePigWeanInput!) {
    savePigWean(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigWean {
        ...PigWeanFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigWeanFragmentFragmentDoc}
`;
export type SavePigWeanMutationFn = Apollo.MutationFunction<
  SavePigWeanMutation,
  SavePigWeanMutationVariables
>;

/**
 * __useSavePigWeanMutation__
 *
 * To run a mutation, you first call `useSavePigWeanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePigWeanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePigWeanMutation, { data, loading, error }] = useSavePigWeanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePigWeanMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SavePigWeanMutation,
    SavePigWeanMutationVariables
  >
) {
  return Apollo.useMutation<SavePigWeanMutation, SavePigWeanMutationVariables>(
    SavePigWeanDocument,
    baseOptions
  );
}
export type SavePigWeanMutationHookResult = ReturnType<
  typeof useSavePigWeanMutation
>;
export type SavePigWeanMutationResult = Apollo.MutationResult<
  SavePigWeanMutation
>;
export type SavePigWeanMutationOptions = Apollo.BaseMutationOptions<
  SavePigWeanMutation,
  SavePigWeanMutationVariables
>;
export const PostPigWeanDocument = gql`
  mutation PostPigWean($input: PostPigWeanInput!) {
    postPigWean(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigWean {
        ...PigWeanFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigWeanFragmentFragmentDoc}
`;
export type PostPigWeanMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PostPigWeanMutation,
    PostPigWeanMutationVariables
  >
) {
  return Apollo.useMutation<PostPigWeanMutation, PostPigWeanMutationVariables>(
    PostPigWeanDocument,
    baseOptions
  );
}
export type PostPigWeanMutationHookResult = ReturnType<
  typeof usePostPigWeanMutation
>;
export type PostPigWeanMutationResult = Apollo.MutationResult<
  PostPigWeanMutation
>;
export type PostPigWeanMutationOptions = Apollo.BaseMutationOptions<
  PostPigWeanMutation,
  PostPigWeanMutationVariables
>;
