import { User, UserMutations, UserQueries } from "./user";
import { Job } from "./jobs";
import { Resource } from "./resource";
import {
  PigActivityMutations,
  PigActivityDefaults,
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
  Resource,
  PigActivityDefaults,
  FarrowingBackendScorecard
};
