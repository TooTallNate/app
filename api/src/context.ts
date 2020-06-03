import { ODataClient } from "./common/nav";
import { DataSources } from "./common/datasources";

export interface SessionUser {
  username: string;
  password: string;
  name: string;
  securityId: string;
}

export type Session = Express.Session & { user?: SessionUser };

export interface GraphqlContext {
  dataSources: DataSources;
  session: Session;
  user: SessionUser;
  navClient: ODataClient;
}

export interface CreateContextOptions {
  req: {
    session: Session;
  };
}

export function createContext({
  req
}: CreateContextOptions): Omit<GraphqlContext, "dataSources"> {
  const navClient = new ODataClient({
    serviceRoot: process.env.NAV_BASE_URL
  });
  if (req.session.user) {
    const { username, password } = req.session.user;
    navClient.auth(username, password);
  }
  return {
    session: req.session,
    user: req.session.user as SessionUser,
    navClient
  };
}
