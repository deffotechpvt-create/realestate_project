"use strict";
"use client";

import React, { useState } from 'react';
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
    FaCalendarAlt
} from 'react-icons/fa';

interface NewsItem {
    id: string;
    title: string;
    category: string;
    author: string;
    status: 'Published' | 'Draft' | 'Archived';
    publishDate: string;
    views: number;
}

const INITIAL_NEWS: NewsItem[] = [
    { id: '1', title: 'Top 10 Real Estate Trends in 2024', category: 'Market Trends', author: 'Admin User', status: 'Published', publishDate: '2024-01-15', views: 1250 },
    { id: '2', title: 'New Metro Line Boosts Property Prices', category: 'Infrastructure', author: 'Editor', status: 'Published', publishDate: '2024-02-10', views: 890 },
    { id: '3', title: 'Tips for First-Time Home Buyers', category: 'Guide', author: 'Admin User', status: 'Draft', publishDate: '-', views: 0 },
    { id: '4', title: 'Housing Market Report Q4 2023', category: 'Report', author: 'Analyst', status: 'Archived', publishDate: '2023-12-20', views: 3400 },
];

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this news item?')) {
            setNews(news.filter(n => n.id !== id));
        }
    };

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">News Management</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-md">
                    <FaPlus /> Add News Article
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search news by title or category..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* News Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-gray-500 font-medium">Title</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Category</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Author</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Status</th>
                                <th className="px-6 py-4 text-gray-500 font-medium">Date</th>
                                <th className="px-6 py-4 text-gray-500 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredNews.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{item.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{item.author}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Published' ? 'bg-green-100 text-green-700' :
                                                item.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-200 text-gray-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-400" /> {item.publishDate}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredNews.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No news articles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
