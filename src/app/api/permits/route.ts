import { NextRequest, NextResponse } from 'next/server';
import { realPropertiesDatabase } from '../../../data/realAddresses';

// Create permit data lookup from our real properties database
const permitDataLookup = new Map();

realPropertiesDatabase.forEach(propertyData => {
  const key = `${propertyData.property.address}, ${propertyData.property.city}, ${propertyData.property.state}`.toLowerCase();
  permitDataLookup.set(key, {
    address: propertyData.property.address,
    city: propertyData.property.city,
    state: propertyData.property.state,
    zip: propertyData.property.zip,
    permits: propertyData.permits
  });
});

// Helper function to find permit data by address
function findPermitsByAddress(searchAddress: string): {
  address: string;
  city: string;
  state: string;
  zip: string;
  permits: Array<{
    type: string;
    year: number;
    status: string;
    permitId: string;
    cost?: number;
    contractor?: string;
    description?: string;
  }>;
} | null {
  const normalizedSearch = searchAddress.toLowerCase().trim();
  
  // Try exact match first
  for (const [key, data] of permitDataLookup) {
    if (key.includes(normalizedSearch)) {
      return data;
    }
  }
  
  // Try partial matches
  for (const [key, data] of permitDataLookup) {
    const parts = normalizedSearch.split(',').map(p => p.trim());
    if (parts.length > 0 && key.includes(parts[0])) {
      return data;
    }
  }
  
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address')?.toLowerCase() || "";

  // If no address provided, return sample permit data
  if (!address) {
    const samplePermits = Array.from(permitDataLookup.values()).slice(0, 5);
    return NextResponse.json({ 
      permits: [],
      message: "No address specified. Here are sample properties with permit data:",
      samples: samplePermits
    });
  }

  // Search for permits using our enhanced search
  const result = findPermitsByAddress(address);
  
  if (result) {
    return NextResponse.json({ 
      permits: result.permits,
      property: {
        address: result.address,
        city: result.city,
        state: result.state,
        zip: result.zip
      },
      total: result.permits.length,
      message: `Found ${result.permits.length} permit records for this property`
    });
  }

  // No permits found - return empty with helpful message
  return NextResponse.json({ 
    permits: [],
    searchedAddress: address,
    message: "No permit records found for this address in our database",
    suggestion: "Try searching with a complete address format: '1001 Sunset Blvd, Los Angeles, CA'"
  });
} 