import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Iniciar sesión" subtitle="Accede a la plataforma de videos corporativos">
      <LoginForm />
    </AuthLayout>
  );
}
