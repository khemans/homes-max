'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-[9999] border-b border-gray-200">
      <div className="remax-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="flex items-center space-x-2">
              {/* RE/MAX Balloon SVG */}
              <svg width="32" height="42" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="18" cy="46" rx="4" ry="2" fill="#888"/>
                <g>
                  <path d="M18 4C8 4 2 14 2 22c0 10 8 18 16 18s16-8 16-18C34 14 28 4 18 4z" fill="#fff" stroke="#222" strokeWidth="1.5"/>
                  <path d="M18 4C8 4 2 14 2 16.5h32C34 14 28 4 18 4z" fill="#DC1C2E"/>
                  <path d="M2 27c2 7 8 13 16 13s14-6 16-13H2z" fill="#003DA5"/>
                  <rect x="2" y="16.5" width="32" height="10.5" fill="#fff"/>
                  <ellipse cx="18" cy="22" rx="16" ry="18" fill="none" stroke="#222" strokeWidth="1.5"/>
                </g>
                <path d="M18 40v4" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div>
                <div className="text-xl font-bold flex items-center">
                  <span style={{ color: '#003DA5' }}>HOUSE/</span>
                  <span style={{ color: '#DC1C2E' }}>MAX</span>
                </div>
                <div className="text-xs text-gray-600 -mt-1">Getting the MAX for your future</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Search Properties
            </Link>
            <Link href="/my-properties" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              My Properties
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Resources
            </Link>
            <Link href="/prd" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              PRD
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/search" className="remax-btn-primary">
              Find Your Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-2">
              <Link 
                href="/search" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Properties
              </Link>
              <Link 
                href="/my-properties" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Properties
              </Link>
              <Link 
                href="/resources" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                href="/prd" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                PRD
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 py-2">
                <Link href="/search" className="remax-btn-primary w-full text-center">
                  Find Your Home
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 