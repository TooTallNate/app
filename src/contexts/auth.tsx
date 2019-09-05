import React, { createContext, useState, useContext } from "react";
import service from "../service";

export interface User {
  fullName: string;
  license: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
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
  const [user, setUser] = useState<User | null>(initialUser || null);

  const login = async (username: string, password: string) => {
    const result = await service.login({
      username,
      password
    });
    setUser(result);
  };

  const logout = async () => {
    await service.logout();
    setUser(null);
  };

  return (
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
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
