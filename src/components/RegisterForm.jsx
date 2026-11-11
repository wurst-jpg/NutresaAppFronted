import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField, { inputClasses } from './FormField';
import Spinner from './Spinner';
import useRegisterForm from '../hooks/useRegisterForm';
import { DEPARTAMENTOS, DEPARTAMENTO_LABELS, ROLES, ROL_LABELS } from '../utils/constants';

export default function RegisterForm() {
  const { values, errors, submitting, submitError, handleChange, handleBlur, handleSubmit } =
    useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const common = { onChange: handleChange, onBlur: handleBlur, disabled: submitting };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Formulario de registro">
      <FormField id="nombre" label="Nombre completo" error={errors.nombre}>
        {(p) => (
          <input {...p} {...common} name="nombre" type="text" autoComplete="name"
            value={values.nombre} className={inputClasses} />
        )}
      </FormField>

      <FormField id="correo" label="Correo corporativo" error={errors.correo}>
        {(p) => (
          <input {...p} {...common} name="correo" type="email" autoComplete="email"
            placeholder="nombre@empresa.com" value={values.correo} className={inputClasses} />
        )}
      </FormField>

      <FormField id="contrasenia" label="Contraseña" error={errors.contrasenia}>
        {(p) => (
          <div className="relative">
            <input {...p} {...common} name="contrasenia" autoComplete="new-password"
              type={showPassword ? 'text' : 'password'} value={values.contrasenia}
              className={`${inputClasses} pr-20`} />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 px-3 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        )}
      </FormField>

      <FormField id="confirmacion" label="Confirmar contraseña" error={errors.confirmacion}>
        {(p) => (
          <input {...p} {...common} name="confirmacion" autoComplete="new-password"
            type={showPassword ? 'text' : 'password'} value={values.confirmacion}
            className={inputClasses} />
        )}
      </FormField>

      <FormField id="rol" label="Rol" error={errors.rol}>
        {(p) => (
          <select {...p} {...common} name="rol" value={values.rol} className={inputClasses}>
            <option value="">Selecciona un rol</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{ROL_LABELS[r]}</option>
            ))}
          </select>
        )}
      </FormField>

      <FormField id="departamento" label="Departamento" error={errors.departamento}>
        {(p) => (
          <select {...p} {...common} name="departamento" value={values.departamento}
            className={inputClasses}>
            <option value="">Selecciona un departamento</option>
            {DEPARTAMENTOS.map((d) => (
              <option key={d} value={d}>{DEPARTAMENTO_LABELS[d]}</option>
            ))}
          </select>
        )}
      </FormField>

      {submitError && (
        <p role="alert" className="text-sm text-red-400">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting && <Spinner />}
        {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>

      <p className="text-center text-sm text-slate-400">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-cyan-300 underline hover:text-cyan-200">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
