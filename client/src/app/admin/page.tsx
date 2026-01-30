"use strict";
"use client";

import React, { useState, useEffect } from 'react';
import {
    FaUserPlus,
    FaHome,
    FaEye,
    FaChartArea,
    FaArrowUp,
    FaArrowDown,
    FaExclamationCircle
} from 'react-icons/fa';

export default function AdminDashboard() {
    const [userRole, setUserRole] = useState('admin');

    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'admin';
        setUserRole(role);
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Marketplace Insights</h2>
                <p className="text-gray-500 mt-1">Platform health, engagement metrics, and growth tracking.</p>
            </div>

            {/* KPI Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Active Listings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Active Listings</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">1,245</h3>
                        </div>
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <FaHome className="text-xl" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
                        <FaArrowUp className="mr-1" />
                        <span>24 new today</span>
                    </div>
                </div>

                {/* New Leads/Inquiries */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Lead Volume</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">86</h3>
                        </div>
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <FaUserPlus className="text-xl" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span>Last 24 Hours</span>
                    </div>
                </div>

                {/* Total Views */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Property Views</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">45.2k</h3>
                        </div>
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <FaEye className="text-xl" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
                        <FaArrowUp className="mr-1" />
                        <span>12% vs last week</span>
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Inquiry Trends Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Inquiry Volume (Last 30 Days)</h3>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaChartArea className="mr-2" />
                            Engagement Trend
                        </div>
                    </div>
                    {/* CSS Bar Chart for Lead Volume */}
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {[15, 22, 18, 35, 42, 28, 55, 62, 48, 70, 65, 86].map((h, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                                <div
                                    className="w-full bg-indigo-100 hover:bg-indigo-600 rounded-t-sm transition-all duration-300 relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                        {h} Leads
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>Day 1</span>
                        <span>Day 15</span>
                        <span>Day 30</span>
                    </div>
                </div>

                {/* Top Performing Agents / Hot Properties */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Market Movers</h3>

                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Questions Trending</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 font-medium truncate w-40">Luxury 3BHK in CP</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">14 Leads</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 font-medium truncate w-40">Studio in Gurgaon</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">9 Leads</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 font-medium truncate w-40">Villa in GK</span>
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded font-bold">5 Leads</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Agents</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">JD</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">John Doe</p>
                                    <p className="text-xs text-green-600">Avg Resp: 5m</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">SS</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Sarah Smith</p>
                                    <p className="text-xs text-green-600">Avg Resp: 20m</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
