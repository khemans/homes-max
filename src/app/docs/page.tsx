import React from 'react';
import Link from 'next/link';
import { getAllDocs } from '@/lib/docs';

export default function DocsPage() {
  const docs = getAllDocs();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="remax-container">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="remax-card text-center mb-8">
            <div className="remax-card-body py-8">
              <h1 className="remax-heading-1 mb-4">
                Project Documentation
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Comprehensive technical documentation for the <span style={{ color: '#003DA5' }}>HOUSE/</span><span style={{ color: '#DC1C2E' }}>MAX</span> platform. 
                All documentation is automatically updated from source files.
              </p>
            </div>
          </div>

          {/* Documentation Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {docs.map((doc) => (
              <Link 
                key={doc.slug} 
                href={`/docs/${doc.slug}`}
                className="remax-card hover:shadow-lg transition-shadow duration-200 block"
              >
                <div className="remax-card-body">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                      {doc.title}
                    </h2>
                    <svg className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  {doc.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {doc.size}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(doc.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="remax-card mt-8">
            <div className="remax-card-body">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Automatically Updated Documentation</h3>
                  <p className="text-gray-600 text-sm">
                    This documentation is automatically generated from markdown files in the project repository. 
                    When the source files are updated, the documentation pages are automatically refreshed to reflect the latest changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8">
            <Link href="/" className="remax-btn-secondary mr-4">
              ← Back to Home
            </Link>
            <Link href="/prd" className="remax-btn-outline">
              View PRD Presentation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 