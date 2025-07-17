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
               <span><strong>Version:</strong> 3.4</span>
               <span><strong>Date:</strong> January 2025</span>
               <span><strong>Status:</strong> Production-Ready with Advanced Debugging</span>
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
              &ldquo;HOUSE/MAX&rdquo; is a Next.js web application that empowers homebuyers with comprehensive property insights before they buy. By providing access to property history, risk assessments, permit records, and expert guidance, the application helps users make informed decisions with confidence. The platform features a professional RE/MAX-inspired design that establishes trust and credibility in the real estate market.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">Current Implementation</h3>
              <p className="text-green-700">
                Fully functional MVP deployed on Vercel with professional RE/MAX design system, search functionality, interactive maps, risk assessments, comprehensive property data integrated with Cotality risk analytics, enhanced AVM v2.0 with multi-approach valuation algorithms, and public records integration using free government APIs.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">Latest Updates (v3.4)</h3>
              <ul className="text-blue-700 space-y-1">
                <li>• <strong>Production Debugging Infrastructure:</strong> Comprehensive Vercel deployment troubleshooting system</li>
                <li>• <strong>Advanced Monitoring:</strong> Real-time logging and error tracking for production environments</li>
                <li>• <strong>System Health Monitoring:</strong> Test endpoints and environment variable validation tools</li>
                <li>• <strong>Multi-layered Fallbacks:</strong> Geoapify → Nominatim → Local Database for address autocomplete</li>
                <li>• <strong>Production-Ready Reliability:</strong> Graceful degradation and automated error recovery</li>
                <li>• <strong>Comprehensive Troubleshooting:</strong> Detailed documentation and diagnostic procedures</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Previous Updates (v3.3)</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Enhanced AVM v2.0:</strong> Multi-approach valuation with Sales Comparison, Cost, and Income approaches</li>
                <li>• <strong>Advanced Feature Engineering:</strong> Luxury scores, location scoring, and market tier classification</li>
                <li>• <strong>Public Records Integration:</strong> Free government APIs for property assessments, permits, and demographics</li>
                <li>• <strong>Synchronized Valuations:</strong> Consistent AVM calculations across standalone and property details pages</li>
                <li>• <strong>Cost Savings:</strong> Alternative to premium APIs using free government data sources ($0 vs $74+/month)</li>
                <li>• <strong>Enhanced Data Infrastructure:</strong> Geoapify integration and performance optimizations</li>
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
                    <span className="text-gray-700">Leverage Cotality&rsquo;s advanced property data and analytics capabilities</span>
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
                  <li>• <strong>&ldquo;What You&rsquo;ll Discover&rdquo; Section:</strong> Feature cards for Permit History, Risk Assessment, Property Rights</li>
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

        {/* Future Development Roadmap */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-4">Future Development Roadmap (v3.2+)</h2>
            
            <div className="mb-6">
              <h3 className="remax-heading-3 mb-4">Next Phase Development Priorities</h3>
              
              {/* Enhanced API Integrations */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">Enhanced API Integrations</h4>
                
                <div className="space-y-4">
                  {/* Cotality API Enhancement */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">Cotality API Enhancement</h5>
                    <p className="text-blue-700 mb-2">Direct API integration for real-time risk assessment data</p>
                    <ul className="text-blue-600 text-sm space-y-1">
                      <li>• Implement server-side API calls for improved performance</li>
                      <li>• Add comprehensive property risk scoring</li>
                      <li>• Enable dynamic risk report generation</li>
                      <li>• Integrate property-specific insurance recommendations</li>
                    </ul>
                  </div>
                  
                  {/* LexisNexis C.L.U.E. */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">LexisNexis C.L.U.E. Property Integration</h5>
                    <p className="text-green-700 mb-2">Comprehensive Loss Underwriting Exchange (C.L.U.E.) property reports</p>
                    <ul className="text-green-600 text-sm space-y-1">
                      <li>• Historical insurance claims data</li>
                      <li>• Property loss history and patterns</li>
                      <li>• Enhanced due diligence capabilities for buyers and professionals</li>
                    </ul>
                  </div>
                  
                  {/* Government Data APIs */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-semibold text-orange-800 mb-2">Government Data APIs</h5>
                    <p className="text-orange-700 mb-2">Multi-jurisdictional permit and compliance data integration</p>
                    <ul className="text-orange-600 text-sm space-y-1">
                      <li>• <strong>State-Level Integration:</strong> Connect with state databases for comprehensive permit records</li>
                      <li>• <strong>County-Level Integration:</strong> Direct access to county permit and zoning databases</li>
                      <li>• <strong>City-Level Integration:</strong> Municipal permit tracking and code compliance records</li>
                      <li>• <strong>Multi-Jurisdictional Search:</strong> Unified search across all government levels</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Technical Implementation Goals */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">Technical Implementation Goals</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Server-side API architecture for secure data handling</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Real-time data synchronization and caching</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Enhanced search and filtering capabilities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Professional API rate limiting and error handling</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Comprehensive data validation and accuracy checks</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Production Infrastructure (v3.4) */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3">Production Infrastructure & Debugging (v3.4)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-700 mb-2">Advanced Monitoring & Logging</h5>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Real-time application monitoring with detailed error tracking</li>
                      <li>• Server-side and client-side logging for comprehensive debugging</li>
                      <li>• Environment variable validation and configuration monitoring</li>
                      <li>• API health checks and system status monitoring (/api/test)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-700 mb-2">Robust Error Handling</h5>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Multi-layered fallback systems for API failures</li>
                      <li>• Graceful degradation for external service outages</li>
                      <li>• Automated error recovery and retry mechanisms</li>
                      <li>• Production-ready troubleshooting capabilities</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-purple-200">
                  <h5 className="font-medium text-purple-700 mb-2">Deployment & Operations</h5>
                  <ul className="text-sm text-purple-600 space-y-1">
                    <li>• Vercel production deployment with advanced debugging tools</li>
                    <li>• Environment-specific configuration management</li>
                    <li>• Performance monitoring and optimization</li>
                    <li>• Comprehensive troubleshooting documentation (VERCEL_TROUBLESHOOTING.md)</li>
                  </ul>
                </div>
              </div>
              
              {/* Timeline */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Development Timeline</h4>
                <p className="text-red-700">
                  <strong>Q1-Q2 2025:</strong> Initial API integrations with Cotality and LexisNexis C.L.U.E.<br/>
                  <strong>Q3 2025:</strong> Full government data integration across state, county, and municipal levels
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources & References */}
        <div className="remax-card mb-8">
          <div className="remax-card-body">
            <h2 className="remax-heading-2 mb-6">Resources & References</h2>
            <p className="text-gray-600 mb-6">
              Comprehensive list of all APIs, tools, technologies, and services integrated into the HOUSE/MAX platform.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Core APIs & Data Sources */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Core APIs & Data Sources</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-blue-800 mb-1">Geoapify (Address & Geocoding)</h4>
                      <p className="text-sm text-blue-700 mb-2">Primary address autocomplete and geocoding service</p>
                      <div className="text-xs text-blue-600 space-y-1">
                        <div>• Website: <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer" className="underline">geoapify.com</a></div>
                        <div>• Plan: Free tier (3,000 requests/day)</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 mb-1">Cotality (Risk Assessment)</h4>
                      <p className="text-sm text-green-700 mb-2">Property risk assessment and analytics platform</p>
                      <div className="text-xs text-green-600 space-y-1">
                        <div>• Website: <a href="https://www.cotality.com/" target="_blank" rel="noopener noreferrer" className="underline">cotality.com</a></div>
                        <div>• Platform: &ldquo;Intelligence Beyond Bounds&rdquo;</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <h4 className="font-medium text-purple-800 mb-1">US Census Bureau API</h4>
                      <p className="text-sm text-purple-700 mb-2">Demographics, income data, home values</p>
                      <div className="text-xs text-purple-600 space-y-1">
                        <div>• Website: <a href="https://www.census.gov/data/developers/" target="_blank" rel="noopener noreferrer" className="underline">census.gov/data/developers</a></div>
                        <div>• Cost: Free government API</div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-medium text-red-800 mb-1">FEMA Flood Maps API</h4>
                      <p className="text-sm text-red-700 mb-2">Flood zone data and risk assessments</p>
                      <div className="text-xs text-red-600 space-y-1">
                        <div>• Website: <a href="https://www.fema.gov/flood-maps/" target="_blank" rel="noopener noreferrer" className="underline">fema.gov/flood-maps</a></div>
                        <div>• Cost: Free government API</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Government Data Sources</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>• <strong>Building Permits:</strong> Municipal & county databases</div>
                      <div>• <strong>Property Tax Records:</strong> Local assessor data</div>
                      <div>• <strong>Crime Data:</strong> <a href="https://ucr.fbi.gov/" target="_blank" rel="noopener noreferrer" className="underline">FBI UCR</a> & local departments</div>
                      <div>• <strong>Zoning Info:</strong> City & county zoning APIs</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Technology Stack */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Technology Stack</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-blue-800 mb-1">Next.js (React Framework)</h4>
                      <p className="text-sm text-blue-700 mb-2">Full-stack React framework (v15.3.4)</p>
                      <div className="text-xs text-blue-600">
                        • Website: <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline">nextjs.org</a>
                      </div>
                    </div>
                    
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                      <h4 className="font-medium text-cyan-800 mb-1">TypeScript</h4>
                      <p className="text-sm text-cyan-700 mb-2">Type-safe JavaScript development</p>
                      <div className="text-xs text-cyan-600">
                        • Website: <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="underline">typescriptlang.org</a>
                      </div>
                    </div>
                    
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <h4 className="font-medium text-teal-800 mb-1">Tailwind CSS</h4>
                      <p className="text-sm text-teal-700 mb-2">Utility-first CSS framework</p>
                      <div className="text-xs text-teal-600">
                        • Website: <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="underline">tailwindcss.com</a>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 mb-1">Leaflet Maps</h4>
                      <p className="text-sm text-green-700 mb-2">Interactive property maps</p>
                      <div className="text-xs text-green-600">
                        • Website: <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer" className="underline">leafletjs.com</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Infrastructure & Deployment</h3>
                  <div className="space-y-3">
                    <div className="bg-black text-white rounded-lg p-3">
                      <h4 className="font-medium mb-1">Vercel (Hosting)</h4>
                      <p className="text-sm text-gray-300 mb-2">Serverless deployment platform</p>
                      <div className="text-xs text-gray-400">
                        • Website: <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="underline">vercel.com</a>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 text-white rounded-lg p-3">
                      <h4 className="font-medium mb-1">GitHub (Version Control)</h4>
                      <p className="text-sm text-gray-300 mb-2">Code repository and CI/CD</p>
                      <div className="text-xs text-gray-400">
                        • Repository: <a href="https://github.com/khemans/homes-max" target="_blank" rel="noopener noreferrer" className="underline">github.com/khemans/homes-max</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cost Analysis</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• <strong>Current APIs:</strong> $0/month (free government data)</div>
                      <div>• <strong>Alternative Premium:</strong> $74+/month (CoreLogic)</div>
                      <div>• <strong>Savings:</strong> $888+/year using free APIs</div>
                    </div>
                  </div>
                </div>
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