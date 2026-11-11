import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField, { inputClasses } from './FormField';
import Spinner from './Spinner';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { validateLoginForm } from '../utils/validators';

export default function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [values, setValues] = useState({ correo: '', contrasenia: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const found = validateLoginForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const user = await authService.login(values);
      signIn(user);
      navigate('/home');
    } catch (error) {
      setSubmitError(error.message || 'No se pudo iniciar sesión.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Formulario de inicio de sesión">
      <FormField id="login-correo" label="Correo" error={errors.correo}>
        {(p) => (
          <input {...p} name="correo" type="email" autoComplete="email" value={values.correo}
            onChange={handleChange} disabled={submitting} className={inputClasses} />
        )}
      </FormField>
      <FormField id="login-contrasenia" label="Contraseña" error={errors.contrasenia}>
        {(p) => (
          <input {...p} name="contrasenia" type="password" autoComplete="current-password"
            value={values.contrasenia} onChange={handleChange} disabled={submitting}
            className={inputClasses} />
        )}
      </FormField>

      {submitError && <p role="alert" className="text-sm text-red-400">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting && <Spinner />}
        {submitting ? 'Ingresando…' : 'Iniciar sesión'}
      </button>

      <p className="text-center text-sm text-slate-400">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-cyan-300 underline hover:text-cyan-200">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
