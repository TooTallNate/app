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
import {
  LivestockShipment,
  LivestockShipmentEvent,
  DimensionPacker,
  LivestockShipmentQueries,
  LivestockShipmentMutations
} from "./livestock-shipment";

export const queries = {
  ...LivestockActivityQueries,
  ...LivestockAdjustmentQueries,
  ...LivestockGradeOffQueries,
  ...LivestockMortalityQueries,
  ...LivestockMoveQueries,
  ...LivestockPurchaseQueries,
  ...LivestockWeanQueries,
  ...LivestockShipmentQueries
};

export const mutations = {
  ...LivestockAdjustmentMutations,
  ...LivestockGradeOffMutations,
  ...LivestockMortalityMutations,
  ...LivestockMoveMutations,
  ...LivestockPurchaseMutations,
  ...LivestockWeanMutations,
  ...LivestockShipmentMutations
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
  LivestockShipment,
  LivestockWeanEvent,
  LivestockGradeOffEvent,
  LivestockMoveEvent,
  LivestockPurchaseEvent,
  LivestockAdjustmentEvent,
  LivestockMortalityEvent,
  LivestockShipmentEvent,
  DimensionPacker
};
