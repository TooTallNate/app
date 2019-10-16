import path from "path";
import fs from "fs";
import { initMongoose } from "./config/mongoose";
import { initPassport, sessions } from "./config/passport";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";
import { createContext } from "./context";

export default () => {
  initMongoose();
  initPassport();

  const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
  );

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: createContext
  });

  const app = server.express;
  app.use(sessions());

  const port = process.env.PORT || 3001;
  return server.start(
    {
      port
    },
    () => console.log(`server listening on port ${port}`)
  );
};