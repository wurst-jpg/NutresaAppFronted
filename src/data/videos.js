const BASE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample';
const FLOWER = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const thumb = (seed) => `https://picsum.photos/seed/${seed}/640/360`;

const recursos = (base) => [
  { nombre: `${base}.pdf`, tipo: 'PDF', tamano: 1_258_291, url: 'https://example.com/recursos/guia.pdf' },
  { nombre: `${base}-plantilla.xlsx`, tipo: 'Excel', tamano: 348_160, url: 'https://example.com/recursos/plantilla.xlsx' },
];

function video(id, seccion, titulo, descripcion, autor, departamento, duracion, vistas, videoUrl) {
  return {
    id, seccion, titulo, descripcion, autor, departamento, duracion, vistas,
    thumbnail: thumb(id), videoUrl, recursos: recursos(id),
  };
}

export const SECCIONES = [
  {
    id: 'onboarding',
    titulo: 'Onboarding y Capacitaciones',
    videos: [
      video('onb-bienvenida', 'onboarding', 'Bienvenida a la compañía', 'Conoce nuestra historia, misión y valores en tu primer día.', 'Laura Gómez', 'RECURSOS_HUMANOS', 512, 12400, `${BASE}/BigBuckBunny.mp4`),
      video('onb-herramientas', 'onboarding', 'Tus herramientas de trabajo', 'Configura correo, mensajería y accesos para empezar.', 'Equipo TI', 'TECNOLOGIA', 724, 8900, `${BASE}/ElephantsDream.mp4`),
      video('onb-seguridad', 'onboarding', 'Seguridad de la información', 'Buenas prácticas para proteger los datos de la empresa.', 'Carlos Ruiz', 'TECNOLOGIA', 905, 15300, `${BASE}/ForBiggerBlazes.mp4`),
      video('onb-beneficios', 'onboarding', 'Beneficios y compensaciones', 'Todo lo que debes saber sobre tus beneficios.', 'Laura Gómez', 'RECURSOS_HUMANOS', 640, 7200, `${BASE}/ForBiggerEscapes.mp4`),
      video('onb-cultura', 'onboarding', 'Cultura y trabajo en equipo', 'Cómo colaboramos entre departamentos.', 'María Torres', 'OPERACIONES', 480, 5100, FLOWER),
    ],
  },
  {
    id: 'comunicados',
    titulo: 'Comunicados de Dirección y RRHH',
    videos: [
      video('com-resultados', 'comunicados', 'Resultados del trimestre', 'La dirección comparte los resultados financieros del trimestre.', 'Dirección General', 'FINANZAS', 1020, 22800, `${BASE}/ForBiggerFun.mp4`),
      video('com-estrategia', 'comunicados', 'Estrategia 2026', 'Las prioridades estratégicas para el próximo año.', 'Dirección General', 'OPERACIONES', 1340, 19500, `${BASE}/ForBiggerJoyrides.mp4`),
      video('com-politica', 'comunicados', 'Nueva política de teletrabajo', 'Cambios y requisitos del esquema híbrido.', 'RRHH', 'RECURSOS_HUMANOS', 380, 31200, `${BASE}/ForBiggerMeltdowns.mp4`),
      video('com-campana', 'comunicados', 'Lanzamiento de campaña anual', 'Marketing presenta la campaña de este año.', 'Ana Martín', 'MARKETING', 455, 9800, `${BASE}/SubaruOutbackOnStreetAndDirt.mp4`),
      video('com-reconocimientos', 'comunicados', 'Reconocimientos del año', 'Celebramos a las personas y equipos destacados.', 'RRHH', 'RECURSOS_HUMANOS', 610, 14100, FLOWER),
    ],
  },
  {
    id: 'cursos',
    titulo: 'Cursos Técnicos y Desarrollo',
    videos: [
      video('cur-react', 'cursos', 'Introducción a React', 'Componentes, props y estado desde cero.', 'Equipo TI', 'TECNOLOGIA', 1800, 45600, `${BASE}/Sintel.mp4`),
      video('cur-sql', 'cursos', 'SQL para análisis de datos', 'Consultas, uniones y agregaciones para reportes.', 'Pedro Salas', 'FINANZAS', 1560, 18300, `${BASE}/TearsOfSteel.mp4`),
      video('cur-excel', 'cursos', 'Excel avanzado', 'Tablas dinámicas y fórmulas para finanzas.', 'Marta Vega', 'FINANZAS', 1275, 27700, `${BASE}/BigBuckBunny.mp4`),
      video('cur-liderazgo', 'cursos', 'Liderazgo de equipos', 'Herramientas para dirigir equipos con confianza.', 'Laura Gómez', 'RECURSOS_HUMANOS', 2040, 11200, `${BASE}/ElephantsDream.mp4`),
      video('cur-seo', 'cursos', 'Fundamentos de SEO', 'Posicionamiento web para el equipo de marketing.', 'Ana Martín', 'MARKETING', 960, 6400, `${BASE}/ForBiggerBlazes.mp4`),
    ],
  },
];

// Video institucional del mes (Hero).
export const HERO_VIDEO = {
  id: 'hero-mes',
  seccion: 'comunicados',
  titulo: 'Mensaje institucional del mes',
  descripcion:
    'Un recorrido por los logros del mes, los proyectos que vienen y el reconocimiento a los equipos que hacen posible nuestro crecimiento.',
  autor: 'Dirección General',
  departamento: 'OPERACIONES',
  duracion: 845,
  vistas: 52300,
  thumbnail: 'https://picsum.photos/seed/hero-mes/1280/720',
  videoUrl: `${BASE}/BigBuckBunny.mp4`,
  recursos: recursos('mensaje-del-mes'),
};
