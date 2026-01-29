"use strict";
"use client";

import React, { useState } from 'react';
import {
    FaSearch,
    FaEnvelope,
    FaPhone,
    FaFilter,
    FaUserPlus,
    FaCommentAlt,
    FaShareAlt
} from 'react-icons/fa';

interface Lead {
    id: string;
    clientName: string;
    contact: string;
    inquiryFor: string; // Property ID or Title
    assignedAgent: string;
    status: 'New' | 'Distributed' | 'Contacted';
    date: string;
}

const INITIAL_LEADS: Lead[] = [
    { id: 'L-101', clientName: 'Amit Verma', contact: 'amit@gmail.com', inquiryFor: 'Luxury 3BHK in CP', assignedAgent: 'John Doe', status: 'New', date: '10 mins ago' },
    { id: 'L-102', clientName: 'Sneha Reddy', contact: '+91 98765...', inquiryFor: 'Modern Villa in GK', assignedAgent: 'Sarah Smith', status: 'Contacted', date: '2 hours ago' },
    { id: 'L-103', clientName: 'Rajesh Kumar', contact: 'rajesh@yahoo.com', inquiryFor: 'Office Space Noida', assignedAgent: '-', status: 'New', date: '1 hour ago' },
];

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Inquiry Tracker</h2>
                    <p className="text-gray-500 text-sm mt-1">Centralized lead distribution and tracking.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md">
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-gray-500 font-medium">Lead Details</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Inquiry For</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Assigned Agent</th>
                            <th className="px-6 py-4 text-gray-500 font-medium">Status</th>
                            <th className="px-6 py-4 text-gray-500 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{lead.clientName}</div>
                                    <div className="text-xs text-gray-500">{lead.contact}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{lead.date}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-indigo-600 font-medium">
                                    {lead.inquiryFor}
                                </td>
                                <td className="px-6 py-4">
                                    {lead.assignedAgent === '-' ? (
                                        <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Unassigned</span>
                                    ) : (
                                        <span className="text-sm text-gray-700">{lead.assignedAgent}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                            lead.status === 'Contacted' ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-500 hover:text-indigo-600 transition" title="Distribute Lead">
                                        <FaShareAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
