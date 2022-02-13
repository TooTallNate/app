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
  type?: Maybe<Scalars["String"]>;
  cost?: Maybe<Scalars["Float"]>;
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

export type JobJournalTemplate = {
  __typename?: "JobJournalTemplate";
  name: Scalars["String"];
  description: Scalars["String"];
  sourceCode: Scalars["String"];
  reasonCode: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  animals: Array<Item>;
  dimensionPackers: Array<DimensionPacker>;
  fuelAsset?: Maybe<FuelAsset>;
  fuelAssets: Array<FuelAsset>;
  fuelHistoryAsset: Array<FuelHistoryAsset>;
  item?: Maybe<Item>;
  itemJournalTemplates?: Maybe<Array<ItemJournalTemplate>>;
  items: Array<Item>;
  job?: Maybe<Job>;
  jobJournalTemplate?: Maybe<JobJournalTemplate>;
  jobJournalTemplates?: Maybe<Array<JobJournalTemplate>>;
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
  livestockShipment: LivestockShipment;
  livestockShipmentEventTypes: Array<LivestockShipmentEvent>;
  livestockWean: LivestockWean;
  livestockWeanEventTypes: Array<LivestockWeanEvent>;
  locations: Array<Location>;
  maintenanceAsset?: Maybe<MaintenanceAsset>;
  maintenanceAssets: Array<MaintenanceAsset>;
  maintenanceAssetsByNo: Array<MaintenanceAsset>;
  maintenanceHistoryAsset: Array<MaintenanceHistoryAsset>;
  menuOptions: Array<MenuOption>;
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

export type QueryJobJournalTemplateArgs = {
  name: Scalars["String"];
};

export type QueryJobsArgs = {
  input?: Maybe<JobFilter>;
};

export type QueryLivestockActivityJobsArgs = {
  isShipment?: Maybe<Scalars["Boolean"]>;
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

export type QueryLivestockShipmentArgs = {
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
  quantity: Scalars["Float"];
  description: Scalars["String"];
  meta: Scalars["Float"];
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
  postInventory: InventoryResult;
  postLivestockAdjustment: LivestockAdjustmentResult;
  postLivestockGradeOff: LivestockGradeOffResult;
  postLivestockMortality: LivestockMortalityResult;
  postLivestockMove: LivestockMoveResult;
  postLivestockPurchase: LivestockPurchaseResult;
  postLivestockShipment: LivestockShipmentResult;
  postLivestockWean: LivestockWeanResult;
  postMaintenance: MaintenanceResult;
  postScorecard: ScorecardResult;
  saveLivestockAdjustment: LivestockAdjustmentResult;
  saveLivestockGradeOff: LivestockGradeOffResult;
  saveLivestockMortality: LivestockMortalityResult;
  saveLivestockMove: LivestockMoveResult;
  saveLivestockPurchase: LivestockPurchaseResult;
  saveLivestockShipment: LivestockShipmentResult;
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

export type MutationPostInventoryArgs = {
  input: PostInventoryInput;
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

export type MutationPostLivestockShipmentArgs = {
  input: PostLivestockShipmentInput;
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

export type MutationSaveLivestockShipmentArgs = {
  input: SaveLivestockShipmentInput;
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

export type Inventory = {
  __typename?: "Inventory";
  location: Scalars["String"];
  group: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  item?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type ItemList = {
  __typename?: "ItemList";
  item: Item;
  quantity: Scalars["Float"];
};

export type ItemInput = {
  number: Scalars["String"];
  description: Scalars["String"];
  type: Scalars["String"];
  cost: Scalars["Float"];
};

export type ItemListInput = {
  item: ItemInput;
  quantity: Scalars["Float"];
};

export type PostInventoryInput = {
  location: Scalars["String"];
  group: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  itemList?: Maybe<Array<ItemListInput>>;
  comments?: Maybe<Scalars["String"]>;
};

export type InventoryResult = {
  __typename?: "InventoryResult";
  success: Scalars["Boolean"];
  defaults: LivestockActivityDefaults;
};

export type LivestockActivityDefaults = {
  __typename?: "LivestockActivityDefaults";
  job?: Maybe<Job>;
  location?: Maybe<Location>;
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

export type LivestockShipmentEvent = {
  __typename?: "LivestockShipmentEvent";
  code: Scalars["String"];
  description: Scalars["String"];
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

export type LivestockShipment = {
  __typename?: "LivestockShipment";
  event?: Maybe<LivestockShipmentEvent>;
  dimensionPacker?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  deadsOnArrivalQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostLivestockShipmentInput = {
  event: Scalars["String"];
  dimensionPacker: Scalars["String"];
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity: Scalars["Int"];
  deadsOnArrivalQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SaveLivestockShipmentInput = {
  event?: Maybe<Scalars["String"]>;
  dimensionPacker?: Maybe<Scalars["String"]>;
  postingDate?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  deadsOnArrivalQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type LivestockShipmentResult = {
  __typename?: "LivestockShipmentResult";
  success: Scalars["Boolean"];
  livestockShipment: LivestockShipment;
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

export type DimensionPacker = {
  __typename?: "DimensionPacker";
  code: Scalars["String"];
  dimensionCode: Scalars["String"];
  dimensionName: Scalars["String"];
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
  quantity: Scalars["Float"];
  description: Scalars["String"];
  meta: Scalars["Float"];
  codeDescription: Scalars["String"];
  payToName: Scalars["String"];
  documentNo: Scalars["String"];
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

export type ScorecardLivestockJobQueryVariables = {
  job: Scalars["String"];
};

export type ScorecardLivestockJobQuery = { __typename?: "Query" } & {
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

export type ScorecardLivestockJobsQueryVariables = {
  location: Scalars["String"];
};

export type ScorecardLivestockJobsQuery = { __typename?: "Query" } & {
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
export const ScorecardLivestockJobDocument = gql`
  query ScorecardLivestockJob($job: String!) {
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
 * __useScorecardLivestockJobQuery__
 *
 * To run a query within a React component, call `useScorecardLivestockJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardLivestockJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardLivestockJobQuery({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useScorecardLivestockJobQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScorecardLivestockJobQuery,
    ScorecardLivestockJobQueryVariables
  >
) {
  return Apollo.useQuery<
    ScorecardLivestockJobQuery,
    ScorecardLivestockJobQueryVariables
  >(ScorecardLivestockJobDocument, baseOptions);
}
export function useScorecardLivestockJobLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardLivestockJobQuery,
    ScorecardLivestockJobQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardLivestockJobQuery,
    ScorecardLivestockJobQueryVariables
  >(ScorecardLivestockJobDocument, baseOptions);
}
export type ScorecardLivestockJobQueryHookResult = ReturnType<
  typeof useScorecardLivestockJobQuery
>;
export type ScorecardLivestockJobLazyQueryHookResult = ReturnType<
  typeof useScorecardLivestockJobLazyQuery
>;
export type ScorecardLivestockJobQueryResult = Apollo.QueryResult<
  ScorecardLivestockJobQuery,
  ScorecardLivestockJobQueryVariables
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
export const ScorecardLivestockJobsDocument = gql`
  query ScorecardLivestockJobs($location: String!) {
    jobs(input: { groups: ["MKT PIGS"], locations: [$location] }) {
      number
      description
    }
  }
`;

/**
 * __useScorecardLivestockJobsQuery__
 *
 * To run a query within a React component, call `useScorecardLivestockJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScorecardLivestockJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScorecardLivestockJobsQuery({
 *   variables: {
 *      location: // value for 'location'
 *   },
 * });
 */
export function useScorecardLivestockJobsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScorecardLivestockJobsQuery,
    ScorecardLivestockJobsQueryVariables
  >
) {
  return Apollo.useQuery<
    ScorecardLivestockJobsQuery,
    ScorecardLivestockJobsQueryVariables
  >(ScorecardLivestockJobsDocument, baseOptions);
}
export function useScorecardLivestockJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScorecardLivestockJobsQuery,
    ScorecardLivestockJobsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ScorecardLivestockJobsQuery,
    ScorecardLivestockJobsQueryVariables
  >(ScorecardLivestockJobsDocument, baseOptions);
}
export type ScorecardLivestockJobsQueryHookResult = ReturnType<
  typeof useScorecardLivestockJobsQuery
>;
export type ScorecardLivestockJobsLazyQueryHookResult = ReturnType<
  typeof useScorecardLivestockJobsLazyQuery
>;
export type ScorecardLivestockJobsQueryResult = Apollo.QueryResult<
  ScorecardLivestockJobsQuery,
  ScorecardLivestockJobsQueryVariables
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
