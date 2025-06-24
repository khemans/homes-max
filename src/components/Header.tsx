"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  // Only show search bar if not on the home page
  const showSearch = pathname !== "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/property?query=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <header className="w-full bg-blue-900 text-white shadow-lg sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl">🏠</div>
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