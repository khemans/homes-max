// Utility for generating dynamic county parcel page links
// Each county has different URL structures and search parameters

interface ParcelLinkConfig {
  countyName: string;
  baseUrl: string;
  searchPath: string;
  addressParam: string;
  additionalParams?: Record<string, string>;
  searchType: 'address' | 'parcel' | 'owner';
  instructions?: string;
}

// Major county parcel search configurations
const COUNTY_CONFIGS: Record<string, ParcelLinkConfig> = {
  // Colorado Counties
  'denver-co': {
    countyName: 'City and County of Denver',
    baseUrl: 'https://www.denvergov.org',
    searchPath: '/property/assessor-real-property-search',
    addressParam: 'address',
    searchType: 'address',
    instructions: 'Search by property address'
  },
  'jefferson-co': {
    countyName: 'Jefferson County',
    baseUrl: 'https://jeffco.us',
    searchPath: '/1187/Property-Search',
    addressParam: 'address',
    searchType: 'address'
  },
  'arapahoe-co': {
    countyName: 'Arapahoe County',
    baseUrl: 'https://www.arapahoegov.com',
    searchPath: '/291/Property-Search',
    addressParam: 'address',
    searchType: 'address'
  },
  
  // California Counties
  'los-angeles-ca': {
    countyName: 'Los Angeles County',
    baseUrl: 'https://portal.assessor.lacounty.gov',
    searchPath: '/parceldetail',
    addressParam: 'address',
    searchType: 'address',
    instructions: 'LA County Assessor Portal'
  },
  'orange-ca': {
    countyName: 'Orange County',
    baseUrl: 'https://ac.ocgov.com',
    searchPath: '/propsearch',
    addressParam: 'address',
    searchType: 'address'
  },
  'san-diego-ca': {
    countyName: 'San Diego County',
    baseUrl: 'https://arcc.sdcounty.ca.gov',
    searchPath: '/search/property',
    addressParam: 'address',
    searchType: 'address'
  },
  
  // Massachusetts Counties  
  'middlesex-ma': {
    countyName: 'Middlesex County',
    baseUrl: 'https://www.middlesexregistry.com',
    searchPath: '/property-search',
    addressParam: 'address',
    searchType: 'address'
  },
  'suffolk-ma': {
    countyName: 'Suffolk County (Boston)',
    baseUrl: 'https://www.boston.gov',
    searchPath: '/departments/assessing/property-assessment-search',
    addressParam: 'address',
    searchType: 'address'
  },
  
  // Texas Counties
  'harris-tx': {
    countyName: 'Harris County',
    baseUrl: 'https://hcad.org',
    searchPath: '/property-search/',
    addressParam: 'address',
    searchType: 'address'
  },
  'dallas-tx': {
    countyName: 'Dallas County',
    baseUrl: 'https://www.dallascad.org',
    searchPath: '/property-search',
    addressParam: 'address',
    searchType: 'address'
  },
  
  // Florida Counties
  'miami-dade-fl': {
    countyName: 'Miami-Dade County',
    baseUrl: 'https://www.miamidade.gov',
    searchPath: '/pa/property_search.asp',
    addressParam: 'address',
    searchType: 'address'
  },
  'broward-fl': {
    countyName: 'Broward County',
    baseUrl: 'https://bcpa.net',
    searchPath: '/property-search',
    addressParam: 'address',
    searchType: 'address'
  },
  
  // New York Counties
  'new-york-ny': {
    countyName: 'New York County (Manhattan)',
    baseUrl: 'https://a836-acris.nyc.gov',
    searchPath: '/bblsearch/bblsearch.asp',
    addressParam: 'address',
    searchType: 'address'
  },
  'kings-ny': {
    countyName: 'Kings County (Brooklyn)',
    baseUrl: 'https://a836-acris.nyc.gov',
    searchPath: '/bblsearch/bblsearch.asp',
    addressParam: 'address',
    searchType: 'address'
  }
};

