import { DataSources } from "./common/datasources";

export interface GraphqlContext {
  dataSources: DataSources;
  session: Express.Session;
  user?: Express.SessionUser;
}

export interface CreateContextOptions {
  req: {
    session: Express.Session;
  };
}

export function createContext({
  req
}: CreateContextOptions): Omit<GraphqlContext, "dataSources"> {
  return {
    session: req.session,
    user: req.session.user
  };
}
