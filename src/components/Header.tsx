"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the query param from the URL if present
  const urlQuery = searchParams.get("query") || "";
  const [search, setSearch] = React.useState(urlQuery);

  // Keep the search bar in sync with the URL query param
  React.useEffect(() => {
    setSearch(urlQuery);
  }, [urlQuery]);

  // Only show search bar if not on the home page
  const showSearch = pathname !== "/";

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
    <header className="w-full bg-blue-900 text-white shadow-lg sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl">
              {/* RE/MAX Balloon SVG with distinct white band */}
              <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="18" cy="46" rx="4" ry="2" fill="#888"/>
                <g>
                  <path d="M18 4C8 4 2 14 2 22c0 10 8 18 16 18s16-8 16-18C34 14 28 4 18 4z" fill="#fff" stroke="#222" strokeWidth="1.5"/>
                  <path d="M18 4C8 4 2 14 2 16.5h32C34 14 28 4 18 4z" fill="#e31837"/>
                  <path d="M2 27c2 7 8 13 16 13s14-6 16-13H2z" fill="#005ba6"/>
                  <rect x="2" y="16.5" width="32" height="10.5" fill="#fff"/>
                  <ellipse cx="18" cy="22" rx="16" ry="18" fill="none" stroke="#222" strokeWidth="1.5"/>
                </g>
                <path d="M18 40v4" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold font-sans tracking-tight flex items-center">
                <span style={{ color: '#005BAA' }}>HOUSE/</span>
                <span style={{ color: '#E31837' }}>MAX</span>
              </h1>
              <p className="text-blue-200 text-sm">Getting the MAX on your home before you buy.</p>
            </div>
          </Link>
        </div>
        {/* Nav links */}
        <nav className="flex-1 flex justify-center md:justify-end items-center gap-6 text-base font-medium">
          <Link href="/my-properties" className="hover:text-blue-300 transition-colors">My Properties</Link>
          <Link href="/resources" className="hover:text-blue-300 transition-colors">Resources</Link>
          <Link href="/about" className="hover:text-blue-300 transition-colors">About</Link>
        </nav>
        {/* Search bar right-aligned */}
        {showSearch && (
          <form className="flex flex-row gap-2 items-center w-full md:w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm w-48 md:w-64 placeholder-blue-400"
              placeholder="Search property history..."
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors text-white font-medium shadow"
            >
              Search
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header; 