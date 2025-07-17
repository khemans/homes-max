import { NextRequest, NextResponse } from 'next/server';
import { realPropertiesDatabase } from '../../../data/realAddresses';

// Create risk data lookup from our real properties database
const riskDataLookup = new Map();

realPropertiesDatabase.forEach(propertyData => {
  const key = `${propertyData.property.address}, ${propertyData.property.city}, ${propertyData.property.state}`.toLowerCase();
  riskDataLookup.set(key, propertyData.riskData);
});

// Enhanced default fallback risk data with regional variations
function generateRegionalRiskData(searchTerm: string): {
  insuranceClaims: Array<{
    date: string;
    type: string;
    amount: number;
    status: string;
    description?: string;
  }>;
  fireRisk: {
    score: number;
    lastInspection: string;
    notes: string;
  };
  floodRisk: {
    zone: string;
    riskLevel: string;
    lastFlood: string | null;
  };
  cotality: {
    cotalityPropertyId: string;
    wildfireRiskScore: number;
    floodRiskScore: number;
    earthquakeRiskScore: number;
    reportUrl: string;
  };
} {
  const term = searchTerm.toLowerCase();
  
  // Determine region-specific risk patterns
  let baseRisk = {
    wildfireRiskScore: 4,
    floodRiskScore: 3,
    earthquakeRiskScore: 2,
    fireScore: 4.5,
    floodZone: "A",
    floodRiskLevel: "Moderate"
  };
  
  // California - High wildfire and earthquake risk
  if (term.includes('ca') || term.includes('california') || term.includes('los angeles') || 
      term.includes('san francisco') || term.includes('oakland')) {
    baseRisk = {
      wildfireRiskScore: 8,
      floodRiskScore: 2,
      earthquakeRiskScore: 8,
      fireScore: 7.8,
      floodZone: "X",
      floodRiskLevel: "Low"
    };
  }
  
  // Florida - High flood and hurricane risk
  else if (term.includes('fl') || term.includes('florida') || term.includes('miami') || 
           term.includes('orlando') || term.includes('tampa')) {
    baseRisk = {
      wildfireRiskScore: 1,
      floodRiskScore: 8,
      earthquakeRiskScore: 1,
      fireScore: 2.2,
      floodZone: "AE",
      floodRiskLevel: "High"
    };
  }
  
  // Texas - Moderate wildfire, high wind risk
  else if (term.includes('tx') || term.includes('texas') || term.includes('austin') || 
           term.includes('houston') || term.includes('dallas')) {
    baseRisk = {
      wildfireRiskScore: 6,
      floodRiskScore: 5,
      earthquakeRiskScore: 2,
      fireScore: 5.5,
      floodZone: "A",
      floodRiskLevel: "Moderate"
    };
  }
  
  // New York - Low wildfire, moderate flood risk
  else if (term.includes('ny') || term.includes('new york') || term.includes('manhattan') || 
           term.includes('brooklyn')) {
    baseRisk = {
      wildfireRiskScore: 1,
      floodRiskScore: 5,
      earthquakeRiskScore: 2,
      fireScore: 3.8,
      floodZone: "AE",
      floodRiskLevel: "Moderate"
    };
  }

  return {
    insuranceClaims: [
      { 
        date: "2022-08-15", 
        type: "Water Damage", 
        amount: Math.floor(Math.random() * 15000) + 5000, 
        status: "Paid",
        description: "Storm-related water infiltration"
      },
      { 
        date: "2021-03-10", 
        type: "Wind", 
        amount: Math.floor(Math.random() * 8000) + 2000, 
        status: "Paid",
        description: "High wind damage to exterior"
      }
    ],
    fireRisk: { 
      score: baseRisk.fireScore, 
      lastInspection: "2023-07-15", 
      notes: `${baseRisk.fireScore > 6 ? 'High' : baseRisk.fireScore > 4 ? 'Moderate' : 'Low'} fire risk based on regional patterns and local conditions.`
    },
    floodRisk: { 
      zone: baseRisk.floodZone, 
      riskLevel: baseRisk.floodRiskLevel, 
      lastFlood: baseRisk.floodRiskLevel === "High" ? "2021-09-15" : null
    },
    cotality: {
      cotalityPropertyId: `CL-GEN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      wildfireRiskScore: baseRisk.wildfireRiskScore,
      floodRiskScore: baseRisk.floodRiskScore,
      earthquakeRiskScore: baseRisk.earthquakeRiskScore,
      reportUrl: "https://www.cotality.com/products/underwriting-center"
    }
  };
}

// Helper function to find risk data by address
function findRiskByAddress(searchAddress: string): {
  insuranceClaims: Array<{
    date: string;
    type: string;
    amount: number;
    status: string;
    description?: string;
  }>;
  fireRisk: {
    score: number;
    lastInspection: string;
    notes: string;
  };
  floodRisk: {
    zone: string;
    riskLevel: string;
    lastFlood: string | null;
  };
  cotality: {
    cotalityPropertyId: string;
    wildfireRiskScore: number;
    floodRiskScore: number;
    earthquakeRiskScore: number;
    reportUrl: string;
  };
} {
  const normalizedSearch = searchAddress.toLowerCase().trim();
  
  // Try exact match first
  for (const [key, data] of riskDataLookup) {
    if (key.includes(normalizedSearch)) {
      return data;
    }
  }
  
  // Try partial matches
  for (const [key, data] of riskDataLookup) {
    const parts = normalizedSearch.split(',').map(p => p.trim());
    if (parts.length > 0 && key.includes(parts[0])) {
      return data;
    }
  }
  
  // Return regional-based fallback data
  return generateRegionalRiskData(searchAddress);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = (searchParams.get('address') || '').toLowerCase().trim();
  const city = (searchParams.get('city') || '').toLowerCase().trim();
  const state = (searchParams.get('state') || '').toLowerCase().trim();

  let searchTerm = '';
  if (address && city && state) {
    searchTerm = `${address}, ${city}, ${state}`;
  } else if (address) {
    searchTerm = address;
  }

  // If no search term, return sample risk data
  if (!searchTerm) {
    const sampleRisk = Array.from(riskDataLookup.values()).slice(0, 3);
    return NextResponse.json({
      message: "No address specified. Here are sample risk assessments:",
      samples: sampleRisk,
      usage: {
        byAddress: "/api/risk?address=1001 Sunset Blvd, Los Angeles, CA",
        withParams: "/api/risk?address=1001 Sunset Blvd&city=Los Angeles&state=CA"
      }
    });
  }

  const data = findRiskByAddress(searchTerm);
  
  return NextResponse.json({
    ...data,
    searchTerm,
    dataSource: riskDataLookup.has(searchTerm.toLowerCase()) ? 'database' : 'regional_generated',
    message: data ? "Risk assessment data retrieved successfully" : "Generated regional risk assessment"
  });
} 