import {
  ItemJournalTemplate,
  LivestockActivityDefaults,
  LivestockActivityQueries
} from "./livestock-activity";
import {
  LivestockAdjustment,
  LivestockAdjustmentQueries,
  LivestockAdjustmentMutations,
  LivestockAdjustmentEvent
} from "./livestock-adjustment";
import {
  LivestockGradeOff,
  LivestockGradeOffQueries,
  LivestockGradeOffMutations,
  LivestockGradeOffEvent
} from "./livestock-grade-off";
import {
  LivestockMortality,
  LivestockMortalityQueries,
  LivestockMortalityMutations,
  LivestockMortalityEvent
} from "./livestock-mortality";
import {
  LivestockMove,
  LivestockMoveQueries,
  LivestockMoveMutations,
  LivestockMoveEvent
} from "./livestock-move";
import {
  LivestockPurchase,
  LivestockPurchaseQueries,
  LivestockPurchaseMutations,
  LivestockPurchaseEvent
} from "./livestock-purchase";
import {
  LivestockWean,
  LivestockWeanEvent,
  LivestockWeanQueries,
  LivestockWeanMutations
} from "./livestock-wean";

export const queries = {
  ...LivestockActivityQueries,
  ...LivestockAdjustmentQueries,
  ...LivestockGradeOffQueries,
  ...LivestockMortalityQueries,
  ...LivestockMoveQueries,
  ...LivestockPurchaseQueries,
  ...LivestockWeanQueries
};

export const mutations = {
  ...LivestockAdjustmentMutations,
  ...LivestockGradeOffMutations,
  ...LivestockMortalityMutations,
  ...LivestockMoveMutations,
  ...LivestockPurchaseMutations,
  ...LivestockWeanMutations
};

export const types = {
  ItemJournalTemplate,
  LivestockActivityDefaults,
  LivestockAdjustment,
  LivestockGradeOff,
  LivestockMortality,
  LivestockMove,
  LivestockPurchase,
  LivestockWean,
  LivestockWeanEvent,
  LivestockGradeOffEvent,
  LivestockMoveEvent,
  LivestockPurchaseEvent,
  LivestockAdjustmentEvent,
  LivestockMortalityEvent
};
