import * as users from "./users/resolvers";
import * as scorecard from "./scorecard/resolvers";
import * as pigActivity from "./pig-activity/resolvers";
import * as common from "./common/resolvers";
import * as fuel from "./fuel/resolvers";
import * as maintenance from "./maintenance/resolvers";

export default {
  Query: {
    ...users.queries,
    ...scorecard.queries,
    ...pigActivity.queries,
    ...common.queries,
    ...fuel.queries,
    ...maintenance.queries
  },
  Mutation: {
    ...users.mutations,
    ...scorecard.mutations,
    ...pigActivity.mutations,
    ...fuel.mutations,
    ...maintenance.mutations
  },
  ...users.types,
  ...scorecard.types,
  ...pigActivity.types,
  ...common.types,
  ...fuel.types,
  ...maintenance.types
};
