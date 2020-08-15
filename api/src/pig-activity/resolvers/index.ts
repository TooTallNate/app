import {
  PigActivityDefaults,
  PigActivityQueries,
  PigWeanEvent
} from "./pig-activity";
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

export const queries = {
  ...PigActivityQueries,
  ...PigAdjustmentQueries,
  ...PigGradeOffQueries,
  ...PigMortalityQueries,
  ...PigMoveQueries,
  ...PigPurchaseQueries,
  ...PigWeanQueries
};

export const mutations = {
  ...PigAdjustmentMutations,
  ...PigGradeOffMutations,
  ...PigMortalityMutations,
  ...PigMoveMutations,
  ...PigPurchaseMutations,
  ...PigWeanMutations
};

export const types = {
  PigActivityDefaults,
  PigAdjustment,
  PigGradeOff,
  PigMortality,
  PigMove,
  PigPurchase,
  PigWean,
  PigWeanEvent
};
