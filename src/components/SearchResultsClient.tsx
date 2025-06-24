"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface MLSResult {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  mlsId: string;
}

const SearchResultsClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState<MLSResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }

    setLoading(true);
    setError("");

    // Fetch all properties and filter based on the query
    fetch("/api/mls")
      .then(res => res.json())
      .then(data => {
        const allProperties = data.results || [];
        const filteredResults = allProperties.filter((property: MLSResult) => {
          const searchLower = query.toLowerCase();
          const addressLower = property.address.toLowerCase();

          // If the query is 'denver', return all Denver metro properties (exclude the original two)
          if (searchLower === "denver") {
            return !["123 main st", "456 oak ave"].includes(addressLower);
          }

          // Enhanced: Parse for bedroom/bathroom and city
          // e.g. "4 bedroom homes in Denver" or "3 bath Colfax"
          const bedMatch = searchLower.match(/(\d+)\s*bed(room)?s?/);
          const bathMatch = searchLower.match(/(\d+)\s*bath(room)?s?/);
          const cityMatch = searchLower.match(/denver|colfax|broadway|larimer|alameda|colorado|evans|hampden|mississippi|yale|speer|parker|arapahoe|belleview|dartmouth|florida|girard|holly|jewell|kentucky|leetsdale|monaco|oneida|quebec|rampart|sheridan|tamarac|union|wadsworth|zuni|1st|2nd|3rd|4th|5th|6th|7th|8th|9th|10th|11th|12th|13th|14th|15th|16th|17th|18th|19th|20th/);

          // If we have a natural language query with bedroom/bathroom and city
          if ((bedMatch || bathMatch) && cityMatch) {
            let matches = true;
            
            if (bedMatch) {
              const beds = parseInt(bedMatch[1], 10);
              matches = matches && property.beds >= beds;
            }
            if (bathMatch) {
              const baths = parseInt(bathMatch[1], 10);
              matches = matches && property.baths >= baths;
            }
            if (cityMatch) {
              // For Denver, include all properties except the original two
              if (cityMatch[0] === "denver") {
                matches = matches && !["123 main st", "456 oak ave"].includes(addressLower);
              } else {
                // For other cities, check if the street name matches
                matches = matches && addressLower.includes(cityMatch[0]);
              }
            }
            
            return matches;
          }
          
          // If we only have bedroom/bathroom criteria (no city)
          if (bedMatch || bathMatch) {
            let matches = true;
            
            if (bedMatch) {
              const beds = parseInt(bedMatch[1], 10);
              matches = matches && property.beds >= beds;
            }
            if (bathMatch) {
              const baths = parseInt(bathMatch[1], 10);
              matches = matches && property.baths >= baths;
            }
            
            return matches;
          }
          
          // If we only have city criteria
          if (cityMatch) {
            if (cityMatch[0] === "denver") {
              return !["123 main st", "456 oak ave"].includes(addressLower);
            } else {
              return addressLower.includes(cityMatch[0]);
            }
          }

          // Otherwise, match address
          return addressLower.includes(searchLower);
        });
        
        setSearchResults(filteredResults);
      })
      .catch(() => {
        setError("Could not fetch search results.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, router]);

  const handlePropertyClick = (address: string) => {
    router.push(`/property?query=${encodeURIComponent(address)}`);
  };

  return (
    <main className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Results Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Search Results</h1>
          <p className="text-blue-700 text-lg mb-2">
            Showing results for: <span className="font-semibold">&quot;{query}&quot;</span>
          </p>
          <p className="text-blue-600 text-sm">
            {searchResults.length} propert{searchResults.length === 1 ? 'y' : 'ies'} found
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
            <div className="text-blue-600 font-medium text-lg">Searching properties...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 text-red-700 rounded-xl shadow p-6 mb-8 text-center">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((property) => (
              <div
                key={property.mlsId}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200"
                onClick={() => handlePropertyClick(property.address)}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {property.address}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    {property.price}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-blue-900">{property.beds}</div>
                    <div className="text-sm text-blue-600">Beds</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-900">{property.baths}</div>
                    <div className="text-sm text-blue-600">Baths</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-900">{property.sqft}</div>
                    <div className="text-sm text-blue-600">Sq Ft</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {property.status}
                  </span>
                  <div className="text-xs text-blue-500">MLS: {property.mlsId}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePropertyClick(property.address);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && searchResults.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl mb-4 flex justify-center">
              <svg width="48" height="72" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C7 16 4 28 16 44C28 28 25 16 16 4Z" fill="#fff" stroke="#222" strokeWidth="2"/>
                <path d="M8 18Q16 14 24 18Q22 10 16 4Q10 10 8 18Z" fill="#e31837"/>
                <path d="M8 18Q16 22 24 18Q24 28 16 44Q8 28 8 18Z" fill="#005ba6"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">No Properties Found</h2>
            <p className="text-blue-700 mb-6">
              We couldn&apos;t find any properties matching &quot;{query}&quot;.
            </p>
            <div className="space-y-2 text-blue-600">
              <p>Try searching for:</p>
              <ul className="text-sm">
                <li>• A specific address (e.g., &quot;1234 Larimer St&quot;)</li>
                <li>• A city name (e.g., &quot;Denver&quot;)</li>
                <li>• A street name (e.g., &quot;Colfax&quot;)</li>
              </ul>
            </div>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              ← Back to Search
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchResultsClient; 