"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getLinkedResource } from '@/utils/resourceManager';
import { useState, useEffect } from 'react';
import { MapPin, Bath, Bed, Square, Calendar, DollarSign, TrendingUp, AlertTriangle, Shield, Home, FileText, Droplets, Users, Star } from 'lucide-react';

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

// Helper to generate mock AVM data
function generateMockAVMData(): AVMData {
  const baseValue = 450000 + Math.floor(Math.random() * 300000); // Random base value between 450k-750k
  const confidenceLevel = 75 + Math.floor(Math.random() * 20); // 75-95% confidence
  const rangeFactor = 0.1; // 10% range around estimate
  
  // Use real addresses from MLS data for comparables
  const realComparables = [
    { address: "1234 Larimer St, Denver, CO", basePrice: 425000, sqft: 1200 },
    { address: "5678 Colfax Ave, Lakewood, CO", basePrice: 675000, sqft: 1850 },
    { address: "2345 Colorado Blvd, Denver, CO", basePrice: 625000, sqft: 1750 },
    { address: "6789 Evans Ave, Denver, CO", basePrice: 475000, sqft: 1100 },
    { address: "3344 Mississippi Ave, Denver, CO", basePrice: 575000, sqft: 1650 },
    { address: "5566 Yale Ave, Denver, CO", basePrice: 695000, sqft: 1900 },
    { address: "7788 Iliff Ave, Denver, CO", basePrice: 525000, sqft: 1350 }
  ];
  
  // Select 3 random comparables
  const selectedComparables = [...realComparables]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  return {
    estimatedValue: baseValue,
    confidenceLevel,
    valuationDate: new Date().toISOString().split('T')[0],
    priceRange: {
      low: Math.floor(baseValue * (1 - rangeFactor)),
      high: Math.floor(baseValue * (1 + rangeFactor))
    },
    comparables: selectedComparables.map((comp, index) => ({
      address: comp.address,
      soldPrice: comp.basePrice + Math.floor(Math.random() * 50000 - 25000), // ±$25k variation
      soldDate: ["2024-01-15", "2024-02-03", "2024-01-28"][index],
      sqft: comp.sqft + Math.floor(Math.random() * 200 - 100), // ±100 sqft variation
      distance: 0.2 + Math.random() * 0.6 // 0.2 to 0.8 miles
    })),
    marketTrends: {
      monthlyChange: -1 + Math.random() * 2, // -1% to +1%
      yearlyChange: 2 + Math.random() * 6, // 2% to 8%
      marketDirection: Math.random() > 0.5 ? 'up' : 'stable'
    }
  };
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

// Add new interface for public records
interface PublicRecordsData {
  basic: {
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  assessment?: {
    assessedValue?: number;
    marketValue?: number;
    landValue?: number;
    improvementValue?: number;
    assessmentYear?: number;
    taxAmount?: number;
    taxRate?: number;
  };
  permits?: Array<{
    permitNumber: string;
    permitType: string;
    description: string;
    issuedDate: string;
    value?: number;
    status: string;
    contractor?: string;
  }>;
  flood?: {
    floodZone?: string;
    floodRisk?: string;
  };
  demographics?: {
    medianHouseholdIncome?: number;
    medianHomeValue?: number;
    crimeRate?: number;
    walkabilityScore?: number;
  };
  sources: Record<string, any>;
}

export default function PropertyDetailsClient({ address }: { address: string }) {
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [publicRecords, setPublicRecords] = useState<PublicRecordsData | null>(null);
  const [avmData, setAvmData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [publicRecordsLoading, setPublicRecordsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setLoading(true);
        
        // Parallel fetch for performance
        const [propertyResponse, avmResponse, publicRecordsResponse] = await Promise.allSettled([
          fetch(`/api/property-search?address=${encodeURIComponent(address)}`),
          fetch(`/api/avm?address=${encodeURIComponent(address)}`),
          fetch(`/api/public-records?address=${encodeURIComponent(address)}`)
        ]);

        // Handle property data
        if (propertyResponse.status === 'fulfilled' && propertyResponse.value.ok) {
          const propertyData = await propertyResponse.value.json();
          setProperty(propertyData.property);
        }

        // Handle AVM data
        if (avmResponse.status === 'fulfilled' && avmResponse.value.ok) {
          const avmResult = await avmResponse.value.json();
          if (avmResult.success) {
            setAvmData(avmResult.data);
          }
        }

        // Handle public records data
        if (publicRecordsResponse.status === 'fulfilled' && publicRecordsResponse.value.ok) {
          const publicRecordsResult = await publicRecordsResponse.value.json();
          if (publicRecordsResult.success) {
            setPublicRecords(publicRecordsResult.data);
          }
        }

        setPublicRecordsLoading(false);
      } catch (error) {
        console.error('Error fetching property data:', error);
        setError('Failed to load property information');
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchPropertyData();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-lg font-semibold text-red-800">Error Loading Property</h2>
            </div>
            <p className="mt-2 text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center mb-2">
              <MapPin className="h-6 w-6 mr-2" />
              <h1 className="text-2xl font-bold">{address}</h1>
            </div>
            {property && (
              <div className="flex flex-wrap gap-4 text-blue-100">
                <span className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  {property.property.propertyType}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Built {property.property.yearBuilt}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {property.property.price}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Overview */}
            {property && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-blue-600" />
                  Property Overview
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.property.beds}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.property.baths}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.property.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.property.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700">{property.property.salesPitch}</p>
                </div>
              </div>
            )}

            {/* Public Records Section */}
            {publicRecords && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Public Records & Assessment
                  {publicRecordsLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 ml-2"></div>
                  )}
                </h2>
                
                {/* Assessment Data */}
                {publicRecords.assessment && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Tax Assessment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-600 font-medium">Assessed Value</div>
                        <div className="text-2xl font-bold text-green-800">
                          ${publicRecords.assessment.assessedValue?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-xs text-green-600">
                          Year: {publicRecords.assessment.assessmentYear || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium">Land Value</div>
                        <div className="text-2xl font-bold text-blue-800">
                          ${publicRecords.assessment.landValue?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-xs text-blue-600">Assessed land value</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-purple-600 font-medium">Annual Taxes</div>
                        <div className="text-2xl font-bold text-purple-800">
                          ${publicRecords.assessment.taxAmount?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-xs text-purple-600">
                          Rate: {publicRecords.assessment.taxRate || 'N/A'}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Building Permits */}
                {publicRecords.permits && publicRecords.permits.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Building Permits</h3>
                    <div className="space-y-3">
                      {publicRecords.permits.slice(0, 3).map((permit, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-gray-900">{permit.description}</div>
                              <div className="text-sm text-gray-600">
                                {permit.permitType} • {permit.status} • {permit.issuedDate}
                              </div>
                              {permit.contractor && (
                                <div className="text-sm text-gray-500">Contractor: {permit.contractor}</div>
                              )}
                            </div>
                            {permit.value && (
                              <div className="text-right">
                                <div className="font-semibold text-green-600">
                                  ${permit.value.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">Permit Value</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flood Risk */}
                {publicRecords.flood && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                      Flood Risk Information
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-blue-900">
                            Zone: {publicRecords.flood.floodZone || 'Unknown'}
                          </div>
                          <div className="text-sm text-blue-700">
                            Risk Level: {publicRecords.flood.floodRisk || 'Unknown'}
                          </div>
                        </div>
                        <Shield className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Demographics */}
                {publicRecords.demographics && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-indigo-500" />
                      Neighborhood Data
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {publicRecords.demographics.medianHouseholdIncome && (
                        <div className="text-center p-3 bg-indigo-50 rounded-lg">
                          <DollarSign className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-indigo-900">
                            ${publicRecords.demographics.medianHouseholdIncome.toLocaleString()}
                          </div>
                          <div className="text-xs text-indigo-600">Median Income</div>
                        </div>
                      )}
                      {publicRecords.demographics.medianHomeValue && (
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <Home className="h-5 w-5 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-green-900">
                            ${publicRecords.demographics.medianHomeValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-green-600">Median Home Value</div>
                        </div>
                      )}
                      {publicRecords.demographics.walkabilityScore && (
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <Star className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-yellow-900">
                            {publicRecords.demographics.walkabilityScore}/100
                          </div>
                          <div className="text-xs text-yellow-600">Walk Score</div>
                        </div>
                      )}
                      {publicRecords.demographics.crimeRate && (
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <Shield className="h-5 w-5 text-red-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-red-900">
                            {publicRecords.demographics.crimeRate}/10
                          </div>
                          <div className="text-xs text-red-600">Crime Index</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Data Sources */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Data Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(publicRecords.sources).map(([source, info]) => (
                      <span
                        key={source}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          info.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {source}: {info.status}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AVM Section */}
            {avmData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Property Valuation (AVM v2.0)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">
                      ${avmData.estimatedValue?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Estimated Value</div>
                    <div className="text-xs text-gray-500 mt-2">
                      Confidence: {avmData.confidenceLevel}%
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-700">
                      ${avmData.priceRange?.low?.toLocaleString()} - ${avmData.priceRange?.high?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Price Range</div>
                    <div className="text-xs text-gray-500 mt-2">±8% variation</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-700">
                      {avmData.marketTrends?.yearlyChange > 0 ? '+' : ''}{avmData.marketTrends?.yearlyChange?.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Annual Change</div>
                    <div className="text-xs text-gray-500 mt-2">
                      {avmData.marketTrends?.marketDirection} trend
                    </div>
                  </div>
                </div>

                {/* Valuation Methods */}
                {avmData.valuationMethods && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Valuation Breakdown</h3>
                    <div className="space-y-3">
                      {avmData.valuationMethods.map((method: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-medium text-gray-900">{method.method}</span>
                            <span className="text-sm text-gray-600 ml-2">({method.weight})</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ${method.value?.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comparable Properties */}
                {avmData.comparables && avmData.comparables.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Comparable Sales</h3>
                    <div className="space-y-3">
                      {avmData.comparables.map((comp: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-900">{comp.address}</div>
                              <div className="text-sm text-gray-600">
                                {comp.sqft?.toLocaleString()} sq ft • {comp.distance} miles away
                              </div>
                              <div className="text-xs text-gray-500">Sold: {comp.soldDate}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">
                                ${comp.soldPrice?.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                ${Math.round(comp.soldPrice / comp.sqft)}/sq ft
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-xs text-gray-500">
                  {avmData.accuracy} • Model Version: {avmData.modelVersion || '2.0'} • 
                  Data Source: {avmData.dataSource === 'real_address' ? 'Real Property Data' : 'Estimated'}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Risk & Investment Data */}
          <div className="space-y-6">
            {/* Risk Data Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Risk Assessment
              </h2>
              {property?.riskData && (
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Wildfire Risk</span>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        property.riskData.cotality.wildfireRiskScore >= 7 ? 'bg-red-500' : 
                        property.riskData.cotality.wildfireRiskScore >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="text-sm font-semibold">{property.riskData.cotality.wildfireRiskScore}/10</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Flood Risk</span>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        property.riskData.cotality.floodRiskScore >= 7 ? 'bg-red-500' : 
                        property.riskData.cotality.floodRiskScore >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="text-sm font-semibold">{property.riskData.cotality.floodRiskScore}/10</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Earthquake Risk</span>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        property.riskData.cotality.earthquakeRiskScore >= 7 ? 'bg-red-500' : 
                        property.riskData.cotality.earthquakeRiskScore >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="text-sm font-semibold">{property.riskData.cotality.earthquakeRiskScore}/10</span>
                    </div>
                  </div>
                </div>

                {/* Insurance Claims */}
                {property.riskData.insuranceClaims.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Insurance Claims History</h3>
                    <div className="space-y-3">
                      {property.riskData.insuranceClaims.map((claim, index) => (
                        <div key={index} className="border-l-4 border-orange-400 pl-4 py-2 bg-orange-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-orange-900">{claim.type}</div>
                              <div className="text-sm text-orange-700">{claim.date}</div>
                              {claim.description && (
                                <div className="text-xs text-orange-600 mt-1">{claim.description}</div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-orange-900">${claim.amount.toLocaleString()}</div>
                              <div className="text-xs text-orange-600">{claim.status}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Risk data provided by Cotality • 
                  <a href={property.riskData.cotality.reportUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline ml-1">
                    View Full Report
                  </a>
                </div>
              </div>
            )}
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
        {/* mlsResults.length > 0 && (
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
        )} */}
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
        {/* permits.length > 0 && (
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
        )} */}
        {/* <div className="section risk">
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
        </div> */}
        <div className="footnote">
          <b>Disclaimer:</b> This report is for informational purposes only. Data may be incomplete or out of date. Always verify with official sources.<br />
          &copy; {new Date().getFullYear()} HOUSE/MAX
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsClient; 