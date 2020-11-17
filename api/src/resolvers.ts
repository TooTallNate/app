import * as users from "./users/resolvers";
import * as scorecard from "./scorecard/resolvers";
import * as pigActivity from "./pig-activity/resolvers";
import * as common from "./common/resolvers";

export default {
  Query: {
    ...users.queries,
    ...scorecard.queries,
    ...pigActivity.queries,
    ...common.queries
  },
  Mutation: {
    ...users.mutations,
    ...scorecard.mutations,
    ...pigActivity.mutations
  },
  ...users.types,
  ...scorecard.types,
  ...pigActivity.types,
  ...common.types
};
