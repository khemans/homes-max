import { NextRequest, NextResponse } from 'next/server';

// Types for public records data
interface PublicRecordsResponse {
  success: boolean;
  data?: PropertyPublicRecords;
  sources: string[];
  error?: string;
}

interface PropertyPublicRecords {
  basic: BasicPropertyInfo;
  assessment?: AssessmentData;
  ownership?: OwnershipData;
  sales?: SalesHistory[];
  permits?: PermitData[];
  flood?: FloodData;
  demographics?: DemographicsData;
  sources: {
    [key: string]: {
      status: 'success' | 'error' | 'unavailable';
      data?: any;
      error?: string;
    };
  };
}

interface BasicPropertyInfo {
  address: string;
  parcelId?: string;
  propertyType?: string;
  yearBuilt?: number;
  sqft?: number;
  lotSize?: number;
  beds?: number;
  baths?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface AssessmentData {
  assessedValue?: number;
  marketValue?: number;
  landValue?: number;
  improvementValue?: number;
  assessmentYear?: number;
  taxAmount?: number;
  taxRate?: number;
  exemptions?: string[];
}

interface OwnershipData {
  ownerName?: string;
  ownerType?: string;
  mailingAddress?: string;
  ownerOccupied?: boolean;
  acquisitionDate?: string;
  acquisitionPrice?: number;
}

interface SalesHistory {
  date: string;
  price: number;
  pricePerSqft?: number;
  recordingNumber?: string;
  deedType?: string;
  grantee?: string;
  grantor?: string;
}

interface PermitData {
  permitNumber: string;
  permitType: string;
  description: string;
  issuedDate: string;
  value?: number;
  status: string;
  contractor?: string;
}

interface FloodData {
  floodZone?: string;
  floodRisk?: string;
  baseFloodElevation?: number;
  firmPanel?: string;
}

interface DemographicsData {
  medianHouseholdIncome?: number;
  medianHomeValue?: number;
  populationDensity?: number;
  averageAge?: number;
  crimeRate?: number;
  walkabilityScore?: number;
}

// Free API integrations
class PublicRecordsService {
  private readonly TIMEOUT = 10000; // 10 seconds

  // 1. Geocoding service (free tier)
  async geocodeAddress(address: string): Promise<{lat: number, lng: number} | null> {
    try {
      // Using OpenStreetMap Nominatim (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=us`,
        {
          headers: {
            'User-Agent': 'HouseMax-PropertySearch/1.0'
          },
          signal: AbortSignal.timeout(this.TIMEOUT)
        }
      );

      if (!response.ok) return null;

      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  }

  // 2. US Census Bureau API (free)
  async getCensusData(lat: number, lng: number): Promise<Partial<DemographicsData>> {
    try {
      // Get FIPS codes first
      const geoResponse = await fetch(
        `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${lng}&y=${lat}&benchmark=2020&vintage=2020&format=json`,
        { signal: AbortSignal.timeout(this.TIMEOUT) }
      );

      if (!geoResponse.ok) return {};

      const geoData = await geoResponse.json();
      const county = geoData.result?.geographies?.['2020 Census Blocks']?.[0]?.COUNTY;
      const state = geoData.result?.geographies?.['2020 Census Blocks']?.[0]?.STATE;
      const tract = geoData.result?.geographies?.['2020 Census Blocks']?.[0]?.TRACT;

      if (!county || !state || !tract) return {};

      // Get ACS data (American Community Survey)
      const acsResponse = await fetch(
        `https://api.census.gov/data/2022/acs/acs5?get=B19013_001E,B25077_001E,B01003_001E,B25001_001E&for=tract:${tract}&in=state:${state}%20county:${county}`,
        { signal: AbortSignal.timeout(this.TIMEOUT) }
      );

      if (!acsResponse.ok) return {};

      const acsData = await acsResponse.json();
      if (acsData && acsData.length > 1) {
        const [medianIncome, medianHomeValue, population, housingUnits] = acsData[1];
        
        return {
          medianHouseholdIncome: medianIncome ? parseInt(medianIncome) : undefined,
          medianHomeValue: medianHomeValue ? parseInt(medianHomeValue) : undefined,
          populationDensity: population && housingUnits ? Math.round(parseInt(population) / parseInt(housingUnits)) : undefined
        };
      }
    } catch (error) {
      console.error('Census data error:', error);
    }
    return {};
  }

  // 3. FEMA Flood Maps API (free)
  async getFloodData(lat: number, lng: number): Promise<Partial<FloodData>> {
    try {
      const response = await fetch(
        `https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/identify?` +
        `geometry=${lng},${lat}&geometryType=esriGeometryPoint&sr=4326&layers=all&tolerance=1&returnGeometry=false&f=json`,
        { signal: AbortSignal.timeout(this.TIMEOUT) }
      );

      if (!response.ok) return {};

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const floodInfo = data.results[0].attributes;
        return {
          floodZone: floodInfo.FLD_ZONE || floodInfo.ZONE_SUBTY,
          floodRisk: this.interpretFloodZone(floodInfo.FLD_ZONE),
          firmPanel: floodInfo.FIRM_PAN
        };
      }
    } catch (error) {
      console.error('Flood data error:', error);
    }
    return {};
  }

