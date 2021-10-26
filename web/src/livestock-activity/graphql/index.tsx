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
  inventory?: Maybe<Scalars["Float"]>;
  deadQuantity?: Maybe<Scalars["Float"]>;
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
  fuelHistoryAsset: Array<FuelHistoryAsset>;
  item?: Maybe<Item>;
  itemJournalTemplates?: Maybe<Array<ItemJournalTemplate>>;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  livestockActivityDefaults: LivestockActivityDefaults;
  livestockActivityJobs: Array<Job>;
  livestockAdjustment: LivestockAdjustment;
  livestockAdjustmentEventTypes: Array<LivestockAdjustmentEvent>;
  livestockGradeOff: LivestockGradeOff;
  livestockGradeOffEventTypes: Array<LivestockGradeOffEvent>;
  livestockJob?: Maybe<Job>;
  livestockJobs: Array<Job>;
  livestockMortality: LivestockMortality;
  livestockMortalityEventTypes: Array<LivestockMortalityEvent>;
  livestockMove: LivestockMove;
  livestockMoveEventTypes: Array<LivestockMoveEvent>;
  livestockPurchase: LivestockPurchase;
  livestockPurchaseEventTypes: Array<LivestockPurchaseEvent>;
  livestockWean: LivestockWean;
  livestockWeanEventTypes: Array<LivestockWeanEvent>;
  locations: Array<Location>;
  maintenanceAsset?: Maybe<MaintenanceAsset>;
  maintenanceAssets: Array<MaintenanceAsset>;
  maintenanceAssetsByNo: Array<MaintenanceAsset>;
  maintenanceHistoryAsset: Array<MaintenanceHistoryAsset>;
  menuOptions?: Maybe<Array<MenuOption>>;
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

