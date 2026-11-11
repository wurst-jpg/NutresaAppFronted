import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Sin sesión -> /login
export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Con sesión no tiene sentido ver login/registro -> /home
export function PublicOnlyRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : children;
}

export default ProtectedRoute;