  // 4. Property tax data from local assessor APIs (where available)
  async getPropertyTaxData(address: string, coordinates?: {lat: number, lng: number}): Promise<Partial<AssessmentData>> {
    try {
      // This is a simplified example - in practice, you'd need to implement
      // specific APIs for different counties/states
      
      // For demonstration, using a mock response based on location
      if (coordinates) {
        const { lat, lng } = coordinates;
        
        // California example (many counties have open data)
        if (lat > 32 && lat < 42 && lng > -124 && lng < -114) {
          return {
            assessedValue: 850000 + Math.random() * 500000,
            landValue: 400000 + Math.random() * 200000,
            improvementValue: 450000 + Math.random() * 300000,
            assessmentYear: 2024,
            taxRate: 1.25,
            taxAmount: 12500
          };
        }
        
        // Texas example
        if (lat > 25 && lat < 37 && lng > -107 && lng < -93) {
          return {
            assessedValue: 650000 + Math.random() * 400000,
            landValue: 300000 + Math.random() * 150000,
            improvementValue: 350000 + Math.random() * 250000,
            assessmentYear: 2024,
            taxRate: 2.1,
            taxAmount: 15400
          };
        }
      }
    } catch (error) {
      console.error('Property tax data error:', error);
    }
    return {};
  }

  // 5. Building permits (many cities have open data APIs)
  async getBuildingPermits(address: string, coordinates?: {lat: number, lng: number}): Promise<PermitData[]> {
    try {
      // This would integrate with city-specific open data APIs
      // Many major cities provide free access to permit data
      
      // Mock data for demonstration
      const permits: PermitData[] = [
        {
          permitNumber: `BLD-${Date.now().toString().slice(-6)}`,
          permitType: 'Building',
          description: 'Kitchen renovation',
          issuedDate: '2024-03-15',
          value: 45000,
          status: 'Approved',
          contractor: 'ABC Construction LLC'
        },
        {
          permitNumber: `ELE-${Date.now().toString().slice(-6)}`,
          permitType: 'Electrical',
          description: 'Panel upgrade to 200 amp',
          issuedDate: '2023-11-20',
          value: 8500,
          status: 'Finaled',
          contractor: 'Elite Electric Co'
        }
      ];
      
      return permits;
    } catch (error) {
      console.error('Building permits error:', error);
    }
    return [];
  }

  // 6. Crime data (many cities provide open crime data APIs)
  async getCrimeData(lat: number, lng: number): Promise<{crimeRate?: number}> {
    try {
      // This would integrate with local police department APIs
      // Many cities provide free crime data APIs
      
      // Mock calculation for demonstration
      const urbanityFactor = Math.abs(lat - 40) + Math.abs(lng + 95); // Distance from geographic center
      const crimeRate = Math.max(1, Math.min(10, Math.round(urbanityFactor * 2 + Math.random() * 3)));
      
      return { crimeRate };
    } catch (error) {
      console.error('Crime data error:', error);
    }
    return {};
  }

  // 7. Walk Score API (has free tier)
  async getWalkabilityScore(address: string): Promise<{walkabilityScore?: number}> {
    try {
      // Note: Walk Score API requires registration but has a free tier
      // For demo purposes, calculating a mock score
      
      const cityWalkScores: {[key: string]: number} = {
        'new york': 85,
        'san francisco': 88,
        'boston': 82,
        'chicago': 75,
        'seattle': 70,
        'los angeles': 65,
        'miami': 60,
        'denver': 55
      };
      
      const cityName = address.toLowerCase();
      for (const [city, score] of Object.entries(cityWalkScores)) {
        if (cityName.includes(city)) {
          return { walkabilityScore: score + Math.round(Math.random() * 10 - 5) };
        }
      }
      
      // Default suburban score
      return { walkabilityScore: 45 + Math.round(Math.random() * 20) };
    } catch (error) {
      console.error('Walkability score error:', error);
    }
    return {};
  }

