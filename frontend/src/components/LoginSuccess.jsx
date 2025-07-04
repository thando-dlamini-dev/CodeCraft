import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { Loader2Icon } from "lucide-react";
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const LoginSuccess = () => {
    const [isLoading, setIsLoading] = useState(true);
    const setAuthData = useAuthStore(state => state.setAuthData);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Call your auth status endpoint
                const response = await api.get('/api/auth/status', {
                    withCredentials: true // Important: include cookies
                });

                if (response.data.isAuthenticated) {
                    // Set auth data in store
                    setAuthData({
                        token: response.data.token,
                        user: response.data.user
                    });

                    toast.success(`Welcome, ${response.data.user.username}!`, {
                        duration: 3000,
                        position: 'top-center'
                    });

                    // Small delay to ensure state is updated
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 100);
                } else {
                    // Not authenticated, redirect to login
                    navigate('/login', { replace: true });
                }
            } catch (error) {
                console.error('Auth status check failed:', error);
                toast.error('Login failed. Please try again.');
                navigate('/login', { replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [navigate, setAuthData]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-screen min-h-screen">
                <Loader2Icon className='w-10 h-10 animate-spin' />
                <p className="mt-4 text-lg">Completing login...</p>
            </div>
        );
    }

    return null; // Component will redirect before rendering
};

export default LoginSuccess;