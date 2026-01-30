"use client";

import { useState } from 'react';
import { FaCloudUploadAlt, FaHome, FaRupeeSign, FaMapMarkedAlt } from 'react-icons/fa';

export default function SellPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        type: 'apartment',
        price: '',
        city: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Property Submitted for Review! Our team will verify and approve your listing shortly.");
        // Here you would send data to backend
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                        <h1 className="text-3xl font-bold">Post a Property</h1>
                        <p className="mt-2 text-blue-100">Sell or Rent your property to millions of users.</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-100 h-2 w-full">
                        <div
                            className="bg-green-500 h-full transition-all duration-500 ease-out"
                            style={{ width: step === 1 ? '50%' : '100%' }}
                        ></div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FaHome className="text-blue-600" /> Property Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                                        <input
                                            type="text" name="title" required
                                            value={formData.title} onChange={handleChange}
                                            placeholder="e.g. 3BHK Apartment in Bandra"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                        <select
                                            name="type"
                                            value={formData.type} onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                                        >
                                            <option value="apartment">Apartment</option>
                                            <option value="house">Independent House</option>
                                            <option value="villa">Villa</option>
                                            <option value="commercial">Commercial Office</option>
                                            <option value="plot">Plot / Land</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description" rows={4}
                                        value={formData.description} onChange={handleChange}
                                        placeholder="Describe your property..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FaMapMarkedAlt className="text-blue-600" /> Location & Price
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text" name="city" required
                                            value={formData.city} onChange={handleChange}
                                            placeholder="e.g. Mumbai"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹)</label>
                                        <div className="relative">
                                            <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number" name="price" required
                                                value={formData.price} onChange={handleChange}
                                                placeholder="0.00"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Dummy */}
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                                    <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-600">Click to upload property images</p>
                                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-gray-600 font-semibold hover:text-gray-800 transition"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-600/20"
                                    >
                                        Submit Property
                                    </button>
                                </div>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
}
