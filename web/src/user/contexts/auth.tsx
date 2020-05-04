import React, { createContext, useContext, useCallback } from "react";
import {
  useUserQuery,
  User,
  useLoginMutation,
  useLogoutMutation,
  UserDocument,
  UserQuery,
  UserQueryVariables
} from "../graphql";
import FullPageSpinner from "../../common/components/FullPageSpinner";

type AuthUser = Pick<User, "name" | "username">;

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Username or password are incorrect.");
    this.name = "InvalidCredentialsError";
  }
}

export class NoAvailableLicenseError extends Error {
  constructor() {
    super("No license is avaiable to access NAV.");
    this.name = "NoAvailableLicenseError";
  }
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  async login() {},
  async logout() {}
});

const AuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useUserQuery();
  const [loginMutation] = useLoginMutation({
    update(cache, { data }) {
      if (data) {
        cache.writeQuery<UserQuery, UserQueryVariables>({
          query: UserDocument,
          data: {
            user: data.login.user
          }
        });
      }
    }
  });

  const [logoutMutation] = useLogoutMutation({
    update(cache) {
      cache.writeQuery<UserQuery, UserQueryVariables>({
        query: UserDocument,
        data: {
          user: null
        }
      });
    }
  });

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        await loginMutation({
          variables: {
            input: {
              username,
              password
            }
          }
        });
      } catch (e) {
        const code = (e.graphQLErrors || [])[0].message;
        switch (code) {
          case "INVALID_CREDENTIALS":
            throw new InvalidCredentialsError();
          case "NO_AVAILABLE_LICENSE":
            throw new NoAvailableLicenseError();
          default:
            throw e;
        }
      }
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation();
  }, [logoutMutation]);

  return loading ? (
    <FullPageSpinner />
  ) : (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data && !!data.user,
        user: data ? data.user : null,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
