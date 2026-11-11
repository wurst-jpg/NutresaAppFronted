// Punto único de comunicación con el backend.
// La URL base viene de la variable de entorno VITE_API_URL (ver .env.example).
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

// Configuración de los mocks: milisegundos que tarda la "petición" simulada.
export const mockConfig = { delay: 1200 };

export class ApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Espera simulada para que se vea el spinner. Se borra al usar un backend real.
export const simulateLatency = (ms = mockConfig.delay) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper para cuando conectes el backend real: hace fetch con JSON y
// lanza ApiError si la respuesta no es 2xx.
// TODO backend: úsalo desde authService.js y videoService.js, por ejemplo
//   request('/usuarios', { method: 'POST', body: JSON.stringify(usuario) })
export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(body.message ?? 'Error de servidor', response.status);
  }
  return response.status === 204 ? null : response.json();
}
