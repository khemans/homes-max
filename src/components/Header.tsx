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
              <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="16" cy="45" rx="8" ry="2" fill="rgba(0,0,0,0.3)"/>
                <path d="M16 4C10 4 4 10 4 18C4 32 16 44 16 44C16 44 28 32 28 18C28 10 22 4 16 4Z" fill="#fff" stroke="#222" strokeWidth="1.5"/>
                <path d="M16 4C10 4 4 10 4 13C4 13 16 13 16 13C16 13 28 13 28 13C28 10 22 4 16 4Z" fill="#e31837"/>
                <path d="M16 44C28 32 28 28 16 32C4 28 4 32 16 44Z" fill="#005ba6"/>
                <path d="M16 44C19 39 19 39 16 38C13 39 13 39 16 44Z" fill="#003366"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Your Home&apos;s Diary</h1>
              <p className="text-blue-200 text-sm">Uncover its past stories</p>
            </div>
          </Link>
        </div>
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
        <nav>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            ← Back to Search
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 