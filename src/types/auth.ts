
export interface AuthContextType {
    user: IAuthUser | null | undefined;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface IAuthUser {
    email: string;
    name?: string;
    cellNum?: string;
    company_id?: string;
    isEmailVerified?: boolean;
    role?: string;
    _id?: string;
}
