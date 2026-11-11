// La sesión se guarda en sessionStorage (se borra al cerrar la pestaña).
// Con un backend real aquí guardarías (o no) el token que devuelve el login.
const SESSION_KEY = 'vc_session';

export function loadSession() {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(user) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // Almacenamiento no disponible: se ignora.
  }
}

export function clearSession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // se ignora
  }
}
