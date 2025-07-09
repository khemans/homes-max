import React from "react";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Permit History",
    description: "Access comprehensive building permits, renovations, and code compliance records for any property.",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Risk Assessment",
    description: "Detailed risk analysis including flood zones, fire hazards, and insurance claim history.",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Property Rights",
    description: "Understand mineral rights, easements, and property boundaries with clear explanations.",
  },
];

const WhatYoullDiscover: React.FC = () => {
  return (
    <section className="remax-section remax-section-light">
      <div className="remax-container">
        <div className="text-center mb-12">
          <h2 className="remax-heading-2 mb-4">What You&apos;ll Discover</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive insights into any property before you make your decision
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="remax-card text-center">
              <div className="remax-card-body">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="remax-heading-3 text-xl mb-4">{feature.title}</h3>
                <p className="remax-text-body">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/search" className="remax-btn-primary text-lg px-8 py-4">
            Start Your Property Search
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatYoullDiscover; 