export type QueryFuelHistoryAssetArgs = {
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

export type QueryLivestockAdjustmentArgs = {
  job: Scalars["String"];
};

export type QueryLivestockGradeOffArgs = {
  job: Scalars["String"];
};

export type QueryLivestockJobArgs = {
  number: Scalars["String"];
};

export type QueryLivestockJobsArgs = {
  input?: Maybe<JobFilter>;
};

export type QueryLivestockMortalityArgs = {
  job: Scalars["String"];
};

export type QueryLivestockMoveArgs = {
  job: Scalars["String"];
};

export type QueryLivestockPurchaseArgs = {
  job: Scalars["String"];
};

export type QueryLivestockWeanArgs = {
  job: Scalars["String"];
};

export type QueryMaintenanceAssetArgs = {
  number: Scalars["String"];
};

export type QueryMaintenanceAssetsByNoArgs = {
  assetNo: Scalars["String"];
};

export type QueryMaintenanceHistoryAssetArgs = {
  number: Scalars["String"];
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
  unitOfMeasureCode: Scalars["String"];
};

export type FuelHistoryAsset = {
  __typename?: "FuelHistoryAsset";
  entry: Scalars["Int"];
  number: Scalars["String"];
  amount: Scalars["Float"];
  maintenanceCode: Scalars["String"];
  reasonCode: Scalars["String"];
  postingDate: Scalars["String"];
  quantity: Scalars["Int"];
  description: Scalars["String"];
  meta: Scalars["Int"];
};

export type PostFuelInput = {
  asset: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  gallons: Scalars["Float"];
  mileage: Scalars["Float"];
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
  postLivestockAdjustment: LivestockAdjustmentResult;
  postLivestockGradeOff: LivestockGradeOffResult;
  postLivestockMortality: LivestockMortalityResult;
  postLivestockMove: LivestockMoveResult;
  postLivestockPurchase: LivestockPurchaseResult;
  postLivestockWean: LivestockWeanResult;
  postMaintenance: MaintenanceResult;
  postScorecard: ScorecardResult;
  saveLivestockAdjustment: LivestockAdjustmentResult;
  saveLivestockGradeOff: LivestockGradeOffResult;
  saveLivestockMortality: LivestockMortalityResult;
  saveLivestockMove: LivestockMoveResult;
  saveLivestockPurchase: LivestockPurchaseResult;
  saveLivestockWean: LivestockWeanResult;
  saveScorecard: ScorecardResult;
  updateUserLocations: UpdateUserLocationsResult;
  updateUserMenuOptions: UpdateUserMenuOptionsResult;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostFuelArgs = {
  input: PostFuelInput;
};

export type MutationPostLivestockAdjustmentArgs = {
  input: PostLivestockAdjustmentInput;
};

export type MutationPostLivestockGradeOffArgs = {
  input: PostLivestockGradeOffInput;
};

export type MutationPostLivestockMortalityArgs = {
  input: PostLivestockMortalityInput;
};

export type MutationPostLivestockMoveArgs = {
  input: PostLivestockMoveInput;
};

export type MutationPostLivestockPurchaseArgs = {
  input: PostLivestockPurchaseInput;
};

export type MutationPostLivestockWeanArgs = {
  input: PostLivestockWeanInput;
};

export type MutationPostMaintenanceArgs = {
  input: PostMaintenanceInput;
};

export type MutationPostScorecardArgs = {
  input: PostScorecardInput;
};

export type MutationSaveLivestockAdjustmentArgs = {
  input: SaveLivestockAdjustmentInput;
};

export type MutationSaveLivestockGradeOffArgs = {
  input: SaveLivestockGradeOffInput;
};

export type MutationSaveLivestockMortalityArgs = {
  input: SaveLivestockMortalityInput;
};

export type MutationSaveLivestockMoveArgs = {
  input: SaveLivestockMoveInput;
};

export type MutationSaveLivestockPurchaseArgs = {
  input: SaveLivestockPurchaseInput;
};

export type MutationSaveLivestockWeanArgs = {
  input: SaveLivestockWeanInput;
};

export type MutationSaveScorecardArgs = {
  input: PostScorecardInput;
};

export type MutationUpdateUserLocationsArgs = {
  input: UpdateUserLocationsInput;
};

export type MutationUpdateUserMenuOptionsArgs = {
  input: UpdateUserMenuOptionsInput;
};

export type LivestockActivityDefaults = {
  __typename?: "LivestockActivityDefaults";
  job?: Maybe<Job>;
  prices: Array<PriceEntry>;
};

export type LivestockWeanEvent = {
  __typename?: "LivestockWeanEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type LivestockGradeOffEvent = {
  __typename?: "LivestockGradeOffEvent";
  code: Scalars["String"];
  description: Scalars["String"];
  reasons: Array<Reason>;
};

export type LivestockMoveEvent = {
  __typename?: "LivestockMoveEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type LivestockPurchaseEvent = {
  __typename?: "LivestockPurchaseEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type LivestockAdjustmentEvent = {
  __typename?: "LivestockAdjustmentEvent";
  code: Scalars["String"];
  description: Scalars["String"];
};

export type LivestockMortalityEvent = {
  __typename?: "LivestockMortalityEvent";
  code: Scalars["String"];
  description: Scalars["String"];
  reasons: Array<Reason>;
};

export type PriceEntry = {
  __typename?: "PriceEntry";
  animal: Scalars["String"];
  price?: Maybe<Scalars["Float"]>;
};

export type LivestockQuantity = {
  __typename?: "LivestockQuantity";
  code: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
};

export type LivestockQuantityInput = {
  code: Scalars["String"];
  quantity: Scalars["Int"];
};

export type LivestockOptionalQuantityInput = {
  code: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
};

export type LivestockAdjustment = {
  __typename?: "LivestockAdjustment";
  event?: Maybe<LivestockAdjustmentEvent>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockAdjustmentInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockAdjustmentInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockAdjustmentResult = {
  __typename?: "LivestockAdjustmentResult";
  success: Scalars["Boolean"];
  livestockAdjustment: LivestockAdjustment;
  defaults: LivestockActivityDefaults;
};

export type LivestockGradeOff = {
  __typename?: "LivestockGradeOff";
  event?: Maybe<LivestockGradeOffEvent>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantities: Array<LivestockQuantity>;
  livestockWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockGradeOffInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities: Array<LivestockQuantityInput>;
  livestockWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockGradeOffInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities?: Maybe<Array<LivestockOptionalQuantityInput>>;
  livestockWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockGradeOffResult = {
  __typename?: "LivestockGradeOffResult";
  success: Scalars["Boolean"];
  livestockGradeOff: LivestockGradeOff;
  defaults: LivestockActivityDefaults;
};

export type LivestockMortality = {
  __typename?: "LivestockMortality";
  event?: Maybe<LivestockMortalityEvent>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantities?: Maybe<Array<LivestockQuantity>>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockMortalityInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities?: Maybe<Array<LivestockQuantityInput>>;
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockMortalityInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantities?: Maybe<Array<LivestockOptionalQuantityInput>>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockMortalityResult = {
  __typename?: "LivestockMortalityResult";
  success: Scalars["Boolean"];
  livestockMortality: LivestockMortality;
  defaults: LivestockActivityDefaults;
};

export type LivestockMove = {
  __typename?: "LivestockMove";
  event?: Maybe<LivestockMoveEvent>;
  postingDate?: Maybe<Scalars["String"]>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockMoveInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockMoveInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockMoveResult = {
  __typename?: "LivestockMoveResult";
  success: Scalars["Boolean"];
  livestockMove: LivestockMove;
  defaults: LivestockActivityDefaults;
};

export type LivestockPurchase = {
  __typename?: "LivestockPurchase";
  event?: Maybe<LivestockPurchaseEvent>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockPurchaseInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockPurchaseInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockPurchaseResult = {
  __typename?: "LivestockPurchaseResult";
  success: Scalars["Boolean"];
  livestockPurchase: LivestockPurchase;
  defaults: LivestockActivityDefaults;
};

export type LivestockWean = {
  __typename?: "LivestockWean";
  event?: Maybe<LivestockWeanEvent>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockWeanInput = {
  event: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockWeanInput = {
  event?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  smallLivestockQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockWeanResult = {
  __typename?: "LivestockWeanResult";
  success: Scalars["Boolean"];
  livestockWean: LivestockWean;
  defaults: LivestockActivityDefaults;
};

export type ItemJournalTemplate = {
  __typename?: "ItemJournalTemplate";
  name: Scalars["String"];
  description: Scalars["String"];
  type: Scalars["String"];
  sourceCode: Scalars["String"];
  reasonCode: Scalars["String"];
};

export type MaintenanceAsset = {
  __typename?: "MaintenanceAsset";
  number: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  classCode?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
  interval?: Maybe<Scalars["Int"]>;
  unitType?: Maybe<Scalars["String"]>;
  maintenanceDesc?: Maybe<Scalars["String"]>;
};

export type MaintenanceHistoryAsset = {
  __typename?: "MaintenanceHistoryAsset";
  entry: Scalars["Int"];
  number: Scalars["String"];
  amount: Scalars["Float"];
  maintenanceCode: Scalars["String"];
  reasonCode: Scalars["String"];
  postingDate: Scalars["String"];
  quantity: Scalars["Int"];
  description: Scalars["String"];
  meta: Scalars["Int"];
};

export type PostMaintenanceInput = {
  asset: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  mileage?: Maybe<Scalars["Float"]>;
  workHours: Scalars["Float"];
  totalCost?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type MaintenanceResult = {
  __typename?: "MaintenanceResult";
  success: Scalars["Boolean"];
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

export type MenuOption = {
  __typename?: "MenuOption";
  name: Scalars["String"];
  route: Scalars["String"];
};

export type UserMenuOptions = {
  __typename?: "UserMenuOptions";
  mode: InclusivityMode;
  list: Array<MenuOption>;
};

export type User = {
  __typename?: "User";
  username: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
  locations: UserLocations;
  menuOptions: UserMenuOptions;
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

export type UpdateUserMenuOptionsInput = {
  add?: Maybe<Array<Scalars["String"]>>;
  remove?: Maybe<Array<Scalars["String"]>>;
  mode?: Maybe<InclusivityMode>;
};

export type UpdateUserLocationsResult = {
  __typename?: "UpdateUserLocationsResult";
  success: Scalars["Boolean"];
  locations: UserLocations;
};

export type UpdateUserMenuOptionsResult = {
  __typename?: "UpdateUserMenuOptionsResult";
  success: Scalars["Boolean"];
  menuOptions: UserMenuOptions;
};

export type LivestockActivityDefaultsFragmentFragment = {
  __typename?: "LivestockActivityDefaults";
} & {
  job?: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  prices: Array<
    { __typename?: "PriceEntry" } & Pick<PriceEntry, "animal" | "price">
  >;
};

export type LivestockActivityJobsQueryVariables = {};

export type LivestockActivityJobsQuery = { __typename?: "Query" } & {
  livestockActivityDefaults: { __typename?: "LivestockActivityDefaults" } & {
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
  livestockActivityJobs: Array<
    { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >
  >;
};

export type LivestockAdjustmentFragmentFragment = {
  __typename?: "LivestockAdjustment";
} & Pick<
  LivestockAdjustment,
  "postingDate" | "quantity" | "totalWeight" | "comments"
> & {
    event?: Maybe<
      { __typename?: "LivestockAdjustmentEvent" } & Pick<
        LivestockAdjustmentEvent,
        "code"
      >
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

export type LivestockAdjustmentQueryVariables = {
  job: Scalars["String"];
};

export type LivestockAdjustmentQuery = { __typename?: "Query" } & {
  livestockAdjustmentEventTypes: Array<
    { __typename?: "LivestockAdjustmentEvent" } & Pick<
      LivestockAdjustmentEvent,
      "code" | "description"
    >
  >;
  livestockAdjustment: {
    __typename?: "LivestockAdjustment";
  } & LivestockAdjustmentFragmentFragment;
};

export type SaveLivestockAdjustmentMutationVariables = {
  input: SaveLivestockAdjustmentInput;
};

export type SaveLivestockAdjustmentMutation = { __typename?: "Mutation" } & {
  saveLivestockAdjustment: { __typename?: "LivestockAdjustmentResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockAdjustment: {
      __typename?: "LivestockAdjustment";
    } & LivestockAdjustmentFragmentFragment;
  };
};

export type PostLivestockAdjustmentMutationVariables = {
  input: PostLivestockAdjustmentInput;
};

export type PostLivestockAdjustmentMutation = { __typename?: "Mutation" } & {
  postLivestockAdjustment: { __typename?: "LivestockAdjustmentResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockAdjustment: {
      __typename?: "LivestockAdjustment";
    } & LivestockAdjustmentFragmentFragment;
  };
};

export type LivestockGradeOffFragmentFragment = {
  __typename?: "LivestockGradeOff";
} & Pick<LivestockGradeOff, "postingDate" | "livestockWeight" | "comments"> & {
    event?: Maybe<
      { __typename?: "LivestockGradeOffEvent" } & Pick<
        LivestockGradeOffEvent,
        "code"
      >
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
    quantities: Array<
      { __typename?: "LivestockQuantity" } & Pick<
        LivestockQuantity,
        "code" | "quantity"
      >
    >;
  };

export type LivestockGradeOffQueryVariables = {
  job: Scalars["String"];
};

export type LivestockGradeOffQuery = { __typename?: "Query" } & {
  livestockGradeOffEventTypes: Array<
    { __typename?: "LivestockGradeOffEvent" } & Pick<
      LivestockGradeOffEvent,
      "code" | "description"
    > & {
        reasons: Array<
          { __typename?: "Reason" } & Pick<Reason, "code" | "description">
        >;
      }
  >;
  livestockGradeOff: {
    __typename?: "LivestockGradeOff";
  } & LivestockGradeOffFragmentFragment;
};

export type SaveLivestockGradeOffMutationVariables = {
  input: SaveLivestockGradeOffInput;
};

export type SaveLivestockGradeOffMutation = { __typename?: "Mutation" } & {
  saveLivestockGradeOff: { __typename?: "LivestockGradeOffResult" } & {
    livestockGradeOff: {
      __typename?: "LivestockGradeOff";
    } & LivestockGradeOffFragmentFragment;
  };
};

export type PostLivestockGradeOffMutationVariables = {
  input: PostLivestockGradeOffInput;
};

export type PostLivestockGradeOffMutation = { __typename?: "Mutation" } & {
  postLivestockGradeOff: { __typename?: "LivestockGradeOffResult" } & {
    livestockGradeOff: {
      __typename?: "LivestockGradeOff";
    } & LivestockGradeOffFragmentFragment;
  };
};

export type LivestockMortalityFragmentFragment = {
  __typename?: "LivestockMortality";
} & Pick<LivestockMortality, "postingDate" | "comments"> & {
    event?: Maybe<
      { __typename?: "LivestockMortalityEvent" } & Pick<
        LivestockMortalityEvent,
        "code"
      >
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
    quantities?: Maybe<
      Array<
        { __typename?: "LivestockQuantity" } & Pick<
          LivestockQuantity,
          "code" | "quantity"
        >
      >
    >;
  };

export type LivestockMortalityQueryVariables = {
  job: Scalars["String"];
};

export type LivestockMortalityQuery = { __typename?: "Query" } & {
  livestockMortalityEventTypes: Array<
    { __typename?: "LivestockMortalityEvent" } & Pick<
      LivestockMortalityEvent,
      "code" | "description"
    > & {
        reasons: Array<
          { __typename?: "Reason" } & Pick<Reason, "code" | "description">
        >;
      }
  >;
  livestockMortality: {
    __typename?: "LivestockMortality";
  } & LivestockMortalityFragmentFragment;
};

export type SaveLivestockMortalityMutationVariables = {
  input: SaveLivestockMortalityInput;
};

export type SaveLivestockMortalityMutation = { __typename?: "Mutation" } & {
  saveLivestockMortality: { __typename?: "LivestockMortalityResult" } & {
    livestockMortality: {
      __typename?: "LivestockMortality";
    } & LivestockMortalityFragmentFragment;
  };
};

export type PostLivestockMortalityMutationVariables = {
  input: PostLivestockMortalityInput;
};

export type PostLivestockMortalityMutation = { __typename?: "Mutation" } & {
  postLivestockMortality: { __typename?: "LivestockMortalityResult" } & {
    livestockMortality: {
      __typename?: "LivestockMortality";
    } & LivestockMortalityFragmentFragment;
  };
};

export type LivestockMoveFragmentFragment = {
  __typename?: "LivestockMove";
} & Pick<
  LivestockMove,
  | "postingDate"
  | "quantity"
  | "smallLivestockQuantity"
  | "totalWeight"
  | "comments"
> & {
    event?: Maybe<
      { __typename?: "LivestockMoveEvent" } & Pick<LivestockMoveEvent, "code">
    >;
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

export type LivestockMoveQueryVariables = {
  job: Scalars["String"];
};

export type LivestockMoveQuery = { __typename?: "Query" } & {
  livestockMoveEventTypes: Array<
    { __typename?: "LivestockMoveEvent" } & Pick<
      LivestockMoveEvent,
      "code" | "description"
    >
  >;
  livestockActivityJobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "description">
  >;
  livestockMove: {
    __typename?: "LivestockMove";
  } & LivestockMoveFragmentFragment;
};

export type LivestockJobQueryVariables = {
  job: Scalars["String"];
};

export type LivestockJobQuery = { __typename?: "Query" } & {
  job?: Maybe<
    { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >
  >;
};

export type SaveLivestockMoveMutationVariables = {
  input: SaveLivestockMoveInput;
};

export type SaveLivestockMoveMutation = { __typename?: "Mutation" } & {
  saveLivestockMove: { __typename?: "LivestockMoveResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockMove: {
      __typename?: "LivestockMove";
    } & LivestockMoveFragmentFragment;
  };
};

export type PostLivestockMoveMutationVariables = {
  input: PostLivestockMoveInput;
};

export type PostLivestockMoveMutation = { __typename?: "Mutation" } & {
  postLivestockMove: { __typename?: "LivestockMoveResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockMove: {
      __typename?: "LivestockMove";
    } & LivestockMoveFragmentFragment;
  };
};

export type LivestockPurchaseFragmentFragment = {
  __typename?: "LivestockPurchase";
} & Pick<
  LivestockPurchase,
  | "postingDate"
  | "quantity"
  | "smallLivestockQuantity"
  | "totalWeight"
  | "comments"
> & {
    event?: Maybe<
      { __typename?: "LivestockPurchaseEvent" } & Pick<
        LivestockPurchaseEvent,
        "code"
      >
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

export type LivestockPurchaseQueryVariables = {
  job: Scalars["String"];
};

export type LivestockPurchaseQuery = { __typename?: "Query" } & {
  livestockPurchaseEventTypes: Array<
    { __typename?: "LivestockPurchaseEvent" } & Pick<
      LivestockPurchaseEvent,
      "code" | "description"
    >
  >;
  livestockPurchase: {
    __typename?: "LivestockPurchase";
  } & LivestockPurchaseFragmentFragment;
};

export type SaveLivestockPurchaseMutationVariables = {
  input: SaveLivestockPurchaseInput;
};

export type SaveLivestockPurchaseMutation = { __typename?: "Mutation" } & {
  saveLivestockPurchase: { __typename?: "LivestockPurchaseResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockPurchase: {
      __typename?: "LivestockPurchase";
    } & LivestockPurchaseFragmentFragment;
  };
};

export type PostLivestockPurchaseMutationVariables = {
  input: PostLivestockPurchaseInput;
};

export type PostLivestockPurchaseMutation = { __typename?: "Mutation" } & {
  postLivestockPurchase: { __typename?: "LivestockPurchaseResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockPurchase: {
      __typename?: "LivestockPurchase";
    } & LivestockPurchaseFragmentFragment;
  };
};

export type LivestockWeanFragmentFragment = {
  __typename?: "LivestockWean";
} & Pick<
  LivestockWean,
  | "postingDate"
  | "quantity"
  | "smallLivestockQuantity"
  | "totalWeight"
  | "comments"
> & {
    event?: Maybe<
      { __typename?: "LivestockWeanEvent" } & Pick<LivestockWeanEvent, "code">
    >;
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

export type LivestockWeanQueryVariables = {
  job: Scalars["String"];
};

export type LivestockWeanQuery = { __typename?: "Query" } & {
  livestockWeanEventTypes: Array<
    { __typename?: "LivestockWeanEvent" } & Pick<
      LivestockWeanEvent,
      "code" | "description"
    >
  >;
  livestockWean: {
    __typename?: "LivestockWean";
  } & LivestockWeanFragmentFragment;
};

export type SaveLivestockWeanMutationVariables = {
  input: SaveLivestockWeanInput;
};

export type SaveLivestockWeanMutation = { __typename?: "Mutation" } & {
  saveLivestockWean: { __typename?: "LivestockWeanResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockWean: {
      __typename?: "LivestockWean";
    } & LivestockWeanFragmentFragment;
  };
};

export type PostLivestockWeanMutationVariables = {
  input: PostLivestockWeanInput;
};

export type PostLivestockWeanMutation = { __typename?: "Mutation" } & {
  postLivestockWean: { __typename?: "LivestockWeanResult" } & {
    defaults: {
      __typename?: "LivestockActivityDefaults";
    } & LivestockActivityDefaultsFragmentFragment;
    livestockWean: {
      __typename?: "LivestockWean";
    } & LivestockWeanFragmentFragment;
  };
};

export const LivestockActivityDefaultsFragmentFragmentDoc = gql`
  fragment LivestockActivityDefaultsFragment on LivestockActivityDefaults {
    job {
      number
    }
    prices {
      animal
      price
    }
  }
`;
export const LivestockAdjustmentFragmentFragmentDoc = gql`
  fragment LivestockAdjustmentFragment on LivestockAdjustment {
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
export const LivestockGradeOffFragmentFragmentDoc = gql`
  fragment LivestockGradeOffFragment on LivestockGradeOff {
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
    livestockWeight
    comments
  }
`;
export const LivestockMortalityFragmentFragmentDoc = gql`
  fragment LivestockMortalityFragment on LivestockMortality {
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
export const LivestockMoveFragmentFragmentDoc = gql`
  fragment LivestockMoveFragment on LivestockMove {
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
    smallLivestockQuantity
    totalWeight
    comments
  }
`;
export const LivestockPurchaseFragmentFragmentDoc = gql`
  fragment LivestockPurchaseFragment on LivestockPurchase {
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
    smallLivestockQuantity
    totalWeight
    comments
  }
`;
export const LivestockWeanFragmentFragmentDoc = gql`
  fragment LivestockWeanFragment on LivestockWean {
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
    smallLivestockQuantity
    totalWeight
    comments
  }
`;
export const LivestockActivityJobsDocument = gql`
  query LivestockActivityJobs {
    livestockActivityDefaults {
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
    livestockActivityJobs {
      number
      description
      inventory
      deadQuantity
    }
  }
`;

/**
 * __useLivestockActivityJobsQuery__
 *
 * To run a query within a React component, call `useLivestockActivityJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockActivityJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockActivityJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLivestockActivityJobsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LivestockActivityJobsQuery,
    LivestockActivityJobsQueryVariables
  >
) {
  return Apollo.useQuery<
    LivestockActivityJobsQuery,
    LivestockActivityJobsQueryVariables
  >(LivestockActivityJobsDocument, baseOptions);
}
export function useLivestockActivityJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockActivityJobsQuery,
    LivestockActivityJobsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    LivestockActivityJobsQuery,
    LivestockActivityJobsQueryVariables
  >(LivestockActivityJobsDocument, baseOptions);
}
export type LivestockActivityJobsQueryHookResult = ReturnType<
  typeof useLivestockActivityJobsQuery
>;
export type LivestockActivityJobsLazyQueryHookResult = ReturnType<
  typeof useLivestockActivityJobsLazyQuery
>;
export type LivestockActivityJobsQueryResult = Apollo.QueryResult<
  LivestockActivityJobsQuery,
  LivestockActivityJobsQueryVariables
>;
export const LivestockAdjustmentDocument = gql`
  query LivestockAdjustment($job: String!) {
    livestockAdjustmentEventTypes {
      code
      description
    }
    livestockAdjustment(job: $job) {
      ...LivestockAdjustmentFragment
    }
  }
  ${LivestockAdjustmentFragmentFragmentDoc}
`;

/**
 * __useLivestockAdjustmentQuery__
 *
 * To run a query within a React component, call `useLivestockAdjustmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockAdjustmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockAdjustmentQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockAdjustmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockAdjustmentQuery,
    LivestockAdjustmentQueryVariables
  >
) {
  return Apollo.useQuery<
    LivestockAdjustmentQuery,
    LivestockAdjustmentQueryVariables
  >(LivestockAdjustmentDocument, baseOptions);
}
export function useLivestockAdjustmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockAdjustmentQuery,
    LivestockAdjustmentQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    LivestockAdjustmentQuery,
    LivestockAdjustmentQueryVariables
  >(LivestockAdjustmentDocument, baseOptions);
}
export type LivestockAdjustmentQueryHookResult = ReturnType<
  typeof useLivestockAdjustmentQuery
>;
export type LivestockAdjustmentLazyQueryHookResult = ReturnType<
  typeof useLivestockAdjustmentLazyQuery
>;
export type LivestockAdjustmentQueryResult = Apollo.QueryResult<
  LivestockAdjustmentQuery,
  LivestockAdjustmentQueryVariables
>;
export const SaveLivestockAdjustmentDocument = gql`
  mutation SaveLivestockAdjustment($input: SaveLivestockAdjustmentInput!) {
    saveLivestockAdjustment(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockAdjustment {
        ...LivestockAdjustmentFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockAdjustmentFragmentFragmentDoc}
`;
export type SaveLivestockAdjustmentMutationFn = Apollo.MutationFunction<
  SaveLivestockAdjustmentMutation,
  SaveLivestockAdjustmentMutationVariables
>;

/**
 * __useSaveLivestockAdjustmentMutation__
 *
 * To run a mutation, you first call `useSaveLivestockAdjustmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLivestockAdjustmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLivestockAdjustmentMutation, { data, loading, error }] = useSaveLivestockAdjustmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLivestockAdjustmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveLivestockAdjustmentMutation,
    SaveLivestockAdjustmentMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveLivestockAdjustmentMutation,
    SaveLivestockAdjustmentMutationVariables
  >(SaveLivestockAdjustmentDocument, baseOptions);
}
export type SaveLivestockAdjustmentMutationHookResult = ReturnType<
  typeof useSaveLivestockAdjustmentMutation
>;
export type SaveLivestockAdjustmentMutationResult = Apollo.MutationResult<
  SaveLivestockAdjustmentMutation
>;
export type SaveLivestockAdjustmentMutationOptions = Apollo.BaseMutationOptions<
  SaveLivestockAdjustmentMutation,
  SaveLivestockAdjustmentMutationVariables
>;
export const PostLivestockAdjustmentDocument = gql`
  mutation PostLivestockAdjustment($input: PostLivestockAdjustmentInput!) {
    postLivestockAdjustment(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockAdjustment {
        ...LivestockAdjustmentFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockAdjustmentFragmentFragmentDoc}
`;
export type PostLivestockAdjustmentMutationFn = Apollo.MutationFunction<
  PostLivestockAdjustmentMutation,
  PostLivestockAdjustmentMutationVariables
>;

/**
 * __usePostLivestockAdjustmentMutation__
 *
 * To run a mutation, you first call `usePostLivestockAdjustmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLivestockAdjustmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLivestockAdjustmentMutation, { data, loading, error }] = usePostLivestockAdjustmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostLivestockAdjustmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostLivestockAdjustmentMutation,
    PostLivestockAdjustmentMutationVariables
  >
) {
  return Apollo.useMutation<
    PostLivestockAdjustmentMutation,
    PostLivestockAdjustmentMutationVariables
  >(PostLivestockAdjustmentDocument, baseOptions);
}
export type PostLivestockAdjustmentMutationHookResult = ReturnType<
  typeof usePostLivestockAdjustmentMutation
>;
export type PostLivestockAdjustmentMutationResult = Apollo.MutationResult<
  PostLivestockAdjustmentMutation
>;
export type PostLivestockAdjustmentMutationOptions = Apollo.BaseMutationOptions<
  PostLivestockAdjustmentMutation,
  PostLivestockAdjustmentMutationVariables
>;
export const LivestockGradeOffDocument = gql`
  query LivestockGradeOff($job: String!) {
    livestockGradeOffEventTypes {
      code
      description
      reasons {
        code
        description
      }
    }
    livestockGradeOff(job: $job) {
      ...LivestockGradeOffFragment
    }
  }
  ${LivestockGradeOffFragmentFragmentDoc}
`;

/**
 * __useLivestockGradeOffQuery__
 *
 * To run a query within a React component, call `useLivestockGradeOffQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockGradeOffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockGradeOffQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockGradeOffQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockGradeOffQuery,
    LivestockGradeOffQueryVariables
  >
) {
  return Apollo.useQuery<
    LivestockGradeOffQuery,
    LivestockGradeOffQueryVariables
  >(LivestockGradeOffDocument, baseOptions);
}
export function useLivestockGradeOffLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockGradeOffQuery,
    LivestockGradeOffQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    LivestockGradeOffQuery,
    LivestockGradeOffQueryVariables
  >(LivestockGradeOffDocument, baseOptions);
}
export type LivestockGradeOffQueryHookResult = ReturnType<
  typeof useLivestockGradeOffQuery
>;
export type LivestockGradeOffLazyQueryHookResult = ReturnType<
  typeof useLivestockGradeOffLazyQuery
>;
export type LivestockGradeOffQueryResult = Apollo.QueryResult<
  LivestockGradeOffQuery,
  LivestockGradeOffQueryVariables
>;
export const SaveLivestockGradeOffDocument = gql`
  mutation SaveLivestockGradeOff($input: SaveLivestockGradeOffInput!) {
    saveLivestockGradeOff(input: $input) {
      livestockGradeOff {
        ...LivestockGradeOffFragment
      }
    }
  }
  ${LivestockGradeOffFragmentFragmentDoc}
`;
export type SaveLivestockGradeOffMutationFn = Apollo.MutationFunction<
  SaveLivestockGradeOffMutation,
  SaveLivestockGradeOffMutationVariables
>;

/**
 * __useSaveLivestockGradeOffMutation__
 *
 * To run a mutation, you first call `useSaveLivestockGradeOffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLivestockGradeOffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLivestockGradeOffMutation, { data, loading, error }] = useSaveLivestockGradeOffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLivestockGradeOffMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveLivestockGradeOffMutation,
    SaveLivestockGradeOffMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveLivestockGradeOffMutation,
    SaveLivestockGradeOffMutationVariables
  >(SaveLivestockGradeOffDocument, baseOptions);
}
export type SaveLivestockGradeOffMutationHookResult = ReturnType<
  typeof useSaveLivestockGradeOffMutation
>;
export type SaveLivestockGradeOffMutationResult = Apollo.MutationResult<
  SaveLivestockGradeOffMutation
>;
export type SaveLivestockGradeOffMutationOptions = Apollo.BaseMutationOptions<
  SaveLivestockGradeOffMutation,
  SaveLivestockGradeOffMutationVariables
>;
export const PostLivestockGradeOffDocument = gql`
  mutation PostLivestockGradeOff($input: PostLivestockGradeOffInput!) {
    postLivestockGradeOff(input: $input) {
      livestockGradeOff {
        ...LivestockGradeOffFragment
      }
    }
  }
  ${LivestockGradeOffFragmentFragmentDoc}
`;
export type PostLivestockGradeOffMutationFn = Apollo.MutationFunction<
  PostLivestockGradeOffMutation,
  PostLivestockGradeOffMutationVariables
>;

/**
 * __usePostLivestockGradeOffMutation__
 *
 * To run a mutation, you first call `usePostLivestockGradeOffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLivestockGradeOffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLivestockGradeOffMutation, { data, loading, error }] = usePostLivestockGradeOffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostLivestockGradeOffMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostLivestockGradeOffMutation,
    PostLivestockGradeOffMutationVariables
  >
) {
  return Apollo.useMutation<
    PostLivestockGradeOffMutation,
    PostLivestockGradeOffMutationVariables
  >(PostLivestockGradeOffDocument, baseOptions);
}
export type PostLivestockGradeOffMutationHookResult = ReturnType<
  typeof usePostLivestockGradeOffMutation
>;
export type PostLivestockGradeOffMutationResult = Apollo.MutationResult<
  PostLivestockGradeOffMutation
>;
export type PostLivestockGradeOffMutationOptions = Apollo.BaseMutationOptions<
  PostLivestockGradeOffMutation,
  PostLivestockGradeOffMutationVariables
>;
export const LivestockMortalityDocument = gql`
  query LivestockMortality($job: String!) {
    livestockMortalityEventTypes {
      code
      description
      reasons {
        code
        description
      }
    }
    livestockMortality(job: $job) {
      ...LivestockMortalityFragment
    }
  }
  ${LivestockMortalityFragmentFragmentDoc}
`;

/**
 * __useLivestockMortalityQuery__
 *
 * To run a query within a React component, call `useLivestockMortalityQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockMortalityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockMortalityQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockMortalityQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockMortalityQuery,
    LivestockMortalityQueryVariables
  >
) {
  return Apollo.useQuery<
    LivestockMortalityQuery,
    LivestockMortalityQueryVariables
  >(LivestockMortalityDocument, baseOptions);
}
export function useLivestockMortalityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockMortalityQuery,
    LivestockMortalityQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    LivestockMortalityQuery,
    LivestockMortalityQueryVariables
  >(LivestockMortalityDocument, baseOptions);
}
export type LivestockMortalityQueryHookResult = ReturnType<
  typeof useLivestockMortalityQuery
>;
export type LivestockMortalityLazyQueryHookResult = ReturnType<
  typeof useLivestockMortalityLazyQuery
>;
export type LivestockMortalityQueryResult = Apollo.QueryResult<
  LivestockMortalityQuery,
  LivestockMortalityQueryVariables
>;
export const SaveLivestockMortalityDocument = gql`
  mutation SaveLivestockMortality($input: SaveLivestockMortalityInput!) {
    saveLivestockMortality(input: $input) {
      livestockMortality {
        ...LivestockMortalityFragment
      }
    }
  }
  ${LivestockMortalityFragmentFragmentDoc}
`;
export type SaveLivestockMortalityMutationFn = Apollo.MutationFunction<
  SaveLivestockMortalityMutation,
  SaveLivestockMortalityMutationVariables
>;

/**
 * __useSaveLivestockMortalityMutation__
 *
 * To run a mutation, you first call `useSaveLivestockMortalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLivestockMortalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLivestockMortalityMutation, { data, loading, error }] = useSaveLivestockMortalityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLivestockMortalityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveLivestockMortalityMutation,
    SaveLivestockMortalityMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveLivestockMortalityMutation,
    SaveLivestockMortalityMutationVariables
  >(SaveLivestockMortalityDocument, baseOptions);
}
export type SaveLivestockMortalityMutationHookResult = ReturnType<
  typeof useSaveLivestockMortalityMutation
>;
export type SaveLivestockMortalityMutationResult = Apollo.MutationResult<
  SaveLivestockMortalityMutation
>;
export type SaveLivestockMortalityMutationOptions = Apollo.BaseMutationOptions<
  SaveLivestockMortalityMutation,
  SaveLivestockMortalityMutationVariables
>;
export const PostLivestockMortalityDocument = gql`
  mutation PostLivestockMortality($input: PostLivestockMortalityInput!) {
    postLivestockMortality(input: $input) {
      livestockMortality {
        ...LivestockMortalityFragment
      }
    }
  }
  ${LivestockMortalityFragmentFragmentDoc}
`;
export type PostLivestockMortalityMutationFn = Apollo.MutationFunction<
  PostLivestockMortalityMutation,
  PostLivestockMortalityMutationVariables
>;

/**
 * __usePostLivestockMortalityMutation__
 *
 * To run a mutation, you first call `usePostLivestockMortalityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLivestockMortalityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLivestockMortalityMutation, { data, loading, error }] = usePostLivestockMortalityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostLivestockMortalityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostLivestockMortalityMutation,
    PostLivestockMortalityMutationVariables
  >
) {
  return Apollo.useMutation<
    PostLivestockMortalityMutation,
    PostLivestockMortalityMutationVariables
  >(PostLivestockMortalityDocument, baseOptions);
}
export type PostLivestockMortalityMutationHookResult = ReturnType<
  typeof usePostLivestockMortalityMutation
>;
export type PostLivestockMortalityMutationResult = Apollo.MutationResult<
  PostLivestockMortalityMutation
>;
export type PostLivestockMortalityMutationOptions = Apollo.BaseMutationOptions<
  PostLivestockMortalityMutation,
  PostLivestockMortalityMutationVariables
>;
export const LivestockMoveDocument = gql`
  query LivestockMove($job: String!) {
    livestockMoveEventTypes {
      code
      description
    }
    livestockActivityJobs {
      number
      description
    }
    livestockMove(job: $job) {
      ...LivestockMoveFragment
    }
  }
  ${LivestockMoveFragmentFragmentDoc}
`;

/**
 * __useLivestockMoveQuery__
 *
 * To run a query within a React component, call `useLivestockMoveQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockMoveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockMoveQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockMoveQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockMoveQuery,
    LivestockMoveQueryVariables
  >
) {
  return Apollo.useQuery<LivestockMoveQuery, LivestockMoveQueryVariables>(
    LivestockMoveDocument,
    baseOptions
  );
}
export function useLivestockMoveLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockMoveQuery,
    LivestockMoveQueryVariables
  >
) {
  return Apollo.useLazyQuery<LivestockMoveQuery, LivestockMoveQueryVariables>(
    LivestockMoveDocument,
    baseOptions
  );
}
export type LivestockMoveQueryHookResult = ReturnType<
  typeof useLivestockMoveQuery
>;
export type LivestockMoveLazyQueryHookResult = ReturnType<
  typeof useLivestockMoveLazyQuery
>;
export type LivestockMoveQueryResult = Apollo.QueryResult<
  LivestockMoveQuery,
  LivestockMoveQueryVariables
>;
export const LivestockJobDocument = gql`
  query LivestockJob($job: String!) {
    job(number: $job) {
      number
      description
      inventory
      deadQuantity
    }
  }
`;

/**
 * __useLivestockJobQuery__
 *
 * To run a query within a React component, call `useLivestockJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockJobQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockJobQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockJobQuery,
    LivestockJobQueryVariables
  >
) {
  return Apollo.useQuery<LivestockJobQuery, LivestockJobQueryVariables>(
    LivestockJobDocument,
    baseOptions
  );
}
export function useLivestockJobLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockJobQuery,
    LivestockJobQueryVariables
  >
) {
  return Apollo.useLazyQuery<LivestockJobQuery, LivestockJobQueryVariables>(
    LivestockJobDocument,
    baseOptions
  );
}
export type LivestockJobQueryHookResult = ReturnType<
  typeof useLivestockJobQuery
>;
export type LivestockJobLazyQueryHookResult = ReturnType<
  typeof useLivestockJobLazyQuery
>;
export type LivestockJobQueryResult = Apollo.QueryResult<
  LivestockJobQuery,
  LivestockJobQueryVariables
>;
export const SaveLivestockMoveDocument = gql`
  mutation SaveLivestockMove($input: SaveLivestockMoveInput!) {
    saveLivestockMove(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockMove {
        ...LivestockMoveFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockMoveFragmentFragmentDoc}
`;
export type SaveLivestockMoveMutationFn = Apollo.MutationFunction<
  SaveLivestockMoveMutation,
  SaveLivestockMoveMutationVariables
>;

/**
 * __useSaveLivestockMoveMutation__
 *
 * To run a mutation, you first call `useSaveLivestockMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLivestockMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLivestockMoveMutation, { data, loading, error }] = useSaveLivestockMoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLivestockMoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveLivestockMoveMutation,
    SaveLivestockMoveMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveLivestockMoveMutation,
    SaveLivestockMoveMutationVariables
  >(SaveLivestockMoveDocument, baseOptions);
}
export type SaveLivestockMoveMutationHookResult = ReturnType<
  typeof useSaveLivestockMoveMutation
>;
export type SaveLivestockMoveMutationResult = Apollo.MutationResult<
  SaveLivestockMoveMutation
>;
export type SaveLivestockMoveMutationOptions = Apollo.BaseMutationOptions<
  SaveLivestockMoveMutation,
  SaveLivestockMoveMutationVariables
>;
export const PostLivestockMoveDocument = gql`
  mutation PostLivestockMove($input: PostLivestockMoveInput!) {
    postLivestockMove(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockMove {
        ...LivestockMoveFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockMoveFragmentFragmentDoc}
`;
export type PostLivestockMoveMutationFn = Apollo.MutationFunction<
  PostLivestockMoveMutation,
  PostLivestockMoveMutationVariables
>;

/**
 * __usePostLivestockMoveMutation__
 *
 * To run a mutation, you first call `usePostLivestockMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLivestockMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLivestockMoveMutation, { data, loading, error }] = usePostLivestockMoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostLivestockMoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostLivestockMoveMutation,
    PostLivestockMoveMutationVariables
  >
) {
  return Apollo.useMutation<
    PostLivestockMoveMutation,
    PostLivestockMoveMutationVariables
  >(PostLivestockMoveDocument, baseOptions);
}
export type PostLivestockMoveMutationHookResult = ReturnType<
  typeof usePostLivestockMoveMutation
>;
export type PostLivestockMoveMutationResult = Apollo.MutationResult<
  PostLivestockMoveMutation
>;
export type PostLivestockMoveMutationOptions = Apollo.BaseMutationOptions<
  PostLivestockMoveMutation,
  PostLivestockMoveMutationVariables
>;
export const LivestockPurchaseDocument = gql`
  query LivestockPurchase($job: String!) {
    livestockPurchaseEventTypes {
      code
      description
    }
    livestockPurchase(job: $job) {
      ...LivestockPurchaseFragment
    }
  }
  ${LivestockPurchaseFragmentFragmentDoc}
`;

/**
 * __useLivestockPurchaseQuery__
 *
 * To run a query within a React component, call `useLivestockPurchaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockPurchaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockPurchaseQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockPurchaseQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockPurchaseQuery,
    LivestockPurchaseQueryVariables
  >
) {
  return Apollo.useQuery<
    LivestockPurchaseQuery,
    LivestockPurchaseQueryVariables
  >(LivestockPurchaseDocument, baseOptions);
}
export function useLivestockPurchaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockPurchaseQuery,
    LivestockPurchaseQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    LivestockPurchaseQuery,
    LivestockPurchaseQueryVariables
  >(LivestockPurchaseDocument, baseOptions);
}
export type LivestockPurchaseQueryHookResult = ReturnType<
  typeof useLivestockPurchaseQuery
>;
export type LivestockPurchaseLazyQueryHookResult = ReturnType<
  typeof useLivestockPurchaseLazyQuery
>;
export type LivestockPurchaseQueryResult = Apollo.QueryResult<
  LivestockPurchaseQuery,
  LivestockPurchaseQueryVariables
>;
export const SaveLivestockPurchaseDocument = gql`
  mutation SaveLivestockPurchase($input: SaveLivestockPurchaseInput!) {
    saveLivestockPurchase(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockPurchase {
        ...LivestockPurchaseFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockPurchaseFragmentFragmentDoc}
`;
export type SaveLivestockPurchaseMutationFn = Apollo.MutationFunction<
  SaveLivestockPurchaseMutation,
  SaveLivestockPurchaseMutationVariables
>;

/**
 * __useSaveLivestockPurchaseMutation__
 *
 * To run a mutation, you first call `useSaveLivestockPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLivestockPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLivestockPurchaseMutation, { data, loading, error }] = useSaveLivestockPurchaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLivestockPurchaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveLivestockPurchaseMutation,
    SaveLivestockPurchaseMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveLivestockPurchaseMutation,
    SaveLivestockPurchaseMutationVariables
  >(SaveLivestockPurchaseDocument, baseOptions);
}
export type SaveLivestockPurchaseMutationHookResult = ReturnType<
  typeof useSaveLivestockPurchaseMutation
>;
export type SaveLivestockPurchaseMutationResult = Apollo.MutationResult<
  SaveLivestockPurchaseMutation
>;
export type SaveLivestockPurchaseMutationOptions = Apollo.BaseMutationOptions<
  SaveLivestockPurchaseMutation,
  SaveLivestockPurchaseMutationVariables
>;
export const PostLivestockPurchaseDocument = gql`
  mutation PostLivestockPurchase($input: PostLivestockPurchaseInput!) {
    postLivestockPurchase(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockPurchase {
        ...LivestockPurchaseFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockPurchaseFragmentFragmentDoc}
`;
export type PostLivestockPurchaseMutationFn = Apollo.MutationFunction<
  PostLivestockPurchaseMutation,
  PostLivestockPurchaseMutationVariables
>;

/**
 * __usePostLivestockPurchaseMutation__
 *
 * To run a mutation, you first call `usePostLivestockPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLivestockPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLivestockPurchaseMutation, { data, loading, error }] = usePostLivestockPurchaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostLivestockPurchaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostLivestockPurchaseMutation,
    PostLivestockPurchaseMutationVariables
  >
) {
  return Apollo.useMutation<
    PostLivestockPurchaseMutation,
    PostLivestockPurchaseMutationVariables
  >(PostLivestockPurchaseDocument, baseOptions);
}
export type PostLivestockPurchaseMutationHookResult = ReturnType<
  typeof usePostLivestockPurchaseMutation
>;
export type PostLivestockPurchaseMutationResult = Apollo.MutationResult<
  PostLivestockPurchaseMutation
>;
export type PostLivestockPurchaseMutationOptions = Apollo.BaseMutationOptions<
  PostLivestockPurchaseMutation,
  PostLivestockPurchaseMutationVariables
>;
export const LivestockWeanDocument = gql`
  query LivestockWean($job: String!) {
    livestockWeanEventTypes {
      code
      description
    }
    livestockWean(job: $job) {
      ...LivestockWeanFragment
    }
  }
  ${LivestockWeanFragmentFragmentDoc}
`;

/**
 * __useLivestockWeanQuery__
 *
 * To run a query within a React component, call `useLivestockWeanQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivestockWeanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivestockWeanQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useLivestockWeanQuery(
  baseOptions: Apollo.QueryHookOptions<
    LivestockWeanQuery,
    LivestockWeanQueryVariables
  >
) {
  return Apollo.useQuery<LivestockWeanQuery, LivestockWeanQueryVariables>(
    LivestockWeanDocument,
    baseOptions
  );
}
export function useLivestockWeanLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LivestockWeanQuery,
    LivestockWeanQueryVariables
  >
) {
  return Apollo.useLazyQuery<LivestockWeanQuery, LivestockWeanQueryVariables>(
    LivestockWeanDocument,
    baseOptions
  );
}
export type LivestockWeanQueryHookResult = ReturnType<
  typeof useLivestockWeanQuery
>;
export type LivestockWeanLazyQueryHookResult = ReturnType<
  typeof useLivestockWeanLazyQuery
>;
export type LivestockWeanQueryResult = Apollo.QueryResult<
  LivestockWeanQuery,
  LivestockWeanQueryVariables
>;
export const SaveLivestockWeanDocument = gql`
  mutation SaveLivestockWean($input: SaveLivestockWeanInput!) {
    saveLivestockWean(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockWean {
        ...LivestockWeanFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockWeanFragmentFragmentDoc}
`;
export type SaveLivestockWeanMutationFn = Apollo.MutationFunction<
  SaveLivestockWeanMutation,
  SaveLivestockWeanMutationVariables
>;

/**
 * __useSaveLivestockWeanMutation__
 *
 * To run a mutation, you first call `useSaveLivestockWeanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLivestockWeanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLivestockWeanMutation, { data, loading, error }] = useSaveLivestockWeanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLivestockWeanMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveLivestockWeanMutation,
    SaveLivestockWeanMutationVariables
  >
) {
  return Apollo.useMutation<
    SaveLivestockWeanMutation,
    SaveLivestockWeanMutationVariables
  >(SaveLivestockWeanDocument, baseOptions);
}
export type SaveLivestockWeanMutationHookResult = ReturnType<
  typeof useSaveLivestockWeanMutation
>;
export type SaveLivestockWeanMutationResult = Apollo.MutationResult<
  SaveLivestockWeanMutation
>;
export type SaveLivestockWeanMutationOptions = Apollo.BaseMutationOptions<
  SaveLivestockWeanMutation,
  SaveLivestockWeanMutationVariables
>;
export const PostLivestockWeanDocument = gql`
  mutation PostLivestockWean($input: PostLivestockWeanInput!) {
    postLivestockWean(input: $input) {
      defaults {
        ...LivestockActivityDefaultsFragment
      }
      livestockWean {
        ...LivestockWeanFragment
      }
    }
  }
  ${LivestockActivityDefaultsFragmentFragmentDoc}
  ${LivestockWeanFragmentFragmentDoc}
`;
export type PostLivestockWeanMutationFn = Apollo.MutationFunction<
  PostLivestockWeanMutation,
  PostLivestockWeanMutationVariables
>;

/**
 * __usePostLivestockWeanMutation__
 *
 * To run a mutation, you first call `usePostLivestockWeanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLivestockWeanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLivestockWeanMutation, { data, loading, error }] = usePostLivestockWeanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostLivestockWeanMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostLivestockWeanMutation,
    PostLivestockWeanMutationVariables
  >
) {
  return Apollo.useMutation<
    PostLivestockWeanMutation,
    PostLivestockWeanMutationVariables
  >(PostLivestockWeanDocument, baseOptions);
}
export type PostLivestockWeanMutationHookResult = ReturnType<
  typeof usePostLivestockWeanMutation
>;
export type PostLivestockWeanMutationResult = Apollo.MutationResult<
  PostLivestockWeanMutation
>;
export type PostLivestockWeanMutationOptions = Apollo.BaseMutationOptions<
  PostLivestockWeanMutation,
  PostLivestockWeanMutationVariables
>;
