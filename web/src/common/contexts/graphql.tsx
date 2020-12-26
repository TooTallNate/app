import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const cache = new InMemoryCache({
  typePolicies: {
    UserLocations: { keyFields: [] },
    User: { keyFields: [] },
    PigActivityDefaults: { keyFields: [] },
    Job: { keyFields: ["number"] },
    Item: { keyFields: ["number"] },
    Resource: { keyFields: ["number"] },
    Location: { keyFields: ["code"] },
    FarrowingBackendScorecard: { keyFields: ["area", ["number"]] },
    PigAdjustment: { keyFields: ["job", ["number"]] },
    PigGradeOff: { keyFields: ["job", ["number"]] },
    PigMortality: { keyFields: ["job", ["number"]] },
    PigMove: { keyFields: ["fromJob", ["number"]] },
    PigPurchase: { keyFields: ["job", ["number"]] },
    PigWean: { keyFields: ["job", ["number"]] },
    Scorecard: {
      keyFields: ["job", ["number"]],
      fields: {
        data: { merge: false }
      }
    },
    ScorecardConfig: { keyFields: ["job", ["number"]] },
    ScorecardPage: { keyFields: false },
    ScorecardElement: { keyFields: false },
    ScorecardElementResponse: { keyFields: false }
  }
});

const client = new ApolloClient({ uri: "/api", cache });

export const GraphqlProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
