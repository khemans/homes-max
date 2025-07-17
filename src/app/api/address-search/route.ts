import { NextRequest, NextResponse } from 'next/server';
import { allAddresses, searchPropertiesByAddress } from '../../../data/realAddresses';

interface GeocodingResult {
  lat: number;
  lng: number;
  formatted_address: string;
  components: {
    street_number?: string;
    route?: string;
    locality?: string;
    administrative_area_level_1?: string;
    postal_code?: string;
    country?: string;
  };
}

// Geocoding using Nominatim (OpenStreetMap) - Free service
async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodedAddress}`,
      {
        headers: {
          'User-Agent': 'HOUSE-MAX-Property-Search/1.0'
        }
      }
    );
    
    if (!response.ok) {
      console.warn('Geocoding failed:', response.status);
      return null;
    }
    
    const data = await response.json();
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        formatted_address: result.display_name,
        components: {
          street_number: result.address?.house_number,
          route: result.address?.road,
          locality: result.address?.city || result.address?.town || result.address?.village,
          administrative_area_level_1: result.address?.state,
          postal_code: result.address?.postcode,
          country: result.address?.country
        }
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

// Address suggestion matching with fuzzy search
function getAddressSuggestions(query: string, limit: number = 10): Array<{
  fullAddress: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}> {
  const term = query.toLowerCase().trim();
  if (term.length < 2) return [];
  
  const suggestions = allAddresses.filter(addr => {
    const fullAddr = addr.fullAddress.toLowerCase();
    const streetAddr = addr.address.toLowerCase();
    const city = addr.city.toLowerCase();
    const state = addr.state.toLowerCase();
    
    return fullAddr.includes(term) || 
           streetAddr.includes(term) ||
           city.includes(term) ||
           state.includes(term) ||
           addr.zip.includes(term);
  });
  
  // Sort by relevance (exact matches first, then partial matches)
  suggestions.sort((a, b) => {
    const aFull = a.fullAddress.toLowerCase();
    const bFull = b.fullAddress.toLowerCase();
    
    // Exact address match gets highest priority
    if (aFull.startsWith(term) && !bFull.startsWith(term)) return -1;
    if (bFull.startsWith(term) && !aFull.startsWith(term)) return 1;
    
    // City/state matches get medium priority
    if (a.city.toLowerCase().startsWith(term) && !b.city.toLowerCase().startsWith(term)) return -1;
    if (b.city.toLowerCase().startsWith(term) && !a.city.toLowerCase().startsWith(term)) return 1;
    
    return 0;
  });
  
  return suggestions.slice(0, limit);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const validate = searchParams.get('validate') === 'true';
  const suggestions = searchParams.get('suggestions') === 'true';
  
  // Handle address suggestions for autocomplete
  if (suggestions) {
    const suggestionList = getAddressSuggestions(query);
    return NextResponse.json({
      suggestions: suggestionList,
      count: suggestionList.length
    });
  }
  
  // Handle property search in our database
  if (query) {
    const properties = searchPropertiesByAddress(query);
    
    // If we found properties in our database
    if (properties.length > 0) {
      const results = {
        query,
        found: properties.length,
        properties: properties.map(p => p.property),
        database_match: true
      };
      
      // If validation requested, also geocode the first result
      if (validate && properties.length > 0) {
        const firstProperty = properties[0].property;
        const fullAddress = `${firstProperty.address}, ${firstProperty.city}, ${firstProperty.state} ${firstProperty.zip}`;
        const geocoding = await geocodeAddress(fullAddress);
        
        return NextResponse.json({
          ...results,
          geocoding,
          coordinates: firstProperty.coordinates,
          validated: !!geocoding
        });
      }
      
      return NextResponse.json(results);
    }
    
    // If no properties found in database, try geocoding for address validation
    if (validate) {
      const geocoding = await geocodeAddress(query);
      
      return NextResponse.json({
        query,
        found: 0,
        properties: [],
        database_match: false,
        geocoding,
        validated: !!geocoding,
        message: geocoding 
          ? 'Address validated but no property data available in our database'
          : 'Address could not be validated'
      });
    }
    
    // No validation requested and no database matches
    return NextResponse.json({
      query,
      found: 0,
      properties: [],
      database_match: false,
      message: 'No properties found in database'
    });
  }
  
  // No query provided
  return NextResponse.json({
    error: 'No search query provided',
    usage: {
      suggestions: '?q=search_term&suggestions=true',
      search: '?q=search_term',
      validate: '?q=address&validate=true'
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, validate_address = true } = body;
    
    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }
    
    // Search our property database
    const properties = searchPropertiesByAddress(address);
    
    let geocoding = null;
    if (validate_address) {
      geocoding = await geocodeAddress(address);
    }
    
    return NextResponse.json({
      address,
      found: properties.length,
      properties: properties.map(p => p.property),
      geocoding,
      validated: !!geocoding,
      database_match: properties.length > 0
    });
    
  } catch (error) {
    console.error('Address search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 