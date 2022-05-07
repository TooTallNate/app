import { GraphQLResolveInfo } from "graphql";
import {
  NavUser,
  NavJob,
  NavItem,
  NavItemConsumption,
  ItemJournalTemplateObject,
  JobJournalTemplateObject,
  NavResource,
  NavReason,
  NavLocation,
  NavJobPostingGroup,
  NavMenuOption,
  NavStandardItemJournal,
  NavFuelAsset,
  NavFuelHistoryAsset,
  NavMaintenanceAsset,
  NavMaintenanceHistoryAsset,
  NavDimensionPacker
} from "./nav";
import { LivestockAdjustmentDocument } from "../livestock-activity/models/LivestockAdjustment";
import { LivestockGradeOffDocument } from "../livestock-activity/models/LivestockGradeOff";
import { LivestockMortalityDocument } from "../livestock-activity/models/LivestockMortality";
import { LivestockMoveDocument } from "../livestock-activity/models/LivestockMove";
import { LivestockPurchaseDocument } from "../livestock-activity/models/LivestockPurchase";
import { LivestockWeanDocument } from "../livestock-activity/models/LivestockWean";
import { LivestockShipmentDocument } from "../livestock-activity/models/LivestockShipment";
import { UserSettingsDocument } from "./models/UserSettings";
import { ScorecardDocument } from "../scorecard/Scorecard";
import { GraphqlContext } from "../context";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
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
  items: Array<ItemConsumption>;
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

