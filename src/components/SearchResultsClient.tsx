'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PropertyMap from './PropertyMap';
import { generateParcelLink } from '@/utils/parcelLinks';

interface MLSResult {
  address: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  mlsId: string;
  salesPitch: string;
}

const SearchResultsClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<MLSResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/mls?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="remax-container">
          <div className="remax-card text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mb-6 mx-auto"></div>
            <h2 className="remax-heading-3 mb-2">Searching Properties</h2>
            <p className="remax-text-body text-gray-600">Finding the best matches for &quot;{query}&quot;...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="remax-container">
          <div className="remax-card text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="remax-heading-3 mb-2 text-red-800">Search Error</h2>
            <p className="remax-text-body text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="remax-btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // If no query, show search form
  if (!query) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="remax-container">
          <div className="max-w-4xl mx-auto">
            {/* Search Form */}
            <div className="remax-card text-center mb-8">
              <div className="remax-card-body py-12">
                <h1 className="remax-heading-1 mb-6">Search Properties</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Find your dream home by searching for properties by location, address, or area.
                </p>
                
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="remax-input text-lg h-14"
                        placeholder="Enter city, state, or specific address..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="remax-btn-primary text-lg h-14 px-8 whitespace-nowrap"
                    >
                      Search Properties
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="remax-card">
              <div className="remax-card-header">
                <h2 className="remax-heading-3">Popular Searches</h2>
              </div>
              <div className="remax-card-body">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/search?query=CA" className="remax-btn-outline text-center">
                    California
                  </Link>
                  <Link href="/search?query=MA" className="remax-btn-outline text-center">
                    Massachusetts
                  </Link>
                  <Link href="/search?query=FL" className="remax-btn-outline text-center">
                    Florida
                  </Link>
                  <Link href="/search?query=LA" className="remax-btn-outline text-center">
                    Louisiana
                  </Link>
                  <Link href="/search?query=Denver" className="remax-btn-outline text-center">
                    Denver
                  </Link>
                  <Link href="/search?query=Boston" className="remax-btn-outline text-center">
                    Boston
                  </Link>
                  <Link href="/search?query=Los Angeles" className="remax-btn-outline text-center">
                    Los Angeles
                  </Link>
                  <Link href="/search?query=Miami" className="remax-btn-outline text-center">
                    Miami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="remax-container">
        {/* Search Header */}
        <div className="remax-card mb-8">
          <div className="remax-card-body text-center">
            <h1 className="remax-heading-2 mb-2">Search Results</h1>
            <p className="remax-text-body text-gray-600">
              {results.length > 0 
                ? `Found ${results.length} properties matching "${query}"`
                : `No properties found matching "${query}"`
              }
            </p>
            
            {/* Search Again Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="remax-input"
                    placeholder="Search again..."
                  />
                </div>
                <button
                  type="submit"
                  className="remax-btn-primary px-6 whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="remax-card text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="remax-heading-3 mb-4">No Properties Found</h3>
            <p className="remax-text-body text-gray-600 mb-6">
              Try adjusting your search terms or browse our featured properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search" className="remax-btn-primary">
                New Search
              </Link>
              <Link href="/" className="remax-btn-outline">
                Browse All Properties
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Results List */}
            <div className="space-y-6">
              {results.map((property) => (
                <div key={property.mlsId} className="remax-card">
                  <div className="remax-card-body">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="remax-heading-3 text-lg mb-1">{property.address}</h3>
                        <p className="remax-text-body text-gray-600">
                          {property.city}, {property.state} {property.zip}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{property.price}</p>
                        <p className="remax-text-small text-gray-600">MLS: {property.mlsId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xl font-semibold text-blue-600">{property.beds}</div>
                        <div className="remax-text-small text-gray-600">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-blue-600">{property.baths}</div>
                        <div className="remax-text-small text-gray-600">Baths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-blue-600">{property.sqft?.toLocaleString() || 'N/A'}</div>
                        <div className="remax-text-small text-gray-600">Sq Ft</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'For Sale' ? 'bg-green-100 text-green-800' :
                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        property.status === 'Sold' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>

                    {property.salesPitch && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold mb-2 text-blue-800">Realtor&apos;s Insight:</h4>
                        <p className="remax-text-body">{property.salesPitch}</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <a 
                        href={`/property?query=${encodeURIComponent(property.address)}`}
                        className="remax-btn-primary flex-1 text-center"
                      >
                        View Details
                      </a>
                      
                      {(() => {
                        const parcelLink = generateParcelLink({
                          address: property.address,
                          city: property.city,
                          state: property.state,
                          zip: property.zip
                        });
                        return (
                          <a
                            href={parcelLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              parcelLink.available 
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={parcelLink.instructions || `View official ${parcelLink.countyName} property records`}
                          >
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            County
                          </a>
                        );
                      })()}
                      
                      <button className="remax-btn-outline px-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

                         {/* Map */}
             <div className="sticky top-8">
               <div className="remax-card overflow-hidden">
                 <div className="remax-card-header">
                   <h3 className="remax-heading-3">Property Locations</h3>
                 </div>
                 <div className="h-96">
                   {results.length > 0 && (
                     <PropertyMap 
                       address={`${results[0].address}, ${results[0].city}, ${results[0].state} ${results[0].zip}`}
                     />
                   )}
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchResultsClient; 