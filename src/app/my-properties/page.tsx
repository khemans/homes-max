"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SavedProperty {
  address: string;
  city: string;
  state: string;
  zip: string;
  mlsId?: string;
}

const MyPropertiesPage = () => {
  const [saved, setSaved] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const props = JSON.parse(localStorage.getItem("savedProperties") || "[]");
      setSaved(props);
    } catch (error) {
      console.error("Error loading saved properties:", error);
      setSaved([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveProperty = (index: number) => {
    const updatedProperties = saved.filter((_, i) => i !== index);
    setSaved(updatedProperties);
    localStorage.setItem("savedProperties", JSON.stringify(updatedProperties));
  };

  const handleClearAll = () => {
    setSaved([]);
    localStorage.setItem("savedProperties", JSON.stringify([]));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="remax-container">
          <div className="remax-card text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
            <p className="remax-text-body text-gray-600">Loading your saved properties...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="remax-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="remax-card text-center mb-8">
            <div className="remax-card-body py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="remax-heading-1 mb-4">My Saved Properties</h1>
              <p className="text-xl text-gray-600">
                {saved.length > 0 
                  ? `You have ${saved.length} saved propert${saved.length === 1 ? 'y' : 'ies'}`
                  : "Your property search history will appear here"
                }
              </p>
            </div>
          </div>

          {saved.length === 0 ? (
            /* Empty State */
            <div className="remax-card text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="remax-heading-3 mb-4">No Saved Properties Yet</h2>
              <p className="remax-text-body text-gray-600 mb-8 max-w-md mx-auto">
                Start searching for properties and save the ones you're interested in. They'll appear here for easy access.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/search" className="remax-btn-primary">
                  Start Property Search
                </a>
                <a href="/resources" className="remax-btn-outline">
                  Browse Resources
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Actions Bar */}
              <div className="remax-card mb-6">
                <div className="remax-card-body">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h2 className="remax-heading-3">Your Saved Properties</h2>
                      <p className="remax-text-small text-gray-600">Click on any property to view detailed information</p>
                    </div>
                    <div className="flex gap-3">
                      <a href="/search" className="remax-btn-outline">
                        Add More Properties
                      </a>
                      <button 
                        onClick={handleClearAll}
                        className="px-4 py-2 text-red-600 hover:text-red-800 border border-red-300 hover:border-red-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties Grid */}
              <div className="grid gap-6">
                {saved.map((property, index) => (
                  <div key={index} className="remax-card hover:shadow-lg transition-shadow">
                    <div className="remax-card-body">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/property?query=${encodeURIComponent(property.address)}`}
                          className="flex-1 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="remax-heading-3 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                {property.address}
                              </h3>
                              <p className="remax-text-body text-gray-600">
                                {property.city}, {property.state} {property.zip}
                              </p>
                              {property.mlsId && (
                                <p className="remax-text-small text-gray-500 mt-1">
                                  MLS ID: {property.mlsId}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                        <button
                          onClick={() => handleRemoveProperty(index)}
                          className="ml-4 p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove property"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Section */}
              <div className="remax-card mt-8 border-l-4 border-l-green-500">
                <div className="remax-card-body">
                  <h3 className="remax-heading-3 mb-2">Next Steps</h3>
                  <p className="remax-text-body mb-4">
                    Ready to dive deeper into your saved properties? Generate detailed reports or explore additional resources.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/resources" className="remax-btn-secondary">
                      Explore Resources
                    </a>
                    <a href="/about" className="remax-btn-outline">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPropertiesPage; 