import {
  validateNombre,
  validateCorreo,
  validateContrasenia,
  validateConfirmacion,
  validateRol,
  validateDepartamento,
  validateRegisterForm,
} from './validators';
import { PUBLIC_EMAIL_DOMAINS } from './constants';

describe('validateNombre', () => {
  it('rechaza vacío o menos de 3 caracteres tras trim', () => {
    expect(validateNombre('')).toMatch(/obligatorio/i);
    expect(validateNombre('  ab  ')).toMatch(/3 caracteres/);
  });
  it('acepta 3 o más caracteres', () => {
    expect(validateNombre(' Ana ')).toBe('');
  });
});

describe('validateCorreo', () => {
  it('rechaza vacío', () => {
    expect(validateCorreo('')).toMatch(/obligatorio/i);
  });
  it('rechaza formato inválido', () => {
    expect(validateCorreo('no-es-correo')).toMatch(/válido/i);
    expect(validateCorreo('a@b')).toMatch(/válido/i);
  });
  it.each(PUBLIC_EMAIL_DOMAINS)('rechaza dominio público %s', (d) => {
    expect(validateCorreo(`ana@${d}`)).toMatch(/corporativo/i);
  });
  it('rechaza dominio público en mayúsculas', () => {
    expect(validateCorreo('ana@GMAIL.com')).toMatch(/corporativo/i);
  });
  it('acepta correo corporativo', () => {
    expect(validateCorreo('ana@empresa.com')).toBe('');
  });
});

describe('validateContrasenia', () => {
  it('rechaza corta', () => {
    expect(validateContrasenia('a1!')).toMatch(/8 caracteres/);
  });
  it('exige un número', () => {
    expect(validateContrasenia('abcdefgh!')).toMatch(/número/);
  });
  it('exige un carácter especial', () => {
    expect(validateContrasenia('abcdefg1')).toMatch(/especial/);
  });
  it('acepta contraseña válida', () => {
    expect(validateContrasenia('abcdef1!')).toBe('');
  });
});

describe('validateConfirmacion', () => {
  it('exige coincidencia exacta', () => {
    expect(validateConfirmacion('abc', 'abd')).toMatch(/coinciden/);
    expect(validateConfirmacion('abc', 'ABC')).toMatch(/coinciden/);
    expect(validateConfirmacion('abc', '')).toMatch(/confirma/i);
    expect(validateConfirmacion('abc', 'abc')).toBe('');
  });
});

describe('validateRol / validateDepartamento', () => {
  it('rol obligatorio y de la lista', () => {
    expect(validateRol('')).toMatch(/rol/i);
    expect(validateRol('JEFE')).toMatch(/rol/i);
    expect(validateRol('ADMINISTRADOR')).toBe('');
  });
  it('departamento obligatorio', () => {
    expect(validateDepartamento('')).toMatch(/departamento/i);
    expect(validateDepartamento('FINANZAS')).toBe('');
  });
});

describe('validateRegisterForm', () => {
  it('devuelve errores por campo', () => {
    const errors = validateRegisterForm({
      nombre: '', correo: '', contrasenia: '', confirmacion: '', rol: '', departamento: '',
    });
    expect(Object.keys(errors).sort()).toEqual(
      ['confirmacion', 'contrasenia', 'correo', 'departamento', 'nombre', 'rol'],
    );
  });
  it('devuelve objeto vacío si todo es válido', () => {
    expect(
      validateRegisterForm({
        nombre: 'Ana Pérez', correo: 'ana@empresa.com', contrasenia: 'abcdef1!',
        confirmacion: 'abcdef1!', rol: 'COLABORADOR', departamento: 'MARKETING',
      }),
    ).toEqual({});
  });
});
