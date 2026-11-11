import { MIN_NOMBRE, MIN_PASSWORD, PUBLIC_EMAIL_DOMAINS, ROLES } from './constants';

// Cada validador devuelve '' si el valor es válido, o el mensaje de error.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateNombre(value) {
  const nombre = (value ?? '').trim();
  if (!nombre) return 'El nombre es obligatorio (mínimo 3 caracteres).';
  if (nombre.length < MIN_NOMBRE) return `El nombre debe tener al menos ${MIN_NOMBRE} caracteres.`;
  return '';
}

export function validateCorreo(value) {
  const correo = (value ?? '').trim().toLowerCase();
  if (!correo) return 'El correo es obligatorio.';
  if (!EMAIL_REGEX.test(correo)) return 'Ingresa un correo válido.';
  const dominio = correo.split('@')[1];
  if (PUBLIC_EMAIL_DOMAINS.includes(dominio)) {
    return 'Usa tu correo corporativo (no se admiten correos públicos).';
  }
  return '';
}

export function validateContrasenia(value) {
  const pass = value ?? '';
  if (pass.length < MIN_PASSWORD) return `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`;
  if (!/\d/.test(pass)) return 'La contraseña debe incluir al menos un número.';
  if (!/[^A-Za-z0-9\s]/.test(pass)) return 'La contraseña debe incluir al menos un carácter especial.';
  return '';
}

export function validateConfirmacion(contrasenia, confirmacion) {
  if (!confirmacion) return 'Confirma tu contraseña.';
  if (contrasenia !== confirmacion) return 'Las contraseñas no coinciden.';
  return '';
}

export function validateRol(value) {
  return ROLES.includes(value) ? '' : 'Selecciona un rol.';
}

export function validateDepartamento(value) {
  return value ? '' : 'Selecciona un departamento.';
}

export function validateField(name, values) {
  switch (name) {
    case 'nombre': return validateNombre(values.nombre);
    case 'correo': return validateCorreo(values.correo);
    case 'contrasenia': return validateContrasenia(values.contrasenia);
    case 'confirmacion': return validateConfirmacion(values.contrasenia, values.confirmacion);
    case 'rol': return validateRol(values.rol);
    case 'departamento': return validateDepartamento(values.departamento);
    default: return '';
  }
}

export const REGISTER_FIELDS = ['nombre', 'correo', 'contrasenia', 'confirmacion', 'rol', 'departamento'];

export function validateRegisterForm(values) {
  const errors = {};
  REGISTER_FIELDS.forEach((name) => {
    const msg = validateField(name, values);
    if (msg) errors[name] = msg;
  });
  return errors;
}

// Login: solo se valida el formato (la contraseña real la valida el backend).
export function validateLoginForm({ correo, contrasenia }) {
  const errors = {};
  const c = (correo ?? '').trim();
  if (!c) errors.correo = 'El correo es obligatorio.';
  else if (!EMAIL_REGEX.test(c)) errors.correo = 'Ingresa un correo válido.';
  if (!contrasenia) errors.contrasenia = 'La contraseña es obligatoria.';
  return errors;
}