export type QueryItemsArgs = {
  location: Scalars["String"];
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

export type ItemConsumption = {
  __typename?: "ItemConsumption";
  number: Scalars["String"];
  location?: Maybe<Scalars["String"]>;
  balance: Scalars["Float"];
  description?: Maybe<Scalars["String"]>;
  cost: Scalars["Float"];
  unit?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  InclusivityMode: InclusivityMode;
  Job: ResolverTypeWrapper<NavJob>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Item: ResolverTypeWrapper<NavItem>;
  Reason: ResolverTypeWrapper<NavReason>;
  Resource: ResolverTypeWrapper<NavResource>;
  Location: ResolverTypeWrapper<NavLocation>;
  JobFilter: JobFilter;
  ResourceFilter: ResourceFilter;
  JobJournalTemplate: ResolverTypeWrapper<JobJournalTemplateObject>;
  JobPostingGroup: ResolverTypeWrapper<NavJobPostingGroup>;
  Query: ResolverTypeWrapper<{}>;
  FuelAsset: ResolverTypeWrapper<NavFuelAsset>;
  FuelHistoryAsset: ResolverTypeWrapper<NavFuelHistoryAsset>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  PostFuelInput: PostFuelInput;
  FuelResult: ResolverTypeWrapper<FuelResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Inventory: ResolverTypeWrapper<Inventory>;
  ItemConsumption: ResolverTypeWrapper<NavItemConsumption>;
  ItemList: ResolverTypeWrapper<
    Omit<ItemList, "item"> & { item: ResolversTypes["Item"] }
  >;
  ItemInput: ItemInput;
  ItemListInput: ItemListInput;
  PostInventoryInput: PostInventoryInput;
  InventoryResult: ResolverTypeWrapper<
    Omit<InventoryResult, "defaults"> & {
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockActivityDefaults: ResolverTypeWrapper<UserSettingsDocument>;
  LivestockWeanEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  LivestockGradeOffEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  LivestockMoveEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  LivestockPurchaseEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  LivestockAdjustmentEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  LivestockMortalityEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  LivestockShipmentEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PriceEntry: ResolverTypeWrapper<PriceEntry>;
  LivestockQuantity: ResolverTypeWrapper<LivestockQuantity>;
  LivestockQuantityInput: LivestockQuantityInput;
  LivestockOptionalQuantityInput: LivestockOptionalQuantityInput;
  LivestockAdjustment: ResolverTypeWrapper<LivestockAdjustmentDocument>;
  PostLivestockAdjustmentInput: PostLivestockAdjustmentInput;
  SaveLivestockAdjustmentInput: SaveLivestockAdjustmentInput;
  LivestockAdjustmentResult: ResolverTypeWrapper<
    Omit<LivestockAdjustmentResult, "livestockAdjustment" | "defaults"> & {
      livestockAdjustment: ResolversTypes["LivestockAdjustment"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockGradeOff: ResolverTypeWrapper<LivestockGradeOffDocument>;
  PostLivestockGradeOffInput: PostLivestockGradeOffInput;
  SaveLivestockGradeOffInput: SaveLivestockGradeOffInput;
  LivestockGradeOffResult: ResolverTypeWrapper<
    Omit<LivestockGradeOffResult, "livestockGradeOff" | "defaults"> & {
      livestockGradeOff: ResolversTypes["LivestockGradeOff"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockMortality: ResolverTypeWrapper<LivestockMortalityDocument>;
  PostLivestockMortalityInput: PostLivestockMortalityInput;
  SaveLivestockMortalityInput: SaveLivestockMortalityInput;
  LivestockMortalityResult: ResolverTypeWrapper<
    Omit<LivestockMortalityResult, "livestockMortality" | "defaults"> & {
      livestockMortality: ResolversTypes["LivestockMortality"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockMove: ResolverTypeWrapper<LivestockMoveDocument>;
  PostLivestockMoveInput: PostLivestockMoveInput;
  SaveLivestockMoveInput: SaveLivestockMoveInput;
  LivestockMoveResult: ResolverTypeWrapper<
    Omit<LivestockMoveResult, "livestockMove" | "defaults"> & {
      livestockMove: ResolversTypes["LivestockMove"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockPurchase: ResolverTypeWrapper<LivestockPurchaseDocument>;
  PostLivestockPurchaseInput: PostLivestockPurchaseInput;
  SaveLivestockPurchaseInput: SaveLivestockPurchaseInput;
  LivestockPurchaseResult: ResolverTypeWrapper<
    Omit<LivestockPurchaseResult, "livestockPurchase" | "defaults"> & {
      livestockPurchase: ResolversTypes["LivestockPurchase"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockWean: ResolverTypeWrapper<LivestockWeanDocument>;
  PostLivestockWeanInput: PostLivestockWeanInput;
  SaveLivestockWeanInput: SaveLivestockWeanInput;
  LivestockWeanResult: ResolverTypeWrapper<
    Omit<LivestockWeanResult, "livestockWean" | "defaults"> & {
      livestockWean: ResolversTypes["LivestockWean"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  LivestockShipment: ResolverTypeWrapper<LivestockShipmentDocument>;
  PostLivestockShipmentInput: PostLivestockShipmentInput;
  SaveLivestockShipmentInput: SaveLivestockShipmentInput;
  LivestockShipmentResult: ResolverTypeWrapper<
    Omit<LivestockShipmentResult, "livestockShipment" | "defaults"> & {
      livestockShipment: ResolversTypes["LivestockShipment"];
      defaults: ResolversTypes["LivestockActivityDefaults"];
    }
  >;
  ItemJournalTemplate: ResolverTypeWrapper<ItemJournalTemplateObject>;
  DimensionPacker: ResolverTypeWrapper<NavDimensionPacker>;
  AutoPostInput: AutoPostInput;
  AutoPostResult: ResolverTypeWrapper<AutoPostResult>;
  MaintenanceAsset: ResolverTypeWrapper<NavMaintenanceAsset>;
  MaintenanceHistoryAsset: ResolverTypeWrapper<NavMaintenanceHistoryAsset>;
  PostMaintenanceInput: PostMaintenanceInput;
  MaintenanceResult: ResolverTypeWrapper<MaintenanceResult>;
  ScorecardGroup: ResolverTypeWrapper<NavJobPostingGroup>;
  ScorecardElement: ResolverTypeWrapper<ScorecardElement>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  ScorecardPage: ResolverTypeWrapper<ScorecardPage>;
  ScorecardConfig: ResolverTypeWrapper<NavJob>;
  ScorecardElementResponseInput: ScorecardElementResponseInput;
  PostScorecardInput: PostScorecardInput;
  ScorecardResult: ResolverTypeWrapper<
    Omit<ScorecardResult, "scorecard"> & {
      scorecard?: Maybe<ResolversTypes["Scorecard"]>;
    }
  >;
  ScorecardElementResponse: ResolverTypeWrapper<ScorecardElementResponse>;
  Scorecard: ResolverTypeWrapper<ScorecardDocument>;
  ScorecardAutoPostInput: ScorecardAutoPostInput;
  UserLocations: ResolverTypeWrapper<
    Omit<UserLocations, "list"> & { list: Array<ResolversTypes["Location"]> }
  >;
  MenuOption: ResolverTypeWrapper<NavMenuOption>;
  UserMenuOptions: ResolverTypeWrapper<
    Omit<UserMenuOptions, "list"> & {
      list: Array<ResolversTypes["MenuOption"]>;
    }
  >;
  UserPostingGroups: ResolverTypeWrapper<
    Omit<UserPostingGroups, "list"> & {
      list: Array<ResolversTypes["JobPostingGroup"]>;
    }
  >;
  User: ResolverTypeWrapper<NavUser>;
  LoginInput: LoginInput;
  LoginResult: ResolverTypeWrapper<
    Omit<LoginResult, "user"> & { user: ResolversTypes["User"] }
  >;
  LogoutResult: ResolverTypeWrapper<LogoutResult>;
  UpdateUserLocationsInput: UpdateUserLocationsInput;
  UpdateUserMenuOptionsInput: UpdateUserMenuOptionsInput;
  UpdateUserPostingGroupsInput: UpdateUserPostingGroupsInput;
  UpdateUserLocationsResult: ResolverTypeWrapper<
    Omit<UpdateUserLocationsResult, "locations"> & {
      locations: ResolversTypes["UserLocations"];
    }
  >;
  UpdateUserMenuOptionsResult: ResolverTypeWrapper<
    Omit<UpdateUserMenuOptionsResult, "menuOptions"> & {
      menuOptions: ResolversTypes["UserMenuOptions"];
    }
  >;
  UpdateUserPostingGroupsResult: ResolverTypeWrapper<
    Omit<UpdateUserPostingGroupsResult, "postingGroups"> & {
      postingGroups: ResolversTypes["UserPostingGroups"];
    }
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  InclusivityMode: InclusivityMode;
  Job: NavJob;
  Float: Scalars["Float"];
  Item: NavItem;
  Reason: NavReason;
  Resource: NavResource;
  Location: NavLocation;
  JobFilter: JobFilter;
  ResourceFilter: ResourceFilter;
  JobJournalTemplate: JobJournalTemplateObject;
  JobPostingGroup: NavJobPostingGroup;
  Query: {};
  FuelAsset: NavFuelAsset;
  FuelHistoryAsset: NavFuelHistoryAsset;
  Int: Scalars["Int"];
  PostFuelInput: PostFuelInput;
  FuelResult: FuelResult;
  Mutation: {};
  Inventory: Inventory;
  ItemConsumption: NavItemConsumption;
  ItemList: Omit<ItemList, "item"> & { item: ResolversParentTypes["Item"] };
  ItemInput: ItemInput;
  ItemListInput: ItemListInput;
  PostInventoryInput: PostInventoryInput;
  InventoryResult: Omit<InventoryResult, "defaults"> & {
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockActivityDefaults: UserSettingsDocument;
  LivestockWeanEvent: NavStandardItemJournal;
  LivestockGradeOffEvent: NavStandardItemJournal;
  LivestockMoveEvent: NavStandardItemJournal;
  LivestockPurchaseEvent: NavStandardItemJournal;
  LivestockAdjustmentEvent: NavStandardItemJournal;
  LivestockMortalityEvent: NavStandardItemJournal;
  LivestockShipmentEvent: NavStandardItemJournal;
  PriceEntry: PriceEntry;
  LivestockQuantity: LivestockQuantity;
  LivestockQuantityInput: LivestockQuantityInput;
  LivestockOptionalQuantityInput: LivestockOptionalQuantityInput;
  LivestockAdjustment: LivestockAdjustmentDocument;
  PostLivestockAdjustmentInput: PostLivestockAdjustmentInput;
  SaveLivestockAdjustmentInput: SaveLivestockAdjustmentInput;
  LivestockAdjustmentResult: Omit<
    LivestockAdjustmentResult,
    "livestockAdjustment" | "defaults"
  > & {
    livestockAdjustment: ResolversParentTypes["LivestockAdjustment"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockGradeOff: LivestockGradeOffDocument;
  PostLivestockGradeOffInput: PostLivestockGradeOffInput;
  SaveLivestockGradeOffInput: SaveLivestockGradeOffInput;
  LivestockGradeOffResult: Omit<
    LivestockGradeOffResult,
    "livestockGradeOff" | "defaults"
  > & {
    livestockGradeOff: ResolversParentTypes["LivestockGradeOff"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockMortality: LivestockMortalityDocument;
  PostLivestockMortalityInput: PostLivestockMortalityInput;
  SaveLivestockMortalityInput: SaveLivestockMortalityInput;
  LivestockMortalityResult: Omit<
    LivestockMortalityResult,
    "livestockMortality" | "defaults"
  > & {
    livestockMortality: ResolversParentTypes["LivestockMortality"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockMove: LivestockMoveDocument;
  PostLivestockMoveInput: PostLivestockMoveInput;
  SaveLivestockMoveInput: SaveLivestockMoveInput;
  LivestockMoveResult: Omit<
    LivestockMoveResult,
    "livestockMove" | "defaults"
  > & {
    livestockMove: ResolversParentTypes["LivestockMove"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockPurchase: LivestockPurchaseDocument;
  PostLivestockPurchaseInput: PostLivestockPurchaseInput;
  SaveLivestockPurchaseInput: SaveLivestockPurchaseInput;
  LivestockPurchaseResult: Omit<
    LivestockPurchaseResult,
    "livestockPurchase" | "defaults"
  > & {
    livestockPurchase: ResolversParentTypes["LivestockPurchase"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockWean: LivestockWeanDocument;
  PostLivestockWeanInput: PostLivestockWeanInput;
  SaveLivestockWeanInput: SaveLivestockWeanInput;
  LivestockWeanResult: Omit<
    LivestockWeanResult,
    "livestockWean" | "defaults"
  > & {
    livestockWean: ResolversParentTypes["LivestockWean"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  LivestockShipment: LivestockShipmentDocument;
  PostLivestockShipmentInput: PostLivestockShipmentInput;
  SaveLivestockShipmentInput: SaveLivestockShipmentInput;
  LivestockShipmentResult: Omit<
    LivestockShipmentResult,
    "livestockShipment" | "defaults"
  > & {
    livestockShipment: ResolversParentTypes["LivestockShipment"];
    defaults: ResolversParentTypes["LivestockActivityDefaults"];
  };
  ItemJournalTemplate: ItemJournalTemplateObject;
  DimensionPacker: NavDimensionPacker;
  AutoPostInput: AutoPostInput;
  AutoPostResult: AutoPostResult;
  MaintenanceAsset: NavMaintenanceAsset;
  MaintenanceHistoryAsset: NavMaintenanceHistoryAsset;
  PostMaintenanceInput: PostMaintenanceInput;
  MaintenanceResult: MaintenanceResult;
  ScorecardGroup: NavJobPostingGroup;
  ScorecardElement: ScorecardElement;
  ID: Scalars["ID"];
  ScorecardPage: ScorecardPage;
  ScorecardConfig: NavJob;
  ScorecardElementResponseInput: ScorecardElementResponseInput;
  PostScorecardInput: PostScorecardInput;
  ScorecardResult: Omit<ScorecardResult, "scorecard"> & {
    scorecard?: Maybe<ResolversParentTypes["Scorecard"]>;
  };
  ScorecardElementResponse: ScorecardElementResponse;
  Scorecard: ScorecardDocument;
  ScorecardAutoPostInput: ScorecardAutoPostInput;
  UserLocations: Omit<UserLocations, "list"> & {
    list: Array<ResolversParentTypes["Location"]>;
  };
  MenuOption: NavMenuOption;
  UserMenuOptions: Omit<UserMenuOptions, "list"> & {
    list: Array<ResolversParentTypes["MenuOption"]>;
  };
  UserPostingGroups: Omit<UserPostingGroups, "list"> & {
    list: Array<ResolversParentTypes["JobPostingGroup"]>;
  };
  User: NavUser;
  LoginInput: LoginInput;
  LoginResult: Omit<LoginResult, "user"> & {
    user: ResolversParentTypes["User"];
  };
  LogoutResult: LogoutResult;
  UpdateUserLocationsInput: UpdateUserLocationsInput;
  UpdateUserMenuOptionsInput: UpdateUserMenuOptionsInput;
  UpdateUserPostingGroupsInput: UpdateUserPostingGroupsInput;
  UpdateUserLocationsResult: Omit<UpdateUserLocationsResult, "locations"> & {
    locations: ResolversParentTypes["UserLocations"];
  };
  UpdateUserMenuOptionsResult: Omit<
    UpdateUserMenuOptionsResult,
    "menuOptions"
  > & { menuOptions: ResolversParentTypes["UserMenuOptions"] };
  UpdateUserPostingGroupsResult: Omit<
    UpdateUserPostingGroupsResult,
    "postingGroups"
  > & { postingGroups: ResolversParentTypes["UserPostingGroups"] };
}>;

export type JobResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Job"] = ResolversParentTypes["Job"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  personResponsible?: Resolver<
    ResolversTypes["Resource"],
    ParentType,
    ContextType
  >;
  inventory?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  deadQuantity?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  startDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  groupStartDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  projectManager?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ItemResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Item"] = ResolversParentTypes["Item"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  cost?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ReasonResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Reason"] = ResolversParentTypes["Reason"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ResourceResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Resource"] = ResolversParentTypes["Resource"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  unitPrice?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LocationResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Location"] = ResolversParentTypes["Location"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type JobJournalTemplateResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["JobJournalTemplate"] = ResolversParentTypes["JobJournalTemplate"]
> = ResolversObject<{
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sourceCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasonCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type JobPostingGroupResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["JobPostingGroup"] = ResolversParentTypes["JobPostingGroup"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  animals?: Resolver<Array<ResolversTypes["Item"]>, ParentType, ContextType>;
  dimensionPackers?: Resolver<
    Array<ResolversTypes["DimensionPacker"]>,
    ParentType,
    ContextType
  >;
  fuelAsset?: Resolver<
    Maybe<ResolversTypes["FuelAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFuelAssetArgs, "number">
  >;
  fuelAssets?: Resolver<
    Array<ResolversTypes["FuelAsset"]>,
    ParentType,
    ContextType
  >;
  fuelHistoryAsset?: Resolver<
    Array<ResolversTypes["FuelHistoryAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFuelHistoryAssetArgs, "number">
  >;
  item?: Resolver<
    Maybe<ResolversTypes["Item"]>,
    ParentType,
    ContextType,
    RequireFields<QueryItemArgs, "number">
  >;
  itemJournalTemplates?: Resolver<
    Maybe<Array<ResolversTypes["ItemJournalTemplate"]>>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Array<ResolversTypes["ItemConsumption"]>,
    ParentType,
    ContextType,
    RequireFields<QueryItemsArgs, "location">
  >;
  job?: Resolver<
    Maybe<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobArgs, "number">
  >;
  jobJournalTemplate?: Resolver<
    Maybe<ResolversTypes["JobJournalTemplate"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobJournalTemplateArgs, "name">
  >;
  jobJournalTemplates?: Resolver<
    Maybe<Array<ResolversTypes["JobJournalTemplate"]>>,
    ParentType,
    ContextType
  >;
  jobPostingGroups?: Resolver<
    Array<ResolversTypes["JobPostingGroup"]>,
    ParentType,
    ContextType
  >;
  jobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobsArgs, never>
  >;
  livestockActivityDefaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  livestockActivityJobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryLivestockActivityJobsArgs, never>
  >;
  livestockAdjustment?: Resolver<
    ResolversTypes["LivestockAdjustment"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockAdjustmentArgs, "job">
  >;
  livestockAdjustmentEventTypes?: Resolver<
    Array<ResolversTypes["LivestockAdjustmentEvent"]>,
    ParentType,
    ContextType
  >;
  livestockGradeOff?: Resolver<
    ResolversTypes["LivestockGradeOff"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockGradeOffArgs, "job">
  >;
  livestockGradeOffEventTypes?: Resolver<
    Array<ResolversTypes["LivestockGradeOffEvent"]>,
    ParentType,
    ContextType
  >;
  livestockJob?: Resolver<
    Maybe<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryLivestockJobArgs, "number">
  >;
  livestockJobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryLivestockJobsArgs, never>
  >;
  livestockMortality?: Resolver<
    ResolversTypes["LivestockMortality"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockMortalityArgs, "job">
  >;
  livestockMortalityEventTypes?: Resolver<
    Array<ResolversTypes["LivestockMortalityEvent"]>,
    ParentType,
    ContextType
  >;
  livestockMove?: Resolver<
    ResolversTypes["LivestockMove"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockMoveArgs, "job">
  >;
  livestockMoveEventTypes?: Resolver<
    Array<ResolversTypes["LivestockMoveEvent"]>,
    ParentType,
    ContextType
  >;
  livestockPurchase?: Resolver<
    ResolversTypes["LivestockPurchase"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockPurchaseArgs, "job">
  >;
  livestockPurchaseEventTypes?: Resolver<
    Array<ResolversTypes["LivestockPurchaseEvent"]>,
    ParentType,
    ContextType
  >;
  livestockShipment?: Resolver<
    ResolversTypes["LivestockShipment"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockShipmentArgs, "job">
  >;
  livestockShipmentEventTypes?: Resolver<
    Array<ResolversTypes["LivestockShipmentEvent"]>,
    ParentType,
    ContextType
  >;
  livestockWean?: Resolver<
    ResolversTypes["LivestockWean"],
    ParentType,
    ContextType,
    RequireFields<QueryLivestockWeanArgs, "job">
  >;
  livestockWeanEventTypes?: Resolver<
    Array<ResolversTypes["LivestockWeanEvent"]>,
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    Array<ResolversTypes["Location"]>,
    ParentType,
    ContextType
  >;
  maintenanceAsset?: Resolver<
    Maybe<ResolversTypes["MaintenanceAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMaintenanceAssetArgs, "number">
  >;
  maintenanceAssets?: Resolver<
    Array<ResolversTypes["MaintenanceAsset"]>,
    ParentType,
    ContextType
  >;
  maintenanceAssetsByNo?: Resolver<
    Array<ResolversTypes["MaintenanceAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMaintenanceAssetsByNoArgs, "assetNo">
  >;
  maintenanceHistoryAsset?: Resolver<
    Array<ResolversTypes["MaintenanceHistoryAsset"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMaintenanceHistoryAssetArgs, "number">
  >;
  menuOptions?: Resolver<
    Array<ResolversTypes["MenuOption"]>,
    ParentType,
    ContextType
  >;
  resource?: Resolver<
    Maybe<ResolversTypes["Resource"]>,
    ParentType,
    ContextType,
    RequireFields<QueryResourceArgs, "code">
  >;
  resources?: Resolver<
    Array<ResolversTypes["Resource"]>,
    ParentType,
    ContextType,
    RequireFields<QueryResourcesArgs, never>
  >;
  scorecard?: Resolver<
    Maybe<ResolversTypes["Scorecard"]>,
    ParentType,
    ContextType,
    RequireFields<QueryScorecardArgs, "job">
  >;
  scorecardConfig?: Resolver<
    Maybe<ResolversTypes["ScorecardConfig"]>,
    ParentType,
    ContextType,
    RequireFields<QueryScorecardConfigArgs, "job">
  >;
  scorecardGroups?: Resolver<
    Array<ResolversTypes["ScorecardGroup"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
}>;

export type FuelAssetResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["FuelAsset"] = ResolversParentTypes["FuelAsset"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fuelType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fuelCost?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  unitOfMeasureCode?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FuelHistoryAssetResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["FuelHistoryAsset"] = ResolversParentTypes["FuelHistoryAsset"]
> = ResolversObject<{
  entry?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  maintenanceCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasonCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  postingDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  meta?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FuelResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["FuelResult"] = ResolversParentTypes["FuelResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  autoPostFuelMaintenance?: Resolver<
    ResolversTypes["FuelResult"],
    ParentType,
    ContextType
  >;
  autoPostItemJournal?: Resolver<
    Maybe<ResolversTypes["AutoPostResult"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAutoPostItemJournalArgs, "input">
  >;
  autoPostScorecards?: Resolver<
    ResolversTypes["AutoPostResult"],
    ParentType,
    ContextType,
    RequireFields<MutationAutoPostScorecardsArgs, never>
  >;
  login?: Resolver<
    ResolversTypes["LoginResult"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  logout?: Resolver<ResolversTypes["LogoutResult"], ParentType, ContextType>;
  postFuel?: Resolver<
    ResolversTypes["FuelResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostFuelArgs, "input">
  >;
  postInventory?: Resolver<
    ResolversTypes["InventoryResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostInventoryArgs, "input">
  >;
  postLivestockAdjustment?: Resolver<
    ResolversTypes["LivestockAdjustmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockAdjustmentArgs, "input">
  >;
  postLivestockGradeOff?: Resolver<
    ResolversTypes["LivestockGradeOffResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockGradeOffArgs, "input">
  >;
  postLivestockMortality?: Resolver<
    ResolversTypes["LivestockMortalityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockMortalityArgs, "input">
  >;
  postLivestockMove?: Resolver<
    ResolversTypes["LivestockMoveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockMoveArgs, "input">
  >;
  postLivestockPurchase?: Resolver<
    ResolversTypes["LivestockPurchaseResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockPurchaseArgs, "input">
  >;
  postLivestockShipment?: Resolver<
    ResolversTypes["LivestockShipmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockShipmentArgs, "input">
  >;
  postLivestockWean?: Resolver<
    ResolversTypes["LivestockWeanResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostLivestockWeanArgs, "input">
  >;
  postMaintenance?: Resolver<
    ResolversTypes["MaintenanceResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostMaintenanceArgs, "input">
  >;
  postScorecard?: Resolver<
    ResolversTypes["ScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostScorecardArgs, "input">
  >;
  saveLivestockAdjustment?: Resolver<
    ResolversTypes["LivestockAdjustmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockAdjustmentArgs, "input">
  >;
  saveLivestockGradeOff?: Resolver<
    ResolversTypes["LivestockGradeOffResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockGradeOffArgs, "input">
  >;
  saveLivestockMortality?: Resolver<
    ResolversTypes["LivestockMortalityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockMortalityArgs, "input">
  >;
  saveLivestockMove?: Resolver<
    ResolversTypes["LivestockMoveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockMoveArgs, "input">
  >;
  saveLivestockPurchase?: Resolver<
    ResolversTypes["LivestockPurchaseResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockPurchaseArgs, "input">
  >;
  saveLivestockShipment?: Resolver<
    ResolversTypes["LivestockShipmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockShipmentArgs, "input">
  >;
  saveLivestockWean?: Resolver<
    ResolversTypes["LivestockWeanResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveLivestockWeanArgs, "input">
  >;
  saveScorecard?: Resolver<
    ResolversTypes["ScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveScorecardArgs, "input">
  >;
  updateUserLocations?: Resolver<
    ResolversTypes["UpdateUserLocationsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserLocationsArgs, "input">
  >;
  updateUserMenuOptions?: Resolver<
    ResolversTypes["UpdateUserMenuOptionsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserMenuOptionsArgs, "input">
  >;
  updateUserPostingGroups?: Resolver<
    ResolversTypes["UpdateUserPostingGroupsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserPostingGroupsArgs, "input">
  >;
}>;

export type InventoryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Inventory"] = ResolversParentTypes["Inventory"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  group?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ItemConsumptionResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ItemConsumption"] = ResolversParentTypes["ItemConsumption"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  cost?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ItemListResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ItemList"] = ResolversParentTypes["ItemList"]
> = ResolversObject<{
  item?: Resolver<ResolversTypes["Item"], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type InventoryResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["InventoryResult"] = ResolversParentTypes["InventoryResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockActivityDefaultsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockActivityDefaults"] = ResolversParentTypes["LivestockActivityDefaults"]
> = ResolversObject<{
  job?: Resolver<Maybe<ResolversTypes["Job"]>, ParentType, ContextType>;
  location?: Resolver<
    Maybe<ResolversTypes["Location"]>,
    ParentType,
    ContextType
  >;
  prices?: Resolver<
    Array<ResolversTypes["PriceEntry"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockWeanEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockWeanEvent"] = ResolversParentTypes["LivestockWeanEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockGradeOffEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockGradeOffEvent"] = ResolversParentTypes["LivestockGradeOffEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes["Reason"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockMoveEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockMoveEvent"] = ResolversParentTypes["LivestockMoveEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockPurchaseEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockPurchaseEvent"] = ResolversParentTypes["LivestockPurchaseEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockAdjustmentEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockAdjustmentEvent"] = ResolversParentTypes["LivestockAdjustmentEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockMortalityEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockMortalityEvent"] = ResolversParentTypes["LivestockMortalityEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes["Reason"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockShipmentEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockShipmentEvent"] = ResolversParentTypes["LivestockShipmentEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PriceEntryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PriceEntry"] = ResolversParentTypes["PriceEntry"]
> = ResolversObject<{
  animal?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockQuantityResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockQuantity"] = ResolversParentTypes["LivestockQuantity"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockAdjustmentResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockAdjustment"] = ResolversParentTypes["LivestockAdjustment"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockAdjustmentEvent"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  totalWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockAdjustmentResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockAdjustmentResult"] = ResolversParentTypes["LivestockAdjustmentResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockAdjustment?: Resolver<
    ResolversTypes["LivestockAdjustment"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockGradeOffResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockGradeOff"] = ResolversParentTypes["LivestockGradeOff"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockGradeOffEvent"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantities?: Resolver<
    Array<ResolversTypes["LivestockQuantity"]>,
    ParentType,
    ContextType
  >;
  livestockWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockGradeOffResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockGradeOffResult"] = ResolversParentTypes["LivestockGradeOffResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockGradeOff?: Resolver<
    ResolversTypes["LivestockGradeOff"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockMortalityResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockMortality"] = ResolversParentTypes["LivestockMortality"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockMortalityEvent"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantities?: Resolver<
    Maybe<Array<ResolversTypes["LivestockQuantity"]>>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockMortalityResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockMortalityResult"] = ResolversParentTypes["LivestockMortalityResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockMortality?: Resolver<
    ResolversTypes["LivestockMortality"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockMoveResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockMove"] = ResolversParentTypes["LivestockMove"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockMoveEvent"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  fromJob?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  toJob?: Resolver<Maybe<ResolversTypes["Job"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  smallLivestockQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  totalWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockMoveResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockMoveResult"] = ResolversParentTypes["LivestockMoveResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockMove?: Resolver<
    ResolversTypes["LivestockMove"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockPurchaseResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockPurchase"] = ResolversParentTypes["LivestockPurchase"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockPurchaseEvent"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  smallLivestockQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  totalWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockPurchaseResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockPurchaseResult"] = ResolversParentTypes["LivestockPurchaseResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockPurchase?: Resolver<
    ResolversTypes["LivestockPurchase"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockWeanResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockWean"] = ResolversParentTypes["LivestockWean"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockWeanEvent"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  smallLivestockQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  totalWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockWeanResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockWeanResult"] = ResolversParentTypes["LivestockWeanResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockWean?: Resolver<
    ResolversTypes["LivestockWean"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockShipmentResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockShipment"] = ResolversParentTypes["LivestockShipment"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["LivestockShipmentEvent"]>,
    ParentType,
    ContextType
  >;
  dimensionPacker?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  postingDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  deadsOnArrivalQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  totalWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LivestockShipmentResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LivestockShipmentResult"] = ResolversParentTypes["LivestockShipmentResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  livestockShipment?: Resolver<
    ResolversTypes["LivestockShipment"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["LivestockActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ItemJournalTemplateResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ItemJournalTemplate"] = ResolversParentTypes["ItemJournalTemplate"]
> = ResolversObject<{
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sourceCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasonCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DimensionPackerResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["DimensionPacker"] = ResolversParentTypes["DimensionPacker"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dimensionCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dimensionName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type AutoPostResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["AutoPostResult"] = ResolversParentTypes["AutoPostResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MaintenanceAssetResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["MaintenanceAsset"] = ResolversParentTypes["MaintenanceAsset"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  classCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  unitType?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  maintenanceDesc?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MaintenanceHistoryAssetResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["MaintenanceHistoryAsset"] = ResolversParentTypes["MaintenanceHistoryAsset"]
> = ResolversObject<{
  entry?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  maintenanceCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasonCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  postingDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  meta?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  codeDescription?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  payToName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  documentNo?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MaintenanceResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["MaintenanceResult"] = ResolversParentTypes["MaintenanceResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardGroupResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardGroup"] = ResolversParentTypes["ScorecardGroup"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardElementResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardElement"] = ResolversParentTypes["ScorecardElement"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardPageResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardPage"] = ResolversParentTypes["ScorecardPage"]
> = ResolversObject<{
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  elements?: Resolver<
    Array<ResolversTypes["ScorecardElement"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardConfigResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardConfig"] = ResolversParentTypes["ScorecardConfig"]
> = ResolversObject<{
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  pages?: Resolver<
    Array<ResolversTypes["ScorecardPage"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardResult"] = ResolversParentTypes["ScorecardResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  scorecard?: Resolver<
    Maybe<ResolversTypes["Scorecard"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardElementResponseResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardElementResponse"] = ResolversParentTypes["ScorecardElementResponse"]
> = ResolversObject<{
  elementId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  numericValue?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  stringValue?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Scorecard"] = ResolversParentTypes["Scorecard"]
> = ResolversObject<{
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  data?: Resolver<
    Array<ResolversTypes["ScorecardElementResponse"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserLocationsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["UserLocations"] = ResolversParentTypes["UserLocations"]
> = ResolversObject<{
  mode?: Resolver<ResolversTypes["InclusivityMode"], ParentType, ContextType>;
  list?: Resolver<Array<ResolversTypes["Location"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MenuOptionResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["MenuOption"] = ResolversParentTypes["MenuOption"]
> = ResolversObject<{
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  route?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserMenuOptionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["UserMenuOptions"] = ResolversParentTypes["UserMenuOptions"]
> = ResolversObject<{
  mode?: Resolver<ResolversTypes["InclusivityMode"], ParentType, ContextType>;
  list?: Resolver<Array<ResolversTypes["MenuOption"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserPostingGroupsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["UserPostingGroups"] = ResolversParentTypes["UserPostingGroups"]
> = ResolversObject<{
  mode?: Resolver<ResolversTypes["InclusivityMode"], ParentType, ContextType>;
  list?: Resolver<
    Array<ResolversTypes["JobPostingGroup"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  license?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  locations?: Resolver<
    ResolversTypes["UserLocations"],
    ParentType,
    ContextType
  >;
  menuOptions?: Resolver<
    ResolversTypes["UserMenuOptions"],
    ParentType,
    ContextType
  >;
  postingGroups?: Resolver<
    ResolversTypes["UserPostingGroups"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LoginResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LoginResult"] = ResolversParentTypes["LoginResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LogoutResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["LogoutResult"] = ResolversParentTypes["LogoutResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UpdateUserLocationsResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["UpdateUserLocationsResult"] = ResolversParentTypes["UpdateUserLocationsResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  locations?: Resolver<
    ResolversTypes["UserLocations"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UpdateUserMenuOptionsResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["UpdateUserMenuOptionsResult"] = ResolversParentTypes["UpdateUserMenuOptionsResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  menuOptions?: Resolver<
    ResolversTypes["UserMenuOptions"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UpdateUserPostingGroupsResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["UpdateUserPostingGroupsResult"] = ResolversParentTypes["UpdateUserPostingGroupsResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  postingGroups?: Resolver<
    ResolversTypes["UserPostingGroups"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  Job?: JobResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Reason?: ReasonResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  JobJournalTemplate?: JobJournalTemplateResolvers<ContextType>;
  JobPostingGroup?: JobPostingGroupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  FuelAsset?: FuelAssetResolvers<ContextType>;
  FuelHistoryAsset?: FuelHistoryAssetResolvers<ContextType>;
  FuelResult?: FuelResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Inventory?: InventoryResolvers<ContextType>;
  ItemConsumption?: ItemConsumptionResolvers<ContextType>;
  ItemList?: ItemListResolvers<ContextType>;
  InventoryResult?: InventoryResultResolvers<ContextType>;
  LivestockActivityDefaults?: LivestockActivityDefaultsResolvers<ContextType>;
  LivestockWeanEvent?: LivestockWeanEventResolvers<ContextType>;
  LivestockGradeOffEvent?: LivestockGradeOffEventResolvers<ContextType>;
  LivestockMoveEvent?: LivestockMoveEventResolvers<ContextType>;
  LivestockPurchaseEvent?: LivestockPurchaseEventResolvers<ContextType>;
  LivestockAdjustmentEvent?: LivestockAdjustmentEventResolvers<ContextType>;
  LivestockMortalityEvent?: LivestockMortalityEventResolvers<ContextType>;
  LivestockShipmentEvent?: LivestockShipmentEventResolvers<ContextType>;
  PriceEntry?: PriceEntryResolvers<ContextType>;
  LivestockQuantity?: LivestockQuantityResolvers<ContextType>;
  LivestockAdjustment?: LivestockAdjustmentResolvers<ContextType>;
  LivestockAdjustmentResult?: LivestockAdjustmentResultResolvers<ContextType>;
  LivestockGradeOff?: LivestockGradeOffResolvers<ContextType>;
  LivestockGradeOffResult?: LivestockGradeOffResultResolvers<ContextType>;
  LivestockMortality?: LivestockMortalityResolvers<ContextType>;
  LivestockMortalityResult?: LivestockMortalityResultResolvers<ContextType>;
  LivestockMove?: LivestockMoveResolvers<ContextType>;
  LivestockMoveResult?: LivestockMoveResultResolvers<ContextType>;
  LivestockPurchase?: LivestockPurchaseResolvers<ContextType>;
  LivestockPurchaseResult?: LivestockPurchaseResultResolvers<ContextType>;
  LivestockWean?: LivestockWeanResolvers<ContextType>;
  LivestockWeanResult?: LivestockWeanResultResolvers<ContextType>;
  LivestockShipment?: LivestockShipmentResolvers<ContextType>;
  LivestockShipmentResult?: LivestockShipmentResultResolvers<ContextType>;
  ItemJournalTemplate?: ItemJournalTemplateResolvers<ContextType>;
  DimensionPacker?: DimensionPackerResolvers<ContextType>;
  AutoPostResult?: AutoPostResultResolvers<ContextType>;
  MaintenanceAsset?: MaintenanceAssetResolvers<ContextType>;
  MaintenanceHistoryAsset?: MaintenanceHistoryAssetResolvers<ContextType>;
  MaintenanceResult?: MaintenanceResultResolvers<ContextType>;
  ScorecardGroup?: ScorecardGroupResolvers<ContextType>;
  ScorecardElement?: ScorecardElementResolvers<ContextType>;
  ScorecardPage?: ScorecardPageResolvers<ContextType>;
  ScorecardConfig?: ScorecardConfigResolvers<ContextType>;
  ScorecardResult?: ScorecardResultResolvers<ContextType>;
  ScorecardElementResponse?: ScorecardElementResponseResolvers<ContextType>;
  Scorecard?: ScorecardResolvers<ContextType>;
  UserLocations?: UserLocationsResolvers<ContextType>;
  MenuOption?: MenuOptionResolvers<ContextType>;
  UserMenuOptions?: UserMenuOptionsResolvers<ContextType>;
  UserPostingGroups?: UserPostingGroupsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  LogoutResult?: LogoutResultResolvers<ContextType>;
  UpdateUserLocationsResult?: UpdateUserLocationsResultResolvers<ContextType>;
  UpdateUserMenuOptionsResult?: UpdateUserMenuOptionsResultResolvers<
    ContextType
  >;
  UpdateUserPostingGroupsResult?: UpdateUserPostingGroupsResultResolvers<
    ContextType
  >;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphqlContext> = Resolvers<ContextType>;
