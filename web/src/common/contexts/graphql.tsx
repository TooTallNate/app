import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import {
  Job,
  Resource,
  FarrowingBackendScorecard,
  PigWean,
  PigAdjustment,
  PigGradeOff,
  PigMortality,
  PigMove,
  PigPurchase,
  Item
} from "../../user/graphql";
import { Location } from "../../pig-activity/graphql";

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "UserLocations":
      case "User":
      case "PigActivityDefaults":
        return object.__typename;
      case "Job":
        return `Job:${(object as Job).number}`;
      case "Item":
        return `Item:${(object as Item).number}`;
      case "Resource":
        return `Resource:${(object as Resource).number}`;
      case "Location":
        return `Location:${(object as Location).code}`;
      case "FarrowingBackendScorecard":
        return `FarrowingBackendScorecard:${
          (object as FarrowingBackendScorecard).area.number
        }`;
      case "PigAdjustment":
        return `PigAdjustment:${(object as PigAdjustment).job.number}`;
      case "PigGradeOff":
        return `PigGradeOff:${(object as PigGradeOff).job.number}`;
      case "PigMortality":
        return `PigMortality:${(object as PigMortality).job.number}`;
      case "PigMove":
        return `PigMove:${(object as PigMove).fromJob.number}`;
      case "PigPurchase":
        return `PigPurchase:${(object as PigPurchase).job.number}`;
      case "PigWean":
        return `PigWean:${(object as PigWean).job.number}`;
      default:
        return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

const client = new ApolloClient({ uri: "/api", cache });

export const GraphqlProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
