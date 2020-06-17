import path from "path";
import fs from "fs";
import logger from "./config/logging";
import { initMongoose } from "./config/mongoose";
import { initPassport, sessions } from "./config/passport";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import { createContext, GraphqlContext } from "./context";
import {
  applyMiddleware,
  IMiddlewareFunction,
  IMiddleware
} from "graphql-middleware";
import { ErrorCode } from "./common/utils";
import dataSources from "./common/datasources";
import { sentryEnabled, sentryMiddleware } from "./config/sentry";

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

// Allow only the login mutation to requests without a session.
const authMiddleware: IMiddlewareFunction<any, GraphqlContext, any> = (
  resolve,
  root,
  args,
  context,
  info
) => {
  if (!["login", "user"].includes(info.fieldName) && !context.user) {
    throw new Error(ErrorCode.Unauthorized);
  } else {
    return resolve(root, args, context, info);
  }
};

const loggingMiddleware: IMiddlewareFunction<any, GraphqlContext, any> = (
  resolve,
  root,
  args,
  context,
  info
) => {
  logger.info(`GraphQL ${info.parentType} ${info.fieldName}`);
  return resolve(root, args, context, info);
};

const middlewares: IMiddleware[] = [
  {
    Query: loggingMiddleware,
    Mutation: loggingMiddleware
  },
  {
    Query: authMiddleware,
    Mutation: authMiddleware
  }
];

if (sentryEnabled) {
  middlewares.push(sentryMiddleware);
}

export const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  ...middlewares
);

export default () => {
  const app = express();

  app.use(sessions());

  app.use("/api", (req, res, next) => {
    req.url = "/";
    next();
  });

  initMongoose();
  initPassport();

  const server = new ApolloServer({
    schema,
    dataSources,
    context: createContext
  });

  server.applyMiddleware({
    app,
    path: "/"
  });

  const port = process.env.PORT || 3001;
  return app.listen(port, () =>
    logger.info(`server listening on port ${port}`)
  );
};
