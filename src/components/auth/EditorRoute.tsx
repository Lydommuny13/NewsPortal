import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface EditorRouteProps {
  children: React.ReactNode;
}

export function EditorRoute({ children }: EditorRouteProps) {
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