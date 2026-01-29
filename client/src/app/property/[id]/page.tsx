"use client";

import React, { useEffect, useState } from 'react';
import { MOCK_PROPERTIES } from '@/data/properties';
import { Property } from '@/types/property';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function PropertyDetailsPage({ params }: PageProps) {
    const propertyId = React.use(params).id; // Unwrap the params promise
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay
        setTimeout(() => {
            const foundProperty = MOCK_PROPERTIES.find(p => p._id === propertyId);
            setProperty(foundProperty || null);
            setLoading(false);
        }, 600);
    }, [propertyId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <BiLoaderAlt className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
                <Link href="/" className="mt-4 text-blue-600 hover:underline">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Image Gallery Hero */}
            <div className="h-[40vh] md:h-[60vh] relative bg-gray-900 group">
                {property.media.images?.[0] ? (
                    <img
                        src={property.media.images[0].url}
                        alt={property.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="max-w-7xl mx-auto">
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-bold uppercase mb-4 inline-block tracking-wider">
                            {property.status}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">{property.title}</h1>
                        <p className="flex items-center text-lg md:text-xl text-gray-200">
                            <FaMapMarkerAlt className="mr-2 text-blue-400" />
                            {property.location.address?.city}, {property.location.address?.state} - {property.location.address?.pincode}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Key Specs */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Area</p>
                                <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800">
                                    <FaRulerCombined className="text-blue-500" />
                                    {property.specifications.superBuiltUpArea} <span className="text-sm font-normal text-gray-500">sq.ft</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Bedrooms</p>
                                <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800">
                                    <FaBed className="text-blue-500" />
                                    {property.specifications.bhk} <span className="text-sm font-normal text-gray-500">BHK</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Bathrooms</p>
                                <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800">
                                    <FaBath className="text-blue-500" />
                                    {property.specifications.bathrooms}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Type</p>
                                <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800">
                                    <span className="capitalize">{property.type}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-3 text-gray-700">
                                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                        <span className="capitalize">{amenity.replace('_', ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Sticky Contact Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
                            <div className="mb-6">
                                <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Price</p>
                                <h2 className="text-4xl font-bold text-blue-600">
                                    ₹ {property.price.amount.toLocaleString()}
                                </h2>
                                {property.price.negotiable && (
                                    <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded mt-2 inline-block">
                                        Negotiable
                                    </span>
                                )}
                            </div>

                            <hr className="border-gray-100 my-6" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    <FaUser className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Owner</p>
                                    <h4 className="font-bold text-gray-900">John Doe (Mock)</h4>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                                    <FaPhone /> Contact Owner
                                </button>
                                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                                    <FaEnvelope /> Send Inquiry
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
