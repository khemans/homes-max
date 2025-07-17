"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getLinkedResource } from '@/utils/resourceManager';

// HOW TO ADD NEW RESOURCES:
// 1. Add the resource to the getLinkedResources() array in /utils/resourceManager.ts
// 2. Add the resource to the resources array in /data/resources.ts with isActive: true
// 3. The resource will automatically appear in both property details and the Resources page
// 4. Use getLinkedResource("Resource Name") to access the resource data in components

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

// Add AVM data interface
interface AVMData {
  estimatedValue: number;
  confidenceLevel: number;
  valuationDate: string;
  priceRange: {
    low: number;
    high: number;
  };
  comparables: {
    address: string;
    soldPrice: number;
    soldDate: string;
    sqft: number;
    distance: number;
  }[];
  marketTrends: {
    monthlyChange: number;
    yearlyChange: number;
    marketDirection: 'up' | 'down' | 'stable';
  };
  propertyDetails?: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    lotSize: string;
    propertyType: string;
    yearBuilt: number;
  };
  dataSource?: 'real_address' | 'estimated';
  accuracy?: string;
  modelVersion?: string;
  valuationMethods?: {
    method: string;
    weight: string;
    value: number;
  }[];
}

// Add SavedProperty type for localStorage
interface SavedProperty {
  address: string;
  city: string;
  state: string;
  zip: string;
  mlsId?: string;
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
  


  // Add state for risk data
  const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[] | null>(null);
  const [fireRisk, setFireRisk] = useState<FireRisk | null>(null);
  const [floodRisk, setFloodRisk] = useState<FloodRisk | null>(null);
  const [riskLoading, setRiskLoading] = useState(false);
  const [avmData, setAvmData] = useState<AVMData | null>(null);
  const [avmLoading, setAvmLoading] = useState(false);

  // Add state for cotality
  const [cotality, setCotality] = useState<{
    cotalityPropertyId: string;
    wildfireRiskScore: number;
    floodRiskScore: number;
    earthquakeRiskScore: number;
    reportUrl: string;
  } | null>(null);

  // Add state for public records data
  const [publicRecords, setPublicRecords] = useState<{
    assessment?: {
      assessedValue?: number;
      landValue?: number;
      taxAmount?: number;
    };
    demographics?: {
      medianIncome?: number;
      walkScore?: number;
      crimeRate?: string;
    };
    permits?: {
      permitType: string;
      permitNumber: string;
      contractor?: string;
      issueDate: string;
      value?: number;
    }[];
    flood?: {
      zone?: string;
      riskLevel?: string;
      insuranceRequired?: boolean;
    };
  } | null>(null);
  const [publicRecordsLoading, setPublicRecordsLoading] = useState(false);
  const [publicRecordsError, setPublicRecordsError] = useState("");

  // Add state for saved property
  const [isSaved, setIsSaved] = useState(false);

  // Check if property is already saved
  useEffect(() => {
    if (!address) return;
    const saved: SavedProperty[] = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    setIsSaved(saved.some((p) => p.address === address));
  }, [address]);

  // Save property handler
  const handleSave = () => {
    if (!address) return;
    const saved: SavedProperty[] = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    if (!saved.some((p) => p.address === address)) {
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
      


      // Fetch risk data
      setRiskLoading(true);
      fetch(`/api/risk?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => {
          setInsuranceClaims(data.insuranceClaims);
          setFireRisk(data.fireRisk);
          setFloodRisk(data.floodRisk);
          setCotality(data.cotality || null);
        })
        .finally(() => setRiskLoading(false));

      // Get AVM data from API (using enhanced algorithm)
      setAvmLoading(true);
      fetch(`/api/avm?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            setAvmData(result.data);
          } else {
            console.error('AVM API failed:', result.error || 'Unknown error');
            // Set to null instead of mock data to show error state
            setAvmData(null);
          }
        })
        .catch(error => {
          console.error('AVM API Error:', error);
          // Set to null instead of mock data to show error state
          setAvmData(null);
        })
        .finally(() => setAvmLoading(false));

