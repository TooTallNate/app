import { GraphQLClient } from "graphql-request";

const port = process.env.PORT;

export const client = new GraphQLClient(`http://localhost:${port}`);

export const credentials = {
  username: process.env.TEST_USER,
  password: process.env.TEST_PASSWORD
};
