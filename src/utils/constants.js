// Dominios de correo público que NO se aceptan (solo correos corporativos).
export const PUBLIC_EMAIL_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'live.com',
  'icloud.com',
];

export const ROLES = ['ADMINISTRADOR', 'COLABORADOR', 'GESTOR_DE_CONTENIDO'];

export const ROL_LABELS = {
  ADMINISTRADOR: 'Administrador',
  COLABORADOR: 'Colaborador',
  GESTOR_DE_CONTENIDO: 'Gestor de contenido',
};

export const DEPARTAMENTO_LABELS = {
  TECNOLOGIA: 'Tecnología',
  RECURSOS_HUMANOS: 'Recursos Humanos',
  MARKETING: 'Marketing',
  FINANZAS: 'Finanzas',
  OPERACIONES: 'Operaciones',
};

// Lista simple de departamentos (con backend vendría de GET /api/departamentos).
export const DEPARTAMENTOS = Object.keys(DEPARTAMENTO_LABELS);

export const MIN_NOMBRE = 3;
export const MIN_PASSWORD = 8;
