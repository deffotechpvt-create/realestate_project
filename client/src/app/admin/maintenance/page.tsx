"use strict";
"use client";

import React from 'react';
import {
    FaTools,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle
} from 'react-icons/fa';

export default function MaintenancePage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Maintenance Requests</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage property repairs and service tickets.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Board / List */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Ticket 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                        <div className="mt-1">
                            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                                <FaExclamationTriangle className="text-lg" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">Water Leakage in Master Bath</h3>
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded uppercase">High Priority</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Reported by: John Doe (Apt 402)</p>
                            <p className="text-sm text-gray-500 mt-2">"Water leaking from ceiling, seems urgent."</p>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>Ticket #204</span>
                                    <span>Filed: 2 hrs ago</span>
                                </div>
                                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Assign Vendor</button>
                            </div>
                        </div>
                    </div>

                    {/* Ticket 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                        <div className="mt-1">
                            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                                <FaTools className="text-lg" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">AC Servicing Requests - Block A</h3>
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded uppercase">In Progress</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Assigned to: CoolAir Vendors</p>
                            <p className="text-sm text-gray-500 mt-2">Scheduled seasonal maintenance for all 12 units.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>Ticket #198</span>
                                    <span>Filed: 1 day ago</span>
                                </div>
                                <button className="text-sm text-gray-400 font-medium cursor-not-allowed">Assigned</button>
                            </div>
                        </div>
                    </div>

                    {/* Ticket 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 opacity-75">
                        <div className="mt-1">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                <FaCheckCircle className="text-lg" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 line-through">Broken Window Latch</h3>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Resolved</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Resolved by: Handyman Mike</p>
                            <div className="mt-4 flex items-center text-xs text-gray-500">
                                <span>Ticket #195</span>
                                <span className="ml-4">Closed: Yesterday</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Vendor Directory</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Flash Plumbing</span>
                                <span className="text-green-600 font-medium">Available</span>
                            </li>
                            <li className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">City Electricians</span>
                                <span className="text-red-500 font-medium">Busy</span>
                            </li>
                            <li className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">CleanCo Services</span>
                                <span className="text-green-600 font-medium">Available</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-blue-800 p-6 rounded-xl text-white">
                        <h3 className="font-bold text-lg mb-2">Automated Alerts</h3>
                        <p className="text-indigo-100 text-sm mb-4">Lease expirations and recurring maintenance schedule.</p>
                        <div className="bg-white/10 p-3 rounded-lg mb-2 flex items-center gap-3">
                            <FaClock className="text-yellow-400" />
                            <div className="text-xs">
                                <p className="font-bold">Lease Renewal Pending</p>
                                <p className="opacity-80">Unit 304 - Expiring in 5 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
