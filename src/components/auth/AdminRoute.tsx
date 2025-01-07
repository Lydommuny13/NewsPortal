import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Only allow admin users
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}