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
  unit?: Maybe<Scalars["String"]>;
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

export type JobPostingGroup = {
  __typename?: "JobPostingGroup";
  code: Scalars["String"];
  description: Scalars["String"];
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
  jobPostingGroups: Array<JobPostingGroup>;
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
  autoPostFuelMaintenance: FuelResult;
  autoPostItemJournal?: Maybe<AutoPostResult>;
  autoPostScorecards: AutoPostResult;
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
  updateUserPostingGroups: UpdateUserPostingGroupsResult;
};

export type MutationAutoPostItemJournalArgs = {
  input: AutoPostInput;
};

export type MutationAutoPostScorecardsArgs = {
  input?: Maybe<ScorecardAutoPostInput>;
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

export type MutationUpdateUserPostingGroupsArgs = {
  input: UpdateUserPostingGroupsInput;
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
  unit?: Maybe<Scalars["String"]>;
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

export type AutoPostInput = {
  itemJournalTemplate: Scalars["String"];
};

export type AutoPostResult = {
  __typename?: "AutoPostResult";
  success: Scalars["Boolean"];
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

export type ScorecardAutoPostInput = {
  job: Scalars["String"];
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

export type UserPostingGroups = {
  __typename?: "UserPostingGroups";
  mode: InclusivityMode;
  list: Array<JobPostingGroup>;
};

export type User = {
  __typename?: "User";
  username: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
  locations: UserLocations;
  menuOptions: UserMenuOptions;
  postingGroups: UserPostingGroups;
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

export type UpdateUserPostingGroupsInput = {
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

export type UpdateUserPostingGroupsResult = {
  __typename?: "UpdateUserPostingGroupsResult";
  success: Scalars["Boolean"];
  postingGroups: UserPostingGroups;
};

export type HomeViewQueryVariables = {};

export type HomeViewQuery = { __typename?: "Query" } & {
  user?: Maybe<
    { __typename?: "User" } & Pick<User, "username"> & {
        menuOptions: { __typename?: "UserMenuOptions" } & Pick<
          UserMenuOptions,
          "mode"
        > & {
            list: Array<
              { __typename?: "MenuOption" } & Pick<MenuOption, "name" | "route">
            >;
          };
      }
  >;
  menuOptions: Array<
    { __typename?: "MenuOption" } & Pick<MenuOption, "name" | "route">
  >;
};

export const HomeViewDocument = gql`
  query HomeView {
    user {
      username
      menuOptions {
        mode
        list {
          name
          route
        }
      }
    }
    menuOptions {
      name
      route
    }
  }
`;

/**
 * __useHomeViewQuery__
 *
 * To run a query within a React component, call `useHomeViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeViewQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeViewQuery(
  baseOptions?: Apollo.QueryHookOptions<HomeViewQuery, HomeViewQueryVariables>
) {
  return Apollo.useQuery<HomeViewQuery, HomeViewQueryVariables>(
    HomeViewDocument,
    baseOptions
  );
}
export function useHomeViewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeViewQuery,
    HomeViewQueryVariables
  >
) {
  return Apollo.useLazyQuery<HomeViewQuery, HomeViewQueryVariables>(
    HomeViewDocument,
    baseOptions
  );
}
export type HomeViewQueryHookResult = ReturnType<typeof useHomeViewQuery>;
export type HomeViewLazyQueryHookResult = ReturnType<
  typeof useHomeViewLazyQuery
>;
export type HomeViewQueryResult = Apollo.QueryResult<
  HomeViewQuery,
  HomeViewQueryVariables
>;
