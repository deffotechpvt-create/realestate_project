"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const pathname = usePathname();
    const { user, loading, logout, isAdmin, isAgent, isPending } = useAuth();

    // Don't show this navbar on admin pages
    if (pathname.startsWith('/admin')) {
        return null;
    }

    const isActive = (path: string) => pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600 font-medium';

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            EstatePrime
                        </span>
                    </Link>
                </div>

                {/* Center Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    <Link href="/buy" className={`${isActive('/buy')} transition`}>
                        Buy
                    </Link>
                    <Link href="/rent" className={`${isActive('/rent')} transition`}>
                        Rent
                    </Link>
                    <Link href="/sell" className={`${isActive('/sell')} transition`}>
                        Sell
                    </Link>
                </div>

                {/* Right Side - Auth & Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            {/* Pending Verification Badge */}
                            {isPending() && (
                                <div className="hidden sm:flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md text-xs font-medium">
                                    ⚠️ Pending
                                </div>
                            )}

                            {/* Admin Link (Only for Admin) */}
                            {isAdmin() && (
                                <Link
                                    href="/admin"
                                    className="text-xs text-gray-400 hover:text-gray-600 uppercase font-semibold transition"
                                >
                                    ADMIN
                                </Link>
                            )}

                            {/* Agent Dashboard Link (Only for Verified Agent) */}
                            {isAgent() && user.status === 'active' && (
                                <Link
                                    href="/agent/dashboard"
                                    className="text-xs text-gray-600 hover:text-blue-600 uppercase font-semibold transition"
                                >
                                    MY DASHBOARD
                                </Link>
                            )}

                            {/* User Profile Link */}
                            <Link
                                href="/user/profile"
                                className="text-gray-600 hover:text-blue-600 font-medium transition"
                            >
                                {user.name}
                            </Link>

                            {/* Post Property Button (Only for Active Users) */}
                            {user.status === 'active' ? (
                                <Link href="/sell">
                                    <button className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95 transform duration-150">
                                        Post Property
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="px-5 py-2 bg-gray-300 text-gray-500 rounded-full font-medium cursor-not-allowed"
                                    title="Account pending verification"
                                >
                                    Post Property
                                </button>
                            )}

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                className="text-gray-600 hover:text-red-600 font-medium transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Not Logged In */}
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-blue-600 font-medium transition"
                            >
                                Sign In
                            </Link>
                            <Link href="/sell">
                                <button className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95 transform duration-150">
                                    Post Property
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
