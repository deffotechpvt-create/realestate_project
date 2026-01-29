"use strict";
"use client";

import React, { useState } from 'react';
import {
    FaSave,
    FaGlobe,
    FaLock,
    FaBell,
    FaPalette,
    FaDatabase,
    FaCheckCircle
} from 'react-icons/fa';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">General Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Real Estate Platform"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@realestate.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                                    <input
                                        type="text"
                                        defaultValue="+91 9876543210"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-700">
                                        <option value="INR">INR (₹)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Location Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Country</label>
                                    <input
                                        type="text"
                                        defaultValue="India"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City Filtering</label>
                                    <div className="flex items-center mt-2">
                                        <input type="checkbox" id="restrict-cities" className="w-4 h-4 text-indigo-600 rounded" defaultChecked />
                                        <label htmlFor="restrict-cities" className="ml-2 text-gray-600">Restrict listings to supported cities only</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Security Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div>
                                    <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                                    <p className="text-sm text-gray-500">Enable 2FA for all admin accounts</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div>
                                    <h4 className="font-medium text-gray-800">Password Expiry</h4>
                                    <p className="text-sm text-gray-500">Require users to change password every 90 days</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                <input
                                    type="number"
                                    defaultValue="30"
                                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Appearance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-indigo-500 rounded-lg p-4 cursor-pointer relative ring-2 ring-indigo-200 transition">
                                <div className="absolute top-2 right-2 text-indigo-600"><FaCheckCircle className="text-xl" /></div>
                                <div className="h-20 bg-gray-100 mb-2 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                                </div>
                                <p className="text-center font-bold mt-4 text-indigo-700">Light Mode</p>
                            </div>
                            <div className="border border-gray-200 hover:border-indigo-300 rounded-lg p-4 cursor-pointer transition">
                                <div className="h-20 bg-gray-800 mb-2 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-700 w-3/4 rounded"></div>
                                    <div className="h-4 bg-gray-700 w-1/2 rounded"></div>
                                </div>
                                <p className="text-center font-bold mt-4 text-gray-600">Dark Mode</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-indigo-600 ring-2 ring-offset-2 ring-indigo-600"></button>
                                <button className="w-10 h-10 rounded-full bg-blue-600"></button>
                                <button className="w-10 h-10 rounded-full bg-green-600"></button>
                                <button className="w-10 h-10 rounded-full bg-red-600"></button>
                                <button className="w-10 h-10 rounded-full bg-purple-600"></button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Platform Settings</h2>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-md">
                    <FaSave /> Save Changes
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <nav className="flex flex-col">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`flex items-center px-6 py-4 transition-colors text-left ${activeTab === 'general'
                                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <FaGlobe className="mr-3 text-lg" /> General
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center px-6 py-4 transition-colors text-left ${activeTab === 'security'
                                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <FaLock className="mr-3 text-lg" /> Security
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`flex items-center px-6 py-4 transition-colors text-left ${activeTab === 'notifications'
                                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <FaBell className="mr-3 text-lg" /> Notifications
                            </button>
                            <button
                                onClick={() => setActiveTab('appearance')}
                                className={`flex items-center px-6 py-4 transition-colors text-left ${activeTab === 'appearance'
                                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <FaPalette className="mr-3 text-lg" /> Appearance
                            </button>
                            <button
                                onClick={() => setActiveTab('data')}
                                className={`flex items-center px-6 py-4 transition-colors text-left ${activeTab === 'data'
                                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <FaDatabase className="mr-3 text-lg" /> Data Management
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
