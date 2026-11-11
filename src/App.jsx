import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';

export default function App() {
  const login = (
    <PublicOnlyRoute>
      <LoginPage />
    </PublicOnlyRoute>
  );
  const home = (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/" element={login} />
      <Route path="/login" element={login} />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route path="/home" element={home} />
      <Route path="/dashboard" element={home} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
