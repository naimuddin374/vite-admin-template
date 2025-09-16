import { IAuthUser } from '@/types';
import { ACCESS_TOKEN_KEY, AUTH_USER_KEY } from '@consts/index';
import { clearStorage, getItem, setItem } from '@services/localStorage';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';


interface AuthContextType {
    isAuthenticated?: boolean | undefined;
    user: IAuthUser | null | undefined;
    isLoading: boolean;
    login: (accessToken: string, user: IAuthUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IAuthUser | null | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const storedUser = getItem(AUTH_USER_KEY);
        const storedToken = getItem(ACCESS_TOKEN_KEY);
        if (storedUser && storedToken) {
            setUser(storedUser);
            setIsAuthenticated(true);
            return;
        }
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const login = (accessToken: string, user: IAuthUser) => {
        if (!accessToken || !user) return;
        setItem(ACCESS_TOKEN_KEY, accessToken);
        setItem(AUTH_USER_KEY, user);
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        clearStorage();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading: user === undefined }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
