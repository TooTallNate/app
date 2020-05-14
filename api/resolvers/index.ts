import { User, UserMutations, UserQueries } from "./user";
import { Job } from "./jobs";
import { Animal } from "./animal";
import { Resource } from "./resource";
import { Reason } from "./reason";
import { PigActivityDefaults, PigActivityQueries } from "./pig-activity";
import {
  PigAdjustment,
  PigAdjustmentQueries,
  PigAdjustmentMutations
} from "./pig-adjustment";
import {
  PigGradeOff,
  PigGradeOffQueries,
  PigGradeOffMutations
} from "./pig-grade-off";
import {
  PigMortality,
  PigMortalityQueries,
  PigMortalityMutations
} from "./pig-mortality";
import { PigMove, PigMoveQueries, PigMoveMutations } from "./pig-move";
import {
  PigPurchase,
  PigPurchaseQueries,
  PigPurchaseMutations
} from "./pig-purchase";
import { PigWean, PigWeanQueries, PigWeanMutations } from "./pig-wean";
import {
  FarrowingBackendScorecard,
  ScorecardQueries,
  ScorecardMutations
} from "./scorecard";

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
