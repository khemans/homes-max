import { NextRequest, NextResponse } from 'next/server';
import { realPropertiesDatabase, searchPropertiesByAddress } from '../../../data/realAddresses';

// Convert our real properties database to MLS format
const mockMLSData = realPropertiesDatabase.map(propertyData => ({
  address: propertyData.property.address,
  city: propertyData.property.city,
  state: propertyData.property.state,
  zip: propertyData.property.zip,
  price: propertyData.property.price,
  beds: propertyData.property.beds,
  baths: propertyData.property.baths,
  sqft: propertyData.property.sqft,
  status: propertyData.property.status,
  mlsId: propertyData.property.mlsId,
  salesPitch: propertyData.property.salesPitch,
  yearBuilt: propertyData.property.yearBuilt,
  lotSize: propertyData.property.lotSize,
  propertyType: propertyData.property.propertyType,
  coordinates: propertyData.property.coordinates
}));

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address')?.toLowerCase() || "";
  const query = searchParams.get('query')?.toLowerCase() || "";

  // Use either address or query parameter
  const searchTerm = address || query;

  // If no search term provided, return all properties
  if (!searchTerm) {
    return NextResponse.json({ 
      results: mockMLSData,
      total: mockMLSData.length,
      message: "Showing all available properties with real addresses from major US cities"
    });
  }

  // Use our enhanced search function
  const propertyResults = searchPropertiesByAddress(searchTerm);
  const results = propertyResults.map(p => p.property);

  // If no results from our enhanced search, fall back to basic filtering
  if (results.length === 0) {
    const fallbackResults = mockMLSData.filter((item) => {
      const fullAddress = `${item.address}, ${item.city}, ${item.state} ${item.zip}`.toLowerCase();
      
      // Check if search term matches any part of the address
      if (fullAddress.includes(searchTerm)) {
        return true;
      }
      
      // Also check individual fields for better matching
      if (item.city.toLowerCase().includes(searchTerm) || 
          item.state.toLowerCase().includes(searchTerm) ||
          item.address.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    });

    return NextResponse.json({ 
      results: fallbackResults,
      total: fallbackResults.length,
      searchTerm,
      searchType: 'fallback_filter'
    });
  }

  return NextResponse.json({ 
    results,
    total: results.length,
    searchTerm,
    searchType: 'enhanced_search',
    message: `Found ${results.length} properties matching "${searchTerm}"`
  });
} 