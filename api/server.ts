import path from "path";
import fs from "fs";
import logger from "./config/logging";
import { initMongoose } from "./config/mongoose";
import { initPassport, sessions } from "./config/passport";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";
import { createContext, GraphqlContext } from "./context";
import { IMiddlewareFunction } from "graphql-middleware";
import { ErrorCode } from "./resolvers/utils";

export default () => {
  initMongoose();
  initPassport();

  const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.generated.graphql"),
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

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: createContext,
    middlewares: [
      {
        Query: loggingMiddleware,
        Mutation: loggingMiddleware
      },
      {
        Query: authMiddleware,
        Mutation: authMiddleware
      }
    ]
  });

  const app = server.express;
  app.use(sessions());

  app.post("/api", (req, res, next) => {
    req.url = "/";
    next();
  });

  const port = process.env.PORT || 3001;
  return server.start(
    {
      port
    },
    () => logger.info(`server listening on port ${port}`)
  );
};
