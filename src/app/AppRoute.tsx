import LoadingSpinner from '@/components/LoadingSpinner';
import PrivateLayout from '@/components/layout/PrivateLayout';
import PublicLayout from '@/components/layout/public/PublicLayout';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoute: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // If not authenticated, show login page
    if (!isAuthenticated) {
        return (
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicLayout>
                            <Login />
                        </PublicLayout>
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    // If authenticated, show protected routes
    return (
        <Routes>
            <Route path="/" element={<PrivateLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="properties" element={<div>Properties</div>} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoute;
