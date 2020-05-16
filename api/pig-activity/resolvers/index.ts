import {
  PigActivityDefaults,
  PigActivityQueries
} from "../../pig-activity/resolvers/pig-activity";
import {
  PigAdjustment,
  PigAdjustmentQueries,
  PigAdjustmentMutations
} from "../../pig-activity/resolvers/pig-adjustment";
import {
  PigGradeOff,
  PigGradeOffQueries,
  PigGradeOffMutations
} from "../../pig-activity/resolvers/pig-grade-off";
import {
  PigMortality,
  PigMortalityQueries,
  PigMortalityMutations
} from "../../pig-activity/resolvers/pig-mortality";
import {
  PigMove,
  PigMoveQueries,
  PigMoveMutations
} from "../../pig-activity/resolvers/pig-move";
import {
  PigPurchase,
  PigPurchaseQueries,
  PigPurchaseMutations
} from "../../pig-activity/resolvers/pig-purchase";
import {
  PigWean,
  PigWeanQueries,
  PigWeanMutations
} from "../../pig-activity/resolvers/pig-wean";

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
  PigWean
};
