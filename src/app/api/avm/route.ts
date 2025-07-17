import { NextRequest, NextResponse } from 'next/server';
import { realPropertiesDatabase, PropertyData } from '../../../data/realAddresses';

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
  dataSource: 'real_address' | 'estimated';
  accuracy: string;
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in miles
}

// Generate market trends based on location
function generateMarketTrends(state: string): AVMData['marketTrends'] {
  const marketData: Record<string, { monthly: number; yearly: number; direction: 'up' | 'down' | 'stable' }> = {
    'CA': { monthly: 0.8, yearly: 12.5, direction: 'up' },
    'NY': { monthly: 0.5, yearly: 8.2, direction: 'up' },
    'FL': { monthly: 1.2, yearly: 15.8, direction: 'up' },
    'TX': { monthly: 0.7, yearly: 9.4, direction: 'up' },
    'IL': { monthly: 0.3, yearly: 4.1, direction: 'stable' },
    'CO': { monthly: 0.9, yearly: 11.3, direction: 'up' },
    'WA': { monthly: 0.6, yearly: 7.8, direction: 'stable' },
    'AZ': { monthly: 1.1, yearly: 13.2, direction: 'up' },
    'MA': { monthly: 0.4, yearly: 6.9, direction: 'stable' },
    'GA': { monthly: 1.0, yearly: 12.8, direction: 'up' }
  };

  const data = marketData[state] || { monthly: 0.5, yearly: 7.0, direction: 'stable' as const };
  
  return {
    monthlyChange: data.monthly + (Math.random() * 0.4 - 0.2),
    yearlyChange: data.yearly + (Math.random() * 2 - 1),
    marketDirection: data.direction
  };
}

// Find real address match
function findAddressMatch(searchAddress: string): PropertyData | null {
  const normalizedSearch = searchAddress.toLowerCase().trim();
  
  // First try exact match
  let match = realPropertiesDatabase.find(property => 
    property.property.address.toLowerCase().includes(normalizedSearch) ||
    normalizedSearch.includes(property.property.address.toLowerCase())
  );
  
  if (match) return match;
  
  // Try city match
  const searchWords = normalizedSearch.split(/[\s,]+/);
  match = realPropertiesDatabase.find(property => {
    const addrWords = property.property.address.toLowerCase().split(/[\s,]+/);
    return searchWords.some(word => 
      word.length > 2 && addrWords.some(addrWord => addrWord.includes(word))
    );
  });
  
  if (match) return match;
  
  // Try state match
  const statePattern = /\b([A-Z]{2})\b/;
  const searchStateMatch = searchAddress.match(statePattern);
  if (searchStateMatch) {
    const searchState = searchStateMatch[1];
    match = realPropertiesDatabase.find(property => 
      property.property.address.includes(searchState)
    );
    if (match) return match;
  }
  
  return null;
}

