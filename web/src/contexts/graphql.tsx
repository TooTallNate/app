import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { Job, User } from "../graphql";

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "FarrowingBackendScorecard":
      case "PigActivity":
        return object.__typename;
      case "Job":
        return `Job:${(object as Job).number}`;
      case "User":
        return `User:${(object as User).username}`;
      default:
        return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

const client = new ApolloClient({ uri: "/api", cache });

export const GraphqlProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
