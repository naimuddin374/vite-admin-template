import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@components/LoadingSpinner';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AppRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

const AppRoute: React.FC<AppRouteProps> = ({
    children,
    requireAuth = true
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated) {
        // Redirect to dashboard if already authenticated
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AppRoute;
