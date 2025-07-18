// Permit search links by city/county
export interface PermitLink {
  name: string;
  url: string;
  description?: string;
}

export const PERMIT_LINKS: Record<string, PermitLink[]> = {
  "san francisco": [
    { 
      name: "SF DBI Permit Search", 
      url: "https://sfdbi.org/permits",
      description: "San Francisco Department of Building Inspection permit database"
    },
    { 
      name: "SF Planning Department", 
      url: "https://sfplanning.org/permits",
      description: "Planning permits and zoning information"
    }
  ],
  "oakland": [
    { 
      name: "Oakland Permit Center", 
      url: "https://aca.accela.com/oakland",
      description: "Oakland building permits and code enforcement"
    }
  ],
  "los angeles": [
    { 
      name: "LA Building & Safety", 
      url: "https://www.ladbs.org/services/online-services/permit-search",
      description: "Los Angeles Department of Building and Safety"
    }
  ],
  "denver": [
    { 
      name: "Denver Permits & Inspections", 
      url: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Community-Planning-and-Development/Building-Permits-and-Inspections",
      description: "Denver building permits and inspections"
    }
  ],
  "chicago": [
    { 
      name: "Chicago Building Permits", 
      url: "https://www.chicago.gov/city/en/depts/bldgs/supp_info/building_permits.html",
      description: "Chicago Department of Buildings permit search"
    }
  ],
  "new york": [
    { 
      name: "NYC DOB NOW", 
      url: "https://www1.nyc.gov/site/buildings/index.page",
      description: "New York City Department of Buildings"
    }
  ],
  "phoenix": [
    { 
      name: "Phoenix Development Services", 
      url: "https://www.phoenix.gov/development",
      description: "Phoenix building permits and development services"
    }
  ],
  "austin": [
    { 
      name: "Austin Development Services", 
      url: "https://www.austintexas.gov/department/development-services",
      description: "Austin building permits and code compliance"
    }
  ]
};

// Helper function to get permit links for an address
export const getPermitLinks = (address: string): PermitLink[] => {
  if (!address) return [];
  
  const lower = address.toLowerCase();
  
  // Find matching city/county
  for (const [location, links] of Object.entries(PERMIT_LINKS)) {
    if (lower.includes(location)) {
      return links;
    }
  }
  
  return [];
};

// Get all available locations
export const getAvailableLocations = (): string[] => {
  return Object.keys(PERMIT_LINKS);
};

// Add a new permit link for a location
export const addPermitLink = (location: string, link: PermitLink): void => {
  const normalizedLocation = location.toLowerCase();
  if (!PERMIT_LINKS[normalizedLocation]) {
    PERMIT_LINKS[normalizedLocation] = [];
  }
  PERMIT_LINKS[normalizedLocation].push(link);
}; 