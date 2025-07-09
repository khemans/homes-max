import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HOUSE/MAX - Getting the MAX for your future before you buy.",
  description: "Find your dream home with comprehensive property insights, risk assessments, and permit history. Research with confidence using HOUSE/MAX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Suspense>
          <Header />
        </Suspense>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white">
          <div className="remax-container">
            {/* Main Footer Content */}
            <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <svg width="24" height="32" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div className="text-lg font-bold flex items-center">
                      <span style={{ color: '#003DA5' }}>HOUSE/</span>
                      <span style={{ color: '#DC1C2E' }}>MAX</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Get the MAX on your home before you buy. Your trusted partner in property research and insights.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/search" className="text-gray-400 hover:text-white transition-colors">Search Properties</a></li>
                  <li><a href="/my-properties" className="text-gray-400 hover:text-white transition-colors">My Properties</a></li>
                  <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-gray-400">Property History Reports</span></li>
                  <li><span className="text-gray-400">Risk Assessment</span></li>
                  <li><span className="text-gray-400">Permit Research</span></li>
                  <li><span className="text-gray-400">Property Rights Analysis</span></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Email: info@housemax.com</li>
                  <li>Phone: 1-800-HOUSEMAX</li>
                  <li>Hours: Mon-Fri 9AM-6PM EST</li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="py-6 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-400">
                  © 2024 HOUSE/MAX. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm">
                  <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>
              </div>
              
              {/* Disclaimer */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>Disclaimer:</strong> The information provided by HOUSE/MAX is for educational and guidance purposes only. 
                  It is not legal advice. Always verify details with official sources and consult a legal professional for specific concerns. 
                  Property data is sourced from public records and third-party providers and may not be complete or current.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