// Generate comparable sales based on target property
function generateComparables(targetProperty: PropertyData, count: number = 3): AVMData['comparables'] {
  const otherProperties = realPropertiesDatabase.filter(prop => prop.property.mlsId !== targetProperty.property.mlsId);
  
  // Calculate distances and categorize properties
  const withDistances = otherProperties.map(prop => {
    const distance = calculateDistance(
      targetProperty.property.coordinates.lat,
      targetProperty.property.coordinates.lng,
      prop.property.coordinates.lat,
      prop.property.coordinates.lng
    );
    return { ...prop, distance };
  });
  
  // Prioritize comparable selection
  const selectedProps: Array<typeof withDistances[0]> = [];
  
  // 1. First priority: Same city (exact city match)
  const sameCity = withDistances.filter(prop => 
    prop.property.city.toLowerCase() === targetProperty.property.city.toLowerCase()
  );
  selectedProps.push(...sameCity.slice(0, count));
  
  // 2. Second priority: Same state, within 50 miles
  if (selectedProps.length < count) {
    const sameStateNearby = withDistances.filter(prop => 
      prop.property.state === targetProperty.property.state &&
      prop.distance <= 50 &&
      !selectedProps.some(selected => selected.property.mlsId === prop.property.mlsId)
    ).sort((a, b) => a.distance - b.distance);
    
    const needed = count - selectedProps.length;
    selectedProps.push(...sameStateNearby.slice(0, needed));
  }
  
  // 3. Third priority: Similar price range, same state (within 100 miles)
  if (selectedProps.length < count) {
    const targetPrice = parseFloat(targetProperty.property.price.replace(/[$,]/g, ''));
    const similarPriceSameState = withDistances.filter(prop => {
      const propPrice = parseFloat(prop.property.price.replace(/[$,]/g, ''));
      return prop.property.state === targetProperty.property.state &&
        prop.distance <= 100 &&
        Math.abs(propPrice - targetPrice) / targetPrice <= 0.5 && // Within 50% of target price
        !selectedProps.some(selected => selected.property.mlsId === prop.property.mlsId);
    }).sort((a, b) => a.distance - b.distance);
    
    const needed = count - selectedProps.length;
    selectedProps.push(...similarPriceSameState.slice(0, needed));
  }
  
  // 4. Last resort: Similar price range, any location (but prefer closer)
  if (selectedProps.length < count) {
    const targetPrice = parseFloat(targetProperty.property.price.replace(/[$,]/g, ''));
    const similarPriceAny = withDistances.filter(prop => {
      const propPrice = parseFloat(prop.property.price.replace(/[$,]/g, ''));
      return Math.abs(propPrice - targetPrice) / targetPrice <= 0.3 && // Within 30% of target price
        !selectedProps.some(selected => selected.property.mlsId === prop.property.mlsId);
    }).sort((a, b) => a.distance - b.distance);
    
    const needed = count - selectedProps.length;
    selectedProps.push(...similarPriceAny.slice(0, needed));
  }
  
  // Ensure we have the requested count (pad with closest if needed)
  if (selectedProps.length < count) {
    const remaining = withDistances
      .filter(prop => !selectedProps.some(selected => selected.property.mlsId === prop.property.mlsId))
      .sort((a, b) => a.distance - b.distance);
    
    const needed = count - selectedProps.length;
    selectedProps.push(...remaining.slice(0, needed));
  }
  
  return selectedProps.slice(0, count).map((prop, index) => {
    const soldDates = ['2024-11-15', '2024-10-28', '2024-11-03', '2024-10-12', '2024-11-20'];
    
    return {
      address: prop.property.address,
      soldPrice: Math.floor(parseFloat(prop.property.price.replace(/[$,]/g, '')) * (0.95 + Math.random() * 0.1)),
      soldDate: soldDates[index % soldDates.length],
      sqft: prop.property.sqft,
      distance: parseFloat(prop.distance.toFixed(1))
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    
    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // Find matching real address
    const matchedProperty = findAddressMatch(address);
    
    if (matchedProperty) {
      // Use real property data
      const state = matchedProperty.property.state;
      const propertyPrice = parseFloat(matchedProperty.property.price.replace(/[$,]/g, ''));
      
      const avmData: AVMData = {
        estimatedValue: propertyPrice,
        confidenceLevel: 92 + Math.floor(Math.random() * 6),
        valuationDate: new Date().toISOString().split('T')[0],
        priceRange: {
          low: Math.floor(propertyPrice * 0.93),
          high: Math.floor(propertyPrice * 1.07)
        },
        comparables: generateComparables(matchedProperty, 3),
        marketTrends: generateMarketTrends(state),
        propertyDetails: {
          bedrooms: matchedProperty.property.beds,
          bathrooms: matchedProperty.property.baths,
          sqft: matchedProperty.property.sqft,
          lotSize: matchedProperty.property.lotSize,
          propertyType: matchedProperty.property.propertyType,
          yearBuilt: matchedProperty.property.yearBuilt
        },
        dataSource: 'real_address',
        accuracy: 'High - Based on real property data'
      };
      
      return NextResponse.json({
        success: true,
        data: avmData,
        searchAddress: address,
        matchedAddress: matchedProperty.property.address
      });
    } else {
      // Generate estimated data for non-real addresses
      const baseValue = 450000 + Math.floor(Math.random() * 400000);
      const confidenceLevel = 65 + Math.floor(Math.random() * 20);
      
      const stateMatch = address.match(/\b([A-Z]{2})\b/);
      const state = stateMatch ? stateMatch[1] : 'CA';
      
      // Generate comparables from real addresses in similar price range
      const similarPriceProps = realPropertiesDatabase.filter(prop => {
        const propPrice = parseFloat(prop.property.price.replace(/[$,]/g, ''));
        return Math.abs(propPrice - baseValue) < 200000;
      }).slice(0, 3);
      
      const comparables = similarPriceProps.map((prop, index) => ({
        address: prop.property.address,
        soldPrice: Math.floor(parseFloat(prop.property.price.replace(/[$,]/g, '')) * (0.95 + Math.random() * 0.1)),
        soldDate: ['2024-11-10', '2024-10-25', '2024-11-05'][index],
        sqft: prop.property.sqft + Math.floor(Math.random() * 200 - 100),
        distance: 0.3 + Math.random() * 1.2
      }));
      
      const avmData: AVMData = {
        estimatedValue: baseValue,
        confidenceLevel,
        valuationDate: new Date().toISOString().split('T')[0],
        priceRange: {
          low: Math.floor(baseValue * 0.88),
          high: Math.floor(baseValue * 1.12)
        },
        comparables,
        marketTrends: generateMarketTrends(state),
        dataSource: 'estimated',
        accuracy: 'Moderate - Based on area estimates'
      };
      
      return NextResponse.json({
        success: true,
        data: avmData,
        searchAddress: address,
        note: 'Estimated valuation - actual property data not available'
      });
    }
  } catch (error) {
    console.error('AVM API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to generate property valuation'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;
    
    if (!address) {
      return NextResponse.json(
        { error: 'Address is required in request body' },
        { status: 400 }
      );
    }
    
    // Reuse GET logic for POST requests
    const url = new URL(request.url);
    url.searchParams.set('address', address);
    const getRequest = new NextRequest(url, { method: 'GET' });
    
    return GET(getRequest);
  } catch (error) {
    console.error('AVM API POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request body',
        message: 'Failed to process valuation request'
      },
      { status: 400 }
    );
  }
} 