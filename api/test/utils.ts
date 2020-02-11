import { GraphQLClient } from "graphql-request";

const port = process.env.PORT;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      fetch: any;
    }
  }
}

global.fetch = require("fetch-cookie/node-fetch")(require("node-fetch"));

export const client = new GraphQLClient(`http://localhost:${port}`);
