import React from "react";

const PRDPage = () => (
  <main className="min-h-screen bg-gray-50 py-12">
    <div className="remax-container">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="remax-card text-center mb-8">
          <div className="remax-card-body py-8">
            <h1 className="remax-heading-1 mb-4">
              Product Requirements Document: <span style={{ color: '#003DA5' }}>HOUSE/</span><span style={{ color: '#DC1C2E' }}>MAX</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
              <span><strong>Version:</strong> 3.1</span>
              <span><strong>Date:</strong> January 2025</span>
              <span><strong>Status:</strong> MVP Deployed on Vercel</span>
            </div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              A comprehensive overview of the HOUSE/MAX platform - empowering homebuyers with professional property insights and risk assessments.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">Introduction</h2>
            <p className="remax-text-body mb-4">
              "HOUSE/MAX" is a Next.js web application that empowers homebuyers with comprehensive property insights before they buy. By providing access to property history, risk assessments, permit records, and expert guidance, the application helps users make informed decisions with confidence. The platform features a professional RE/MAX-inspired design that establishes trust and credibility in the real estate market.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">Current Implementation</h3>
              <p className="text-green-700">
                Fully functional MVP deployed on Vercel with professional RE/MAX design system, search functionality, interactive maps, risk assessments, and comprehensive property data integrated with Cotality risk analytics.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Recent Updates (v3.1)</h3>
              <ul className="text-blue-700 space-y-1">
                <li>• Complete migration from CoreLogic to Cotality for risk assessment data</li>
                <li>• Updated all branding and references to reflect Cotality's new identity</li>
                <li>• Enhanced data integration with Cotality's "Intelligence Beyond Bounds" platform</li>
                <li>• Improved risk assessment display with new Cotality branding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Goals & Objectives */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">Goals & Objectives</h2>
            <div className="mb-6">
              <h3 className="remax-heading-3 mb-3">Primary Goal</h3>
              <p className="remax-text-body text-lg font-medium text-gray-800">
                Empower homebuyers with comprehensive property insights and risk assessments, providing the MAX on their home before they buy.
              </p>
            </div>
            <div>
              <h3 className="remax-heading-3 mb-3">Key Objectives</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Provide comprehensive property history and risk assessment data through Cotality integration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Offer professional-grade property research tools and resources</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Deliver expert guidance on permits, property rights, and legal considerations</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Maintain a professional, trustworthy user experience with RE/MAX design standards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Utilize modern web technologies for efficient development and superior performance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Leverage Cotality's advanced property data and analytics capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">Target Audience</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="remax-heading-3 mb-3 text-blue-600">Primary Users</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Prospective Homebuyers (first-time and experienced)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Real Estate Agents and Professionals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Property Investors and Researchers</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="remax-heading-3 mb-3 text-red-600">Secondary Users</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Insurance Professionals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Legal Professionals working in real estate</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Property Inspectors and Appraisers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Mortgage Lenders and Brokers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* User Stories */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">User Stories (Implemented)</h2>
            <div className="grid gap-4">
              {[
                "As a homebuyer, I want to access comprehensive property data including Cotality risk assessments and permit history",
                "As a homebuyer, I want to understand property rights, easements, and legal considerations in clear terms",
                "As a homebuyer, I want to research building permits and code compliance records",
                "As a homebuyer, I want to save properties for future reference and comparison",
                "As a homebuyer, I want to generate printable property reports for my records",
                "As a real estate professional, I want access to comprehensive property data to better serve my clients",
                "As a user, I want a professional, trustworthy platform that instills confidence",
                "As a user, I want to access Cotality's advanced risk analytics and property intelligence",
                "As a user, I want detailed wildfire, flood, and earthquake risk assessments for properties"
              ].map((story, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800">{story}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features & Functionality */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">Features & Functionality (Implemented)</h2>
            
            {/* Home Page */}
            <div className="mb-6">
              <h3 className="remax-heading-3 mb-3 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Home Page / Entry Point
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Design:</strong> Professional RE/MAX-inspired design with clean, modern aesthetics</li>
                  <li>• <strong>Hero Section:</strong> Compelling headline with prominent search functionality</li>
                  <li>• <strong>Trust Indicators:</strong> Three professional feature highlights with icons</li>
                  <li>• <strong>"What You'll Discover" Section:</strong> Feature cards for Permit History, Risk Assessment, Property Rights</li>
                </ul>
              </div>
            </div>

            {/* Property Details Page */}
            <div className="mb-6">
              <h3 className="remax-heading-3 mb-3 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Property Details Page
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Professional Layout:</strong> Clean card-based design with RE/MAX styling</li>
                  <li>• <strong>Interactive Map:</strong> Leaflet map with custom RE/MAX balloon markers</li>
                  <li>• <strong>MLS Results:</strong> Professional property listings with realtor insights</li>
                  <li>• <strong>Permit Records:</strong> Comprehensive building permit history with status indicators</li>
                  <li>• <strong>Risk Assessment:</strong> Detailed analysis powered by Cotality including insurance claims, fire/flood risk, and wildfire/earthquake ratings</li>
                  <li>• <strong>User Actions:</strong> Save property functionality and printable report generation</li>
                </ul>
              </div>
            </div>

            {/* Additional Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Search Results Page
                </h4>
                <p className="text-gray-600 text-sm">Professional grid layout with advanced filtering and interactive map integration</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  My Properties Page
                </h4>
                <p className="text-gray-600 text-sm">Saved property management with professional property cards</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Resources Page
                </h4>
                <p className="text-gray-600 text-sm">Categorized resource library with Cotality integration</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Navigation & Layout
                </h4>
                <p className="text-gray-600 text-sm">Professional header with mobile-responsive navigation and consistent branding</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design System */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">Design System (Implemented)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="remax-heading-3 mb-3">RE/MAX Brand Implementation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Brand Colors</h4>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: '#DC1C2E' }}></div>
                        <span className="text-sm">RE/MAX Red (#DC1C2E)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: '#003DA5' }}></div>
                        <span className="text-sm">RE/MAX Blue (#003DA5)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Typography</h4>
                    <p className="text-sm text-gray-600">Inter font family with professional weight hierarchy</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="remax-heading-3 mb-3">Technical Implementation</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Next.js App Router for modern routing</li>
                  <li>• Tailwind CSS for responsive styling</li>
                  <li>• Custom RE/MAX component classes</li>
                  <li>• Leaflet.js for interactive maps</li>
                  <li>• Cotality API integration</li>
                  <li>• Vercel deployment platform</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="remax-card">
          <div className="remax-card-body text-center">
            <h2 className="remax-heading-2 mb-4">Ready to Explore?</h2>
            <p className="remax-text-body mb-6">
              Experience the full HOUSE/MAX platform and see how comprehensive property insights can empower your home buying decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/search" className="remax-btn-primary">
                Search Properties
              </a>
              <a href="/about" className="remax-btn-secondary">
                Learn More About Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
);

export default PRDPage; 