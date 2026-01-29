"use client";

import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { Property } from '@/types/property';
import Link from 'next/link';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden bg-gray-200">
                {property.media?.images?.[0]?.url ? (
                    <img
                        src={property.media.images[0].url}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No Image Available
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-800 shadow-sm">
                    {property.status}
                </div>
                <div className="absolute bottom-4 left-4 text-white text-lg font-bold drop-shadow-md">
                    ₹ {property.price.amount.toLocaleString()}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <FaMapMarkerAlt className="mr-1 text-blue-500" />
                    {property.location?.address?.city}, {property.location?.address?.state}
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-100 text-gray-600 text-sm">
                    {property.specifications.bhk > 0 && (
                        <div className="flex items-center gap-2" title="Bedrooms">
                            <FaBed className="text-lg text-indigo-500" />
                            <span>{property.specifications?.bhk} BHK</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2" title="Bathrooms">
                        <FaBath className="text-lg text-indigo-500" />
                        <span>{property.specifications?.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center gap-2" title="Area">
                        <FaRulerCombined className="text-lg text-indigo-500" />
                        <span>{property.specifications?.superBuiltUpArea} sq.ft</span>
                    </div>
                </div>

                <Link
                    href={`/property/${property._id}`}
                    className="block w-full mt-4 py-3 text-center border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition active:bg-blue-100"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
