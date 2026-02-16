import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

const STORAGE_KEY = 'miracle_garden_auth';
const TOKEN_KEY = 'miracle_garden_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistToken = (token) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  };

  const setAuthFromUser = useCallback((u) => {
    if (!u) {
      setUser(null);
      setAdmin(null);
      return;
    }
    if (u.role === 'admin') {
      setAdmin({ id: u.id, name: u.name, email: u.email });
      setUser(null);
    } else {
      setUser({ id: u.id, name: u.name, email: u.email });
      setAdmin(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then(({ user: u }) => {
        if (!cancelled) setAuthFromUser(u);
      })
      .catch(() => {
        if (!cancelled) {
          persistToken(null);
          localStorage.removeItem(STORAGE_KEY);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [setAuthFromUser]);

  const loginUser = async (email, password) => {
    const { token, user: u } = await api.login(email, password);
    if (u.role !== 'user') throw new Error('Use admin login for this account.');
    persistToken(token);
    setAuthFromUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u }));
  };

  const loginAdmin = async (email, password) => {
    const { token, user: u } = await api.login(email, password);
    if (u.role !== 'admin') throw new Error('Admin access required.');
    persistToken(token);
    setAuthFromUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ admin: u }));
  };

  const registerUser = async (name, email, password) => {
    const { token, user: u } = await api.register(name, email, password);
    persistToken(token);
    setAuthFromUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u }));
  };

  const logout = () => {
    persistToken(null);
    setUser(null);
    setAdmin(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isUser: !!user,
        isAdmin: !!admin,
        loading,
        loginUser,
        loginAdmin,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const AuthContext = createContext(null);
