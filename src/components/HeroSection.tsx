'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      // Determine if this is a specific address or generic search
      const query = search.trim();
      
      // Check if it looks like a specific address (contains numbers and street terms)
      const hasNumbers = /\d/.test(query);
      const hasStreetTerms = /\b(st|street|ave|avenue|blvd|boulevard|rd|road|dr|drive|lane|ln|way|plaza|pkwy|parkway)\b/i.test(query);
      
      if (hasNumbers && hasStreetTerms) {
        // Specific address - go to property details page
        router.push(`/property?query=${encodeURIComponent(query)}`);
      } else {
        // Generic search - go to search results page
        router.push(`/search?query=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <section className="remax-section bg-gradient-to-b from-gray-50 to-white">
      <div className="remax-container text-center">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="remax-heading-1 mb-6">
            Understand Your Future Home With{' '}
            <span style={{ color: '#003DA5' }}>HOUSE/</span>
            <span style={{ color: '#DC1C2E' }}>MAX</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the MAX on your home before you buy. Research property history, permits, and risk data with confidence.
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="remax-input text-lg h-14"
                  placeholder="Enter an address or search properties..."
                />
              </div>
              <button
                type="submit"
                className="remax-btn-primary text-lg h-14 px-8 whitespace-nowrap"
              >
                Search Properties
              </button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="remax-heading-3 text-lg mb-2">Trusted Data</h3>
              <p className="remax-text-small">Access comprehensive property history and risk information from reliable sources.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="remax-heading-3 text-lg mb-2">Instant Results</h3>
              <p className="remax-text-small">Get detailed property insights and reports in seconds, not days.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="remax-heading-3 text-lg mb-2">Secure & Private</h3>
              <p className="remax-text-small">Your searches and saved properties are protected with enterprise-grade security.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 