import * as users from "./users/resolvers";
import * as scorecard from "./scorecard/resolvers";
import * as livestockActivity from "./livestock-activity/resolvers";
import * as common from "./common/resolvers";
import * as fuel from "./fuel/resolvers";
import * as maintenance from "./maintenance/resolvers";
import * as inventory from "./inventory/resolvers";

export default {
  Query: {
    ...users.queries,
    ...scorecard.queries,
    ...livestockActivity.queries,
    ...common.queries,
    ...fuel.queries,
    ...maintenance.queries,
    ...inventory.queries
  },
  Mutation: {
    ...users.mutations,
    ...scorecard.mutations,
    ...livestockActivity.mutations,
    ...fuel.mutations,
    ...maintenance.mutations,
    ...inventory.mutations
  },
  ...users.types,
  ...scorecard.types,
  ...livestockActivity.types,
  ...common.types,
  ...fuel.types,
  ...maintenance.types,
  ...inventory.types
};
