import { User, UserMutations, UserQueries } from "./user";
import { Job } from "./jobs";
import {
  PigActivityMutations,
  PigActivity,
  PigActivityQueries
} from "./pig-activity";
import {
  FarrowingBackendScorecard,
  ScorecardQueries,
  ScorecardMutations
} from "./scorecard";

export default {
  Query: {
    ...UserQueries,
    ...PigActivityQueries,
    ...ScorecardQueries
  },
  Mutation: {
    ...UserMutations,
    ...PigActivityMutations,
    ...ScorecardMutations
  },
  User,
  Job,
  PigActivity,
  FarrowingBackendScorecard
};
