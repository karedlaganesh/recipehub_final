import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function ProtectedRoute({ role, children }) {
  const { session } = useApp();
  const location = useLocation();

  if (!session) {
    const loginPath = role === 'admin' ? '/admin/login' : '/login';
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }
  if (session.role !== role) {
    return <Navigate to={session.role === 'admin' ? '/admin' : '/user/dashboard'} replace />;
  }
  return children || <Outlet />;
}
