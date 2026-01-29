"use strict";
"use client";

import React, { useState } from 'react';
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
    FaFilter
} from 'react-icons/fa';

// Mock Interfaces and Data
interface Property {
    id: string;
    title: string;
    type: string;
    price: number;
    location: string;
    status: string;
    approval?: string;
    dateAdded: string;
    views: number;
}

const INITIAL_PROPERTIES: Property[] = [
    { id: '1', title: 'Luxury 3BHK Apartment in CP', type: 'Apartment', price: 85000, location: 'Connaught Place, Delhi', status: 'Active', approval: 'Approved', dateAdded: '2023-10-15', views: 1240 },
    { id: '2', title: 'Modern Villa in GK', type: 'Villa', price: 85000000, location: 'Greater Kailash, Delhi', status: 'Active', approval: 'Approved', dateAdded: '2023-11-02', views: 890 },
    { id: '3', title: 'Office Space in Noida', type: 'Commercial', price: 150000, location: 'Sector 62, Noida', status: 'Pending', approval: 'Pending Review', dateAdded: '2023-11-10', views: 430 },
    { id: '4', title: 'Studio in Gurgaon', type: 'Apartment', price: 25000, location: 'Cyber City, Gurgaon', status: 'Sold', approval: 'Approved', dateAdded: '2023-09-28', views: 2100 },
    { id: '5', title: 'Farmhouse in Chattarpur', type: 'Plot', price: 12000000, location: 'Chattarpur, Delhi', status: 'Active', approval: 'Approved', dateAdded: '2023-12-05', views: 560 },
    { id: '6', title: '2BHK in Dwarka', type: 'Apartment', price: 35000, location: 'Dwarka Sec 10, Delhi', status: 'New', approval: 'Pending Review', dateAdded: '2024-01-12', views: 320 },
];

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || property.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Properties Management</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-md">
                    <FaPlus /> Add New Property
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search properties by title or location..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <FaFilter className="text-gray-500" />
                    <select
                        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold">Sold</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-gray-500 font-medium">Property</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Type</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Price</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Location</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Date Added</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Status & Approval</th>
                                <th className="px-6 py-4 text-gray-500 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProperties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{property.title}</div>
                                        <div className="text-xs text-gray-500">ID: #{property.id}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{property.type}</td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">₹ {property.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-600">{property.location}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{property.dateAdded}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase w-fit ${property.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            property.status === 'Sold' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {property.status}
                                            </span>
                                            {property.approval === 'Pending Review' && (
                                                <span className="text-[10px] text-orange-600 font-medium">Needs Approval</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredProperties.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No properties found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>Showing {filteredProperties.length} of {properties.length} properties</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
        </div>
    );
}
