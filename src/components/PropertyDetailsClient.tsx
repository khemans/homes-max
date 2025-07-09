"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import PropertyMap with SSR disabled to avoid window reference issues
const PropertyMap = dynamic(() => import("./PropertyMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-8 bg-gray-100 flex items-center justify-center">
      <div className="text-gray-600">Loading map...</div>
    </div>
  )
});

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
          <li>Look for &apos;building permits&apos; or &apos;code enforcement records&apos;.</li>
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
          <li>&quot;HOUSE/MAX&quot; does not access private records.</li>
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
  // Denver metro area coordinates
  if (lower.includes("1234 larimer st")) return { lat: 39.7505, lng: -104.9963 };
  if (lower.includes("5678 colfax ave")) return { lat: 39.7402, lng: -104.9847 };
  if (lower.includes("9012 broadway")) return { lat: 39.7213, lng: -104.9877 };
  if (lower.includes("3456 speer blvd")) return { lat: 39.7325, lng: -105.0087 };
  if (lower.includes("7890 alameda ave")) return { lat: 39.7156, lng: -104.9876 };
  if (lower.includes("2345 colorado blvd")) return { lat: 39.7234, lng: -104.9456 };
  if (lower.includes("6789 evans ave")) return { lat: 39.6789, lng: -104.9876 };
  if (lower.includes("1122 hampden ave")) return { lat: 39.6543, lng: -104.9876 };
  if (lower.includes("3344 mississippi ave")) return { lat: 39.7234, lng: -104.9234 };
  if (lower.includes("5566 yale ave")) return { lat: 39.7123, lng: -104.9345 };
  return null;
}

// Define MLS result type
interface MLSResult {
  address: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  mlsId: string;
  salesPitch: string;
}

// Utility: map city/county keywords to permit search URLs
const permitLinks: { [key: string]: { name: string; url: string }[] } = {
  "san francisco": [
    { name: "SF DBI Permit Search", url: "https://sfdbi.org/permits" },
    { name: "SF Planning Department", url: "https://sfplanning.org/permits" },
  ],
  "oakland": [
    { name: "Oakland Permit Center", url: "https://aca.accela.com/oakland" },
  ],
  "los angeles": [
    { name: "LA Building & Safety", url: "https://www.ladbs.org/services/online-services/permit-search" },
  ],
  // Add more as needed
};

// Helper to guess city/county from address
function getPermitLinks(address: string) {
  const lower = address.toLowerCase();
  for (const key in permitLinks) {
    if (lower.includes(key)) return permitLinks[key];
  }
  return [];
}

// Permit record type
interface PermitRecord {
  type: string;
  year: number;
  status: string;
  permitId: string;
}

// Add types for risk data
interface InsuranceClaim {
  date: string;
  type: string;
  amount: number;
  status: string;
}
interface FireRisk {
  score: number;
  lastInspection: string;
  notes: string;
}
interface FloodRisk {
  zone: string;
  riskLevel: string;
  lastFlood: string | null;
}

