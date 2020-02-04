import { ODataClient } from "./nav";

export interface SessionUser {
  username: string;
  password: string;
  name: string;
  securityId: string;
}

export type Session = Express.Session & { user?: SessionUser };

export interface GraphqlContext {
  session: Session;
  user: SessionUser;
  navClient: ODataClient;
}

export interface CreateContextOptions {
  request: {
    session: Session;
  };
}

export function createContext({
  request
}: CreateContextOptions): GraphqlContext {
  const navClient = new ODataClient({
    serviceRoot: process.env.NAV_BASE_URL
  });
  if (request.session.user) {
    const { username, password } = request.session.user;
    navClient.auth(username, password);
  }
  return {
    session: request.session,
    user: request.session.user as SessionUser,
    navClient
  };
}
