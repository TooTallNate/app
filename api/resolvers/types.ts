import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import { NavUser, NavJob, NavDimensions } from "../nav/types";
import { UserSettingsDocument } from "../models/user-settings";
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
  Date: any;
};

export type Defaults = {
  __typename?: "Defaults";
  pigJob?: Maybe<Scalars["String"]>;
  scorecardJob?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type DefaultsInput = {
  pigJob?: Maybe<Scalars["String"]>;
  scorecardJob?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  site: Scalars["String"];
  dimensions: JobDimensions;
};

export type JobDimensions = {
  __typename?: "JobDimensions";
  costCenter?: Maybe<Scalars["String"]>;
  entity?: Maybe<Scalars["String"]>;
};

export type JobSearchInput = {
  status?: Maybe<Array<Scalars["String"]>>;
  postingGroup?: Maybe<Array<Scalars["String"]>>;
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: User;
  logout: Scalars["Boolean"];
  updateDefaults: Defaults;
  postItemJournal: Scalars["Boolean"];
  postJobJournal: Scalars["Boolean"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationUpdateDefaultsArgs = {
  input: DefaultsInput;
};

export type MutationPostItemJournalArgs = {
  input: PostItemJournalInput;
};

export type MutationPostJobJournalArgs = {
  input: PostJobJournalInput;
};

export type PostItemJournalInput = {
  template: Scalars["String"];
  batch: Scalars["String"];
  date: Scalars["Date"];
  entryType: Scalars["String"];
  document: Scalars["String"];
  item: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  location: Scalars["String"];
  quantity: Scalars["Float"];
  amount: Scalars["Float"];
  weight: Scalars["Float"];
  job: Scalars["String"];
  prodPostingGroup?: Maybe<Scalars["String"]>;
  costCenterCode?: Maybe<Scalars["String"]>;
  entityType?: Maybe<Scalars["String"]>;
};

export type PostJobJournalInput = {
  template: Scalars["String"];
  batch: Scalars["String"];
  date: Scalars["Date"];
  document: Scalars["String"];
  job: Scalars["String"];
  location: Scalars["String"];
  task: Scalars["String"];
  number: Scalars["String"];
  workType: Scalars["String"];
  quantity: Scalars["Float"];
  unitPrice: Scalars["Float"];
  description?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  defaults: Defaults;
  jobs: Array<Job>;
};

export type QueryJobsArgs = {
  input?: Maybe<JobSearchInput>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  domain: Scalars["String"];
  license: Scalars["String"];
  name: Scalars["String"];
};

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "id" | "username" | "name">;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type PostItemMutationVariables = {
  input: PostItemJournalInput;
};

export type PostItemMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "postItemJournal"
>;

export type PostJobMutationVariables = {
  input: PostJobJournalInput;
};

export type PostJobMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "postJobJournal"
>;

export type UpdateDefaultsMutationVariables = {
  input: DefaultsInput;
};

export type UpdateDefaultsMutation = { __typename?: "Mutation" } & {
  updateDefaults: { __typename?: "Defaults" } & Pick<
    Defaults,
    "pigJob" | "scorecardJob" | "price"
  >;
};

export type DefaultsQueryVariables = {};

export type DefaultsQuery = { __typename?: "Query" } & {
  defaults: { __typename?: "Defaults" } & Pick<
    Defaults,
    "pigJob" | "scorecardJob" | "price"
  >;
};

export type JobsQueryVariables = {
  input?: Maybe<JobSearchInput>;
};

export type JobsQuery = { __typename?: "Query" } & {
  jobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "site"> & {
        dimensions: { __typename?: "JobDimensions" } & Pick<
          JobDimensions,
          "costCenter" | "entity"
        >;
      }
  >;
};

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username" | "name">>;
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
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Defaults: ResolverTypeWrapper<UserSettingsDocument>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  JobSearchInput: JobSearchInput;
  Job: ResolverTypeWrapper<NavJob>;
  JobDimensions: ResolverTypeWrapper<NavDimensions>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  DefaultsInput: DefaultsInput;
  PostItemJournalInput: PostItemJournalInput;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  PostJobJournalInput: PostJobJournalInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  User: NavUser;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Defaults: UserSettingsDocument;
  Float: Scalars["Float"];
  JobSearchInput: JobSearchInput;
  Job: NavJob;
  JobDimensions: NavDimensions;
  Mutation: {};
  LoginInput: LoginInput;
  Boolean: Scalars["Boolean"];
  DefaultsInput: DefaultsInput;
  PostItemJournalInput: PostItemJournalInput;
  Date: Scalars["Date"];
  PostJobJournalInput: PostJobJournalInput;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type DefaultsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Defaults"] = ResolversParentTypes["Defaults"]
> = ResolversObject<{
  pigJob?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  scorecardJob?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
}>;

export type JobResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Job"] = ResolversParentTypes["Job"]
> = ResolversObject<{
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  site?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dimensions?: Resolver<
    ResolversTypes["JobDimensions"],
    ParentType,
    ContextType
  >;
}>;

export type JobDimensionsResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["JobDimensions"] = ResolversParentTypes["JobDimensions"]
> = ResolversObject<{
  costCenter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  entity?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  updateDefaults?: Resolver<
    ResolversTypes["Defaults"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDefaultsArgs, "input">
  >;
  postItemJournal?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationPostItemJournalArgs, "input">
  >;
  postJobJournal?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationPostJobJournalArgs, "input">
  >;
}>;

export type QueryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  defaults?: Resolver<ResolversTypes["Defaults"], ParentType, ContextType>;
  jobs?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    QueryJobsArgs
  >;
}>;

export type UserResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  license?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  Defaults?: DefaultsResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  JobDimensions?: JobDimensionsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphqlContext> = Resolvers<ContextType>;
