"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';
import { FaSortAmountDown } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { MOCK_PROPERTIES } from '@/data/properties';

interface ListingPageProps {
    pageTitle: string;
    defaultStatus: 'sale' | 'rent';
}

export default function ListingPage({ pageTitle, defaultStatus }: ListingPageProps) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [priceRange, setPriceRange] = useState<string>('all');
    const [propertyType, setPropertyType] = useState<string>('all');

    useEffect(() => {
        // Shared Mock Data (Imported)
        const ALL_PROPERTIES = MOCK_PROPERTIES;

        // Simulate Fetch
        setTimeout(() => {
            // Filter by Page Type (Sale/Rent)
            const relevantProperties = ALL_PROPERTIES.filter(p => p.status === defaultStatus);
            setProperties(relevantProperties);
            setLoading(false);
        }, 800);
    }, [defaultStatus]);

    // Client-side filtering logic
    const filteredProperties = properties.filter(prop => {
        if (propertyType !== 'all' && prop.type !== propertyType) return false;

        // Price Logic (Simplified)
        if (priceRange === 'low' && prop.price.amount > 5000000) return false; // Under 50L (Sale) or 50k (Rent) logic could be complex, keeping simple

        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
                        <p className="text-gray-500 mt-1">Found {filteredProperties.length} properties</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Filter Dropdowns */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="commercial">Commercial</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FaSortAmountDown className="text-xs" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <BiLoaderAlt className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                ) : (
                    <>
                        {filteredProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProperties.map(prop => (
                                    <PropertyCard key={prop._id} property={prop} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
                                <h3 className="text-xl font-medium text-gray-900">No properties found</h3>
                                <p className="text-gray-500 mt-2">Try changing your filters.</p>
                                <button
                                    onClick={() => { setPropertyType('all'); setPriceRange('all'); }}
                                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
