"use strict";
"use client";

import React, { useState } from 'react';
import {
    FaUserShield,
    FaSearch,
    FaCheckCircle,
    FaBan,
    FaEnvelope,
    FaUserTie, // For Agent
    FaUser, // For User/Seeker
    FaIdCard
} from 'react-icons/fa';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'Agent' | 'User' | 'Moderator';
    status: 'Active' | 'Pending Verification' | 'Banned';
    joinDate: string;
    listingsCount: number;
}

const INITIAL_USERS: User[] = [
    { id: '1', name: 'John Doe', email: 'john@remax.com', role: 'Agent', status: 'Active', joinDate: '2023-01-15', listingsCount: 12 },
    { id: '2', name: 'Sarah Smith', email: 'sarah.s@gmail.com', role: 'User', status: 'Active', joinDate: '2023-03-22', listingsCount: 0 },
    { id: '3', name: 'Mike Johnson', email: 'mike.realestate@outlook.com', role: 'Agent', status: 'Pending Verification', joinDate: '2024-02-10', listingsCount: 1 },
    { id: '4', name: 'Emily Brown', email: 'emily.b@yahoo.com', role: 'User', status: 'Banned', joinDate: '2023-11-05', listingsCount: 0 },
    { id: '5', name: 'Admin Mod', email: 'mod@platform.com', role: 'Moderator', status: 'Active', joinDate: '2022-12-01', listingsCount: 0 },
];

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [activeTab, setActiveTab] = useState<'All' | 'Agents' | 'Users'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleVerify = (id: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' as const } : u));
    };

    const handleBan = (id: string) => {
        if (window.confirm('Are you sure you want to ban this user?')) {
            setUsers(users.map(u => u.id === id ? { ...u, status: 'Banned' as const } : u));
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesTab = activeTab === 'All' ||
            (activeTab === 'Agents' && user.role === 'Agent') ||
            (activeTab === 'Users' && user.role === 'User');
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">User & Agent Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Verify agents, manage permissions, and moderate users.</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0 bg-white p-1 rounded-lg border border-gray-200">
                    {['All', 'Agents', 'Users'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Verification Queue Alert */}
            {users.some(u => u.status === 'Pending Verification') && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <FaUserShield className="text-orange-500 text-xl mr-3" />
                        <div>
                            <p className="text-sm font-bold text-orange-800">Action Required</p>
                            <p className="text-xs text-orange-700">There are agents waiting for license verification.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-gray-500 font-medium">Create Date</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">User Profile</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Role</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Status</th>
                                <th className="px-6 py-4 text-gray-500 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{user.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white mr-3 shadow-sm ${user.role === 'Agent' ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                                                {user.role === 'Agent' ? <FaUserTie /> : <FaUser />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{user.name}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <FaEnvelope className="text-[10px]" /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-700 text-sm">{user.role}</span>
                                            {user.role === 'Agent' && <span className="text-xs text-gray-400">{user.listingsCount} active listings</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase flex items-center w-fit gap-1 ${user.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                user.status === 'Pending Verification' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {user.status === 'Active' && <FaCheckCircle />}
                                            {user.status === 'Pending Verification' && <FaIdCard />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {user.status === 'Pending Verification' && (
                                            <button
                                                onClick={() => handleVerify(user.id)}
                                                className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition"
                                            >
                                                Approve License
                                            </button>
                                        )}
                                        {user.status !== 'Banned' && (
                                            <button
                                                onClick={() => handleBan(user.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                                                title="Ban User"
                                            >
                                                <FaBan />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
