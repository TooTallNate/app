import React, { createContext, useContext } from "react";
import {
  useUserQuery,
  User,
  useLoginMutation,
  useLogoutMutation,
  UserDocument,
  UserQuery,
  UserQueryVariables
} from "../graphql";

interface AuthContextValue {
  isAuthenticated: boolean;
  user?: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Partial<AuthContextValue>>({});

const AuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useUserQuery();
  const [loginMutation] = useLoginMutation({
    update(cache, { data }) {
      if (data) {
        cache.writeQuery<UserQuery, UserQueryVariables>({
          query: UserDocument,
          data: {
            user: data.login
          }
        });
      }
    }
  });
  const [logoutMutation] = useLogoutMutation({
    update(cache, { data }) {
      cache.writeQuery<UserQuery, UserQueryVariables>({
        query: UserDocument,
        data: {
          user: null
        }
      });
    }
  });

  const login = async (username: string, password: string) => {
    await loginMutation({
      variables: {
        input: {
          username,
          password
        }
      }
    });
  };

  const logout = async () => {
    await logoutMutation();
  };

  return loading ? null : (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data && !!data.user,
        user: data ? data.user : undefined,
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
