"use strict";
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaHome,
    FaBuilding,
    FaNewspaper,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaUserTie,
    FaUsers
} from 'react-icons/fa';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userRole, setUserRole] = useState('admin');
    const [userName, setUserName] = useState('Admin User');
    const pathname = usePathname();

    React.useEffect(() => {
        const role = localStorage.getItem('userRole') || 'admin';
        const name = localStorage.getItem('userName') || 'Admin User';
        setUserRole(role);
        setUserName(name);
    }, []);

    const allMenuItems = [
        { name: 'Dashboard', icon: <FaHome />, path: '/admin', roles: ['admin', 'agent'] },
        { name: 'Properties', icon: <FaBuilding />, path: '/admin/properties', roles: ['admin'] },
        { name: 'CRM & Leads', icon: <FaUserTie />, path: '/admin/leads', roles: ['admin', 'agent'] },
        { name: 'Users & Agents', icon: <FaUsers />, path: '/admin/users', roles: ['admin'] },
        { name: 'Content & News', icon: <FaNewspaper />, path: '/admin/news', roles: ['admin'] },
        { name: 'Settings', icon: <FaCog />, path: '/admin/settings', roles: ['admin'] },
    ];

    const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`bg-indigo-900 text-white fixed h-full z-20 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'
                    } hidden md:block`}
            >
                <div className="h-16 flex items-center justify-center border-b border-indigo-800">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold">RealEstate {userRole === 'agent' ? 'Agent' : 'Admin'}</h1>
                    ) : (
                        <span className="text-xl font-bold">RA</span>
                    )}
                </div>

                <nav className="mt-8 overflow-y-auto max-h-[calc(100vh-120px)]">
                    <ul>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path} className="mb-2">
                                    <Link
                                        href={item.path}
                                        className={`flex items-center px-6 py-3 transition-colors ${isActive
                                            ? 'bg-indigo-800 border-l-4 border-blue-400'
                                            : 'hover:bg-indigo-800 border-l-4 border-transparent'
                                            }`}
                                    >
                                        <span className="text-xl mr-3">{item.icon}</span>
                                        {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-indigo-800">
                    <Link href="/login">
                        <button className="flex items-center text-red-300 hover:text-white transition-colors w-full px-2 py-2">
                            <FaSignOutAlt className="text-xl mr-3" />
                            {isSidebarOpen && <span>Logout</span>}
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
                    }`}
            >
                {/* Top Navbar */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-500 hover:text-indigo-900 focus:outline-none"
                    >
                        {isSidebarOpen ? <FaBars className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-right">
                            <div className="mr-3 hidden sm:block">
                                <p className="text-sm font-bold text-gray-800">{userName}</p>
                                <p className="text-xs text-blue-600 capitalize bg-blue-50 px-2 py-0.5 rounded-full inline-block">{userRole}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                                {userName.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
