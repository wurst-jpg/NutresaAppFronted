import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { clearSession, loadSession, saveSession } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());

  const signIn = useCallback((sessionUser) => {
    setUser(sessionUser);
    saveSession(sessionUser);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    clearSession();
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
