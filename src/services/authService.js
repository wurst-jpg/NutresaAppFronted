import { ApiError, simulateLatency } from './api';

// Correo que el mock trata como "ya registrado" para poder ver ese error.
export const DEMO_TAKEN_EMAIL = 'existente@empresa.com';

/**
 * Registra un usuario.
 *
 * TODO backend: reemplazar el mock por
 *   fetch(`${API_URL}/usuarios`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(...) })
 *
 * Endpoint: POST /api/usuarios
 * JSON que esperaría el backend (entidad Usuario; el backend genera el id
 * y guarda el hash de la contraseña, NUNCA el texto plano):
 * {
 *   "nombre": "Ana Pérez",
 *   "correo": "ana@empresa.com",
 *   "rol": "COLABORADOR",            // ADMINISTRADOR | COLABORADOR | GESTOR_DE_CONTENIDO
 *   "departamento": "FINANZAS",      // TECNOLOGIA | RECURSOS_HUMANOS | MARKETING | FINANZAS | OPERACIONES
 *   "contrasenia": "secreta1!"       // el backend la convierte en contrasenia_hash (BCrypt)
 * }
 * Respuesta esperada (201): { "id": "uuid", "nombre", "correo", "rol", "departamento" }
 * Si el correo existe: 409 con { "message": "Este correo ya está registrado." }
 */
export async function register({ nombre, correo, rol, departamento }) {
  await simulateLatency();
  if (correo.trim().toLowerCase() === DEMO_TAKEN_EMAIL) {
    throw new ApiError('Este correo ya está registrado.', 409);
  }
  return {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    rol,
    departamento,
  };
}

/**
 * Inicia sesión.
 *
 * TODO backend: reemplazar el mock por
 *   fetch(`${API_URL}/auth/login`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ correo, contrasenia }) })
 *
 * Endpoint: POST /api/auth/login
 * JSON que esperaría el backend: { "correo": "ana@empresa.com", "contrasenia": "secreta1!" }
 * Respuesta esperada (200):
 * { "token": "<JWT>", "usuario": { "id": "uuid", "nombre", "correo", "rol", "departamento" } }
 * Credenciales inválidas: 401 con { "message": "Correo o contraseña incorrectos." }
 *
 * MOCK: acepta cualquier credencial con formato válido, salvo la contraseña
 * "incorrecta1!" que sirve para probar el mensaje de error.
 */
export async function login({ correo, contrasenia }) {
  await simulateLatency();
  if (contrasenia === 'incorrecta1!') {
    throw new ApiError('Correo o contraseña incorrectos.', 401);
  }
  const email = correo.trim().toLowerCase();
  const nombre = email
    .split('@')[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(' ');
  return {
    id: crypto.randomUUID(),
    nombre,
    correo: email,
    rol: 'COLABORADOR',
    departamento: 'TECNOLOGIA',
  };
}

export const authService = { register, login };
