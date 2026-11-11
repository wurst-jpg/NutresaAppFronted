import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { REGISTER_FIELDS, validateField, validateRegisterForm } from '../utils/validators';

const INITIAL_VALUES = {
  nombre: '',
  correo: '',
  contrasenia: '',
  confirmacion: '',
  rol: '',
  departamento: '',
};

export default function useRegisterForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Validación al salir del campo.
  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmitError('');
      const found = validateRegisterForm(values);
      setErrors(found);
      if (REGISTER_FIELDS.some((name) => found[name])) return;

      setSubmitting(true);
      try {
        const user = await authService.register(values);
        signIn(user);
        showToast(`¡Cuenta creada con éxito! Bienvenido/a, ${user.nombre}.`);
        navigate('/home');
      } catch (error) {
        if (error.status === 409) setErrors((prev) => ({ ...prev, correo: error.message }));
        else setSubmitError(error.message || 'No se pudo completar el registro.');
        setSubmitting(false);
      }
    },
    [values, signIn, showToast, navigate],
  );

  return { values, errors, submitting, submitError, handleChange, handleBlur, handleSubmit };
}