// Dynamic Permit Pages component (simplified - no permit data display)
const PermitPages: React.FC<{ address: string }> = ({ address }) => {
  const links = getPermitLinks(address);

  return (
    <div>
      <p className="mb-2 text-blue-800 font-semibold">How to find building permits:</p>
      <ol className="list-decimal list-inside text-blue-700 text-left mx-auto max-w-md mb-2">
        <li>Identify your local county/city planning department.</li>
        <li>Visit their official website (search for &quot;[Your County Name] building permits&quot;).</li>
        <li>Use their property search tool.</li>
        <li>Look for &apos;building permits&apos; or &apos;code enforcement records&apos;.</li>
      </ol>
      {links.length > 0 && (
        <div className="mb-2">
          <p className="text-blue-800 font-semibold mb-1">Quick Links for your area:</p>
          <ul className="list-disc list-inside text-blue-700">
            {links.map(link => (
              <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">{link.name}</a></li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-blue-600 text-sm mt-2">Always verify permit records with your local government for the most up-to-date information.</p>
    </div>
  );
};

const PropertyDetailsClient: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { address, keywords } = parseQuery(query);

  // Show only relevant sections if keywords found, else show all
  const relevantSections = keywords.length
    ? infoSections.filter(section => section.keyword.some(k => keywords.includes(k)))
    : infoSections;

  // MLS integration (mock)
  const [mlsResults, setMlsResults] = useState<MLSResult[]>([]);
  const [mlsLoading, setMlsLoading] = useState(false);
  
  // Permit integration (mock)
  const [permits, setPermits] = useState<PermitRecord[]>([]);
  const [permitsLoading, setPermitsLoading] = useState(false);
  const [permitsError, setPermitsError] = useState("");

  // Add state for risk data
  const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[] | null>(null);
  const [fireRisk, setFireRisk] = useState<FireRisk | null>(null);
  const [floodRisk, setFloodRisk] = useState<FloodRisk | null>(null);
  const [riskLoading, setRiskLoading] = useState(false);

  // Add state for coreLogic
  const [coreLogic, setCoreLogic] = useState<{
    coreLogicPropertyId: string;
    wildfireRiskScore: number;
    floodRiskScore: number;
    earthquakeRiskScore: number;
    reportUrl: string;
  } | null>(null);

  // Add state for saved property
  const [isSaved, setIsSaved] = useState(false);

  // Check if property is already saved
  useEffect(() => {
    if (!address) return;
    const saved = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    setIsSaved(saved.some((p: any) => p.address === address));
  }, [address]);

  // Save property handler
  const handleSave = () => {
    if (!address) return;
    const saved = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    if (!saved.some((p: any) => p.address === address)) {
      const property = mlsResults[0] || { address, city: "", state: "", zip: "", mlsId: "" };
      saved.push(property);
      localStorage.setItem("savedProperties", JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  useEffect(() => {
    if (address) {
      setMlsLoading(true);
      fetch(`/api/mls?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => setMlsResults(data.results || []))
        .finally(() => setMlsLoading(false));
      
      // Also fetch permit data
      setPermitsLoading(true);
      setPermitsError("");
      fetch(`/api/permits?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => setPermits(data.permits || []))
        .catch(() => setPermitsError("Could not fetch permit data."))
        .finally(() => setPermitsLoading(false));

      // Fetch risk data
      setRiskLoading(true);
      fetch(`/api/risk?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => {
          setInsuranceClaims(data.insuranceClaims);
          setFireRisk(data.fireRisk);
          setFloodRisk(data.floodRisk);
          setCoreLogic(data.coreLogic || null);
        })
        .finally(() => setRiskLoading(false));
    } else {
      setMlsResults([]);
      setPermits([]);
      setInsuranceClaims(null);
      setFireRisk(null);
      setFloodRisk(null);
      setCoreLogic(null);
    }
  }, [address]);

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
        'User-Agent': 'homes-max-app/1.0 (your@email.com)'
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

  const printableRef = useRef<HTMLDivElement>(null);

  // Print handler
  const handlePrint = () => {
    if (!printableRef.current) return;
    const printContents = printableRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=1200');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>HOUSE/MAX Property Report</title>
          <style>
            body { font-family: sans-serif; color: #222; margin: 2em; }
            h1, h2, h3 { color: #005BAA; }
            .section { margin-bottom: 2em; }
            .risk { color: #E31837; }
            .permits { color: #0a6c3d; }
            .mls { color: #005BAA; }
            table { border-collapse: collapse; width: 100%; margin-top: 1em; }
            th, td { border: 1px solid #ccc; padding: 6px 10px; }
            th { background: #f0f8ff; }
            .footnote { color: #888; font-size: 0.9em; margin-top: 2em; }
            @media print { button { display: none !important; } }
          </style>
        </head>
        <body>
          ${printContents}
          <script>window.onload = function() { window.print(); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50 py-8 px-4">
      {/* Map above property details */}
      <div className="max-w-2xl w-full mb-8">
        {geoLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid mb-2"></div>
            <div className="text-blue-600 font-medium">Locating property on map&hellip;</div>
          </div>
        ) : geoError ? (
          <div className="bg-red-100 text-red-700 rounded-xl shadow p-6 mb-8">{geoError}</div>
        ) : (
          <PropertyMap lat={coords?.lat} lng={coords?.lng} address={mlsResults[0] ? `${mlsResults[0].address}, ${mlsResults[0].city}, ${mlsResults[0].state} ${mlsResults[0].zip}` : address} />
        )}
      </div>
      {/* Combined property details, MLS results, and permits */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Property Details</h1>
        {address && (
          <>
            <p className="text-blue-900 text-xl font-semibold mb-2">
              <span className="text-blue-600">Address:</span> {address}
            </p>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`px-5 py-2 rounded-lg font-semibold text-lg shadow transition-colors mb-4 mr-2 ${isSaved ? 'bg-green-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {isSaved ? 'Saved' : 'Save Property'}
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-lg font-semibold text-lg shadow transition-colors mb-4 bg-gray-200 text-blue-900 hover:bg-gray-300 ml-2"
            >
              Print Report
            </button>
          </>
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
                <div className="font-semibold">{item.address}, {item.city}, {item.state} {item.zip}</div>
                <div>Price: {item.price}</div>
                <div>Beds: {item.beds} | Baths: {item.baths} | Sqft: {item.sqft}</div>
                <div>Status: {item.status}</div>
                <div className="text-xs text-blue-600">MLS ID: {item.mlsId}</div>
                {item.salesPitch && (
                  <div className="bg-white rounded-lg p-4 mt-3 text-blue-900 shadow-sm border border-blue-200">
                    <span className="block font-semibold mb-1">Realtor's Sales Pitch:</span>
                    <span>{item.salesPitch}</span>
                  </div>
                )}
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
        {/* Permit Results */}
        {permitsLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid mb-2"></div>
            <div className="text-blue-600 font-medium">Loading permit data&hellip;</div>
          </div>
        )}
        {!permitsLoading && permitsError && (
          <div className="bg-red-100 rounded-xl shadow p-6 mt-8 text-red-900">
            <h2 className="text-xl font-bold mb-4">Permit Records</h2>
            <div className="text-red-700">{permitsError}</div>
          </div>
        )}
        {!permitsLoading && !permitsError && permits.length > 0 && (
          <div className="bg-green-100 rounded-xl shadow p-6 mt-8 text-green-900">
            <h2 className="text-xl font-bold mb-4">Recent Permits for this Property</h2>
            <table className="w-full text-left border mt-2 bg-white">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-2 py-1">Type</th>
                  <th className="px-2 py-1">Year</th>
                  <th className="px-2 py-1">Status</th>
                  <th className="px-2 py-1">Permit ID</th>
                </tr>
              </thead>
              <tbody>
                {permits.map((p) => (
                  <tr key={p.permitId} className="border-t">
                    <td className="px-2 py-1">{p.type}</td>
                    <td className="px-2 py-1">{p.year}</td>
                    <td className="px-2 py-1">{p.status}</td>
                    <td className="px-2 py-1">{p.permitId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!permitsLoading && !permitsError && address && permits.length === 0 && (
          <div className="bg-green-100 rounded-xl shadow p-6 mt-8 text-green-900">
            <h2 className="text-xl font-bold mb-4">Recent Permits for this Property</h2>
            <div className="text-green-700">No permit records found for this address.</div>
          </div>
        )}
        {/* --- Risk Data Section (now below permits, styled red) --- */}
        <div className="bg-red-100 rounded-xl shadow p-6 mt-8 text-red-900">
          <h2 className="text-2xl font-bold mb-4">Risk & Insurance Data</h2>
          {/* Insurance Claims */}
          <div className="mb-6 text-left">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Insurance Claims</h3>
            {riskLoading ? (
              <div className="text-red-600">Loading insurance claims...</div>
            ) : insuranceClaims && insuranceClaims.length > 0 ? (
              <ul className="list-disc list-inside">
                {insuranceClaims.map((claim, idx) => (
                  <li key={idx} className="mb-1">
                    <span className="font-semibold">{claim.type}</span> claim on {claim.date} for ${claim.amount.toLocaleString()} (<span className="text-red-700">{claim.status}</span>)
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-red-500 italic">No insurance claims data available.</div>
            )}
          </div>
          {/* Fire and Flood Risk Box */}
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
            {/* Fire Risk */}
            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Fire Risk Assessment</h3>
              {riskLoading ? (
                <div className="text-red-600">Loading fire risk data...</div>
              ) : fireRisk ? (
                <div>
                  <div>Risk Score: <span className="font-semibold">{fireRisk.score}</span></div>
                  <div>Last Inspection: {fireRisk.lastInspection}</div>
                  <div>Notes: {fireRisk.notes}</div>
                </div>
              ) : (
                <div className="text-red-500 italic">No fire risk data available.</div>
              )}
            </div>
            {/* Flood Risk */}
            <div className="mb-4 text-left">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Flood Risk</h3>
              {riskLoading ? (
                <div className="text-red-600">Loading flood risk data...</div>
              ) : floodRisk ? (
                <div>
                  <div>Flood Zone: <span className="font-semibold">{floodRisk.zone}</span></div>
                  <div>Risk Level: {floodRisk.riskLevel}</div>
                  <div>Last Flood: {floodRisk.lastFlood ? floodRisk.lastFlood : 'No recorded flood events.'}</div>
                </div>
              ) : (
                <div className="text-red-500 italic">No flood risk data available.</div>
              )}
            </div>
            {/* CoreLogic Mock Data - Risk Scores and Report */}
            {riskLoading ? null : coreLogic ? (
              <div className="mt-2 text-left">
                <h3 className="text-xl font-semibold text-red-800 mb-2">CoreLogic Risk Details</h3>
                <div>Wildfire Risk Score: <span className="font-semibold">{coreLogic.wildfireRiskScore}</span></div>
                <div>Flood Risk Score: <span className="font-semibold">{coreLogic.floodRiskScore}</span></div>
                <div>Earthquake Risk Score: <span className="font-semibold">{coreLogic.earthquakeRiskScore}</span></div>
                <div>CoreLogic Property ID: <span className="font-mono">{coreLogic.coreLogicPropertyId}</span></div>
                {coreLogic.reportUrl && (
                  <div>CoreLogic Report: <a href={coreLogic.reportUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-700">View CoreLogic Report</a></div>
                )}
              </div>
            ) : null}
          </div>
          {/* Footnote below the box */}
          <div className="mb-4">
            <span className="text-xs italic text-gray-600">This data can be obtained from <a href="https://store.corelogic.com/search" target="_blank" rel="noopener noreferrer" className="underline">@https://store.corelogic.com/search</a></span>
          </div>
        </div>
        {/* --- End Risk Data Section --- */}
      </div>
      {/* Printable report section (hidden on screen, used for print/PDF) */}
      <div ref={printableRef} style={{ display: 'none' }}>
        <h1>HOUSE/MAX Property Report</h1>
        {address && <h2>{address}</h2>}
        {mlsResults.length > 0 && (
          <div className="section mls">
            <h3>MLS Results</h3>
            {mlsResults.map((item) => (
              <div key={item.mlsId}>
                <div><b>Address:</b> {item.address}, {item.city}, {item.state} {item.zip}</div>
                <div><b>Price:</b> {item.price}</div>
                <div><b>Beds:</b> {item.beds} | <b>Baths:</b> {item.baths} | <b>Sqft:</b> {item.sqft}</div>
                <div><b>Status:</b> {item.status}</div>
                <div><b>MLS ID:</b> {item.mlsId}</div>
              </div>
            ))}
          </div>
        )}
        {permits.length > 0 && (
          <div className="section permits">
            <h3>Recent Permits</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Permit ID</th>
                </tr>
              </thead>
              <tbody>
                {permits.map((p) => (
                  <tr key={p.permitId}>
                    <td>{p.type}</td>
                    <td>{p.year}</td>
                    <td>{p.status}</td>
                    <td>{p.permitId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="section risk">
          <h3>Risk & Insurance Data</h3>
          {insuranceClaims && insuranceClaims.length > 0 && (
            <div>
              <b>Insurance Claims:</b>
              <ul>
                {insuranceClaims.map((claim, idx) => (
                  <li key={idx}>
                    {claim.type} claim on {claim.date} for ${claim.amount.toLocaleString()} ({claim.status})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {fireRisk && (
            <div>
              <b>Fire Risk Score:</b> {fireRisk.score}<br />
              <b>Last Inspection:</b> {fireRisk.lastInspection}<br />
              <b>Notes:</b> {fireRisk.notes}
            </div>
          )}
          {floodRisk && (
            <div>
              <b>Flood Zone:</b> {floodRisk.zone}<br />
              <b>Flood Risk Level:</b> {floodRisk.riskLevel}<br />
              <b>Last Flood:</b> {floodRisk.lastFlood || 'N/A'}
            </div>
          )}
          {coreLogic && (
            <div>
              <b>CoreLogic Property ID:</b> {coreLogic.coreLogicPropertyId}<br />
              <b>Wildfire Risk Score:</b> {coreLogic.wildfireRiskScore}<br />
              <b>Flood Risk Score:</b> {coreLogic.floodRiskScore}<br />
              <b>Earthquake Risk Score:</b> {coreLogic.earthquakeRiskScore}<br />
              <b>Report URL:</b> <a href={coreLogic.reportUrl}>{coreLogic.reportUrl}</a>
            </div>
          )}
        </div>
        <div className="footnote">
          <b>Disclaimer:</b> This report is for informational purposes only. Data may be incomplete or out of date. Always verify with official sources.<br />
          &copy; {new Date().getFullYear()} HOUSE/MAX
        </div>
      </div>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {relevantSections.map((section) => (
          <div key={section.title} className="bg-blue-100 rounded-xl shadow p-6 text-left flex gap-4 items-start">
            <div className="text-3xl mt-1">{section.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{section.title}</h2>
              <div className="text-blue-700 text-base">
                {section.title === "Permit Pages" ? (
                  <PermitPages address={address} />
                ) : (
                  section.content
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PropertyDetailsClient; 