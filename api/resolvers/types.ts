import { GraphQLResolveInfo } from "graphql";
import { NavUser, NavJob, NavResource } from "../nav";
import { UserSettingsDocument } from "../models/user-settings";
import { FarrowingBackendScorecardDocument } from "../models/farrowing-backend-scorecard";
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

export type FarrowingBackendScorecardInput = {
  area: Scalars["String"];
  operator: Scalars["String"];
  sows: ScorecardEntryInput;
  piglets: ScorecardEntryInput;
  feed: ScorecardEntryInput;
  water: ScorecardEntryInput;
  crate: ScorecardEntryInput;
  room: ScorecardEntryInput;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  description: Scalars["String"];
  personResponsible: Resource;
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
  postPigAdjustment: PostPigActivityResult;
  postPigGradeOff: PostPigActivityResult;
  postPigMortality: PostPigActivityResult;
  postPigMove: PostPigActivityResult;
  postPigPurchase: PostPigActivityResult;
  postPigWean: PostPigActivityResult;
  postFarrowingBackendScorecard: PostFarrowingBackendScorecardResult;
  saveFarrowingBackendScorecard: SaveFarrowingBackendScorecardResult;
  setAreaOperator: SetAreaOperatorResult;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostPigAdjustmentArgs = {
  input: PigAdjustmentInput;
};

export type MutationPostPigGradeOffArgs = {
  input: PigGradeOffInput;
};

export type MutationPostPigMortalityArgs = {
  input: PigMortalityInput;
};

export type MutationPostPigMoveArgs = {
  input: PigMoveInput;
};

export type MutationPostPigPurchaseArgs = {
  input: PigPurchaseInput;
};

export type MutationPostPigWeanArgs = {
  input: PigWeanInput;
};

export type MutationPostFarrowingBackendScorecardArgs = {
  input: FarrowingBackendScorecardInput;
};

export type MutationSaveFarrowingBackendScorecardArgs = {
  input: FarrowingBackendScorecardInput;
};

export type MutationSetAreaOperatorArgs = {
  input: SetAreaOperatorInput;
};

export type PigActivityDefaults = {
  __typename?: "PigActivityDefaults";
  job?: Maybe<Job>;
  price?: Maybe<Scalars["Float"]>;
};

export type PigAdjustmentInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigGradeOffInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigMortalityInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  naturalQuantity: Scalars["Int"];
  euthanizedQuantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigMoveInput = {
  fromAnimal: Scalars["String"];
  toAnimal: Scalars["String"];
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigPurchaseInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PigWeanInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostFarrowingBackendScorecardResult = {
  __typename?: "PostFarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
};

export type PostPigActivityResult = {
  __typename?: "PostPigActivityResult";
  success: Scalars["Boolean"];
  defaults: PigActivityDefaults;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  pigActivityJobs: Array<Job>;
  pigActivityDefaults: PigActivityDefaults;
  farrowingBackendScorecards: Array<FarrowingBackendScorecard>;
  farrowingBackendScorecard?: Maybe<FarrowingBackendScorecard>;
  farrowingBackendAreas: Array<Job>;
  farrowingBackendArea?: Maybe<Job>;
  farrowingBackendOperators: Array<Resource>;
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

export type SaveFarrowingBackendScorecardResult = {
  __typename?: "SaveFarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
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

export type PigActivityDefaultsFragmentFragment = {
  __typename?: "PigActivityDefaults";
} & Pick<PigActivityDefaults, "price"> & {
    job: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  };

export type PostPigActivityResultFragmentFragment = {
  __typename?: "PostPigActivityResult";
} & {
  defaults: {
    __typename?: "PigActivityDefaults";
  } & PigActivityDefaultsFragmentFragment;
};

export type PigActivityQueryVariables = {};

export type PigActivityQuery = { __typename?: "Query" } & {
  pigActivityJobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "description">
  >;
  pigActivityDefaults: {
    __typename?: "PigActivityDefaults";
  } & PigActivityDefaultsFragmentFragment;
};

export type PostPigMoveMutationVariables = {
  input: PigMoveInput;
};

export type PostPigMoveMutation = { __typename?: "Mutation" } & {
  postPigMove: {
    __typename?: "PostPigActivityResult";
  } & PostPigActivityResultFragmentFragment;
};

export type PostPigAdjustmentMutationVariables = {
  input: PigAdjustmentInput;
};

export type PostPigAdjustmentMutation = { __typename?: "Mutation" } & {
  postPigAdjustment: {
    __typename?: "PostPigActivityResult";
  } & PostPigActivityResultFragmentFragment;
};

export type PostPigGradeOffMutationVariables = {
  input: PigGradeOffInput;
};

export type PostPigGradeOffMutation = { __typename?: "Mutation" } & {
  postPigGradeOff: {
    __typename?: "PostPigActivityResult";
  } & PostPigActivityResultFragmentFragment;
};

export type PostPigWeanMutationVariables = {
  input: PigWeanInput;
};

export type PostPigWeanMutation = { __typename?: "Mutation" } & {
  postPigWean: {
    __typename?: "PostPigActivityResult";
  } & PostPigActivityResultFragmentFragment;
};

export type PostPigPurchaseMutationVariables = {
  input: PigPurchaseInput;
};

export type PostPigPurchaseMutation = { __typename?: "Mutation" } & {
  postPigPurchase: {
    __typename?: "PostPigActivityResult";
  } & PostPigActivityResultFragmentFragment;
};

export type PostPigMortalityMutationVariables = {
  input: PigMortalityInput;
};

export type PostPigMortalityMutation = { __typename?: "Mutation" } & {
  postPigMortality: {
    __typename?: "PostPigActivityResult";
  } & PostPigActivityResultFragmentFragment;
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

export type FarrowingBackendOperatorFieldsFragment = {
  __typename?: "Resource";
} & Pick<Resource, "number" | "name">;

export type FarrowingBackendScorecardQueryVariables = {};

export type FarrowingBackendScorecardQuery = { __typename?: "Query" } & {
  areas: Array<{ __typename?: "Job" } & FarrowingBackendAreaFieldsFragment>;
  operators: Array<
    { __typename?: "Resource" } & FarrowingBackendOperatorFieldsFragment
  >;
};

export type FarrowingBackendOperatorsQueryVariables = {
  area: Scalars["String"];
};

export type FarrowingBackendOperatorsQuery = { __typename?: "Query" } & {
  area: Maybe<{ __typename?: "Job" } & FarrowingBackendAreaFieldsFragment>;
  operators: Array<
    { __typename?: "Resource" } & FarrowingBackendOperatorFieldsFragment
  >;
};

export type PostFarrowingBackendScorecardMutationVariables = {
  input: FarrowingBackendScorecardInput;
};

export type PostFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & {
  postFarrowingBackendScorecard: {
    __typename?: "PostFarrowingBackendScorecardResult";
  } & Pick<PostFarrowingBackendScorecardResult, "success">;
};

export type SetAreaOperatorMutationVariables = {
  input: SetAreaOperatorInput;
};

export type SetAreaOperatorMutation = { __typename?: "Mutation" } & {
  setAreaOperator: { __typename?: "SetAreaOperatorResult" } & {
    area: { __typename?: "Job" } & FarrowingBackendAreaFieldsFragment;
  };
};

export type UserPartsFragment = { __typename?: "User" } & Pick<
  User,
  "username" | "name"
>;

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResult" } & {
    user: { __typename?: "User" } & UserPartsFragment;
  };
};

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserPartsFragment>;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout: { __typename?: "LogoutResult" } & Pick<LogoutResult, "success">;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean;

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
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<NavUser>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Job: ResolverTypeWrapper<NavJob>;
  Resource: ResolverTypeWrapper<NavResource>;
  PigActivityDefaults: ResolverTypeWrapper<UserSettingsDocument>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  FarrowingBackendScorecard: ResolverTypeWrapper<
    FarrowingBackendScorecardDocument
  >;
  ScorecardEntry: ResolverTypeWrapper<ScorecardEntry>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  LoginResult: ResolverTypeWrapper<
    Omit<LoginResult, "user"> & { user: ResolversTypes["User"] }
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  LogoutResult: ResolverTypeWrapper<LogoutResult>;
  PigAdjustmentInput: PigAdjustmentInput;
  PostPigActivityResult: ResolverTypeWrapper<
    Omit<PostPigActivityResult, "defaults"> & {
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PigGradeOffInput: PigGradeOffInput;
  PigMortalityInput: PigMortalityInput;
  PigMoveInput: PigMoveInput;
  PigPurchaseInput: PigPurchaseInput;
  PigWeanInput: PigWeanInput;
  FarrowingBackendScorecardInput: FarrowingBackendScorecardInput;
  ScorecardEntryInput: ScorecardEntryInput;
  PostFarrowingBackendScorecardResult: ResolverTypeWrapper<
    Omit<PostFarrowingBackendScorecardResult, "scorecard"> & {
      scorecard: ResolversTypes["FarrowingBackendScorecard"];
    }
  >;
  SaveFarrowingBackendScorecardResult: ResolverTypeWrapper<
    Omit<SaveFarrowingBackendScorecardResult, "scorecard"> & {
      scorecard: ResolversTypes["FarrowingBackendScorecard"];
    }
  >;
  SetAreaOperatorInput: SetAreaOperatorInput;
  SetAreaOperatorResult: ResolverTypeWrapper<
    Omit<SetAreaOperatorResult, "area"> & { area: ResolversTypes["Job"] }
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  User: NavUser;
  String: Scalars["String"];
  Job: NavJob;
  Resource: NavResource;
  PigActivityDefaults: UserSettingsDocument;
  Float: Scalars["Float"];
  FarrowingBackendScorecard: FarrowingBackendScorecardDocument;
  ScorecardEntry: ScorecardEntry;
  Int: Scalars["Int"];
  Mutation: {};
  LoginInput: LoginInput;
  LoginResult: Omit<LoginResult, "user"> & {
    user: ResolversParentTypes["User"];
  };
  Boolean: Scalars["Boolean"];
  LogoutResult: LogoutResult;
  PigAdjustmentInput: PigAdjustmentInput;
  PostPigActivityResult: Omit<PostPigActivityResult, "defaults"> & {
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PigGradeOffInput: PigGradeOffInput;
  PigMortalityInput: PigMortalityInput;
  PigMoveInput: PigMoveInput;
  PigPurchaseInput: PigPurchaseInput;
  PigWeanInput: PigWeanInput;
  FarrowingBackendScorecardInput: FarrowingBackendScorecardInput;
  ScorecardEntryInput: ScorecardEntryInput;
  PostFarrowingBackendScorecardResult: Omit<
    PostFarrowingBackendScorecardResult,
    "scorecard"
  > & { scorecard: ResolversParentTypes["FarrowingBackendScorecard"] };
  SaveFarrowingBackendScorecardResult: Omit<
    SaveFarrowingBackendScorecardResult,
    "scorecard"
  > & { scorecard: ResolversParentTypes["FarrowingBackendScorecard"] };
  SetAreaOperatorInput: SetAreaOperatorInput;
  SetAreaOperatorResult: Omit<SetAreaOperatorResult, "area"> & {
    area: ResolversParentTypes["Job"];
  };
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
  postPigAdjustment?: Resolver<
    ResolversTypes["PostPigActivityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigAdjustmentArgs, "input">
  >;
  postPigGradeOff?: Resolver<
    ResolversTypes["PostPigActivityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigGradeOffArgs, "input">
  >;
  postPigMortality?: Resolver<
    ResolversTypes["PostPigActivityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMortalityArgs, "input">
  >;
  postPigMove?: Resolver<
    ResolversTypes["PostPigActivityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMoveArgs, "input">
  >;
  postPigPurchase?: Resolver<
    ResolversTypes["PostPigActivityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigPurchaseArgs, "input">
  >;
  postPigWean?: Resolver<
    ResolversTypes["PostPigActivityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigWeanArgs, "input">
  >;
  postFarrowingBackendScorecard?: Resolver<
    ResolversTypes["PostFarrowingBackendScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostFarrowingBackendScorecardArgs, "input">
  >;
  saveFarrowingBackendScorecard?: Resolver<
    ResolversTypes["SaveFarrowingBackendScorecardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSaveFarrowingBackendScorecardArgs, "input">
  >;
  setAreaOperator?: Resolver<
    ResolversTypes["SetAreaOperatorResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSetAreaOperatorArgs, "input">
  >;
}>;

export type PigActivityDefaultsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigActivityDefaults"] = ResolversParentTypes["PigActivityDefaults"]
> = ResolversObject<{
  job?: Resolver<Maybe<ResolversTypes["Job"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PostFarrowingBackendScorecardResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostFarrowingBackendScorecardResult"] = ResolversParentTypes["PostFarrowingBackendScorecardResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  scorecard?: Resolver<
    ResolversTypes["FarrowingBackendScorecard"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PostPigActivityResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigActivityResult"] = ResolversParentTypes["PostPigActivityResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
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
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  pigActivityJobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType
  >;
  pigActivityDefaults?: Resolver<
    ResolversTypes["PigActivityDefaults"],
    ParentType,
    ContextType
  >;
  farrowingBackendScorecards?: Resolver<
    Array<ResolversTypes["FarrowingBackendScorecard"]>,
    ParentType,
    ContextType
  >;
  farrowingBackendScorecard?: Resolver<
    Maybe<ResolversTypes["FarrowingBackendScorecard"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFarrowingBackendScorecardArgs, "area">
  >;
  farrowingBackendAreas?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType
  >;
  farrowingBackendArea?: Resolver<
    Maybe<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFarrowingBackendAreaArgs, "number">
  >;
  farrowingBackendOperators?: Resolver<
    Array<ResolversTypes["Resource"]>,
    ParentType,
    ContextType
  >;
}>;

export type ResourceResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Resource"] = ResolversParentTypes["Resource"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SaveFarrowingBackendScorecardResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SaveFarrowingBackendScorecardResult"] = ResolversParentTypes["SaveFarrowingBackendScorecardResult"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  scorecard?: Resolver<
    ResolversTypes["FarrowingBackendScorecard"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ScorecardEntryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["ScorecardEntry"] = ResolversParentTypes["ScorecardEntry"]
> = ResolversObject<{
  score?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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

export type UserResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  license?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  FarrowingBackendScorecard?: FarrowingBackendScorecardResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  LogoutResult?: LogoutResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PigActivityDefaults?: PigActivityDefaultsResolvers<ContextType>;
  PostFarrowingBackendScorecardResult?: PostFarrowingBackendScorecardResultResolvers<
    ContextType
  >;
  PostPigActivityResult?: PostPigActivityResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  SaveFarrowingBackendScorecardResult?: SaveFarrowingBackendScorecardResultResolvers<
    ContextType
  >;
  ScorecardEntry?: ScorecardEntryResolvers<ContextType>;
  SetAreaOperatorResult?: SetAreaOperatorResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphqlContext> = Resolvers<ContextType>;
