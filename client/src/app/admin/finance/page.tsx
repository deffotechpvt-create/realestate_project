"use strict";
"use client";

import React from 'react';
import {
    FaFileInvoiceDollar,
    FaMoneyCheckAlt,
    FaDownload,
    FaExclamationCircle
} from 'react-icons/fa';

export default function FinancePage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Financial Operations</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage invoices, rent collection, and expenses.</p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-md">
                    <FaFileInvoiceDollar /> Create Invoice
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm">Collected this Month</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">₹ 14,50,000</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-red-500">
                    <p className="text-gray-500 text-sm">Pending / Overdue</p>
                    <h3 className="text-2xl font-bold text-red-600 mt-1">₹ 2,30,000</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-blue-500">
                    <p className="text-gray-500 text-sm">Security Deposits Held</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">₹ 45,00,000</h3>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                    <div className="space-x-2">
                        <button className="text-sm text-gray-600 hover:text-indigo-600">All</button>
                        <button className="text-sm text-gray-600 hover:text-indigo-600">Paid</button>
                        <button className="text-sm text-gray-600 hover:text-indigo-600">Pending</button>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-gray-500 font-medium">Invoice ID</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Tenant / Client</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Type</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Amount</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Due Date</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Status</th>
                            <th className="px-6 py-4 text-gray-500 font-medium text-right">Download</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-800 font-mono text-sm">#INV-2024-001</td>
                            <td className="px-6 py-4 text-gray-800">John Doe</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">Monthly Rent - Apt 402</td>
                            <td className="px-6 py-4 font-bold text-gray-800">₹ 35,000</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">Feb 01, 2024</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">PAID</span></td>
                            <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600"><FaDownload /></button></td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-800 font-mono text-sm">#INV-2024-002</td>
                            <td className="px-6 py-4 text-gray-800">TechSoft Pvt Ltd</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">Lease Payment - Office 2B</td>
                            <td className="px-6 py-4 font-bold text-gray-800">₹ 1,50,000</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">Feb 05, 2024</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center w-fit gap-1"><FaExclamationCircle /> PENDING</span></td>
                            <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600"><FaDownload /></button></td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-800 font-mono text-sm">#INV-2024-003</td>
                            <td className="px-6 py-4 text-gray-800">Sarah Smith</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">Security Deposit</td>
                            <td className="px-6 py-4 font-bold text-gray-800">₹ 1,00,000</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">Jan 28, 2024</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">PAID</span></td>
                            <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-gray-600"><FaDownload /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
