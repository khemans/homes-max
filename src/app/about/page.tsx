import React from "react";

const AboutPage = () => (
  <main className="min-h-screen bg-gray-50 py-12">
    <div className="remax-container">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="remax-card text-center mb-12">
          <div className="remax-card-body py-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="remax-heading-1 mb-6">
              About <span style={{ color: '#003DA5' }}>HOUSE/</span><span style={{ color: '#DC1C2E' }}>MAX</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted guide to uncovering the full story of your next home. We believe every buyer deserves transparency, confidence, and peace of mind.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="remax-card">
            <div className="remax-card-body">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="remax-heading-3 mb-4">Our Mission</h2>
              <p className="remax-text-body">
                To empower home buyers with comprehensive property insights, making the home buying process transparent and informed. We bring together public records, risk data, and expert resources so you can make the most informed decision possible.
              </p>
            </div>
          </div>

          <div className="remax-card">
            <div className="remax-card-body">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="remax-heading-3 mb-4">Our Vision</h2>
              <p className="remax-text-body">
                To be the most trusted and comprehensive property research platform, where every home buyer has access to the information they need to make confident decisions about their biggest investment.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="remax-card mb-12">
          <div className="remax-card-header">
            <h2 className="remax-heading-2 text-center">What We Offer</h2>
          </div>
          <div className="remax-card-body">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="remax-heading-3 mb-4">Comprehensive Property Research</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Property history and permit records</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Risk assessment and insurance data</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Property rights and easement information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">MLS data and market insights</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="remax-heading-3 mb-4">User-Friendly Tools</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Easy-to-use search interface</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Interactive property maps</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Printable property reports</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="remax-text-body">Save and organize your searches</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="remax-card bg-gradient-to-r from-blue-50 to-red-50 border-l-4 border-l-red-500">
          <div className="remax-card-body text-center py-12">
            <h2 className="remax-heading-2 mb-4">Ready to Get Started?</h2>
            <p className="remax-text-body mb-8 max-w-2xl mx-auto">
              Get the MAX on your home before you buy. Start your property research journey today with HOUSE/MAX.
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
        </div>
      </div>
    </div>
  </main>
);

export default AboutPage; 