import path from "path";
import fs from "fs";
import { initMongoose } from "./config/mongoose";
import { initPassport, sessions } from "./config/passport";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";
import { createContext, GraphqlContext } from "./context";
import { IMiddlewareFunction } from "graphql-middleware";

export default () => {
  initMongoose();
  initPassport();

  const typeDefs = fs.readFileSync(path.join(__dirname, "schema.gql"), "utf8");

  // Allow only the login mutation to requests without a session.
  const authMiddleware: IMiddlewareFunction<any, GraphqlContext, any> = (
    resolve,
    root,
    args,
    context,
    info
  ) => {
    if (!["login", "user"].includes(info.fieldName) && !context.user) {
      throw new Error("Unauthorized");
    } else {
      return resolve(root, args, context, info);
    }
  };

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: createContext,
    middlewares: [
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
    () => console.log(`server listening on port ${port}`)
  );
};