  private interpretFloodZone(zone?: string): string {
    if (!zone) return 'Unknown';
    
    const highRiskZones = ['A', 'AE', 'AH', 'AO', 'AR', 'V', 'VE'];
    const moderateRiskZones = ['X500', 'B', 'X'];
    
    if (highRiskZones.includes(zone)) return 'High';
    if (moderateRiskZones.includes(zone)) return 'Low to Moderate';
    if (zone === 'X' || zone === 'C') return 'Minimal';
    
    return 'Unknown';
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    
    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const service = new PublicRecordsService();
    const sources: {[key: string]: any} = {};
    
    // Start with geocoding
    const coordinates = await service.geocodeAddress(address);
    sources.geocoding = {
      status: coordinates ? 'success' : 'error',
      data: coordinates,
      error: coordinates ? undefined : 'Could not geocode address'
    };

    // Parallel data fetching for performance
    const dataPromises = [];
    
    if (coordinates) {
      dataPromises.push(
        service.getCensusData(coordinates.lat, coordinates.lng)
          .then(data => ({ source: 'census', data }))
          .catch(error => ({ source: 'census', error: error.message }))
      );
      
      dataPromises.push(
        service.getFloodData(coordinates.lat, coordinates.lng)
          .then(data => ({ source: 'flood', data }))
          .catch(error => ({ source: 'flood', error: error.message }))
      );
      
      dataPromises.push(
        service.getPropertyTaxData(address, coordinates || undefined)
          .then(data => ({ source: 'tax', data }))
          .catch(error => ({ source: 'tax', error: error.message }))
      );
      
      dataPromises.push(
        service.getCrimeData(coordinates.lat, coordinates.lng)
          .then(data => ({ source: 'crime', data }))
          .catch(error => ({ source: 'crime', error: error.message }))
      );
    }
    
    dataPromises.push(
      service.getBuildingPermits(address, coordinates || undefined)
        .then(data => ({ source: 'permits', data }))
        .catch(error => ({ source: 'permits', error: error.message }))
    );
    
    dataPromises.push(
      service.getWalkabilityScore(address)
        .then(data => ({ source: 'walkability', data }))
        .catch(error => ({ source: 'walkability', error: error.message }))
    );

    // Wait for all data sources with timeout
    const results = await Promise.allSettled(dataPromises);
    
    // Process results
    let demographics: DemographicsData = {};
    let assessment: AssessmentData = {};
    let flood: FloodData = {};
    let permits: PermitData[] = [];
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { source, data, error } = result.value as any;
        
        sources[source] = {
          status: error ? 'error' : 'success',
          data: error ? undefined : data,
          error
        };
        
        if (!error && data) {
          switch (source) {
            case 'census':
              demographics = { ...demographics, ...data };
              break;
            case 'flood':
              flood = { ...flood, ...data };
              break;
            case 'tax':
              assessment = { ...assessment, ...data };
              break;
            case 'crime':
              demographics = { ...demographics, ...data };
              break;
            case 'permits':
              permits = Array.isArray(data) ? data : [];
              break;
            case 'walkability':
              demographics = { ...demographics, ...data };
              break;
          }
        }
      }
    });

    // Build comprehensive response
    const publicRecords: PropertyPublicRecords = {
      basic: {
        address,
        coordinates: coordinates || undefined
      },
      assessment: Object.keys(assessment).length > 0 ? assessment : undefined,
      ownership: undefined, // Would be populated by additional APIs
      sales: undefined, // Would be populated by MLS or county records
      permits: permits.length > 0 ? permits : undefined,
      flood: Object.keys(flood).length > 0 ? flood : undefined,
      demographics: Object.keys(demographics).length > 0 ? demographics : undefined,
      sources
    };

    const response: PublicRecordsResponse = {
      success: true,
      data: publicRecords,
      sources: Object.keys(sources)
    };

    const processingTime = Date.now() - startTime;
    
    // Add performance headers
    const headers = new Headers();
    headers.set('X-Processing-Time', `${processingTime}ms`);
    headers.set('X-Data-Sources', Object.keys(sources).join(','));
    
    return NextResponse.json(response, { headers });
    
  } catch (error) {
    console.error('Public records API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        sources: []
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { addresses } = body;
    
    if (!Array.isArray(addresses) || addresses.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Addresses array is required' },
        { status: 400 }
      );
    }
    
    if (addresses.length > 10) {
      return NextResponse.json(
        { success: false, error: 'Maximum 10 addresses per batch request' },
        { status: 400 }
      );
    }
    
    // Process multiple addresses in parallel
    const promises = addresses.map(async (address: string) => {
      const url = new URL('/api/public-records', request.url);
      url.searchParams.set('address', address);
      
      const getRequest = new NextRequest(url, { method: 'GET' });
      const response = await GET(getRequest);
      return response.json();
    });
    
    const results = await Promise.allSettled(promises);
    
    const batchResults = results.map((result, index) => ({
      address: addresses[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason.message : null
    }));
    
    return NextResponse.json({
      success: true,
      results: batchResults,
      processedCount: addresses.length,
      successCount: batchResults.filter(r => r.success).length
    });
    
  } catch (error) {
    console.error('Public records batch API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request format'
      },
      { status: 400 }
    );
  }
} 