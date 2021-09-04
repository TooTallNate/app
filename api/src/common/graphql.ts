import { GraphQLResolveInfo } from "graphql";
import {
  NavUser,
  NavJob,
  NavItem,
  ItemJournalTemplateObject,
  NavResource,
  NavReason,
  NavLocation,
  NavStandardItemJournal,
  NavJobPostingGroup,
  NavFuelAsset,
  NavMaintenanceAsset
} from "./nav";
import { PigAdjustmentDocument } from "../pig-activity/models/PigAdjustment";
import { PigGradeOffDocument } from "../pig-activity/models/PigGradeOff";
import { PigMortalityDocument } from "../pig-activity/models/PigMortality";
import { PigMoveDocument } from "../pig-activity/models/PigMove";
import { PigPurchaseDocument } from "../pig-activity/models/PigPurchase";
import { PigWeanDocument } from "../pig-activity/models/PigWean";
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
  maintenanceAssetsByNo: Array<MaintenanceAsset>;
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

export type QueryMaintenanceAssetsByNoArgs = {
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
  code: Scalars["String"];
  interval?: Maybe<Scalars["Int"]>;
  unitType?: Maybe<Scalars["String"]>;
  maintenanceDesc?: Maybe<Scalars["String"]>;
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
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Item: ResolverTypeWrapper<NavItem>;
  Reason: ResolverTypeWrapper<NavReason>;
  Resource: ResolverTypeWrapper<NavResource>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Location: ResolverTypeWrapper<NavLocation>;
  JobFilter: JobFilter;
  ResourceFilter: ResourceFilter;
  Query: ResolverTypeWrapper<{}>;
  FuelAsset: ResolverTypeWrapper<NavFuelAsset>;
  PostFuelInput: PostFuelInput;
  FuelResult: ResolverTypeWrapper<FuelResult>;
  Mutation: ResolverTypeWrapper<{}>;
  MaintenanceAsset: ResolverTypeWrapper<NavMaintenanceAsset>;
  PostMaintenanceInput: PostMaintenanceInput;
  MaintenanceResult: ResolverTypeWrapper<MaintenanceResult>;
  PigActivityDefaults: ResolverTypeWrapper<UserSettingsDocument>;
  PigWeanEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PigGradeOffEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PigMoveEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PigPurchaseEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PigAdjustmentEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PigMortalityEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PriceEntry: ResolverTypeWrapper<PriceEntry>;
  PigQuantity: ResolverTypeWrapper<PigQuantity>;
  PigQuantityInput: PigQuantityInput;
  PigOptionalQuantityInput: PigOptionalQuantityInput;
  PigAdjustment: ResolverTypeWrapper<PigAdjustmentDocument>;
  PostPigAdjustmentInput: PostPigAdjustmentInput;
  SavePigAdjustmentInput: SavePigAdjustmentInput;
  PigAdjustmentResult: ResolverTypeWrapper<
    Omit<PigAdjustmentResult, "pigAdjustment" | "defaults"> & {
      pigAdjustment: ResolversTypes["PigAdjustment"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PigGradeOff: ResolverTypeWrapper<PigGradeOffDocument>;
  PostPigGradeOffInput: PostPigGradeOffInput;
  SavePigGradeOffInput: SavePigGradeOffInput;
  PigGradeOffResult: ResolverTypeWrapper<
    Omit<PigGradeOffResult, "pigGradeOff" | "defaults"> & {
      pigGradeOff: ResolversTypes["PigGradeOff"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PigMortality: ResolverTypeWrapper<PigMortalityDocument>;
  PostPigMortalityInput: PostPigMortalityInput;
  SavePigMortalityInput: SavePigMortalityInput;
  PigMortalityResult: ResolverTypeWrapper<
    Omit<PigMortalityResult, "pigMortality" | "defaults"> & {
      pigMortality: ResolversTypes["PigMortality"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PigMove: ResolverTypeWrapper<PigMoveDocument>;
  PostPigMoveInput: PostPigMoveInput;
  SavePigMoveInput: SavePigMoveInput;
  PigMoveResult: ResolverTypeWrapper<
    Omit<PigMoveResult, "pigMove" | "defaults"> & {
      pigMove: ResolversTypes["PigMove"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PigPurchase: ResolverTypeWrapper<PigPurchaseDocument>;
  PostPigPurchaseInput: PostPigPurchaseInput;
  SavePigPurchaseInput: SavePigPurchaseInput;
  PigPurchaseResult: ResolverTypeWrapper<
    Omit<PigPurchaseResult, "pigPurchase" | "defaults"> & {
      pigPurchase: ResolversTypes["PigPurchase"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PigWean: ResolverTypeWrapper<PigWeanDocument>;
  PostPigWeanInput: PostPigWeanInput;
  SavePigWeanInput: SavePigWeanInput;
  PigWeanResult: ResolverTypeWrapper<
    Omit<PigWeanResult, "pigWean" | "defaults"> & {
      pigWean: ResolversTypes["PigWean"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  ItemJournalTemplate: ResolverTypeWrapper<ItemJournalTemplateObject>;
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
  UserLocations: ResolverTypeWrapper<
    Omit<UserLocations, "list"> & { list: Array<ResolversTypes["Location"]> }
  >;
  User: ResolverTypeWrapper<NavUser>;
  LoginInput: LoginInput;
  LoginResult: ResolverTypeWrapper<
    Omit<LoginResult, "user"> & { user: ResolversTypes["User"] }
  >;
  LogoutResult: ResolverTypeWrapper<LogoutResult>;
  UpdateUserLocationsInput: UpdateUserLocationsInput;
  UpdateUserLocationsResult: ResolverTypeWrapper<
    Omit<UpdateUserLocationsResult, "locations"> & {
      locations: ResolversTypes["UserLocations"];
    }
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  InclusivityMode: InclusivityMode;
  Job: NavJob;
  Int: Scalars["Int"];
  Item: NavItem;
  Reason: NavReason;
  Resource: NavResource;
  Float: Scalars["Float"];
  Location: NavLocation;
  JobFilter: JobFilter;
  ResourceFilter: ResourceFilter;
  Query: {};
  FuelAsset: NavFuelAsset;
  PostFuelInput: PostFuelInput;
  FuelResult: FuelResult;
  Mutation: {};
  MaintenanceAsset: NavMaintenanceAsset;
  PostMaintenanceInput: PostMaintenanceInput;
  MaintenanceResult: MaintenanceResult;
  PigActivityDefaults: UserSettingsDocument;
  PigWeanEvent: NavStandardItemJournal;
  PigGradeOffEvent: NavStandardItemJournal;
  PigMoveEvent: NavStandardItemJournal;
  PigPurchaseEvent: NavStandardItemJournal;
  PigAdjustmentEvent: NavStandardItemJournal;
  PigMortalityEvent: NavStandardItemJournal;
  PriceEntry: PriceEntry;
  PigQuantity: PigQuantity;
  PigQuantityInput: PigQuantityInput;
  PigOptionalQuantityInput: PigOptionalQuantityInput;
  PigAdjustment: PigAdjustmentDocument;
  PostPigAdjustmentInput: PostPigAdjustmentInput;
  SavePigAdjustmentInput: SavePigAdjustmentInput;
  PigAdjustmentResult: Omit<
    PigAdjustmentResult,
    "pigAdjustment" | "defaults"
  > & {
    pigAdjustment: ResolversParentTypes["PigAdjustment"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PigGradeOff: PigGradeOffDocument;
  PostPigGradeOffInput: PostPigGradeOffInput;
  SavePigGradeOffInput: SavePigGradeOffInput;
  PigGradeOffResult: Omit<PigGradeOffResult, "pigGradeOff" | "defaults"> & {
    pigGradeOff: ResolversParentTypes["PigGradeOff"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PigMortality: PigMortalityDocument;
  PostPigMortalityInput: PostPigMortalityInput;
  SavePigMortalityInput: SavePigMortalityInput;
  PigMortalityResult: Omit<PigMortalityResult, "pigMortality" | "defaults"> & {
    pigMortality: ResolversParentTypes["PigMortality"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PigMove: PigMoveDocument;
  PostPigMoveInput: PostPigMoveInput;
  SavePigMoveInput: SavePigMoveInput;
  PigMoveResult: Omit<PigMoveResult, "pigMove" | "defaults"> & {
    pigMove: ResolversParentTypes["PigMove"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PigPurchase: PigPurchaseDocument;
  PostPigPurchaseInput: PostPigPurchaseInput;
  SavePigPurchaseInput: SavePigPurchaseInput;
  PigPurchaseResult: Omit<PigPurchaseResult, "pigPurchase" | "defaults"> & {
    pigPurchase: ResolversParentTypes["PigPurchase"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PigWean: PigWeanDocument;
  PostPigWeanInput: PostPigWeanInput;
  SavePigWeanInput: SavePigWeanInput;
  PigWeanResult: Omit<PigWeanResult, "pigWean" | "defaults"> & {
    pigWean: ResolversParentTypes["PigWean"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  ItemJournalTemplate: ItemJournalTemplateObject;
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
  UserLocations: Omit<UserLocations, "list"> & {
    list: Array<ResolversParentTypes["Location"]>;
  };
  User: NavUser;
  LoginInput: LoginInput;
  LoginResult: Omit<LoginResult, "user"> & {
    user: ResolversParentTypes["User"];
  };
  LogoutResult: LogoutResult;
  UpdateUserLocationsInput: UpdateUserLocationsInput;
  UpdateUserLocationsResult: Omit<UpdateUserLocationsResult, "locations"> & {
    locations: ResolversParentTypes["UserLocations"];
  };
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
  inventory?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  deadQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
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
  cost?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
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

export type QueryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  animals?: Resolver<Array<ResolversTypes["Item"]>, ParentType, ContextType>;
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
  job?: Resolver<
    Maybe<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobArgs, "number">
  >;
  jobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobsArgs, never>
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
  pigActivityDefaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  pigActivityJobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType
  >;
  pigAdjustment?: Resolver<
    ResolversTypes["PigAdjustment"],
    ParentType,
    ContextType,
    RequireFields<QueryPigAdjustmentArgs, "job">
  >;
  pigAdjustmentEventTypes?: Resolver<
    Array<ResolversTypes["PigAdjustmentEvent"]>,
    ParentType,
    ContextType
  >;
  pigGradeOff?: Resolver<
    ResolversTypes["PigGradeOff"],
    ParentType,
    ContextType,
    RequireFields<QueryPigGradeOffArgs, "job">
  >;
  pigGradeOffEventTypes?: Resolver<
    Array<ResolversTypes["PigGradeOffEvent"]>,
    ParentType,
    ContextType
  >;
  pigMortality?: Resolver<
    ResolversTypes["PigMortality"],
    ParentType,
    ContextType,
    RequireFields<QueryPigMortalityArgs, "job">
  >;
  pigMortalityEventTypes?: Resolver<
    Array<ResolversTypes["PigMortalityEvent"]>,
    ParentType,
    ContextType
  >;
  pigMove?: Resolver<
    ResolversTypes["PigMove"],
    ParentType,
    ContextType,
    RequireFields<QueryPigMoveArgs, "job">
  >;
  pigMoveEventTypes?: Resolver<
    Array<ResolversTypes["PigMoveEvent"]>,
    ParentType,
    ContextType
  >;
  pigPurchase?: Resolver<
    ResolversTypes["PigPurchase"],
    ParentType,
    ContextType,
    RequireFields<QueryPigPurchaseArgs, "job">
  >;
  pigPurchaseEventTypes?: Resolver<
    Array<ResolversTypes["PigPurchaseEvent"]>,
    ParentType,
    ContextType
  >;
  pigWean?: Resolver<
    ResolversTypes["PigWean"],
    ParentType,
    ContextType,
    RequireFields<QueryPigWeanArgs, "job">
  >;
  pigWeanEventTypes?: Resolver<
    Array<ResolversTypes["PigWeanEvent"]>,
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
  postMaintenance?: Resolver<
    ResolversTypes["MaintenanceResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostMaintenanceArgs, "input">
  >;
  postPigAdjustment?: Resolver<
    ResolversTypes["PigAdjustmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigAdjustmentArgs, "input">
  >;
  postPigGradeOff?: Resolver<
    ResolversTypes["PigGradeOffResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigGradeOffArgs, "input">
  >;
  postPigMortality?: Resolver<
    ResolversTypes["PigMortalityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMortalityArgs, "input">
  >;
  postPigMove?: Resolver<
    ResolversTypes["PigMoveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMoveArgs, "input">
  >;
  postPigPurchase?: Resolver<
    ResolversTypes["PigPurchaseResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigPurchaseArgs, "input">
  >;
  postPigWean?: Resolver<
    ResolversTypes["PigWeanResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigWeanArgs, "input">
  >;
  postScorecard?: Resolver<
    ResolversTypes["ScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostScorecardArgs, "input">
  >;
  savePigAdjustment?: Resolver<
    ResolversTypes["PigAdjustmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigAdjustmentArgs, "input">
  >;
  savePigGradeOff?: Resolver<
    ResolversTypes["PigGradeOffResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigGradeOffArgs, "input">
  >;
  savePigMortality?: Resolver<
    ResolversTypes["PigMortalityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigMortalityArgs, "input">
  >;
  savePigMove?: Resolver<
    ResolversTypes["PigMoveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigMoveArgs, "input">
  >;
  savePigPurchase?: Resolver<
    ResolversTypes["PigPurchaseResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigPurchaseArgs, "input">
  >;
  savePigWean?: Resolver<
    ResolversTypes["PigWeanResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigWeanArgs, "input">
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

export type MaintenanceResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["MaintenanceResult"] = ResolversParentTypes["MaintenanceResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigActivityDefaultsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigActivityDefaults"] = ResolversParentTypes["PigActivityDefaults"]
> = ResolversObject<{
  job?: Resolver<Maybe<ResolversTypes["Job"]>, ParentType, ContextType>;
  prices?: Resolver<
    Array<ResolversTypes["PriceEntry"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigWeanEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigWeanEvent"] = ResolversParentTypes["PigWeanEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigGradeOffEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigGradeOffEvent"] = ResolversParentTypes["PigGradeOffEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes["Reason"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigMoveEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigMoveEvent"] = ResolversParentTypes["PigMoveEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigPurchaseEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigPurchaseEvent"] = ResolversParentTypes["PigPurchaseEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigAdjustmentEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigAdjustmentEvent"] = ResolversParentTypes["PigAdjustmentEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigMortalityEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigMortalityEvent"] = ResolversParentTypes["PigMortalityEvent"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes["Reason"]>, ParentType, ContextType>;
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

export type PigQuantityResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigQuantity"] = ResolversParentTypes["PigQuantity"]
> = ResolversObject<{
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigAdjustmentResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigAdjustment"] = ResolversParentTypes["PigAdjustment"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["PigAdjustmentEvent"]>,
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

export type PigAdjustmentResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigAdjustmentResult"] = ResolversParentTypes["PigAdjustmentResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  pigAdjustment?: Resolver<
    ResolversTypes["PigAdjustment"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigGradeOffResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigGradeOff"] = ResolversParentTypes["PigGradeOff"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["PigGradeOffEvent"]>,
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
    Array<ResolversTypes["PigQuantity"]>,
    ParentType,
    ContextType
  >;
  pigWeight?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigGradeOffResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigGradeOffResult"] = ResolversParentTypes["PigGradeOffResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  pigGradeOff?: Resolver<
    ResolversTypes["PigGradeOff"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigMortalityResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigMortality"] = ResolversParentTypes["PigMortality"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["PigMortalityEvent"]>,
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
    Maybe<Array<ResolversTypes["PigQuantity"]>>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigMortalityResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigMortalityResult"] = ResolversParentTypes["PigMortalityResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  pigMortality?: Resolver<
    ResolversTypes["PigMortality"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigMoveResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigMove"] = ResolversParentTypes["PigMove"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["PigMoveEvent"]>,
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
  smallPigQuantity?: Resolver<
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

export type PigMoveResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigMoveResult"] = ResolversParentTypes["PigMoveResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  pigMove?: Resolver<ResolversTypes["PigMove"], ParentType, ContextType>;
  defaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigPurchaseResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigPurchase"] = ResolversParentTypes["PigPurchase"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["PigPurchaseEvent"]>,
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
  smallPigQuantity?: Resolver<
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

export type PigPurchaseResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigPurchaseResult"] = ResolversParentTypes["PigPurchaseResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  pigPurchase?: Resolver<
    ResolversTypes["PigPurchase"],
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigWeanResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigWean"] = ResolversParentTypes["PigWean"]
> = ResolversObject<{
  event?: Resolver<
    Maybe<ResolversTypes["PigWeanEvent"]>,
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
  smallPigQuantity?: Resolver<
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

export type PigWeanResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigWeanResult"] = ResolversParentTypes["PigWeanResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  pigWean?: Resolver<ResolversTypes["PigWean"], ParentType, ContextType>;
  defaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
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

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  Job?: JobResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Reason?: ReasonResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  FuelAsset?: FuelAssetResolvers<ContextType>;
  FuelResult?: FuelResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MaintenanceAsset?: MaintenanceAssetResolvers<ContextType>;
  MaintenanceResult?: MaintenanceResultResolvers<ContextType>;
  PigActivityDefaults?: PigActivityDefaultsResolvers<ContextType>;
  PigWeanEvent?: PigWeanEventResolvers<ContextType>;
  PigGradeOffEvent?: PigGradeOffEventResolvers<ContextType>;
  PigMoveEvent?: PigMoveEventResolvers<ContextType>;
  PigPurchaseEvent?: PigPurchaseEventResolvers<ContextType>;
  PigAdjustmentEvent?: PigAdjustmentEventResolvers<ContextType>;
  PigMortalityEvent?: PigMortalityEventResolvers<ContextType>;
  PriceEntry?: PriceEntryResolvers<ContextType>;
  PigQuantity?: PigQuantityResolvers<ContextType>;
  PigAdjustment?: PigAdjustmentResolvers<ContextType>;
  PigAdjustmentResult?: PigAdjustmentResultResolvers<ContextType>;
  PigGradeOff?: PigGradeOffResolvers<ContextType>;
  PigGradeOffResult?: PigGradeOffResultResolvers<ContextType>;
  PigMortality?: PigMortalityResolvers<ContextType>;
  PigMortalityResult?: PigMortalityResultResolvers<ContextType>;
  PigMove?: PigMoveResolvers<ContextType>;
  PigMoveResult?: PigMoveResultResolvers<ContextType>;
  PigPurchase?: PigPurchaseResolvers<ContextType>;
  PigPurchaseResult?: PigPurchaseResultResolvers<ContextType>;
  PigWean?: PigWeanResolvers<ContextType>;
  PigWeanResult?: PigWeanResultResolvers<ContextType>;
  ItemJournalTemplate?: ItemJournalTemplateResolvers<ContextType>;
  ScorecardGroup?: ScorecardGroupResolvers<ContextType>;
  ScorecardElement?: ScorecardElementResolvers<ContextType>;
  ScorecardPage?: ScorecardPageResolvers<ContextType>;
  ScorecardConfig?: ScorecardConfigResolvers<ContextType>;
  ScorecardResult?: ScorecardResultResolvers<ContextType>;
  ScorecardElementResponse?: ScorecardElementResponseResolvers<ContextType>;
  Scorecard?: ScorecardResolvers<ContextType>;
  UserLocations?: UserLocationsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  LogoutResult?: LogoutResultResolvers<ContextType>;
  UpdateUserLocationsResult?: UpdateUserLocationsResultResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphqlContext> = Resolvers<ContextType>;
