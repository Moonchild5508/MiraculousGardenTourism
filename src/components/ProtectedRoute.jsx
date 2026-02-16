import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedUser({ children }) {
  const { isUser, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="auth-loading">Loading…</div>;
  if (!isUser) return <Navigate to="/login/user" state={{ from: location }} replace />;
  return children;
}

export function ProtectedAdmin({ children }) {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="auth-loading">Loading…</div>;
  if (!isAdmin) return <Navigate to="/login/admin" state={{ from: location }} replace />;
  return children;
}
