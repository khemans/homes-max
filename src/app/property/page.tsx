"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const PropertyMap = dynamic(() => import("../../components/PropertyMap"), { ssr: false });

const infoSections = [
  {
    icon: "📄",
    title: "Permit Pages",
    keyword: ["permit", "permits", "building", "code"],
    content: (
      <>
        <p className="mb-2 text-blue-800 font-semibold">How to find building permits:</p>
        <ol className="list-decimal list-inside text-blue-700 text-left mx-auto max-w-md mb-2">
          <li>Identify your local county/city planning department.</li>
          <li>Visit their official website (search for &quot;[Your County Name] building permits&quot;).</li>
          <li>Use their property search tool.</li>
          <li>Look for &#39;building permits&#39; or &#39;code enforcement records&#39;.</li>
        </ol>
        <p className="text-blue-600 text-sm">We&apos;ll provide curated links here in the future!</p>
      </>
    ),
  },
  {
    icon: "🔑",
    title: "Property Rights Chapter",
    keyword: ["right", "rights", "mineral", "water", "air", "easement"],
    content: (
      <>
        <p className="mb-2 text-blue-800 font-semibold">What are property rights?</p>
        <ul className="list-disc list-inside text-blue-700 text-left mx-auto max-w-md mb-2">
          <li><b>Mineral rights:</b> Ownership of resources below the surface.</li>
          <li><b>Water rights:</b> Rights to use water sources on/under the property.</li>
          <li><b>Air rights:</b> Rights to use/control the space above the property.</li>
          <li><b>Easements:</b> Legal rights for others to use part of your property (e.g., utility lines).</li>
        </ul>
        <p className="text-blue-600 text-sm">Check your property deed or county records for details.</p>
      </>
    ),
  },
  {
    icon: "💬",
    title: "Sensitive Stories & Disclosures",
    keyword: ["death", "deaths", "disclosure", "disclosures", "story", "stories"],
    content: (
      <>
        <p className="mb-2 text-blue-800 font-semibold">About sensitive disclosures:</p>
        <ul className="list-disc list-inside text-blue-700 text-left mx-auto max-w-md mb-2">
          <li>Disclosure laws vary by state (e.g., deaths on property).</li>
          <li>Agents must answer truthfully if asked directly.</li>
          <li>&quot;Your Home&apos;s Diary&quot; does not access private records.</li>
        </ul>
        <p className="text-blue-600 text-sm">Always consult your agent and local laws for specifics.</p>
      </>
    ),
  },
];

function parseQuery(query: string | null) {
  if (!query) return { address: "", keywords: [] };
  // Simple keyword extraction
  const lower = query.toLowerCase();
  const keywords = [] as string[];
  infoSections.forEach(section => {
    section.keyword.forEach(k => {
      if (lower.includes(k)) keywords.push(k);
    });
  });
  // Remove keywords from address
  let address = query;
  keywords.forEach(k => {
    const re = new RegExp(k, "ig");
    address = address.replace(re, "");
  });
  address = address.replace(/\s+/g, " ").trim();
  return { address, keywords };
}

// Helper to get mock coordinates for known addresses
function getMockCoords(address: string) {
  if (!address) return null;
  const lower = address.toLowerCase();
  if (lower.includes("123 main st")) return { lat: 37.779, lng: -122.4194 };
  if (lower.includes("456 oak ave")) return { lat: 37.781, lng: -122.417 };
  return null;
}

// Define MLS result type
interface MLSResult {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  mlsId: string;
}

const PropertyDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query");
  const { address, keywords } = parseQuery(query);

  // Show only relevant sections if keywords found, else show all
  const relevantSections = keywords.length
    ? infoSections.filter(section => section.keyword.some(k => keywords.includes(k)))
    : infoSections;

  // MLS integration (mock)
  const [mlsResults, setMlsResults] = useState<MLSResult[]>([]);
  const [mlsLoading, setMlsLoading] = useState(false);
  const [search, setSearch] = useState(query || "");
  useEffect(() => {
    if (address) {
      setMlsLoading(true);
      fetch(`/api/mls?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => setMlsResults(data.results || []))
        .finally(() => setMlsLoading(false));
    } else {
      setMlsResults([]);
    }
  }, [address]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/property?query=${encodeURIComponent(search)}`);
    }
  };

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (!address) {
      setCoords(null);
      setGeoError("");
      return;
    }
    // Use mock coords for known addresses
    const mock = getMockCoords(address);
    if (mock) {
      setCoords(mock);
      setGeoError("");
      return;
    }
    // Otherwise, geocode with Nominatim
    setGeoLoading(true);
    setGeoError("");
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
      headers: {
        'User-Agent': 'your-homes-diary-app/1.0 (your@email.com)'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
          setGeoError("");
        } else {
          setCoords(null);
          setGeoError("Could not find this address on the map.");
        }
      })
      .catch(() => {
        setCoords(null);
        setGeoError("Error looking up this address.");
      })
      .finally(() => setGeoLoading(false));
  }, [address]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50 py-16 px-4">
      {/* Search bar at the top */}
      <form className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-3 mb-8" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-5 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm text-blue-900"
          placeholder="Search for another property (e.g., &apos;123 Main St permits&apos;)"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
      {/* Map above property details */}
      <div className="max-w-2xl w-full mb-8">
        {geoLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid mb-2"></div>
            <div className="text-blue-600 font-medium">Locating property on map…</div>
          </div>
        ) : geoError ? (
          <div className="bg-red-100 text-red-700 rounded-xl shadow p-6 mb-8">{geoError}</div>
        ) : (
          <PropertyMap lat={coords?.lat} lng={coords?.lng} address={address} />
        )}
      </div>
      {/* Combined property details and MLS results */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Property Details</h1>
        {address && (
          <p className="text-blue-900 text-xl font-semibold mb-2">
            <span className="text-blue-600">Address:</span> {address}
          </p>
        )}
        {keywords.length > 0 && (
          <p className="text-blue-700 text-base mb-4">
            <span className="font-semibold">Topics detected:</span> {keywords.join(", ")}
          </p>
        )}
        {!address && !keywords.length && (
          <p className="text-blue-800 mb-8">This is where the property address and research guidance will appear after a search.</p>
        )}
        {mlsLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid mb-2"></div>
            <div className="text-blue-600 font-medium">Loading MLS results&hellip;</div>
          </div>
        )}
        {!mlsLoading && mlsResults.length > 0 && (
          <div className="bg-blue-100 rounded-xl shadow p-6 mt-8 text-blue-900">
            <h2 className="text-xl font-bold mb-4">MLS Results</h2>
            {mlsResults.map((item) => (
              <div key={item.mlsId} className="mb-4">
                <div className="font-semibold">{item.address}</div>
                <div>Price: {item.price}</div>
                <div>Beds: {item.beds} | Baths: {item.baths} | Sqft: {item.sqft}</div>
                <div>Status: {item.status}</div>
                <div className="text-xs text-blue-600">MLS ID: {item.mlsId}</div>
              </div>
            ))}
          </div>
        )}
        {!mlsLoading && address && mlsResults.length === 0 && (
          <div className="bg-blue-100 rounded-xl shadow p-6 mt-8 text-blue-900">
            <h2 className="text-xl font-bold mb-4">MLS Results</h2>
            <div className="text-blue-700">No MLS results found for this address.</div>
          </div>
        )}
      </div>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {relevantSections.map((section) => (
          <div key={section.title} className="bg-blue-100 rounded-xl shadow p-6 text-left flex gap-4 items-start">
            <div className="text-3xl mt-1">{section.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{section.title}</h2>
              <div className="text-blue-700 text-base">{section.content}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PropertyDetails; 