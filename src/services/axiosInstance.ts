import { ACCESS_TOKEN_KEY } from '@/consts';
import { clearStorage, getItem } from '@/services/localStorage';
import { store } from '@/stores';
import { setToaster } from '@/stores/toasterSlice';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create Axios instance with basic configuration
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getItem(ACCESS_TOKEN_KEY);
        if (token && config.headers) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor for handling responses and errors
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Return only the data for simpler usage in React Query
        const message = response?.data?.message
        if (message) {
            store.dispatch(setToaster({ message, severity: 'success' }));
        }
        return response.data;
    },
    (error) => {
        // Handle response errors (e.g., 401, 500)
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                // Optional: Handle unauthorized (e.g., token expired)
                console.error('Unauthorized access - possibly invalid token');
                // You could trigger a logout or token refresh here
                store.dispatch(setToaster({ message: data.message || 'Unauthorized access', severity: 'error' }));

                // Logout functionality clear local storage and redirect to login page
                clearStorage();
                window.location.href = '/login';
            }
            return Promise.reject(new Error(data.message || 'API error occurred'));
        }
        return Promise.reject(new Error('Network error occurred'));
    }
);

export default axiosInstance;