import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { IAuthUser } from '../types';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login: React.FC = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string>('');

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            setLoginError('');
            const payload: IAuthUser = {
                email: values.email,
                name: 'Admin',
                role: 'admin',
            };
            await login('auth-token', payload);
            navigate('/');
        } catch (error) {
            setLoginError('Invalid email or password');
        }
    };

    return (
        <div className="space-y-6">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="mt-1 text-sm text-red-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="mt-1 text-sm text-red-600"
                            />
                        </div>

                        {loginError && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                {loginError}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <LoadingSpinner size="sm" />
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Demo credentials: admin@example.com / password
                </p>
            </div>
        </div>
    );
};

export default Login;
