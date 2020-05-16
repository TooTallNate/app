import { User, UserMutations, UserQueries } from "../users/resolvers";
import { Job } from "./jobs";
import { Animal } from "./animal";
import { Resource } from "./resource";
import { Reason } from "./reason";
import {
  PigActivityDefaults,
  PigActivityQueries
} from "../pig-activity/resolvers/pig-activity";
import {
  PigAdjustment,
  PigAdjustmentQueries,
  PigAdjustmentMutations
} from "../pig-activity/resolvers/pig-adjustment";
import {
  PigGradeOff,
  PigGradeOffQueries,
  PigGradeOffMutations
} from "../pig-activity/resolvers/pig-grade-off";
import {
  PigMortality,
  PigMortalityQueries,
  PigMortalityMutations
} from "../pig-activity/resolvers/pig-mortality";
import {
  PigMove,
  PigMoveQueries,
  PigMoveMutations
} from "../pig-activity/resolvers/pig-move";
import {
  PigPurchase,
  PigPurchaseQueries,
  PigPurchaseMutations
} from "../pig-activity/resolvers/pig-purchase";
import {
  PigWean,
  PigWeanQueries,
  PigWeanMutations
} from "../pig-activity/resolvers/pig-wean";
import {
  FarrowingBackendScorecard,
  ScorecardQueries,
  ScorecardMutations
} from "../scorecard/resolvers";

export default {
  Query: {
    ...UserQueries,
    ...PigActivityQueries,
    ...PigAdjustmentQueries,
    ...PigGradeOffQueries,
    ...PigMortalityQueries,
    ...PigMoveQueries,
    ...PigPurchaseQueries,
    ...PigWeanQueries,
    ...ScorecardQueries
  },
  Mutation: {
    ...UserMutations,
    ...PigAdjustmentMutations,
    ...PigGradeOffMutations,
    ...PigMortalityMutations,
    ...PigMoveMutations,
    ...PigPurchaseMutations,
    ...PigWeanMutations,
    ...ScorecardMutations
  },
  User,
  Job,
  Animal,
  Resource,
  Reason,
  PigActivityDefaults,
  PigAdjustment,
  PigGradeOff,
  PigMortality,
  PigMove,
  PigPurchase,
  PigWean,
  FarrowingBackendScorecard
};
