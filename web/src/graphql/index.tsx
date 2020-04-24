import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
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

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  description: Scalars["String"];
  personResponsible: Resource;
  inventory?: Maybe<Scalars["Int"]>;
  deadQuantity?: Maybe<Scalars["Int"]>;
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
  postPigAdjustment: PostPigAdjustmentResult;
  savePigAdjustment: SavePigAdjustmentResult;
  postPigGradeOff: PostPigGradeOffResult;
  savePigGradeOff: SavePigGradeOffResult;
  postPigMortality: PostPigMortalityResult;
  savePigMortality: SavePigMortalityResult;
  postPigMove: PostPigMoveResult;
  savePigMove: SavePigMoveResult;
  postPigPurchase: PostPigPurchaseResult;
  savePigPurchase: SavePigPurchaseResult;
  postPigWean: PostPigWeanResult;
  savePigWean: SavePigWeanResult;
  postFarrowingBackendScorecard: PostFarrowingBackendScorecardResult;
  saveFarrowingBackendScorecard: SaveFarrowingBackendScorecardResult;
  setAreaOperator: SetAreaOperatorResult;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostPigAdjustmentArgs = {
  input: PostPigAdjustmentInput;
};

export type MutationSavePigAdjustmentArgs = {
  input: SavePigAdjustmentInput;
};

export type MutationPostPigGradeOffArgs = {
  input: PostPigGradeOffInput;
};

export type MutationSavePigGradeOffArgs = {
  input: SavePigGradeOffInput;
};

export type MutationPostPigMortalityArgs = {
  input: PostPigMortalityInput;
};

export type MutationSavePigMortalityArgs = {
  input: SavePigMortalityInput;
};

export type MutationPostPigMoveArgs = {
  input: PostPigMoveInput;
};

export type MutationSavePigMoveArgs = {
  input: SavePigMoveInput;
};

export type MutationPostPigPurchaseArgs = {
  input: PostPigPurchaseInput;
};

export type MutationSavePigPurchaseArgs = {
  input: SavePigPurchaseInput;
};

export type MutationPostPigWeanArgs = {
  input: PostPigWeanInput;
};

export type MutationSavePigWeanArgs = {
  input: SavePigWeanInput;
};

export type MutationPostFarrowingBackendScorecardArgs = {
  input: PostFarrowingBackendScorecardInput;
};

export type MutationSaveFarrowingBackendScorecardArgs = {
  input: SaveFarrowingBackendScorecardInput;
};

export type MutationSetAreaOperatorArgs = {
  input: SetAreaOperatorInput;
};

export type PigActivityDefaults = {
  __typename?: "PigActivityDefaults";
  job?: Maybe<Job>;
  price?: Maybe<Scalars["Float"]>;
};

