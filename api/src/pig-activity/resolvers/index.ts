import {
  ItemJournalTemplate,
  PigActivityDefaults,
  PigActivityQueries
} from "./pig-activity";
import {
  PigAdjustment,
  PigAdjustmentQueries,
  PigAdjustmentMutations,
  PigAdjustmentEvent
} from "./pig-adjustment";
import {
  PigGradeOff,
  PigGradeOffQueries,
  PigGradeOffMutations,
  PigGradeOffEvent
} from "./pig-grade-off";
import {
  PigMortality,
  PigMortalityQueries,
  PigMortalityMutations,
  PigMortalityEvent
} from "./pig-mortality";
import {
  PigMove,
  PigMoveQueries,
  PigMoveMutations,
  PigMoveEvent
} from "./pig-move";
import {
  PigPurchase,
  PigPurchaseQueries,
  PigPurchaseMutations,
  PigPurchaseEvent
} from "./pig-purchase";
import {
  PigWean,
  PigWeanEvent,
  PigWeanQueries,
  PigWeanMutations
} from "./pig-wean";

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
  ItemJournalTemplate,
  PigActivityDefaults,
  PigAdjustment,
  PigGradeOff,
  PigMortality,
  PigMove,
  PigPurchase,
  PigWean,
  PigWeanEvent,
  PigGradeOffEvent,
  PigMoveEvent,
  PigPurchaseEvent,
  PigAdjustmentEvent,
  PigMortalityEvent
};
