import { GraphQLResolveInfo } from "graphql";
import { NavUser, NavJob } from "../nav";
import { PigActivityMapper, FarrowingBackendScorecardMapper } from "./mappers";
import { GraphqlContext } from "../context";
export type Maybe<T> = T | null;
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
  areas: Array<Job>;
};

export type FarrowingBackendScorecardInput = {
  area: Scalars["String"];
  sows: ScorecardEntry;
  piglets: ScorecardEntry;
  feed: ScorecardEntry;
  water: ScorecardEntry;
  crate: ScorecardEntry;
  room: ScorecardEntry;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  description: Scalars["String"];
  personResponsible: Scalars["String"];
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: User;
  logout: Scalars["Boolean"];
  postPigAdjustment: PigActivity;
  postPigGradeOff: PigActivity;
  postPigMortality: PigActivity;
  postPigMove: PigActivity;
  postPigPurchase: PigActivity;
  postPigWean: PigActivity;
  postFarrowingBackendScorecard: Scalars["Boolean"];
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

export type PigActivity = {
  __typename?: "PigActivity";
  jobs: Array<Job>;
  defaultJob?: Maybe<Job>;
  defaultPrice?: Maybe<Scalars["Float"]>;
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

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  pigActivity: PigActivity;
  farrowingBackendScorecard: FarrowingBackendScorecard;
};

export type ScorecardEntry = {
  score: Scalars["Int"];
  comments?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  username: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
};

export type PigActivityDefaultsFragment = { __typename?: "PigActivity" } & Pick<
  PigActivity,
  "defaultPrice"
> & { defaultJob: Maybe<{ __typename?: "Job" } & Pick<Job, "number">> };

export type PigActivityQueryVariables = {};

export type PigActivityQuery = { __typename?: "Query" } & {
  pigActivity: { __typename?: "PigActivity" } & {
    jobs: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
  } & PigActivityDefaultsFragment;
};

export type PostPigMoveMutationVariables = {
  input: PigMoveInput;
};

export type PostPigMoveMutation = { __typename?: "Mutation" } & {
  postPigMove: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigAdjustmentMutationVariables = {
  input: PigAdjustmentInput;
};

export type PostPigAdjustmentMutation = { __typename?: "Mutation" } & {
  postPigAdjustment: {
    __typename?: "PigActivity";
  } & PigActivityDefaultsFragment;
};

export type PostPigGradeOffMutationVariables = {
  input: PigGradeOffInput;
};

export type PostPigGradeOffMutation = { __typename?: "Mutation" } & {
  postPigGradeOff: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigWeanMutationVariables = {
  input: PigWeanInput;
};

export type PostPigWeanMutation = { __typename?: "Mutation" } & {
  postPigWean: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigPurchaseMutationVariables = {
  input: PigPurchaseInput;
};

export type PostPigPurchaseMutation = { __typename?: "Mutation" } & {
  postPigPurchase: { __typename?: "PigActivity" } & PigActivityDefaultsFragment;
};

export type PostPigMortalityMutationVariables = {
  input: PigMortalityInput;
};

export type PostPigMortalityMutation = { __typename?: "Mutation" } & {
  postPigMortality: {
    __typename?: "PigActivity";
  } & PigActivityDefaultsFragment;
};

export type FarrowingBackendScorecardQueryVariables = {};

export type FarrowingBackendScorecardQuery = { __typename?: "Query" } & {
  farrowingBackendScorecard: { __typename?: "FarrowingBackendScorecard" } & {
    areas: Array<
      { __typename?: "Job" } & Pick<
        Job,
        "number" | "description" | "personResponsible"
      >
    >;
  };
};

export type PostFarrowingBackendScorecardMutationVariables = {
  input: FarrowingBackendScorecardInput;
};

export type PostFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "postFarrowingBackendScorecard">;

export type UserPartsFragment = { __typename?: "User" } & Pick<
  User,
  "username" | "name"
>;

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & UserPartsFragment;
};

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserPartsFragment>;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

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
  PigActivity: ResolverTypeWrapper<PigActivityMapper>;
  Job: ResolverTypeWrapper<NavJob>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  FarrowingBackendScorecard: ResolverTypeWrapper<
    FarrowingBackendScorecardMapper
  >;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  PigAdjustmentInput: PigAdjustmentInput;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  PigGradeOffInput: PigGradeOffInput;
  PigMortalityInput: PigMortalityInput;
  PigMoveInput: PigMoveInput;
  PigPurchaseInput: PigPurchaseInput;
  PigWeanInput: PigWeanInput;
  FarrowingBackendScorecardInput: FarrowingBackendScorecardInput;
  ScorecardEntry: ScorecardEntry;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  User: NavUser;
  String: Scalars["String"];
  PigActivity: PigActivityMapper;
  Job: NavJob;
  Float: Scalars["Float"];
  FarrowingBackendScorecard: FarrowingBackendScorecardMapper;
  Mutation: {};
  LoginInput: LoginInput;
  Boolean: Scalars["Boolean"];
  PigAdjustmentInput: PigAdjustmentInput;
  Int: Scalars["Int"];
  PigGradeOffInput: PigGradeOffInput;
  PigMortalityInput: PigMortalityInput;
  PigMoveInput: PigMoveInput;
  PigPurchaseInput: PigPurchaseInput;
  PigWeanInput: PigWeanInput;
  FarrowingBackendScorecardInput: FarrowingBackendScorecardInput;
  ScorecardEntry: ScorecardEntry;
}>;

export type FarrowingBackendScorecardResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["FarrowingBackendScorecard"] = ResolversParentTypes["FarrowingBackendScorecard"]
> = ResolversObject<{
  areas?: Resolver<Array<ResolversTypes["Job"]>, ParentType, ContextType>;
}>;

export type JobResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Job"] = ResolversParentTypes["Job"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  personResponsible?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
}>;

export type MutationResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  login?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  logout?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  postPigAdjustment?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigAdjustmentArgs, "input">
  >;
  postPigGradeOff?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigGradeOffArgs, "input">
  >;
  postPigMortality?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMortalityArgs, "input">
  >;
  postPigMove?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMoveArgs, "input">
  >;
  postPigPurchase?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigPurchaseArgs, "input">
  >;
  postPigWean?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigWeanArgs, "input">
  >;
  postFarrowingBackendScorecard?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationPostFarrowingBackendScorecardArgs, "input">
  >;
}>;

export type PigActivityResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigActivity"] = ResolversParentTypes["PigActivity"]
> = ResolversObject<{
  jobs?: Resolver<Array<ResolversTypes["Job"]>, ParentType, ContextType>;
  defaultJob?: Resolver<Maybe<ResolversTypes["Job"]>, ParentType, ContextType>;
  defaultPrice?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
}>;

export type QueryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  pigActivity?: Resolver<
    ResolversTypes["PigActivity"],
    ParentType,
    ContextType
  >;
  farrowingBackendScorecard?: Resolver<
    ResolversTypes["FarrowingBackendScorecard"],
    ParentType,
    ContextType
  >;
}>;

export type UserResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  license?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  FarrowingBackendScorecard?: FarrowingBackendScorecardResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PigActivity?: PigActivityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphqlContext> = Resolvers<ContextType>;
