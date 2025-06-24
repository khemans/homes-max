"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

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
    <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-blue-50 to-white px-4 py-12 text-center">
      {/* Illustration Placeholder */}
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center shadow-md">
          {/* Replace with SVG/illustration later */}
          <span className="text-5xl" role="img" aria-label="Home Diary">🏡📖</span>
        </div>
      </div>
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
        Your Home&apos;s Diary: <span className="text-blue-600">Uncover its past stories.</span>
      </h1>
      {/* Sub-headline */}
      <p className="text-lg md:text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
        Your friendly guide to permits, property rights, and peace of mind.
      </p>
      {/* Search Bar & CTA */}
      <form className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-5 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm text-blue-900"
          placeholder="Ask me anything about a property&apos;s past (e.g., &apos;123 Main St permits&apos;, &apos;23 Oak Ave history&apos;)"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Uncover Story
        </button>
      </form>
    </section>
  );
};

export default HeroSection; 