export type PigAdjustment = {
  __typename?: "PigAdjustment";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigGradeOff = {
  __typename?: "PigGradeOff";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMortality = {
  __typename?: "PigMortality";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigMove = {
  __typename?: "PigMove";
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Job;
  toJob?: Maybe<Job>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigPurchase = {
  __typename?: "PigPurchase";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type PigWean = {
  __typename?: "PigWean";
  animal?: Maybe<Scalars["String"]>;
  job: Job;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
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

export type PostFarrowingBackendScorecardResult = {
  __typename?: "PostFarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
};

export type PostPigAdjustmentInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigAdjustmentResult = {
  __typename?: "PostPigAdjustmentResult";
  success: Scalars["Boolean"];
  pigAdjustment: PigAdjustment;
  defaults: PigActivityDefaults;
};

export type PostPigGradeOffInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigGradeOffResult = {
  __typename?: "PostPigGradeOffResult";
  success: Scalars["Boolean"];
  pigGradeOff: PigGradeOff;
  defaults: PigActivityDefaults;
};

export type PostPigMortalityInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  naturalQuantity: Scalars["Int"];
  euthanizedQuantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMortalityResult = {
  __typename?: "PostPigMortalityResult";
  success: Scalars["Boolean"];
  pigMortality: PigMortality;
  defaults: PigActivityDefaults;
};

export type PostPigMoveInput = {
  fromAnimal: Scalars["String"];
  toAnimal: Scalars["String"];
  fromJob: Scalars["String"];
  toJob: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigMoveResult = {
  __typename?: "PostPigMoveResult";
  success: Scalars["Boolean"];
  pigMove: PigMove;
  defaults: PigActivityDefaults;
};

export type PostPigPurchaseInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigPurchaseResult = {
  __typename?: "PostPigPurchaseResult";
  success: Scalars["Boolean"];
  pigPurchase: PigPurchase;
  defaults: PigActivityDefaults;
};

export type PostPigWeanInput = {
  animal: Scalars["String"];
  job: Scalars["String"];
  quantity: Scalars["Int"];
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  weight: Scalars["Float"];
  price: Scalars["Float"];
  comments?: Maybe<Scalars["String"]>;
};

export type PostPigWeanResult = {
  __typename?: "PostPigWeanResult";
  success: Scalars["Boolean"];
  pigWean: PigWean;
  defaults: PigActivityDefaults;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  pigActivityJobs: Array<Job>;
  pigActivityDefaults: PigActivityDefaults;
  pigAdjustment: PigAdjustment;
  pigGradeOff: PigGradeOff;
  pigMortality: PigMortality;
  pigMove: PigMove;
  pigPurchase: PigPurchase;
  pigWean: PigWean;
  farrowingBackendScorecard?: Maybe<FarrowingBackendScorecard>;
  farrowingBackendAreas: Array<Job>;
  farrowingBackendArea?: Maybe<Job>;
  farrowingBackendOperators: Array<Resource>;
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

export type SaveFarrowingBackendScorecardResult = {
  __typename?: "SaveFarrowingBackendScorecardResult";
  success: Scalars["Boolean"];
  scorecard: FarrowingBackendScorecard;
};

export type SavePigAdjustmentInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigAdjustmentResult = {
  __typename?: "SavePigAdjustmentResult";
  success: Scalars["Boolean"];
  pigAdjustment: PigAdjustment;
  defaults: PigActivityDefaults;
};

export type SavePigGradeOffInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigGradeOffResult = {
  __typename?: "SavePigGradeOffResult";
  success: Scalars["Boolean"];
  pigGradeOff: PigGradeOff;
  defaults: PigActivityDefaults;
};

export type SavePigMortalityInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  naturalQuantity?: Maybe<Scalars["Int"]>;
  euthanizedQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMortalityResult = {
  __typename?: "SavePigMortalityResult";
  success: Scalars["Boolean"];
  pigMortality: PigMortality;
  defaults: PigActivityDefaults;
};

export type SavePigMoveInput = {
  fromAnimal?: Maybe<Scalars["String"]>;
  toAnimal?: Maybe<Scalars["String"]>;
  fromJob: Scalars["String"];
  toJob?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigMoveResult = {
  __typename?: "SavePigMoveResult";
  success: Scalars["Boolean"];
  pigMove: PigMove;
  defaults: PigActivityDefaults;
};

export type SavePigPurchaseInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigPurchaseResult = {
  __typename?: "SavePigPurchaseResult";
  success: Scalars["Boolean"];
  pigPurchase: PigPurchase;
  defaults: PigActivityDefaults;
};

export type SavePigWeanInput = {
  animal?: Maybe<Scalars["String"]>;
  job: Scalars["String"];
  quantity?: Maybe<Scalars["Int"]>;
  smallPigQuantity?: Maybe<Scalars["Int"]>;
  weight?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  comments?: Maybe<Scalars["String"]>;
};

export type SavePigWeanResult = {
  __typename?: "SavePigWeanResult";
  success: Scalars["Boolean"];
  pigWean: PigWean;
  defaults: PigActivityDefaults;
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

export type PigActivityJobsQueryVariables = {};

export type PigActivityJobsQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & {
    job: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  };
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
  "animal" | "quantity" | "weight" | "price" | "comments"
> & { job: { __typename?: "Job" } & Pick<Job, "number" | "description"> };

export type PigAdjustmentQueryVariables = {
  job: Scalars["String"];
};

export type PigAdjustmentQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & Pick<
    PigActivityDefaults,
    "price"
  >;
  pigAdjustment: {
    __typename?: "PigAdjustment";
  } & PigAdjustmentFragmentFragment;
};

export type SavePigAdjustmentMutationVariables = {
  input: SavePigAdjustmentInput;
};

export type SavePigAdjustmentMutation = { __typename?: "Mutation" } & {
  savePigAdjustment: { __typename?: "SavePigAdjustmentResult" } & {
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
  postPigAdjustment: { __typename?: "PostPigAdjustmentResult" } & {
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
  "animal" | "quantity" | "weight" | "price" | "comments"
> & { job: { __typename?: "Job" } & Pick<Job, "number" | "description"> };

export type PigGradeOffQueryVariables = {
  job: Scalars["String"];
};

export type PigGradeOffQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & Pick<
    PigActivityDefaults,
    "price"
  >;
  pigGradeOff: { __typename?: "PigGradeOff" } & PigGradeOffFragmentFragment;
};

export type SavePigGradeOffMutationVariables = {
  input: SavePigGradeOffInput;
};

export type SavePigGradeOffMutation = { __typename?: "Mutation" } & {
  savePigGradeOff: { __typename?: "SavePigGradeOffResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigGradeOff: { __typename?: "PigGradeOff" } & PigGradeOffFragmentFragment;
  };
};

export type PostPigGradeOffMutationVariables = {
  input: PostPigGradeOffInput;
};

export type PostPigGradeOffMutation = { __typename?: "Mutation" } & {
  postPigGradeOff: { __typename?: "PostPigGradeOffResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigGradeOff: { __typename?: "PigGradeOff" } & PigGradeOffFragmentFragment;
  };
};

export type PigMortalityFragmentFragment = {
  __typename?: "PigMortality";
} & Pick<
  PigMortality,
  | "animal"
  | "naturalQuantity"
  | "euthanizedQuantity"
  | "weight"
  | "price"
  | "comments"
> & { job: { __typename?: "Job" } & Pick<Job, "number" | "description"> };

export type PigMortalityQueryVariables = {
  job: Scalars["String"];
};

export type PigMortalityQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & Pick<
    PigActivityDefaults,
    "price"
  >;
  pigMortality: { __typename?: "PigMortality" } & PigMortalityFragmentFragment;
};

export type SavePigMortalityMutationVariables = {
  input: SavePigMortalityInput;
};

export type SavePigMortalityMutation = { __typename?: "Mutation" } & {
  savePigMortality: { __typename?: "SavePigMortalityResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigMortality: {
      __typename?: "PigMortality";
    } & PigMortalityFragmentFragment;
  };
};

export type PostPigMortalityMutationVariables = {
  input: PostPigMortalityInput;
};

export type PostPigMortalityMutation = { __typename?: "Mutation" } & {
  postPigMortality: { __typename?: "PostPigMortalityResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigMortality: {
      __typename?: "PigMortality";
    } & PigMortalityFragmentFragment;
  };
};

export type PigMoveFragmentFragment = { __typename?: "PigMove" } & Pick<
  PigMove,
  | "fromAnimal"
  | "toAnimal"
  | "quantity"
  | "smallPigQuantity"
  | "weight"
  | "price"
  | "comments"
> & {
    fromJob: { __typename?: "Job" } & Pick<Job, "number" | "description">;
    toJob: Maybe<{ __typename?: "Job" } & Pick<Job, "number">>;
  };

export type PigMoveQueryVariables = {
  job: Scalars["String"];
};

export type PigMoveQuery = { __typename?: "Query" } & {
  pigActivityJobs: Array<
    { __typename?: "Job" } & Pick<Job, "number" | "description">
  >;
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & Pick<
    PigActivityDefaults,
    "price"
  >;
  pigMove: { __typename?: "PigMove" } & PigMoveFragmentFragment;
};

export type SavePigMoveMutationVariables = {
  input: SavePigMoveInput;
};

export type SavePigMoveMutation = { __typename?: "Mutation" } & {
  savePigMove: { __typename?: "SavePigMoveResult" } & {
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
  postPigMove: { __typename?: "PostPigMoveResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigMove: { __typename?: "PigMove" } & PigMoveFragmentFragment;
  };
};

export type PigPurchaseFragmentFragment = { __typename?: "PigPurchase" } & Pick<
  PigPurchase,
  "animal" | "quantity" | "weight" | "price" | "comments"
> & { job: { __typename?: "Job" } & Pick<Job, "number" | "description"> };

export type PigPurchaseQueryVariables = {
  job: Scalars["String"];
};

export type PigPurchaseQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & Pick<
    PigActivityDefaults,
    "price"
  >;
  pigPurchase: { __typename?: "PigPurchase" } & PigPurchaseFragmentFragment;
};

export type SavePigPurchaseMutationVariables = {
  input: SavePigPurchaseInput;
};

export type SavePigPurchaseMutation = { __typename?: "Mutation" } & {
  savePigPurchase: { __typename?: "SavePigPurchaseResult" } & {
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
  postPigPurchase: { __typename?: "PostPigPurchaseResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigPurchase: { __typename?: "PigPurchase" } & PigPurchaseFragmentFragment;
  };
};

export type PigWeanFragmentFragment = { __typename?: "PigWean" } & Pick<
  PigWean,
  "animal" | "quantity" | "smallPigQuantity" | "weight" | "price" | "comments"
> & { job: { __typename?: "Job" } & Pick<Job, "number" | "description"> };

export type PigWeanQueryVariables = {
  job: Scalars["String"];
};

export type PigWeanQuery = { __typename?: "Query" } & {
  pigActivityDefaults: { __typename?: "PigActivityDefaults" } & Pick<
    PigActivityDefaults,
    "price"
  >;
  pigWean: { __typename?: "PigWean" } & PigWeanFragmentFragment;
};

export type SavePigWeanMutationVariables = {
  input: SavePigWeanInput;
};

export type SavePigWeanMutation = { __typename?: "Mutation" } & {
  savePigWean: { __typename?: "SavePigWeanResult" } & {
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
  postPigWean: { __typename?: "PostPigWeanResult" } & {
    defaults: {
      __typename?: "PigActivityDefaults";
    } & PigActivityDefaultsFragmentFragment;
    pigWean: { __typename?: "PigWean" } & PigWeanFragmentFragment;
  };
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

export type FarrowingBackendScorecardFieldsFragment = {
  __typename?: "FarrowingBackendScorecard";
} & {
  area: { __typename?: "Job" } & Pick<Job, "number">;
  operator: Maybe<{ __typename?: "Resource" } & Pick<Resource, "number">>;
  sows: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  piglets: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  feed: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  water: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  crate: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
  room: { __typename?: "ScorecardEntry" } & Pick<
    ScorecardEntry,
    "score" | "comments"
  >;
};

export type FarrowingBackendScorecardAreasQueryVariables = {};

export type FarrowingBackendScorecardAreasQuery = { __typename?: "Query" } & {
  areas: Array<{ __typename?: "Job" } & Pick<Job, "number" | "description">>;
};

export type FarrowingBackendScorecardQueryVariables = {
  area: Scalars["String"];
};

export type FarrowingBackendScorecardQuery = { __typename?: "Query" } & {
  area: Maybe<
    { __typename?: "Job" } & Pick<Job, "number" | "description"> & {
        personResponsible: { __typename?: "Resource" } & Pick<
          Resource,
          "number"
        >;
      }
  >;
  operators: Array<
    { __typename?: "Resource" } & Pick<Resource, "number" | "name">
  >;
  scorecard: Maybe<
    {
      __typename?: "FarrowingBackendScorecard";
    } & FarrowingBackendScorecardFieldsFragment
  >;
};

export type FarrowingBackendOperatorsQueryVariables = {
  area: Scalars["String"];
};

export type FarrowingBackendOperatorsQuery = { __typename?: "Query" } & {
  area: Maybe<{ __typename?: "Job" } & FarrowingBackendAreaFieldsFragment>;
  operators: Array<
    { __typename?: "Resource" } & Pick<Resource, "number" | "name">
  >;
};

export type PostFarrowingBackendScorecardMutationVariables = {
  input: PostFarrowingBackendScorecardInput;
};

export type PostFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & {
  postFarrowingBackendScorecard: {
    __typename?: "PostFarrowingBackendScorecardResult";
  } & Pick<PostFarrowingBackendScorecardResult, "success"> & {
      scorecard: {
        __typename?: "FarrowingBackendScorecard";
      } & FarrowingBackendScorecardFieldsFragment;
    };
};

export type SaveFarrowingBackendScorecardMutationVariables = {
  input: SaveFarrowingBackendScorecardInput;
};

export type SaveFarrowingBackendScorecardMutation = {
  __typename?: "Mutation";
} & {
  saveFarrowingBackendScorecard: {
    __typename?: "SaveFarrowingBackendScorecardResult";
  } & Pick<SaveFarrowingBackendScorecardResult, "success"> & {
      scorecard: {
        __typename?: "FarrowingBackendScorecard";
      } & FarrowingBackendScorecardFieldsFragment;
    };
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

export const PigActivityDefaultsFragmentFragmentDoc = gql`
  fragment PigActivityDefaultsFragment on PigActivityDefaults {
    job {
      number
    }
    price
  }
`;
export const PigAdjustmentFragmentFragmentDoc = gql`
  fragment PigAdjustmentFragment on PigAdjustment {
    animal
    job {
      number
      description
    }
    quantity
    weight
    price
    comments
  }
`;
export const PigGradeOffFragmentFragmentDoc = gql`
  fragment PigGradeOffFragment on PigGradeOff {
    animal
    job {
      number
      description
    }
    quantity
    weight
    price
    comments
  }
`;
export const PigMortalityFragmentFragmentDoc = gql`
  fragment PigMortalityFragment on PigMortality {
    animal
    job {
      number
      description
    }
    naturalQuantity
    euthanizedQuantity
    weight
    price
    comments
  }
`;
export const PigMoveFragmentFragmentDoc = gql`
  fragment PigMoveFragment on PigMove {
    fromAnimal
    toAnimal
    fromJob {
      number
      description
    }
    toJob {
      number
    }
    quantity
    smallPigQuantity
    weight
    price
    comments
  }
`;
export const PigPurchaseFragmentFragmentDoc = gql`
  fragment PigPurchaseFragment on PigPurchase {
    animal
    job {
      number
      description
    }
    quantity
    weight
    price
    comments
  }
`;
export const PigWeanFragmentFragmentDoc = gql`
  fragment PigWeanFragment on PigWean {
    animal
    job {
      number
      description
    }
    quantity
    smallPigQuantity
    weight
    price
    comments
  }
`;
export const FarrowingBackendAreaFieldsFragmentDoc = gql`
  fragment FarrowingBackendAreaFields on Job {
    number
    description
    personResponsible {
      name
      number
    }
  }
`;
export const FarrowingBackendScorecardFieldsFragmentDoc = gql`
  fragment FarrowingBackendScorecardFields on FarrowingBackendScorecard {
    area {
      number
    }
    operator {
      number
    }
    sows {
      score
      comments
    }
    piglets {
      score
      comments
    }
    feed {
      score
      comments
    }
    water {
      score
      comments
    }
    crate {
      score
      comments
    }
    room {
      score
      comments
    }
  }
`;
export const UserPartsFragmentDoc = gql`
  fragment UserParts on User {
    username
    name
  }
`;
export const PigActivityJobsDocument = gql`
  query PigActivityJobs {
    pigActivityDefaults {
      job {
        number
      }
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigActivityJobsQuery,
    PigActivityJobsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PigActivityJobsQuery,
    PigActivityJobsQueryVariables
  >(PigActivityJobsDocument, baseOptions);
}
export function usePigActivityJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigActivityJobsQuery,
    PigActivityJobsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
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
export type PigActivityJobsQueryResult = ApolloReactCommon.QueryResult<
  PigActivityJobsQuery,
  PigActivityJobsQueryVariables
>;
export const PigAdjustmentDocument = gql`
  query PigAdjustment($job: String!) {
    pigActivityDefaults {
      price
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigAdjustmentQuery,
    PigAdjustmentQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PigAdjustmentQuery,
    PigAdjustmentQueryVariables
  >(PigAdjustmentDocument, baseOptions);
}
export function usePigAdjustmentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigAdjustmentQuery,
    PigAdjustmentQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PigAdjustmentQuery,
    PigAdjustmentQueryVariables
  >(PigAdjustmentDocument, baseOptions);
}
export type PigAdjustmentQueryHookResult = ReturnType<
  typeof usePigAdjustmentQuery
>;
export type PigAdjustmentLazyQueryHookResult = ReturnType<
  typeof usePigAdjustmentLazyQuery
>;
export type PigAdjustmentQueryResult = ApolloReactCommon.QueryResult<
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
export type SavePigAdjustmentMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SavePigAdjustmentMutation,
    SavePigAdjustmentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SavePigAdjustmentMutation,
    SavePigAdjustmentMutationVariables
  >(SavePigAdjustmentDocument, baseOptions);
}
export type SavePigAdjustmentMutationHookResult = ReturnType<
  typeof useSavePigAdjustmentMutation
>;
export type SavePigAdjustmentMutationResult = ApolloReactCommon.MutationResult<
  SavePigAdjustmentMutation
>;
export type SavePigAdjustmentMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type PostPigAdjustmentMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigAdjustmentMutation,
    PostPigAdjustmentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigAdjustmentMutation,
    PostPigAdjustmentMutationVariables
  >(PostPigAdjustmentDocument, baseOptions);
}
export type PostPigAdjustmentMutationHookResult = ReturnType<
  typeof usePostPigAdjustmentMutation
>;
export type PostPigAdjustmentMutationResult = ApolloReactCommon.MutationResult<
  PostPigAdjustmentMutation
>;
export type PostPigAdjustmentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigAdjustmentMutation,
  PostPigAdjustmentMutationVariables
>;
export const PigGradeOffDocument = gql`
  query PigGradeOff($job: String!) {
    pigActivityDefaults {
      price
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigGradeOffQuery,
    PigGradeOffQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PigGradeOffQuery, PigGradeOffQueryVariables>(
    PigGradeOffDocument,
    baseOptions
  );
}
export function usePigGradeOffLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigGradeOffQuery,
    PigGradeOffQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PigGradeOffQuery,
    PigGradeOffQueryVariables
  >(PigGradeOffDocument, baseOptions);
}
export type PigGradeOffQueryHookResult = ReturnType<typeof usePigGradeOffQuery>;
export type PigGradeOffLazyQueryHookResult = ReturnType<
  typeof usePigGradeOffLazyQuery
>;
export type PigGradeOffQueryResult = ApolloReactCommon.QueryResult<
  PigGradeOffQuery,
  PigGradeOffQueryVariables
>;
export const SavePigGradeOffDocument = gql`
  mutation SavePigGradeOff($input: SavePigGradeOffInput!) {
    savePigGradeOff(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigGradeOff {
        ...PigGradeOffFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigGradeOffFragmentFragmentDoc}
`;
export type SavePigGradeOffMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SavePigGradeOffMutation,
    SavePigGradeOffMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SavePigGradeOffMutation,
    SavePigGradeOffMutationVariables
  >(SavePigGradeOffDocument, baseOptions);
}
export type SavePigGradeOffMutationHookResult = ReturnType<
  typeof useSavePigGradeOffMutation
>;
export type SavePigGradeOffMutationResult = ApolloReactCommon.MutationResult<
  SavePigGradeOffMutation
>;
export type SavePigGradeOffMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SavePigGradeOffMutation,
  SavePigGradeOffMutationVariables
>;
export const PostPigGradeOffDocument = gql`
  mutation PostPigGradeOff($input: PostPigGradeOffInput!) {
    postPigGradeOff(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigGradeOff {
        ...PigGradeOffFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigGradeOffFragmentFragmentDoc}
`;
export type PostPigGradeOffMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigGradeOffMutation,
    PostPigGradeOffMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigGradeOffMutation,
    PostPigGradeOffMutationVariables
  >(PostPigGradeOffDocument, baseOptions);
}
export type PostPigGradeOffMutationHookResult = ReturnType<
  typeof usePostPigGradeOffMutation
>;
export type PostPigGradeOffMutationResult = ApolloReactCommon.MutationResult<
  PostPigGradeOffMutation
>;
export type PostPigGradeOffMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigGradeOffMutation,
  PostPigGradeOffMutationVariables
>;
export const PigMortalityDocument = gql`
  query PigMortality($job: String!) {
    pigActivityDefaults {
      price
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigMortalityQuery,
    PigMortalityQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PigMortalityQuery,
    PigMortalityQueryVariables
  >(PigMortalityDocument, baseOptions);
}
export function usePigMortalityLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigMortalityQuery,
    PigMortalityQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PigMortalityQuery,
    PigMortalityQueryVariables
  >(PigMortalityDocument, baseOptions);
}
export type PigMortalityQueryHookResult = ReturnType<
  typeof usePigMortalityQuery
>;
export type PigMortalityLazyQueryHookResult = ReturnType<
  typeof usePigMortalityLazyQuery
>;
export type PigMortalityQueryResult = ApolloReactCommon.QueryResult<
  PigMortalityQuery,
  PigMortalityQueryVariables
>;
export const SavePigMortalityDocument = gql`
  mutation SavePigMortality($input: SavePigMortalityInput!) {
    savePigMortality(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigMortality {
        ...PigMortalityFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigMortalityFragmentFragmentDoc}
`;
export type SavePigMortalityMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SavePigMortalityMutation,
    SavePigMortalityMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SavePigMortalityMutation,
    SavePigMortalityMutationVariables
  >(SavePigMortalityDocument, baseOptions);
}
export type SavePigMortalityMutationHookResult = ReturnType<
  typeof useSavePigMortalityMutation
>;
export type SavePigMortalityMutationResult = ApolloReactCommon.MutationResult<
  SavePigMortalityMutation
>;
export type SavePigMortalityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SavePigMortalityMutation,
  SavePigMortalityMutationVariables
>;
export const PostPigMortalityDocument = gql`
  mutation PostPigMortality($input: PostPigMortalityInput!) {
    postPigMortality(input: $input) {
      defaults {
        ...PigActivityDefaultsFragment
      }
      pigMortality {
        ...PigMortalityFragment
      }
    }
  }
  ${PigActivityDefaultsFragmentFragmentDoc}
  ${PigMortalityFragmentFragmentDoc}
`;
export type PostPigMortalityMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigMortalityMutation,
    PostPigMortalityMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigMortalityMutation,
    PostPigMortalityMutationVariables
  >(PostPigMortalityDocument, baseOptions);
}
export type PostPigMortalityMutationHookResult = ReturnType<
  typeof usePostPigMortalityMutation
>;
export type PostPigMortalityMutationResult = ApolloReactCommon.MutationResult<
  PostPigMortalityMutation
>;
export type PostPigMortalityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigMortalityMutation,
  PostPigMortalityMutationVariables
>;
export const PigMoveDocument = gql`
  query PigMove($job: String!) {
    pigActivityJobs {
      number
      description
    }
    pigActivityDefaults {
      price
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigMoveQuery,
    PigMoveQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PigMoveQuery, PigMoveQueryVariables>(
    PigMoveDocument,
    baseOptions
  );
}
export function usePigMoveLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigMoveQuery,
    PigMoveQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<PigMoveQuery, PigMoveQueryVariables>(
    PigMoveDocument,
    baseOptions
  );
}
export type PigMoveQueryHookResult = ReturnType<typeof usePigMoveQuery>;
export type PigMoveLazyQueryHookResult = ReturnType<typeof usePigMoveLazyQuery>;
export type PigMoveQueryResult = ApolloReactCommon.QueryResult<
  PigMoveQuery,
  PigMoveQueryVariables
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
export type SavePigMoveMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SavePigMoveMutation,
    SavePigMoveMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SavePigMoveMutation,
    SavePigMoveMutationVariables
  >(SavePigMoveDocument, baseOptions);
}
export type SavePigMoveMutationHookResult = ReturnType<
  typeof useSavePigMoveMutation
>;
export type SavePigMoveMutationResult = ApolloReactCommon.MutationResult<
  SavePigMoveMutation
>;
export type SavePigMoveMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type PostPigMoveMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigMoveMutation,
    PostPigMoveMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigMoveMutation,
    PostPigMoveMutationVariables
  >(PostPigMoveDocument, baseOptions);
}
export type PostPigMoveMutationHookResult = ReturnType<
  typeof usePostPigMoveMutation
>;
export type PostPigMoveMutationResult = ApolloReactCommon.MutationResult<
  PostPigMoveMutation
>;
export type PostPigMoveMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigMoveMutation,
  PostPigMoveMutationVariables
>;
export const PigPurchaseDocument = gql`
  query PigPurchase($job: String!) {
    pigActivityDefaults {
      price
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigPurchaseQuery,
    PigPurchaseQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PigPurchaseQuery, PigPurchaseQueryVariables>(
    PigPurchaseDocument,
    baseOptions
  );
}
export function usePigPurchaseLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigPurchaseQuery,
    PigPurchaseQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PigPurchaseQuery,
    PigPurchaseQueryVariables
  >(PigPurchaseDocument, baseOptions);
}
export type PigPurchaseQueryHookResult = ReturnType<typeof usePigPurchaseQuery>;
export type PigPurchaseLazyQueryHookResult = ReturnType<
  typeof usePigPurchaseLazyQuery
>;
export type PigPurchaseQueryResult = ApolloReactCommon.QueryResult<
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
export type SavePigPurchaseMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SavePigPurchaseMutation,
    SavePigPurchaseMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SavePigPurchaseMutation,
    SavePigPurchaseMutationVariables
  >(SavePigPurchaseDocument, baseOptions);
}
export type SavePigPurchaseMutationHookResult = ReturnType<
  typeof useSavePigPurchaseMutation
>;
export type SavePigPurchaseMutationResult = ApolloReactCommon.MutationResult<
  SavePigPurchaseMutation
>;
export type SavePigPurchaseMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type PostPigPurchaseMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigPurchaseMutation,
    PostPigPurchaseMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigPurchaseMutation,
    PostPigPurchaseMutationVariables
  >(PostPigPurchaseDocument, baseOptions);
}
export type PostPigPurchaseMutationHookResult = ReturnType<
  typeof usePostPigPurchaseMutation
>;
export type PostPigPurchaseMutationResult = ApolloReactCommon.MutationResult<
  PostPigPurchaseMutation
>;
export type PostPigPurchaseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigPurchaseMutation,
  PostPigPurchaseMutationVariables
>;
export const PigWeanDocument = gql`
  query PigWean($job: String!) {
    pigActivityDefaults {
      price
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PigWeanQuery,
    PigWeanQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PigWeanQuery, PigWeanQueryVariables>(
    PigWeanDocument,
    baseOptions
  );
}
export function usePigWeanLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PigWeanQuery,
    PigWeanQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<PigWeanQuery, PigWeanQueryVariables>(
    PigWeanDocument,
    baseOptions
  );
}
export type PigWeanQueryHookResult = ReturnType<typeof usePigWeanQuery>;
export type PigWeanLazyQueryHookResult = ReturnType<typeof usePigWeanLazyQuery>;
export type PigWeanQueryResult = ApolloReactCommon.QueryResult<
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
export type SavePigWeanMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SavePigWeanMutation,
    SavePigWeanMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SavePigWeanMutation,
    SavePigWeanMutationVariables
  >(SavePigWeanDocument, baseOptions);
}
export type SavePigWeanMutationHookResult = ReturnType<
  typeof useSavePigWeanMutation
>;
export type SavePigWeanMutationResult = ApolloReactCommon.MutationResult<
  SavePigWeanMutation
>;
export type SavePigWeanMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type PostPigWeanMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostPigWeanMutation,
    PostPigWeanMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostPigWeanMutation,
    PostPigWeanMutationVariables
  >(PostPigWeanDocument, baseOptions);
}
export type PostPigWeanMutationHookResult = ReturnType<
  typeof usePostPigWeanMutation
>;
export type PostPigWeanMutationResult = ApolloReactCommon.MutationResult<
  PostPigWeanMutation
>;
export type PostPigWeanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostPigWeanMutation,
  PostPigWeanMutationVariables
>;
export const FarrowingBackendScorecardAreasDocument = gql`
  query FarrowingBackendScorecardAreas {
    areas: farrowingBackendAreas {
      number
      description
    }
  }
`;

/**
 * __useFarrowingBackendScorecardAreasQuery__
 *
 * To run a query within a React component, call `useFarrowingBackendScorecardAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarrowingBackendScorecardAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarrowingBackendScorecardAreasQuery({
 *   variables: {
 *   },
 * });
 */
export function useFarrowingBackendScorecardAreasQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >(FarrowingBackendScorecardAreasDocument, baseOptions);
}
export function useFarrowingBackendScorecardAreasLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FarrowingBackendScorecardAreasQuery,
    FarrowingBackendScorecardAreasQueryVariables
  >(FarrowingBackendScorecardAreasDocument, baseOptions);
}
export type FarrowingBackendScorecardAreasQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardAreasQuery
>;
export type FarrowingBackendScorecardAreasLazyQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardAreasLazyQuery
>;
export type FarrowingBackendScorecardAreasQueryResult = ApolloReactCommon.QueryResult<
  FarrowingBackendScorecardAreasQuery,
  FarrowingBackendScorecardAreasQueryVariables
>;
export const FarrowingBackendScorecardDocument = gql`
  query FarrowingBackendScorecard($area: String!) {
    area: farrowingBackendArea(number: $area) {
      number
      description
      personResponsible {
        number
      }
    }
    operators: farrowingBackendOperators {
      number
      name
    }
    scorecard: farrowingBackendScorecard(area: $area) {
      ...FarrowingBackendScorecardFields
    }
  }
  ${FarrowingBackendScorecardFieldsFragmentDoc}
`;

/**
 * __useFarrowingBackendScorecardQuery__
 *
 * To run a query within a React component, call `useFarrowingBackendScorecardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarrowingBackendScorecardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarrowingBackendScorecardQuery({
 *   variables: {
 *      area: // value for 'area'
 *   },
 * });
 */
export function useFarrowingBackendScorecardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >(FarrowingBackendScorecardDocument, baseOptions);
}
export function useFarrowingBackendScorecardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FarrowingBackendScorecardQuery,
    FarrowingBackendScorecardQueryVariables
  >(FarrowingBackendScorecardDocument, baseOptions);
}
export type FarrowingBackendScorecardQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardQuery
>;
export type FarrowingBackendScorecardLazyQueryHookResult = ReturnType<
  typeof useFarrowingBackendScorecardLazyQuery
>;
export type FarrowingBackendScorecardQueryResult = ApolloReactCommon.QueryResult<
  FarrowingBackendScorecardQuery,
  FarrowingBackendScorecardQueryVariables
>;
export const FarrowingBackendOperatorsDocument = gql`
  query FarrowingBackendOperators($area: String!) {
    area: farrowingBackendArea(number: $area) {
      ...FarrowingBackendAreaFields
    }
    operators: farrowingBackendOperators {
      number
      name
    }
  }
  ${FarrowingBackendAreaFieldsFragmentDoc}
`;

/**
 * __useFarrowingBackendOperatorsQuery__
 *
 * To run a query within a React component, call `useFarrowingBackendOperatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarrowingBackendOperatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarrowingBackendOperatorsQuery({
 *   variables: {
 *      area: // value for 'area'
 *   },
 * });
 */
export function useFarrowingBackendOperatorsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >(FarrowingBackendOperatorsDocument, baseOptions);
}
export function useFarrowingBackendOperatorsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FarrowingBackendOperatorsQuery,
    FarrowingBackendOperatorsQueryVariables
  >(FarrowingBackendOperatorsDocument, baseOptions);
}
export type FarrowingBackendOperatorsQueryHookResult = ReturnType<
  typeof useFarrowingBackendOperatorsQuery
>;
export type FarrowingBackendOperatorsLazyQueryHookResult = ReturnType<
  typeof useFarrowingBackendOperatorsLazyQuery
>;
export type FarrowingBackendOperatorsQueryResult = ApolloReactCommon.QueryResult<
  FarrowingBackendOperatorsQuery,
  FarrowingBackendOperatorsQueryVariables
>;
export const PostFarrowingBackendScorecardDocument = gql`
  mutation PostFarrowingBackendScorecard(
    $input: PostFarrowingBackendScorecardInput!
  ) {
    postFarrowingBackendScorecard(input: $input) {
      success
      scorecard {
        ...FarrowingBackendScorecardFields
      }
    }
  }
  ${FarrowingBackendScorecardFieldsFragmentDoc}
`;
export type PostFarrowingBackendScorecardMutationFn = ApolloReactCommon.MutationFunction<
  PostFarrowingBackendScorecardMutation,
  PostFarrowingBackendScorecardMutationVariables
>;

/**
 * __usePostFarrowingBackendScorecardMutation__
 *
 * To run a mutation, you first call `usePostFarrowingBackendScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostFarrowingBackendScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postFarrowingBackendScorecardMutation, { data, loading, error }] = usePostFarrowingBackendScorecardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostFarrowingBackendScorecardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostFarrowingBackendScorecardMutation,
    PostFarrowingBackendScorecardMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostFarrowingBackendScorecardMutation,
    PostFarrowingBackendScorecardMutationVariables
  >(PostFarrowingBackendScorecardDocument, baseOptions);
}
export type PostFarrowingBackendScorecardMutationHookResult = ReturnType<
  typeof usePostFarrowingBackendScorecardMutation
>;
export type PostFarrowingBackendScorecardMutationResult = ApolloReactCommon.MutationResult<
  PostFarrowingBackendScorecardMutation
>;
export type PostFarrowingBackendScorecardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostFarrowingBackendScorecardMutation,
  PostFarrowingBackendScorecardMutationVariables
>;
export const SaveFarrowingBackendScorecardDocument = gql`
  mutation SaveFarrowingBackendScorecard(
    $input: SaveFarrowingBackendScorecardInput!
  ) {
    saveFarrowingBackendScorecard(input: $input) {
      success
      scorecard {
        ...FarrowingBackendScorecardFields
      }
    }
  }
  ${FarrowingBackendScorecardFieldsFragmentDoc}
`;
export type SaveFarrowingBackendScorecardMutationFn = ApolloReactCommon.MutationFunction<
  SaveFarrowingBackendScorecardMutation,
  SaveFarrowingBackendScorecardMutationVariables
>;

/**
 * __useSaveFarrowingBackendScorecardMutation__
 *
 * To run a mutation, you first call `useSaveFarrowingBackendScorecardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveFarrowingBackendScorecardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveFarrowingBackendScorecardMutation, { data, loading, error }] = useSaveFarrowingBackendScorecardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveFarrowingBackendScorecardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SaveFarrowingBackendScorecardMutation,
    SaveFarrowingBackendScorecardMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SaveFarrowingBackendScorecardMutation,
    SaveFarrowingBackendScorecardMutationVariables
  >(SaveFarrowingBackendScorecardDocument, baseOptions);
}
export type SaveFarrowingBackendScorecardMutationHookResult = ReturnType<
  typeof useSaveFarrowingBackendScorecardMutation
>;
export type SaveFarrowingBackendScorecardMutationResult = ApolloReactCommon.MutationResult<
  SaveFarrowingBackendScorecardMutation
>;
export type SaveFarrowingBackendScorecardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SaveFarrowingBackendScorecardMutation,
  SaveFarrowingBackendScorecardMutationVariables
>;
export const SetAreaOperatorDocument = gql`
  mutation SetAreaOperator($input: SetAreaOperatorInput!) {
    setAreaOperator(input: $input) {
      area {
        ...FarrowingBackendAreaFields
      }
    }
  }
  ${FarrowingBackendAreaFieldsFragmentDoc}
`;
export type SetAreaOperatorMutationFn = ApolloReactCommon.MutationFunction<
  SetAreaOperatorMutation,
  SetAreaOperatorMutationVariables
>;

/**
 * __useSetAreaOperatorMutation__
 *
 * To run a mutation, you first call `useSetAreaOperatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAreaOperatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAreaOperatorMutation, { data, loading, error }] = useSetAreaOperatorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAreaOperatorMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetAreaOperatorMutation,
    SetAreaOperatorMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetAreaOperatorMutation,
    SetAreaOperatorMutationVariables
  >(SetAreaOperatorDocument, baseOptions);
}
export type SetAreaOperatorMutationHookResult = ReturnType<
  typeof useSetAreaOperatorMutation
>;
export type SetAreaOperatorMutationResult = ApolloReactCommon.MutationResult<
  SetAreaOperatorMutation
>;
export type SetAreaOperatorMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetAreaOperatorMutation,
  SetAreaOperatorMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserParts
      }
    }
  }
  ${UserPartsFragmentDoc}
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UserDocument = gql`
  query User {
    user {
      ...UserParts
    }
  }
  ${UserPartsFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
