"use client";

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';
import { MOCK_PROPERTIES } from '@/data/properties';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      setProperties(MOCK_PROPERTIES);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <BiLoaderAlt className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-indigo-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Find Your Dream Home Today
          </h1>
          <p className="text-xl text-indigo-100 mb-10">
            Discover the perfect property from our exclusive listings
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-2">Explore our hand-picked selection of premium properties</p>
          </div>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn't find any properties matching your criteria. Try adjusting your search or check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
