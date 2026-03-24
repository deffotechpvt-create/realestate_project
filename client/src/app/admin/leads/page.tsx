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

// Mock Agents for assignment
const AVAILABLE_AGENTS = ['Agent Smith', 'John Doe', 'Sarah Connor'];

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
    const [assigningId, setAssigningId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState('admin');
    const [userName, setUserName] = useState('');

    React.useEffect(() => {
        setUserRole(localStorage.getItem('userRole') || 'admin');
        setUserName(localStorage.getItem('userName') || '');
    }, []);

    const handleAssign = (leadId: string, agentName: string) => {
        setLeads(leads.map(l => l.id === leadId ? { ...l, assignedAgent: agentName, status: 'Distributed' } : l));
        setAssigningId(null);
    };

    // Filter leads for agents
    const displayedLeads = leads.filter(lead => {
        if (userRole === 'agent') {
            // Match roughly by name or exact match depending on how you stored it
            // For mock demo, we'll try to match exact or included string
            return lead.assignedAgent === userName || lead.assignedAgent.includes(userName.split(' ')[0]);
        }
        return true; // Admins see all
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {userRole === 'agent' ? 'My Assigned Leads' : 'Inquiry Tracker'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {userRole === 'agent' ? 'Manage your active client inquiries.' : 'Centralized lead distribution and tracking.'}
                    </p>
                </div>
                {userRole === 'admin' && (
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md">
                        Export CSV
                    </button>
                )}
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
                        {displayedLeads.map((lead) => (
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
                                    {assigningId === lead.id && userRole === 'admin' ? (
                                        <select
                                            className="border rounded px-2 py-1 text-sm bg-white"
                                            onChange={(e) => handleAssign(lead.id, e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Agent</option>
                                            {AVAILABLE_AGENTS.map(agent => (
                                                <option key={agent} value={agent}>{agent}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        lead.assignedAgent === '-' ? (
                                            <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Unassigned</span>
                                        ) : (
                                            <span className="text-sm text-gray-700 font-medium flex items-center gap-1">
                                                <FaUserPlus className="text-xs text-gray-400" /> {lead.assignedAgent}
                                            </span>
                                        )
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                        lead.status === 'Contacted' ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {userRole === 'admin' ? (
                                        <button
                                            onClick={() => setAssigningId(lead.id)}
                                            className="text-gray-500 hover:text-indigo-600 transition"
                                            title="Assign to Agent"
                                        >
                                            <FaShareAlt />
                                        </button>
                                    ) : (
                                        <button className="text-gray-400 cursor-not-allowed" title="View Only">
                                            <FaCommentAlt />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
