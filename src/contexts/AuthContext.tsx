import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'
import { login as apiLogin, logout as apiLogout, LoginPayload } from '../api/auth';

interface AuthContextValue {
  user: LoginPayload | null;
  login: (u: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginPayload | null>(null);

  async function login(u: LoginPayload) {
    await apiLogin(u);
    setUser(u);
  }
  async function logout() {
    await apiLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
