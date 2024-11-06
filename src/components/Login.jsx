import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

export function Login() {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(location.state?.error);
    const [message, setMessage] = useState(location.state?.error || '');
    const [isError, setIsError] = useState(!!location.state?.error);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${serverUrl}login`, data);
            login(response.data.accesstoken);
            setMessage(response.data.message);
            setIsError(false);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            if (!error.response) {
                setMessage('Server is not responding. Please try again later.');
            } else {
                setMessage(error.response.data.message);
            }
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader />
                </div>
            )}
            <div className={`flex flex-col items-center justify-center px-6 py-8 lg:py-0 h-screen ${loading ? 'opacity-50' : ''}`}>
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    Login
                </div>
                <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        {message && (
                            <div
                                className={`p-4 text-sm rounded-lg ${isError
                                    ? 'text-red-700 bg-red-100'
                                    : 'text-green-700 bg-green-100'
                                    }`}
                                role="alert"
                            >
                                {message}
                            </div>
                        )}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Định dạng email hợp lệ
                                            message: 'Invalid email format' // Thông báo lỗi nếu định dạng không hợp lệ
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-medium text-primary-600 hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}