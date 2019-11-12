import createNavClient, { NavClient } from "./nav";

export interface SessionUser {
  name: string;
  license: string;
  username: string;
  ntPassword: number[];
  lmPassword: number[];
}

export type Session = Express.Session & { user?: SessionUser };

export interface GraphqlContext {
  session: Session;
  user: SessionUser;
  navClient: NavClient;
}

export interface CreateContextOptions {
  request: {
    session: Session;
  };
}

export function createContext({
  request
}: CreateContextOptions): GraphqlContext {
  return {
    session: request.session,
    user: request.session.user as SessionUser,
    navClient: request.session.user
      ? createNavClient({
          ...request.session.user,
          ntPassword: Buffer.from(request.session.user.ntPassword),
          lmPassword: Buffer.from(request.session.user.lmPassword)
        })
      : null
  };
}
