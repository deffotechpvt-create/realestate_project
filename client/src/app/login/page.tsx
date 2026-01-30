"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaFacebookF, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';
import { MOCK_USERS } from '@/data/users';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = (email: string) => {
        const user = MOCK_USERS.find(u => u.email === email);
        if (user) {
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userId', user._id);

            if (user.role === 'admin' || user.role === 'agent') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } else {
            setError('Invalid credentials');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock check
        const user = MOCK_USERS.find(u => u.email === formData.email);

        if (user) {
            handleLogin(user.email);
        } else {
            // Fallback for testing generic emails
            if (formData.email.includes('admin')) {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Admin Tester');
                router.push('/admin');
            } else if (formData.email.includes('agent')) {
                localStorage.setItem('userRole', 'agent');
                localStorage.setItem('userName', 'Agent Tester');
                router.push('/admin');
            } else {
                setError('User not found. Try the Quick Login buttons below.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your properties and leads.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                                    placeholder="admin@estateprime.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required={!formData.email} // Not required if just clicking quick login, but form usually requires it
                                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash className="text-gray-400 hover:text-gray-600" /> : <FaEye className="text-gray-400 hover:text-gray-600" />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Quick Login - Developer Tools */}
                <div className="mt-6 border-t pt-6 bg-gray-50 -mx-8 px-8 pb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">Quick Login (Developers Only)</p>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => handleLogin(MOCK_USERS[0].email)}
                            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition gap-2"
                        >
                            <FaUserShield className="text-red-500 text-xl" />
                            <span className="text-xs font-medium text-gray-700">Admin</span>
                        </button>
                        <button
                            onClick={() => handleLogin(MOCK_USERS[1].email)}
                            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition gap-2"
                        >
                            <FaUserTie className="text-blue-500 text-xl" />
                            <span className="text-xs font-medium text-gray-700">Agent</span>
                        </button>
                        <button
                            onClick={() => handleLogin(MOCK_USERS[2].email)}
                            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition gap-2"
                        >
                            <FaUser className="text-green-500 text-xl" />
                            <span className="text-xs font-medium text-gray-700">User</span>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        <FaGoogle className="text-red-500 mr-2 text-lg" />
                        Google
                    </button>
                    <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        <FaFacebookF className="text-blue-600 mr-2 text-lg" />
                        Facebook
                    </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
