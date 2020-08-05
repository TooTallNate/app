import { GraphQLResolveInfo } from "graphql";
import {
  NavUser,
  NavJob,
  NavItem,
  NavResource,
  NavReason,
  NavLocation,
  NavStandardItemJournal
} from "./nav";
import { PigAdjustmentDocument } from "../pig-activity/models/PigAdjustment";
import { PigGradeOffDocument } from "../pig-activity/models/PigGradeOff";
import { PigMortalityDocument } from "../pig-activity/models/PigMortality";
import { PigMoveDocument } from "../pig-activity/models/PigMove";
import { PigPurchaseDocument } from "../pig-activity/models/PigPurchase";
import { PigWeanDocument } from "../pig-activity/models/PigWean";
import { UserSettingsDocument } from "./models/UserSettings";
import { FarrowingBackendScorecardDocument } from "../scorecard/models/FarrowingBackendScorecard";
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

export type PigActivityEvent = {
  __typename?: "PigActivityEvent";
  code: Scalars["String"];
  description: Scalars["String"];
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
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigAdjustmentInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  totalWeight: Scalars["Float"];
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigAdjustmentInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
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
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantities: Array<PigQuantity>;
  pigWeight?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigGradeOffInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantities: Array<PigQuantityInput>;
  pigWeight: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigGradeOffInput = {
  animal?: Maybe<Scalars["String"]>;
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
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMortalityInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMortalityInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
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
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMoveInput = {
  fromAnimal: Scalars["String"];
  toAnimal: Scalars["String"];
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMoveInput = {
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
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
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigPurchaseInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigPurchaseInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  totalWeight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
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
  event?: Maybe<PigActivityEvent>;
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
  locations: Array<Location>;
  pigActivityDefaults: PigActivityDefaults;
  pigActivityJobs: Array<Job>;
  pigAdjustment: PigAdjustment;
  pigGradeOff: PigGradeOff;
  pigGradeOffReasons: Array<Reason>;
  pigMortality: PigMortality;
  pigMove: PigMove;
  pigPurchase: PigPurchase;
  pigWean: PigWean;
  pigWeanEventTypes: Array<PigActivityEvent>;
  user?: Maybe<User>;
};

export type QueryFarrowingBackendAreaArgs = {
  number: Scalars["String"];
};

export type QueryFarrowingBackendScorecardArgs = {
  area: Scalars["String"];
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
  Location: ResolverTypeWrapper<NavLocation>;
  PigActivityDefaults: ResolverTypeWrapper<UserSettingsDocument>;
  PigActivityEvent: ResolverTypeWrapper<NavStandardItemJournal>;
  PriceEntry: ResolverTypeWrapper<PriceEntry>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
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
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  ScorecardEntry: ResolverTypeWrapper<ScorecardEntry>;
  ScorecardEntryInput: ScorecardEntryInput;
  FarrowingBackendScorecard: ResolverTypeWrapper<
    FarrowingBackendScorecardDocument
  >;
  PostFarrowingBackendScorecardInput: PostFarrowingBackendScorecardInput;
  SaveFarrowingBackendScorecardInput: SaveFarrowingBackendScorecardInput;
  FarrowingBackendScorecardResult: ResolverTypeWrapper<
    Omit<FarrowingBackendScorecardResult, "scorecard"> & {
      scorecard: ResolversTypes["FarrowingBackendScorecard"];
    }
  >;
  SetAreaOperatorInput: SetAreaOperatorInput;
  SetAreaOperatorResult: ResolverTypeWrapper<
    Omit<SetAreaOperatorResult, "area"> & { area: ResolversTypes["Job"] }
  >;
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
  Location: NavLocation;
  PigActivityDefaults: UserSettingsDocument;
  PigActivityEvent: NavStandardItemJournal;
  PriceEntry: PriceEntry;
  Float: Scalars["Float"];
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
  Query: {};
  Mutation: {};
  ScorecardEntry: ScorecardEntry;
  ScorecardEntryInput: ScorecardEntryInput;
  FarrowingBackendScorecard: FarrowingBackendScorecardDocument;
  PostFarrowingBackendScorecardInput: PostFarrowingBackendScorecardInput;
  SaveFarrowingBackendScorecardInput: SaveFarrowingBackendScorecardInput;
  FarrowingBackendScorecardResult: Omit<
    FarrowingBackendScorecardResult,
    "scorecard"
  > & { scorecard: ResolversParentTypes["FarrowingBackendScorecard"] };
  SetAreaOperatorInput: SetAreaOperatorInput;
  SetAreaOperatorResult: Omit<SetAreaOperatorResult, "area"> & {
    area: ResolversParentTypes["Job"];
  };
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ItemResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Item"] = ResolversParentTypes["Item"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type PigActivityEventResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigActivityEvent"] = ResolversParentTypes["PigActivityEvent"]
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
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  totalWeight?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
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
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  naturalQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  euthanizedQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
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
  fromAnimal?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  toAnimal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
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
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
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
    Maybe<ResolversTypes["PigActivityEvent"]>,
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

export type QueryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  animals?: Resolver<Array<ResolversTypes["Item"]>, ParentType, ContextType>;
  farrowingBackendArea?: Resolver<
    Maybe<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFarrowingBackendAreaArgs, "number">
  >;
  farrowingBackendAreas?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType
  >;
  farrowingBackendOperators?: Resolver<
    Array<ResolversTypes["Resource"]>,
    ParentType,
    ContextType
  >;
  farrowingBackendScorecard?: Resolver<
    Maybe<ResolversTypes["FarrowingBackendScorecard"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFarrowingBackendScorecardArgs, "area">
  >;
  locations?: Resolver<
    Array<ResolversTypes["Location"]>,
    ParentType,
    ContextType
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
  pigGradeOff?: Resolver<
    ResolversTypes["PigGradeOff"],
    ParentType,
    ContextType,
    RequireFields<QueryPigGradeOffArgs, "job">
  >;
  pigGradeOffReasons?: Resolver<
    Array<ResolversTypes["Reason"]>,
    ParentType,
    ContextType
  >;
  pigMortality?: Resolver<
    ResolversTypes["PigMortality"],
    ParentType,
    ContextType,
    RequireFields<QueryPigMortalityArgs, "job">
  >;
  pigMove?: Resolver<
    ResolversTypes["PigMove"],
    ParentType,
    ContextType,
    RequireFields<QueryPigMoveArgs, "job">
  >;
  pigPurchase?: Resolver<
    ResolversTypes["PigPurchase"],
    ParentType,
    ContextType,
    RequireFields<QueryPigPurchaseArgs, "job">
  >;
  pigWean?: Resolver<
    ResolversTypes["PigWean"],
    ParentType,
    ContextType,
    RequireFields<QueryPigWeanArgs, "job">
  >;
  pigWeanEventTypes?: Resolver<
    Array<ResolversTypes["PigActivityEvent"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
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
  postFarrowingBackendScorecard?: Resolver<
    ResolversTypes["FarrowingBackendScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostFarrowingBackendScorecardArgs, "input">
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
  saveFarrowingBackendScorecard?: Resolver<
    ResolversTypes["FarrowingBackendScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveFarrowingBackendScorecardArgs, "input">
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
  setAreaOperator?: Resolver<
    ResolversTypes["SetAreaOperatorResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSetAreaOperatorArgs, "input">
  >;
  updateUserLocations?: Resolver<
    ResolversTypes["UpdateUserLocationsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserLocationsArgs, "input">
  >;
}>;

export type ScorecardEntryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardEntry"] = ResolversParentTypes["ScorecardEntry"]
> = ResolversObject<{
  score?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FarrowingBackendScorecardResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["FarrowingBackendScorecard"] = ResolversParentTypes["FarrowingBackendScorecard"]
> = ResolversObject<{
  area?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  operator?: Resolver<
    Maybe<ResolversTypes["Resource"]>,
    ParentType,
    ContextType
  >;
  sows?: Resolver<ResolversTypes["ScorecardEntry"], ParentType, ContextType>;
  piglets?: Resolver<ResolversTypes["ScorecardEntry"], ParentType, ContextType>;
  feed?: Resolver<ResolversTypes["ScorecardEntry"], ParentType, ContextType>;
  water?: Resolver<ResolversTypes["ScorecardEntry"], ParentType, ContextType>;
  crate?: Resolver<ResolversTypes["ScorecardEntry"], ParentType, ContextType>;
  room?: Resolver<ResolversTypes["ScorecardEntry"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type FarrowingBackendScorecardResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["FarrowingBackendScorecardResult"] = ResolversParentTypes["FarrowingBackendScorecardResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  scorecard?: Resolver<
    ResolversTypes["FarrowingBackendScorecard"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SetAreaOperatorResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SetAreaOperatorResult"] = ResolversParentTypes["SetAreaOperatorResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  area?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
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
  PigActivityDefaults?: PigActivityDefaultsResolvers<ContextType>;
  PigActivityEvent?: PigActivityEventResolvers<ContextType>;
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
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ScorecardEntry?: ScorecardEntryResolvers<ContextType>;
  FarrowingBackendScorecard?: FarrowingBackendScorecardResolvers<ContextType>;
  FarrowingBackendScorecardResult?: FarrowingBackendScorecardResultResolvers<
    ContextType
  >;
  SetAreaOperatorResult?: SetAreaOperatorResultResolvers<ContextType>;
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
