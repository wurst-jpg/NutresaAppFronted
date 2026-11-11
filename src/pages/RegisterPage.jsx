import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout title="Crea tu cuenta" subtitle="Usa tu correo corporativo">
      <RegisterForm />
    </AuthLayout>
  );
}
