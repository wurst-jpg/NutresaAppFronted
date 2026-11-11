// La sesión se guarda en sessionStorage (se borra al cerrar la pestaña).
// Guardamos el usuario (sin contraseña) y el token que devuelve el backend.
const SESSION_KEY = 'vc_session';
const TOKEN_KEY = 'vc_token';

export function loadSession() {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadToken() {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveSession(usuario, token) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
    if (token) window.sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Almacenamiento no disponible: se ignora.
  }
}

export function clearSession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // se ignora
  }
}
