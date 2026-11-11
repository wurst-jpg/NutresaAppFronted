import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { clearSession, loadSession, loadToken, saveSession } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [token, setToken] = useState(() => loadToken());

  // Recibe lo mismo que responde el backend: { token, usuario }.
  const signIn = useCallback(({ token: newToken, usuario }) => {
    setUser(usuario);
    setToken(newToken);
    saveSession(usuario, newToken);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    clearSession();
  }, []);

  const value = useMemo(
    () => ({ user, token, signIn, signOut }),
    [user, token, signIn, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
