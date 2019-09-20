import React, { createContext, useState, useContext, useEffect } from "react";
import service from "../service";
import { User } from "../entities";

interface AuthContextValue {
  isAuthenticated: boolean;
  user?: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Partial<AuthContextValue>>({});

interface AuthProviderProps {
  user?: User;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  user: initialUser, // For unit tests only.
  children
}) => {
  const [refreshed, setRefreshed] = useState<boolean>(!!initialUser);
  const [user, setUser] = useState<User | undefined>(initialUser || undefined);

  const login = async (username: string, password: string) => {
    const result = await service.login({
      username,
      password
    });
    setUser(result);
  };

  const logout = async () => {
    await service.logout();
    setUser(undefined);
  };

  // Refresh the user to see if they still have a session.
  useEffect(() => {
    const effect = async () => {
      // Don't refresh user in tests.
      if (!initialUser) {
        const refreshedUser = await service.refresh();
        if (refreshedUser) {
          setUser(refreshedUser);
        }
        setRefreshed(true);
      }
    };
    effect();
  }, [initialUser]);

  return refreshed ? (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  ) : null;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
