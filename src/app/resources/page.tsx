'use client';

import React from "react";
import { categories, getResourcesByCategory } from "@/data/resources";

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredResources = getResourcesByCategory(selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="remax-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="remax-card text-center mb-8">
            <div className="remax-card-body py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="remax-heading-1 mb-4">Property Research Resources</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Essential tools and databases to help you research any property thoroughly
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="remax-card mb-8">
            <div className="remax-card-body">
              <h2 className="remax-heading-3 mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map((resource, index) => (
              <div key={index} className="remax-card">
                <div className="remax-card-body">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.category === 'Risk Assessment' ? 'bg-red-100 text-red-800' :
                          resource.category === 'Permits' ? 'bg-blue-100 text-blue-800' :
                          resource.category === 'Legal' ? 'bg-purple-100 text-purple-800' :
                          resource.category === 'Insurance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {resource.category}
                        </span>
                        {resource.isActive && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="remax-heading-3 text-lg mb-2">{resource.name}</h3>
                      <p className="remax-text-body text-gray-600 mb-4">{resource.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    {resource.url === "#" ? (
                      <span className="remax-text-small text-gray-500 italic">Coming Soon</span>
                    ) : (
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="remax-btn-outline flex items-center gap-2"
                      >
                        Access Resource
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="remax-card mt-8 border-l-4 border-l-blue-500">
            <div className="remax-card-body">
              <h2 className="remax-heading-3 mb-4">Need Help?</h2>
              <p className="remax-text-body mb-4">
                Our team is here to help you navigate these resources and find the information you need for your property research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/about" className="remax-btn-secondary">
                  Contact Support
                </a>
                <a href="/search" className="remax-btn-outline">
                  Start Property Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResourcesPage; 