      // Fetch public records data
      setPublicRecordsLoading(true);
      setPublicRecordsError("");
      fetch(`/api/public-records?address=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPublicRecords(data.data);
          } else {
            setPublicRecordsError(data.error || "Could not fetch public records data.");
          }
        })
        .catch(error => {
          console.error('Public Records API Error:', error);
          setPublicRecordsError("Could not fetch public records data.");
        })
        .finally(() => setPublicRecordsLoading(false));
    } else {
      setMlsResults([]);
      setInsuranceClaims(null);
      setFireRisk(null);
      setFloodRisk(null);
              setCotality(null);
      setAvmData(null);
      setPublicRecords(null);
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
    // Otherwise, geocode using our enhanced address search API (Geoapify + Nominatim)
    setGeoLoading(true);
    setGeoError("");
    fetch(`/api/address-search?q=${encodeURIComponent(address)}&validate=true`)
      .then(res => res.json())
      .then(data => {
        if (data.geocoding && data.geocoding.lat && data.geocoding.lng) {
          setCoords({ lat: data.geocoding.lat, lng: data.geocoding.lng });
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
            .avm { color: #16a34a; }
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
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="remax-container">
        {/* Map Section */}
        <div className="max-w-4xl mx-auto mb-8">
          {geoLoading ? (
            <div className="remax-card text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
              <div className="remax-text-body text-blue-600 font-medium">Locating property on map...</div>
            </div>
          ) : geoError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
              <h3 className="font-semibold mb-2">Location Error</h3>
              <p>{geoError}</p>
            </div>
          ) : (
            <div className="remax-card overflow-hidden">
              <PropertyMap lat={coords?.lat} lng={coords?.lng} address={mlsResults[0] ? `${mlsResults[0].address}, ${mlsResults[0].city}, ${mlsResults[0].state} ${mlsResults[0].zip}` : address} />
            </div>
          )}
        </div>

        {/* Property Details Section */}
        <div className="max-w-4xl mx-auto">
          <div className="remax-card mb-8">
            <div className="remax-card-header text-center">
              <h1 className="remax-heading-2">Property Details</h1>
              {address && (
                <p className="remax-text-body text-lg mt-2">
                  <span className="font-semibold">Address:</span> {address}
                </p>
              )}
            </div>
            
            <div className="remax-card-body">
              {address && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <button
                    onClick={handleSave}
                    disabled={isSaved}
                    className={isSaved ? 'remax-btn-secondary opacity-60 cursor-not-allowed' : 'remax-btn-outline'}
                  >
                    {isSaved ? 'Property Saved' : 'Save Property'}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="remax-btn-secondary"
                  >
                    Print Report
                  </button>
                </div>
              )}
              
              {keywords.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="remax-text-body">
                    <span className="font-semibold">Topics detected:</span> {keywords.join(", ")}
                  </p>
                </div>
              )}
              
              {!address && !keywords.length && (
                <div className="text-center py-8">
                  <p className="remax-text-body text-gray-600">
                    This is where the property address and research guidance will appear after a search.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* MLS Results */}
          {mlsLoading && (
            <div className="remax-card text-center py-12 mb-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
              <div className="remax-text-body text-blue-600 font-medium">Loading MLS results...</div>
            </div>
          )}
          
          {!mlsLoading && mlsResults.length > 0 && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <h2 className="remax-heading-3">MLS Results</h2>
              </div>
              <div className="remax-card-body">
                <div className="grid gap-6">
                  {mlsResults.map((item) => (
                    <div key={item.mlsId} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.address}</h3>
                          <p className="remax-text-body">{item.city}, {item.state} {item.zip}</p>
                          <p className="text-2xl font-bold text-green-600 mt-2">{item.price}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="remax-text-small font-medium">Beds:</span>
                            <span className="remax-text-small">{item.beds}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="remax-text-small font-medium">Baths:</span>
                            <span className="remax-text-small">{item.baths}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="remax-text-small font-medium">Sqft:</span>
                            <span className="remax-text-small">{item.sqft}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="remax-text-small font-medium">Status:</span>
                            <span className="remax-text-small font-semibold">{item.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="remax-text-small font-medium">MLS ID:</span>
                            <span className="remax-text-small font-mono">{item.mlsId}</span>
                          </div>
                        </div>
                      </div>
                      {item.salesPitch && (
                        <div className="mt-4 p-4 bg-white border border-blue-200 rounded-lg">
                          <h4 className="font-semibold mb-2 text-blue-800">Realtor&apos;s Sales Pitch:</h4>
                          <p className="remax-text-body">{item.salesPitch}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {!mlsLoading && address && mlsResults.length === 0 && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <h2 className="remax-heading-3">MLS Results</h2>
              </div>
              <div className="remax-card-body text-center py-8">
                <p className="remax-text-body text-gray-600">No MLS results found for this address.</p>
              </div>
            </div>
          )}

          {/* AVM Section */}
          {address && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <div className="flex justify-between items-center">
                  <h2 className="remax-heading-3">Automated Valuation Model (AVM)</h2>
                  {avmData?.dataSource && (
                    <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {avmData.dataSource === 'real_address' ? 'Real Property Data' : 'Estimated Data'}
                    </div>
                  )}
                </div>
              </div>
              <div className="remax-card-body">
                {avmLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid mb-4 mx-auto"></div>
                    <div className="remax-text-body text-green-600 font-medium">Calculating property value...</div>
                  </div>
                ) : avmData ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Valuation Summary */}
                    <div>
                      <h3 className="remax-heading-3 text-lg mb-4 text-green-800">Estimated Value</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-800 mb-2">
                            ${avmData.estimatedValue.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-600">
                            Range: ${avmData.priceRange.low.toLocaleString()} - ${avmData.priceRange.high.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-600 mt-1">
                            Confidence: {avmData.confidenceLevel}%
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Valuation Date: {avmData.valuationDate}
                          </div>
                        </div>
                      </div>
                      
                      {/* Market Trends */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Market Trends</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Monthly Change:</span>
                            <span className={`text-sm font-medium ${avmData.marketTrends.monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {avmData.marketTrends.monthlyChange >= 0 ? '+' : ''}{avmData.marketTrends.monthlyChange.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Yearly Change:</span>
                            <span className="text-sm font-medium text-green-600">
                              +{avmData.marketTrends.yearlyChange.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Market Direction:</span>
                            <span className={`text-sm font-medium capitalize ${
                              avmData.marketTrends.marketDirection === 'up' ? 'text-green-600' : 
                              avmData.marketTrends.marketDirection === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {avmData.marketTrends.marketDirection}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comparable Sales */}
                    <div>
                      <h3 className="remax-heading-3 text-lg mb-4 text-green-800">Comparable Sales</h3>
                      <div className="space-y-3">
                        {avmData.comparables.map((comp, index) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-gray-800">{comp.address}</h4>
                                <p className="text-sm text-gray-600">{comp.distance} miles away</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-600">${comp.soldPrice.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">{comp.soldDate}</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {comp.sqft.toLocaleString()} sq ft
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="remax-text-body text-gray-600 mb-2">Enhanced AVM data not available for this address</div>
                    <div className="text-sm text-gray-500">
                      This property may not be in our enhanced database. Try the{' '}
                      <a href="/avm" className="text-blue-600 hover:text-blue-800 underline">
                        standalone AVM tool
                      </a>{' '}
                      for estimated valuations.
                    </div>
                  </div>
                )}

                {/* AVM Resource Reference */}
                {(() => {
                  const avmResource = getLinkedResource("Automated Valuation Model (AVM)");
                  if (!avmResource) return null;
                  
                  return (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-1">Learn More About AVM Technology</h4>
                          <p className="remax-text-small text-blue-700">
                            {avmResource.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          <a 
                            href={avmResource.url}
                            className="remax-btn-outline text-sm px-4 py-2 whitespace-nowrap"
                          >
                            {avmResource.buttonText || 'Learn More'}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Public Records Section */}
          {address && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <div className="flex justify-between items-center">
                  <h2 className="remax-heading-3">Public Records</h2>
                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    Free Government Data
                  </div>
                </div>
              </div>
              <div className="remax-card-body">
                {publicRecordsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid mb-4 mx-auto"></div>
                    <div className="remax-text-body text-green-600 font-medium">Loading public records...</div>
                  </div>
                ) : publicRecordsError ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="remax-text-body text-gray-600 mb-2">Public records data not available</div>
                    <div className="text-sm text-gray-500">{publicRecordsError}</div>
                  </div>
                ) : publicRecords ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Property Assessment */}
                    {publicRecords.assessment && (
                      <div>
                        <h3 className="remax-heading-3 text-lg mb-4 text-blue-800">Property Assessment</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                          {publicRecords.assessment.assessedValue && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Assessed Value:</span>
                              <span className="text-sm font-semibold">${publicRecords.assessment.assessedValue.toLocaleString()}</span>
                            </div>
                          )}
                          {publicRecords.assessment.landValue && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Land Value:</span>
                              <span className="text-sm">${publicRecords.assessment.landValue.toLocaleString()}</span>
                            </div>
                          )}
                          {publicRecords.assessment.taxAmount && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Annual Taxes:</span>
                              <span className="text-sm">${publicRecords.assessment.taxAmount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Demographics */}
                    {publicRecords.demographics && (
                      <div>
                        <h3 className="remax-heading-3 text-lg mb-4 text-purple-800">Neighborhood Demographics</h3>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-2">
                          {publicRecords.demographics.medianIncome && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Median Income:</span>
                              <span className="text-sm">${publicRecords.demographics.medianIncome.toLocaleString()}</span>
                            </div>
                          )}
                          {publicRecords.demographics.walkScore && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Walk Score:</span>
                              <span className="text-sm">{publicRecords.demographics.walkScore}/100</span>
                            </div>
                          )}
                          {publicRecords.demographics.crimeRate && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Crime Rate:</span>
                              <span className="text-sm">{publicRecords.demographics.crimeRate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Building Permits */}
                    {publicRecords.permits && publicRecords.permits.length > 0 && (
                      <div className="md:col-span-2">
                        <h3 className="remax-heading-3 text-lg mb-4 text-orange-800">Recent Building Permits</h3>
                        <div className="space-y-3">
                          {publicRecords.permits.slice(0, 3).map((permit, index: number) => (
                            <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-semibold text-orange-800">{permit.permitType}</span>
                                  <p className="text-sm text-orange-600">Permit: {permit.permitNumber}</p>
                                  {permit.contractor && (
                                    <p className="text-sm text-orange-600">Contractor: {permit.contractor}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-semibold text-orange-800">{permit.issueDate}</div>
                                  {permit.value && (
                                    <div className="text-sm text-orange-600">${permit.value.toLocaleString()}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Flood Data */}
                    {publicRecords.flood && (
                      <div className="md:col-span-2">
                        <h3 className="remax-heading-3 text-lg mb-4 text-blue-800">FEMA Flood Information</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 grid md:grid-cols-3 gap-4">
                          {publicRecords.flood.zone && (
                            <div>
                              <span className="text-sm font-medium text-blue-800">Flood Zone:</span>
                              <p className="text-sm text-blue-700">{publicRecords.flood.zone}</p>
                            </div>
                          )}
                          {publicRecords.flood.riskLevel && (
                            <div>
                              <span className="text-sm font-medium text-blue-800">Risk Level:</span>
                              <p className="text-sm text-blue-700">{publicRecords.flood.riskLevel}</p>
                            </div>
                          )}
                          {publicRecords.flood.insuranceRequired && (
                            <div>
                              <span className="text-sm font-medium text-blue-800">Insurance Required:</span>
                              <p className="text-sm text-blue-700">{publicRecords.flood.insuranceRequired ? 'Yes' : 'No'}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="remax-text-body text-gray-600 mb-2">No public records data available</div>
                    <div className="text-sm text-gray-500">Public records data may not be available for this address.</div>
                  </div>
                )}

                {/* Data Sources Information */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">Data Sources</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Public records data sourced from free government APIs including:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                      <span className="bg-white px-2 py-1 rounded">US Census Bureau</span>
                      <span className="bg-white px-2 py-1 rounded">FEMA Flood Maps</span>
                      <span className="bg-white px-2 py-1 rounded">Local Government Records</span>
                      <span className="bg-white px-2 py-1 rounded">OpenStreetMap</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* Risk Data Section */}
          <div className="remax-card border-l-4 border-l-red-500">
            <div className="remax-card-header bg-red-50">
              <h2 className="remax-heading-3 text-red-800">Risk & Insurance Data</h2>
            </div>
            <div className="remax-card-body">
              {/* Insurance Claims */}
              <div className="mb-8">
                <h3 className="remax-heading-3 text-lg mb-4 text-red-700">Insurance Claims</h3>
                {riskLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-red-600 border-solid mb-2 mx-auto"></div>
                    <div className="remax-text-small text-red-600">Loading insurance claims...</div>
                  </div>
                ) : insuranceClaims && insuranceClaims.length > 0 ? (
                  <div className="space-y-3">
                    {insuranceClaims.map((claim, idx) => (
                      <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-red-800">{claim.type}</span>
                            <p className="remax-text-small text-red-600">Date: {claim.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-red-800">${claim.amount.toLocaleString()}</p>
                            <p className="remax-text-small text-red-600">{claim.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="remax-text-body text-gray-600 italic">No insurance claims data available.</p>
                  </div>
                )}
                
                {/* LexisNexis Reference */}
                {(() => {
                  const clueResource = getLinkedResource("LexisNexis C.L.U.E.® Property");
                  if (!clueResource) return null;
                  
                  return (
                    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Get {clueResource.name.replace('LexisNexis ', '')}</h4>
                          <p className="remax-text-small text-gray-600">
                            {clueResource.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          <a 
                            href={clueResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="remax-btn-outline text-sm px-4 py-2 whitespace-nowrap"
                          >
                            {clueResource.buttonText || 'Access Resource'}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Fire and Flood Risk */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Fire Risk */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="remax-heading-3 text-lg mb-4 text-orange-800">Fire Risk Assessment</h3>
                  {riskLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-orange-600 border-solid mb-2 mx-auto"></div>
                      <div className="remax-text-small text-orange-600">Loading fire risk data...</div>
                    </div>
                  ) : fireRisk ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Risk Score:</span>
                        <span className="remax-text-small font-semibold">{fireRisk.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Last Inspection:</span>
                        <span className="remax-text-small">{fireRisk.lastInspection}</span>
                      </div>
                      <div className="mt-3">
                        <span className="remax-text-small font-medium">Notes:</span>
                        <p className="remax-text-small mt-1">{fireRisk.notes}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="remax-text-body text-gray-600 italic">No fire risk data available.</p>
                  )}
                </div>

                {/* Flood Risk */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="remax-heading-3 text-lg mb-4 text-blue-800">Flood Risk</h3>
                  {riskLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-600 border-solid mb-2 mx-auto"></div>
                      <div className="remax-text-small text-blue-600">Loading flood risk data...</div>
                    </div>
                  ) : floodRisk ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Flood Zone:</span>
                        <span className="remax-text-small font-semibold">{floodRisk.zone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Risk Level:</span>
                        <span className="remax-text-small">{floodRisk.riskLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Last Flood:</span>
                        <span className="remax-text-small">{floodRisk.lastFlood || 'No recorded events'}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="remax-text-body text-gray-600 italic">No flood risk data available.</p>
                  )}
                </div>
              </div>

                {/* CoreLogic Reference */}
                {(() => {
                  const cotalityResource = getLinkedResource("Cotality Property Risk Reports");
                  if (!cotalityResource) return null;
                  
                  return (
                    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Get {cotalityResource.name}</h4>
                          <p className="remax-text-small text-gray-600">
                            {cotalityResource.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          <a 
                            href={cotalityResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="remax-btn-outline text-sm px-4 py-2 whitespace-nowrap"
                          >
                            {cotalityResource.buttonText || 'Access Resource'}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              {/* Cotality Data Display */}
              {!riskLoading && cotality && (
                <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <h3 className="remax-heading-3 text-lg mb-4 text-purple-800">Cotality Risk Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Wildfire Risk:</span>
                        <span className="remax-text-small font-semibold">{cotality.wildfireRiskScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Flood Risk:</span>
                        <span className="remax-text-small font-semibold">{cotality.floodRiskScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="remax-text-small font-medium">Earthquake Risk:</span>
                        <span className="remax-text-small font-semibold">{cotality.earthquakeRiskScore}</span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="remax-text-small font-medium">Property ID:</span>
                        <p className="remax-text-small font-mono">{cotality.cotalityPropertyId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Sources */}
              <div className="text-center">
                <p className="remax-text-small text-gray-500 italic">
                  Risk data sourced from{' '}
                  {(() => {
                    const cotalityResource = getLinkedResource("Cotality Property Risk Reports");
                    const clueResource = getLinkedResource("LexisNexis C.L.U.E.® Property");
                    
                    return (
                      <>
                        {cotalityResource && (
                          <a 
                            href={cotalityResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            Cotality
                          </a>
                        )}
                        {cotalityResource && clueResource && ' and '}
                        {clueResource && (
                          <a 
                            href={clueResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            LexisNexis C.L.U.E.®
                          </a>
                        )}
                      </>
                    );
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guidance Sections */}
      <div className="remax-section remax-section-light mt-12">
        <div className="remax-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relevantSections.map((section) => (
              <div key={section.title} className="remax-card">
                <div className="remax-card-body text-center">
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="remax-heading-3 mb-4">{section.title}</h3>
                  <div className="remax-text-body">
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
        </div>
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
        {avmData && (
          <div className="section avm">
            <h3>Automated Valuation Model (AVM)</h3>
            <div>
              <b>Estimated Value:</b> ${avmData.estimatedValue.toLocaleString()}<br />
              <b>Value Range:</b> ${avmData.priceRange.low.toLocaleString()} - ${avmData.priceRange.high.toLocaleString()}<br />
              <b>Confidence Level:</b> {avmData.confidenceLevel}%<br />
              <b>Valuation Date:</b> {avmData.valuationDate}<br />
              <br />
              <b>Market Trends:</b><br />
              • Monthly Change: {avmData.marketTrends.monthlyChange >= 0 ? '+' : ''}{avmData.marketTrends.monthlyChange.toFixed(1)}%<br />
              • Yearly Change: +{avmData.marketTrends.yearlyChange.toFixed(1)}%<br />
              • Market Direction: {avmData.marketTrends.marketDirection}<br />
              <br />
              <b>Comparable Sales:</b><br />
              {avmData.comparables.map((comp, index) => (
                <div key={index}>
                  • {comp.address} - ${comp.soldPrice.toLocaleString()} ({comp.soldDate}) - {comp.sqft.toLocaleString()} sq ft - {comp.distance} miles away<br />
                </div>
              ))}
            </div>
          </div>
        )}

        {publicRecords && (
          <div className="section public-records">
            <h3>Public Records</h3>
            
            {/* Property Assessment */}
            {publicRecords.assessment && (
              <div>
                <b>Property Assessment:</b><br />
                {publicRecords.assessment.assessedValue && `• Assessed Value: $${publicRecords.assessment.assessedValue.toLocaleString()}`}<br />
                {publicRecords.assessment.landValue && `• Land Value: $${publicRecords.assessment.landValue.toLocaleString()}`}<br />
                {publicRecords.assessment.taxAmount && `• Annual Tax: $${publicRecords.assessment.taxAmount.toLocaleString()}`}<br />
                <br />
              </div>
            )}

            {/* Building Permits */}
            {publicRecords.permits && publicRecords.permits.length > 0 && (
              <div>
                <b>Recent Building Permits:</b><br />
                {publicRecords.permits.slice(0, 5).map((permit, index) => (
                  <div key={index}>
                    • <b>{permit.permitType}</b> ({permit.permitNumber})<br />
                    &nbsp;&nbsp;Issued: {permit.issueDate}<br />
                    {permit.contractor && `&nbsp;&nbsp;Contractor: ${permit.contractor}`}<br />
                    {permit.value && `&nbsp;&nbsp;Value: $${permit.value.toLocaleString()}`}<br />
                    <br />
                  </div>
                ))}
              </div>
            )}

            {/* Flood Information */}
            {publicRecords.flood && (
              <div>
                <b>FEMA Flood Information:</b><br />
                {publicRecords.flood.zone && `• Flood Zone: ${publicRecords.flood.zone}`}<br />
                {publicRecords.flood.riskLevel && `• Flood Risk: ${publicRecords.flood.riskLevel}`}<br />
                {publicRecords.flood.insuranceRequired !== undefined && `• Insurance Required: ${publicRecords.flood.insuranceRequired ? 'Yes' : 'No'}`}<br />
                <br />
              </div>
            )}

            {/* Demographics */}
            {publicRecords.demographics && (
              <div>
                <b>Area Demographics:</b><br />
                {publicRecords.demographics.medianIncome && `• Median Income: $${publicRecords.demographics.medianIncome.toLocaleString()}`}<br />
                {publicRecords.demographics.walkScore && `• Walk Score: ${publicRecords.demographics.walkScore}/100`}<br />
                {publicRecords.demographics.crimeRate && `• Crime Rate: ${publicRecords.demographics.crimeRate}`}<br />
                <br />
              </div>
            )}

            <div style={{fontSize: '10px', color: '#666'}}>
              Data sources: US Census Bureau, FEMA Flood Maps, Local Government Records, OpenStreetMap
            </div>
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
          {cotality && (
            <div>
              <b>Cotality Property ID:</b> {cotality.cotalityPropertyId}<br />
              <b>Wildfire Risk Score:</b> {cotality.wildfireRiskScore}<br />
              <b>Flood Risk Score:</b> {cotality.floodRiskScore}<br />
              <b>Earthquake Risk Score:</b> {cotality.earthquakeRiskScore}<br />
              <b>Report URL:</b> <a href={cotality.reportUrl}>{cotality.reportUrl}</a>
            </div>
          )}
        </div>
        <div className="footnote">
          <b>Disclaimer:</b> This report is for informational purposes only. Data may be incomplete or out of date. Always verify with official sources.<br />
          &copy; {new Date().getFullYear()} HOUSE/MAX
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsClient; 