"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaCloudUploadAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AddPropertyPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'apartment',
        status: 'sale', // sell/rent status
        listingStatus: 'Active',
        price: '',
        negotiable: false,
        city: '',
        state: '',
        pincode: '',
        bhk: '',
        bathrooms: '',
        area: '',
        amenities: [] as string[],
        imageUrl: ''
    });

    const amenitiesList = [
        'wifi', 'parking', 'gym', 'pool', 'security',
        'garden', 'terrace', 'modular_kitchen', 'power_backup',
        'club_house', 'lift', 'cctv'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAmenityToggle = (amenity: string) => {
        setFormData(prev => {
            if (prev.amenities.includes(amenity)) {
                return { ...prev, amenities: prev.amenities.filter(a => a !== amenity) };
            } else {
                return { ...prev, amenities: [...prev.amenities, amenity] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert("Property Added Successfully! (Mock)");
        router.push('/admin/properties');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/properties" className="text-gray-500 hover:text-gray-700 transition p-2 hover:bg-gray-100 rounded-full">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800">Add New Property</h1>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/properties">
                        <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition">
                            Cancel
                        </button>
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-70 flex items-center gap-2"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Property'}
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaHome className="text-indigo-500" /> Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                                <input
                                    type="text" name="title" required
                                    value={formData.title} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="e.g. Luxury 3BHK Apartment in City Center"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                <select
                                    name="type"
                                    value={formData.type} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                                >
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="villa">Villa</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="plot">Plot</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status (Purpose)</label>
                                <select
                                    name="status"
                                    value={formData.status} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                                >
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Status</label>
                                <select
                                    name="listingStatus"
                                    value={formData.listingStatus} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending Review</option>
                                    <option value="Sold">Sold</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description" rows={4}
                                    value={formData.description} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="Describe the property..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Location & Price */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-indigo-500" /> Location & Price
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text" name="city" required
                                    value={formData.city} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text" name="state" required
                                    value={formData.state} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaRupeeSign className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number" name="price" required
                                        value={formData.price} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center h-full pt-6">
                                <label className="flex items-center cursor-pointer gap-2">
                                    <input
                                        type="checkbox" name="negotiable"
                                        checked={formData.negotiable}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span className="text-gray-700 font-medium">Price Negotiable</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaRulerCombined className="text-indigo-500" /> Specifications
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <FaBed className="text-gray-400" /> Bedrooms (BHK)
                                </label>
                                <input
                                    type="number" name="bhk"
                                    value={formData.bhk} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <FaBath className="text-gray-400" /> Bathrooms
                                </label>
                                <input
                                    type="number" name="bathrooms"
                                    value={formData.bathrooms} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <FaRulerCombined className="text-gray-400" /> Super Area (sq.ft)
                                </label>
                                <input
                                    type="number" name="area"
                                    value={formData.area} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaCheckCircle className="text-indigo-500" /> Amenities
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {amenitiesList.map(amenity => (
                                <label key={amenity} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => handleAmenityToggle(amenity)}
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span className="capitalize text-gray-700 text-sm">{amenity.replace('_', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaCloudUploadAlt className="text-indigo-500" /> Media & Images
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                                <input
                                    type="text" name="imageUrl"
                                    value={formData.imageUrl} onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="https://..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter a valid image URL for the thumbnail.</p>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                                <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                                <p className="text-gray-600">Drag & drop additional images here</p>
                                <p className="text-xs text-gray-400 mt-1">(Upload functionality simulated)</p>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
