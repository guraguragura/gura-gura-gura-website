import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from '@/components/common/PageLoader';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  fallbackPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  fallbackPath = '/auth' 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
};