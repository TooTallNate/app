export interface SessionUser {
  name: string;
  license: string;
  username: string;
  password: string;
}

export type Session = Express.Session & { user?: SessionUser };

export interface GraphqlContext {
  session: Session;
  user: SessionUser;
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
    user: request.session.user as SessionUser
  };
}
