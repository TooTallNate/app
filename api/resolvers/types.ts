import { GraphQLResolveInfo } from "graphql";
import { NavUser, NavJob, NavResource } from "../nav";
import { PigAdjustmentDocument } from "../models/PigAdjustment";
import { PigGradeOffDocument } from "../models/PigGradeOff";
import { PigMortalityDocument } from "../models/PigMortality";
import { PigMoveDocument } from "../models/PigMove";
import { PigPurchaseDocument } from "../models/PigPurchase";
import { PigWeanDocument } from "../models/PigWean";
import { UserSettingsDocument } from "../models/UserSettings";
import { FarrowingBackendScorecardDocument } from "../models/FarrowingBackendScorecard";
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
> & {
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

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
> & {
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

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
  "animal" | "naturalQuantity" | "euthanizedQuantity" | "price" | "comments"
> & {
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

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
    fromJob: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
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
> & {
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

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
> & {
    job: { __typename?: "Job" } & Pick<
      Job,
      "number" | "description" | "inventory" | "deadQuantity"
    >;
  };

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
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  PigActivityDefaults: ResolverTypeWrapper<UserSettingsDocument>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  PigAdjustment: ResolverTypeWrapper<PigAdjustmentDocument>;
  PigGradeOff: ResolverTypeWrapper<PigGradeOffDocument>;
  PigMortality: ResolverTypeWrapper<PigMortalityDocument>;
  PigMove: ResolverTypeWrapper<PigMoveDocument>;
  PigPurchase: ResolverTypeWrapper<PigPurchaseDocument>;
  PigWean: ResolverTypeWrapper<PigWeanDocument>;
  FarrowingBackendScorecard: ResolverTypeWrapper<
    FarrowingBackendScorecardDocument
  >;
  ScorecardEntry: ResolverTypeWrapper<ScorecardEntry>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  LoginResult: ResolverTypeWrapper<
    Omit<LoginResult, "user"> & { user: ResolversTypes["User"] }
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  LogoutResult: ResolverTypeWrapper<LogoutResult>;
  PostPigAdjustmentInput: PostPigAdjustmentInput;
  PostPigAdjustmentResult: ResolverTypeWrapper<
    Omit<PostPigAdjustmentResult, "pigAdjustment" | "defaults"> & {
      pigAdjustment: ResolversTypes["PigAdjustment"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  SavePigAdjustmentInput: SavePigAdjustmentInput;
  SavePigAdjustmentResult: ResolverTypeWrapper<
    Omit<SavePigAdjustmentResult, "pigAdjustment" | "defaults"> & {
      pigAdjustment: ResolversTypes["PigAdjustment"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PostPigGradeOffInput: PostPigGradeOffInput;
  PostPigGradeOffResult: ResolverTypeWrapper<
    Omit<PostPigGradeOffResult, "pigGradeOff" | "defaults"> & {
      pigGradeOff: ResolversTypes["PigGradeOff"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  SavePigGradeOffInput: SavePigGradeOffInput;
  SavePigGradeOffResult: ResolverTypeWrapper<
    Omit<SavePigGradeOffResult, "pigGradeOff" | "defaults"> & {
      pigGradeOff: ResolversTypes["PigGradeOff"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PostPigMortalityInput: PostPigMortalityInput;
  PostPigMortalityResult: ResolverTypeWrapper<
    Omit<PostPigMortalityResult, "pigMortality" | "defaults"> & {
      pigMortality: ResolversTypes["PigMortality"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  SavePigMortalityInput: SavePigMortalityInput;
  SavePigMortalityResult: ResolverTypeWrapper<
    Omit<SavePigMortalityResult, "pigMortality" | "defaults"> & {
      pigMortality: ResolversTypes["PigMortality"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PostPigMoveInput: PostPigMoveInput;
  PostPigMoveResult: ResolverTypeWrapper<
    Omit<PostPigMoveResult, "pigMove" | "defaults"> & {
      pigMove: ResolversTypes["PigMove"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  SavePigMoveInput: SavePigMoveInput;
  SavePigMoveResult: ResolverTypeWrapper<
    Omit<SavePigMoveResult, "pigMove" | "defaults"> & {
      pigMove: ResolversTypes["PigMove"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PostPigPurchaseInput: PostPigPurchaseInput;
  PostPigPurchaseResult: ResolverTypeWrapper<
    Omit<PostPigPurchaseResult, "pigPurchase" | "defaults"> & {
      pigPurchase: ResolversTypes["PigPurchase"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  SavePigPurchaseInput: SavePigPurchaseInput;
  SavePigPurchaseResult: ResolverTypeWrapper<
    Omit<SavePigPurchaseResult, "pigPurchase" | "defaults"> & {
      pigPurchase: ResolversTypes["PigPurchase"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PostPigWeanInput: PostPigWeanInput;
  PostPigWeanResult: ResolverTypeWrapper<
    Omit<PostPigWeanResult, "pigWean" | "defaults"> & {
      pigWean: ResolversTypes["PigWean"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  SavePigWeanInput: SavePigWeanInput;
  SavePigWeanResult: ResolverTypeWrapper<
    Omit<SavePigWeanResult, "pigWean" | "defaults"> & {
      pigWean: ResolversTypes["PigWean"];
      defaults: ResolversTypes["PigActivityDefaults"];
    }
  >;
  PostFarrowingBackendScorecardInput: PostFarrowingBackendScorecardInput;
  ScorecardEntryInput: ScorecardEntryInput;
  PostFarrowingBackendScorecardResult: ResolverTypeWrapper<
    Omit<PostFarrowingBackendScorecardResult, "scorecard"> & {
      scorecard: ResolversTypes["FarrowingBackendScorecard"];
    }
  >;
  SaveFarrowingBackendScorecardInput: SaveFarrowingBackendScorecardInput;
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
  Int: Scalars["Int"];
  PigActivityDefaults: UserSettingsDocument;
  Float: Scalars["Float"];
  PigAdjustment: PigAdjustmentDocument;
  PigGradeOff: PigGradeOffDocument;
  PigMortality: PigMortalityDocument;
  PigMove: PigMoveDocument;
  PigPurchase: PigPurchaseDocument;
  PigWean: PigWeanDocument;
  FarrowingBackendScorecard: FarrowingBackendScorecardDocument;
  ScorecardEntry: ScorecardEntry;
  Mutation: {};
  LoginInput: LoginInput;
  LoginResult: Omit<LoginResult, "user"> & {
    user: ResolversParentTypes["User"];
  };
  Boolean: Scalars["Boolean"];
  LogoutResult: LogoutResult;
  PostPigAdjustmentInput: PostPigAdjustmentInput;
  PostPigAdjustmentResult: Omit<
    PostPigAdjustmentResult,
    "pigAdjustment" | "defaults"
  > & {
    pigAdjustment: ResolversParentTypes["PigAdjustment"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  SavePigAdjustmentInput: SavePigAdjustmentInput;
  SavePigAdjustmentResult: Omit<
    SavePigAdjustmentResult,
    "pigAdjustment" | "defaults"
  > & {
    pigAdjustment: ResolversParentTypes["PigAdjustment"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PostPigGradeOffInput: PostPigGradeOffInput;
  PostPigGradeOffResult: Omit<
    PostPigGradeOffResult,
    "pigGradeOff" | "defaults"
  > & {
    pigGradeOff: ResolversParentTypes["PigGradeOff"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  SavePigGradeOffInput: SavePigGradeOffInput;
  SavePigGradeOffResult: Omit<
    SavePigGradeOffResult,
    "pigGradeOff" | "defaults"
  > & {
    pigGradeOff: ResolversParentTypes["PigGradeOff"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PostPigMortalityInput: PostPigMortalityInput;
  PostPigMortalityResult: Omit<
    PostPigMortalityResult,
    "pigMortality" | "defaults"
  > & {
    pigMortality: ResolversParentTypes["PigMortality"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  SavePigMortalityInput: SavePigMortalityInput;
  SavePigMortalityResult: Omit<
    SavePigMortalityResult,
    "pigMortality" | "defaults"
  > & {
    pigMortality: ResolversParentTypes["PigMortality"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PostPigMoveInput: PostPigMoveInput;
  PostPigMoveResult: Omit<PostPigMoveResult, "pigMove" | "defaults"> & {
    pigMove: ResolversParentTypes["PigMove"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  SavePigMoveInput: SavePigMoveInput;
  SavePigMoveResult: Omit<SavePigMoveResult, "pigMove" | "defaults"> & {
    pigMove: ResolversParentTypes["PigMove"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PostPigPurchaseInput: PostPigPurchaseInput;
  PostPigPurchaseResult: Omit<
    PostPigPurchaseResult,
    "pigPurchase" | "defaults"
  > & {
    pigPurchase: ResolversParentTypes["PigPurchase"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  SavePigPurchaseInput: SavePigPurchaseInput;
  SavePigPurchaseResult: Omit<
    SavePigPurchaseResult,
    "pigPurchase" | "defaults"
  > & {
    pigPurchase: ResolversParentTypes["PigPurchase"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PostPigWeanInput: PostPigWeanInput;
  PostPigWeanResult: Omit<PostPigWeanResult, "pigWean" | "defaults"> & {
    pigWean: ResolversParentTypes["PigWean"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  SavePigWeanInput: SavePigWeanInput;
  SavePigWeanResult: Omit<SavePigWeanResult, "pigWean" | "defaults"> & {
    pigWean: ResolversParentTypes["PigWean"];
    defaults: ResolversParentTypes["PigActivityDefaults"];
  };
  PostFarrowingBackendScorecardInput: PostFarrowingBackendScorecardInput;
  ScorecardEntryInput: ScorecardEntryInput;
  PostFarrowingBackendScorecardResult: Omit<
    PostFarrowingBackendScorecardResult,
    "scorecard"
  > & { scorecard: ResolversParentTypes["FarrowingBackendScorecard"] };
  SaveFarrowingBackendScorecardInput: SaveFarrowingBackendScorecardInput;
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
  inventory?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  deadQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
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
    ResolversTypes["PostPigAdjustmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigAdjustmentArgs, "input">
  >;
  savePigAdjustment?: Resolver<
    ResolversTypes["SavePigAdjustmentResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigAdjustmentArgs, "input">
  >;
  postPigGradeOff?: Resolver<
    ResolversTypes["PostPigGradeOffResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigGradeOffArgs, "input">
  >;
  savePigGradeOff?: Resolver<
    ResolversTypes["SavePigGradeOffResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigGradeOffArgs, "input">
  >;
  postPigMortality?: Resolver<
    ResolversTypes["PostPigMortalityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMortalityArgs, "input">
  >;
  savePigMortality?: Resolver<
    ResolversTypes["SavePigMortalityResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigMortalityArgs, "input">
  >;
  postPigMove?: Resolver<
    ResolversTypes["PostPigMoveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigMoveArgs, "input">
  >;
  savePigMove?: Resolver<
    ResolversTypes["SavePigMoveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigMoveArgs, "input">
  >;
  postPigPurchase?: Resolver<
    ResolversTypes["PostPigPurchaseResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigPurchaseArgs, "input">
  >;
  savePigPurchase?: Resolver<
    ResolversTypes["SavePigPurchaseResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigPurchaseArgs, "input">
  >;
  postPigWean?: Resolver<
    ResolversTypes["PostPigWeanResult"],
    ParentType,
    ContextType,
    RequireFields<MutationPostPigWeanArgs, "input">
  >;
  savePigWean?: Resolver<
    ResolversTypes["SavePigWeanResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSavePigWeanArgs, "input">
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

export type PigAdjustmentResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigAdjustment"] = ResolversParentTypes["PigAdjustment"]
> = ResolversObject<{
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigGradeOffResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigGradeOff"] = ResolversParentTypes["PigGradeOff"]
> = ResolversObject<{
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  weight?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigPurchaseResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigPurchase"] = ResolversParentTypes["PigPurchase"]
> = ResolversObject<{
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PigWeanResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PigWean"] = ResolversParentTypes["PigWean"]
> = ResolversObject<{
  animal?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  job?: Resolver<ResolversTypes["Job"], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  smallPigQuantity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  weight?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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

export type PostPigAdjustmentResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigAdjustmentResult"] = ResolversParentTypes["PostPigAdjustmentResult"]
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

export type PostPigGradeOffResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigGradeOffResult"] = ResolversParentTypes["PostPigGradeOffResult"]
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

export type PostPigMortalityResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigMortalityResult"] = ResolversParentTypes["PostPigMortalityResult"]
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

export type PostPigMoveResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigMoveResult"] = ResolversParentTypes["PostPigMoveResult"]
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

export type PostPigPurchaseResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigPurchaseResult"] = ResolversParentTypes["PostPigPurchaseResult"]
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

export type PostPigWeanResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["PostPigWeanResult"] = ResolversParentTypes["PostPigWeanResult"]
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

export type SavePigAdjustmentResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SavePigAdjustmentResult"] = ResolversParentTypes["SavePigAdjustmentResult"]
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

export type SavePigGradeOffResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SavePigGradeOffResult"] = ResolversParentTypes["SavePigGradeOffResult"]
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

export type SavePigMortalityResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SavePigMortalityResult"] = ResolversParentTypes["SavePigMortalityResult"]
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

export type SavePigMoveResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SavePigMoveResult"] = ResolversParentTypes["SavePigMoveResult"]
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

export type SavePigPurchaseResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SavePigPurchaseResult"] = ResolversParentTypes["SavePigPurchaseResult"]
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

export type SavePigWeanResultResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes["SavePigWeanResult"] = ResolversParentTypes["SavePigWeanResult"]
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
  PigAdjustment?: PigAdjustmentResolvers<ContextType>;
  PigGradeOff?: PigGradeOffResolvers<ContextType>;
  PigMortality?: PigMortalityResolvers<ContextType>;
  PigMove?: PigMoveResolvers<ContextType>;
  PigPurchase?: PigPurchaseResolvers<ContextType>;
  PigWean?: PigWeanResolvers<ContextType>;
  PostFarrowingBackendScorecardResult?: PostFarrowingBackendScorecardResultResolvers<
    ContextType
  >;
  PostPigAdjustmentResult?: PostPigAdjustmentResultResolvers<ContextType>;
  PostPigGradeOffResult?: PostPigGradeOffResultResolvers<ContextType>;
  PostPigMortalityResult?: PostPigMortalityResultResolvers<ContextType>;
  PostPigMoveResult?: PostPigMoveResultResolvers<ContextType>;
  PostPigPurchaseResult?: PostPigPurchaseResultResolvers<ContextType>;
  PostPigWeanResult?: PostPigWeanResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  SaveFarrowingBackendScorecardResult?: SaveFarrowingBackendScorecardResultResolvers<
    ContextType
  >;
  SavePigAdjustmentResult?: SavePigAdjustmentResultResolvers<ContextType>;
  SavePigGradeOffResult?: SavePigGradeOffResultResolvers<ContextType>;
  SavePigMortalityResult?: SavePigMortalityResultResolvers<ContextType>;
  SavePigMoveResult?: SavePigMoveResultResolvers<ContextType>;
  SavePigPurchaseResult?: SavePigPurchaseResultResolvers<ContextType>;
  SavePigWeanResult?: SavePigWeanResultResolvers<ContextType>;
  ScorecardEntry?: ScorecardEntryResolvers<ContextType>;
  SetAreaOperatorResult?: SetAreaOperatorResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphqlContext> = Resolvers<ContextType>;
