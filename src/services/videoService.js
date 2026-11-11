import { simulateLatency } from './api';
import { SECCIONES } from '../data/videos';

/**
 * Devuelve el catálogo de videos agrupado por sección.
 *
 * TODO backend: reemplazar el mock por
 *   fetch(`${API_URL}/videos`, { headers: { Authorization: `Bearer ${token}` } })
 *
 * Endpoint: GET /api/videos
 * Respuesta esperada (200): lista plana de videos, cada uno con:
 * {
 *   "id": "v1", "seccion": "onboarding" | "comunicados" | "cursos",
 *   "titulo": "...", "descripcion": "...", "autor": "...",
 *   "departamento": "RECURSOS_HUMANOS", "duracion": 754 (segundos), "vistas": 12400,
 *   "thumbnail": "https://...", "videoUrl": "https://...mp4",
 *   "recursos": [{ "nombre": "Guia.pdf", "tipo": "PDF", "tamano": 1048576, "url": "https://..." }]
 * }
 * (Aquí el frontend los agrupa por "seccion"; también podrías pedir al backend
 * el filtro con GET /api/videos?departamento=FINANZAS&q=texto.)
 */
export async function getCatalog() {
  await simulateLatency(300);
  return SECCIONES;
}

export const videoService = { getCatalog };