// City to county mapping for major cities
const CITY_COUNTY_MAP: Record<string, string> = {
  'denver': 'denver-co',
  'aurora': 'arapahoe-co',
  'lakewood': 'jefferson-co',
  'thornton': 'adams-co',
  'westminster': 'jefferson-co',
  
  'los angeles': 'los-angeles-ca',
  'santa monica': 'los-angeles-ca',
  'beverly hills': 'los-angeles-ca',
  'pasadena': 'los-angeles-ca',
  'anaheim': 'orange-ca',
  'irvine': 'orange-ca',
  'san diego': 'san-diego-ca',
  
  'boston': 'suffolk-ma',
  'cambridge': 'middlesex-ma',
  'somerville': 'middlesex-ma',
  'newton': 'middlesex-ma',
  
  'houston': 'harris-tx',
  'dallas': 'dallas-tx',
  'plano': 'dallas-tx',
  'irving': 'dallas-tx',
  
  'miami': 'miami-dade-fl',
  'miami beach': 'miami-dade-fl',
  'fort lauderdale': 'broward-fl',
  'hollywood': 'broward-fl',
  
  'new york': 'new-york-ny',
  'manhattan': 'new-york-ny',
  'brooklyn': 'kings-ny',
  'queens': 'queens-ny',
  'bronx': 'bronx-ny'
};

interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zip?: string;
}

interface ParcelLink {
  url: string;
  displayText: string;
  countyName: string;
  instructions?: string;
  available: boolean;
}

/**
 * Generate a direct link to the county parcel page for a property
 */
export function generateParcelLink(property: PropertyLocation): ParcelLink {
  const cityKey = property.city.toLowerCase().trim();
  const stateKey = property.state.toLowerCase().trim();
  const cityStateKey = `${cityKey}-${stateKey}`;
  
  // Try to find county configuration
  let countyConfig = COUNTY_CONFIGS[cityStateKey];
  
  // If not found, try city mapping
  if (!countyConfig && CITY_COUNTY_MAP[cityKey]) {
    countyConfig = COUNTY_CONFIGS[CITY_COUNTY_MAP[cityKey]];
  }
  
  if (!countyConfig) {
    // Return a fallback search link
    return {
      url: `https://www.google.com/search?q="${property.address}"+${property.city}+${property.state}+county+assessor+parcel`,
      displayText: `Search ${property.city} County Records`,
      countyName: `${property.city} County`,
      instructions: 'Generic search - manually navigate to county assessor',
      available: false
    };
  }
  
  // Build the URL with address parameter
  const searchUrl = new URL(countyConfig.searchPath, countyConfig.baseUrl);
  
  // Add address parameter
  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip || ''}`.trim();
  searchUrl.searchParams.set(countyConfig.addressParam, fullAddress);
  
  // Add any additional parameters
  if (countyConfig.additionalParams) {
    Object.entries(countyConfig.additionalParams).forEach(([key, value]) => {
      searchUrl.searchParams.set(key, value);
    });
  }
  
  return {
    url: searchUrl.toString(),
    displayText: `View ${countyConfig.countyName} Records`,
    countyName: countyConfig.countyName,
    instructions: countyConfig.instructions,
    available: true
  };
}

/**
 * Get a generic county search link when specific configuration is not available
 */
export function getGenericCountySearch(property: PropertyLocation): string {
  return `https://www.google.com/search?q="${property.address}"+${property.city}+${property.state}+county+assessor+property+records`;
}

/**
 * Check if a county parcel link is available for a location
 */
export function isParcelLinkAvailable(city: string, state: string): boolean {
  const cityKey = city.toLowerCase().trim();
  const stateKey = state.toLowerCase().trim();
  const cityStateKey = `${cityKey}-${stateKey}`;
  
  return !!(COUNTY_CONFIGS[cityStateKey] || (CITY_COUNTY_MAP[cityKey] && COUNTY_CONFIGS[CITY_COUNTY_MAP[cityKey]]));
}

/**
 * Get all supported counties/cities
 */
export function getSupportedLocations(): Array<{city: string, state: string, county: string}> {
  const locations: Array<{city: string, state: string, county: string}> = [];
  
  Object.entries(CITY_COUNTY_MAP).forEach(([city, countyKey]) => {
    const county = COUNTY_CONFIGS[countyKey];
    if (county) {
      const state = countyKey.split('-').pop()?.toUpperCase() || '';
      locations.push({
        city: city.charAt(0).toUpperCase() + city.slice(1),
        state,
        county: county.countyName
      });
    }
  });
  
  return locations;
} 