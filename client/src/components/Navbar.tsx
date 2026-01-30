"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";


export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useContext(AuthContext);

    // Don't show this navbar on admin pages
    if (pathname.startsWith('/admin')) {
        return null;
    }

    const isActive = (path: string) => pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600 font-medium';

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        {/* Logo Icon could go here */}
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            EstatePrime
                        </span>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link href="/buy" className={`${isActive('/buy')} transition`}>Buy</Link>
                    <Link href="/rent" className={`${isActive('/rent')} transition`}>Rent</Link>
                    <Link href="/sell" className={`${isActive('/sell')} transition`}>Sell</Link>
                </div>
                <div className="flex items-center gap-4">
                    {/* Admin Link for easy access during dev */}
                    <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-600 uppercase font-semibold">
                        ADMIN
                    </Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-700">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={logout}
                                className="text-red-500 hover:text-red-600 font-medium text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Sign In
                        </Link>
                    )}

                    <Link href="/sell">
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95 transform duration-150">
                            Post Property
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
