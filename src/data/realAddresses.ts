// Real Address Database with Comprehensive Mock Data
// Using actual addresses from major US cities with realistic property data

export interface Property {
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
  yearBuilt: number;
  lotSize: string;
  propertyType: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PermitRecord {
  type: string;
  year: number;
  status: string;
  permitId: string;
  cost?: number;
  contractor?: string;
  description?: string;
}

export interface InsuranceClaim {
  date: string;
  type: string;
  amount: number;
  status: string;
  description?: string;
}

export interface RiskData {
  insuranceClaims: InsuranceClaim[];
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
}

export interface PropertyData {
  property: Property;
  permits: PermitRecord[];
  riskData: RiskData;
}

export const realPropertiesDatabase: PropertyData[] = [
  // Los Angeles, California
  {
    property: {
      address: "1001 Sunset Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90026",
      price: "$1,250,000",
      beds: 4,
      baths: 3,
      sqft: 2400,
      status: "Active",
      mlsId: "MLS-LA-001",
      salesPitch: "Stunning 4-bedroom home in prime Silver Lake location! Completely renovated with modern finishes, chef's kitchen, and panoramic city views. Walk to trendy restaurants and shops.",
      yearBuilt: 1965,
      lotSize: "0.15 acres",
      propertyType: "Single Family",
      coordinates: { lat: 34.0778, lng: -118.2608 }
    },
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "LA-2023-001", cost: 45000, contractor: "Elite Renovations", description: "Complete kitchen renovation with new appliances" },
      { type: "Solar Panel Install", year: 2022, status: "Finaled", permitId: "LA-2022-015", cost: 25000, contractor: "SolarTech LA", description: "20-panel solar system installation" },
      { type: "Electrical Upgrade", year: 2021, status: "Finaled", permitId: "LA-2021-089", cost: 8000, contractor: "ABC Electric", description: "Electrical panel upgrade to 200 amp" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-01-15", type: "Earthquake", amount: 15000, status: "Paid", description: "Minor structural damage from 4.2 earthquake" },
        { date: "2020-08-10", type: "Fire", amount: 8000, status: "Paid", description: "Wildfire smoke damage to exterior" }
      ],
      fireRisk: { score: 8.5, lastInspection: "2023-06-15", notes: "High wildfire risk due to proximity to hills and dry vegetation" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-LA-1001",
        wildfireRiskScore: 9,
        floodRiskScore: 2,
        earthquakeRiskScore: 8,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },
  
  // New York, New York
  {
    property: {
      address: "123 E 79th St",
      city: "New York",
      state: "NY",
      zip: "10075",
      price: "$2,850,000",
      beds: 3,
      baths: 2,
      sqft: 1800,
      status: "Active",
      mlsId: "MLS-NY-002",
      salesPitch: "Elegant pre-war cooperative on the prestigious Upper East Side! High ceilings, original hardwood floors, and stunning Central Park views. Prime location near world-class museums.",
      yearBuilt: 1925,
      lotSize: "Co-op",
      propertyType: "Condo",
      coordinates: { lat: 40.7748, lng: -73.9586 }
    },
    permits: [
      { type: "Bathroom Renovation", year: 2023, status: "Approved", permitId: "NYC-2023-1247", cost: 35000, contractor: "Manhattan Bath Co", description: "Master bathroom complete renovation" },
      { type: "Window Replacement", year: 2022, status: "Finaled", permitId: "NYC-2022-3456", cost: 18000, contractor: "Elite Windows NYC", description: "Replace all windows with energy-efficient models" },
      { type: "HVAC Upgrade", year: 2021, status: "Finaled", permitId: "NYC-2021-7890", cost: 12000, contractor: "NYC Climate Control", description: "Install central air conditioning system" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2021-09-02", type: "Water Damage", amount: 25000, status: "Paid", description: "Hurricane Ida flooding in basement storage" },
        { date: "2019-07-15", type: "Theft", amount: 5000, status: "Paid", description: "Burglary of personal items" }
      ],
      fireRisk: { score: 3.2, lastInspection: "2023-08-10", notes: "Low fire risk, modern building with sprinkler system" },
      floodRisk: { zone: "AE", riskLevel: "Moderate", lastFlood: "2021-09-02" },
      cotality: {
        cotalityPropertyId: "CL-NY-0123",
        wildfireRiskScore: 1,
        floodRiskScore: 6,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Miami, Florida
  {
    property: {
      address: "456 Ocean Dr",
      city: "Miami Beach",
      state: "FL",
      zip: "33139",
      price: "$3,200,000",
      beds: 2,
      baths: 2,
      sqft: 1600,
      status: "Pending",
      mlsId: "MLS-FL-003",
      salesPitch: "Spectacular oceanfront condo in the heart of South Beach! Floor-to-ceiling windows, private balcony with ocean views, and access to luxury amenities. Steps from world-famous beaches and nightlife.",
      yearBuilt: 2018,
      lotSize: "Condo",
      propertyType: "Condo",
      coordinates: { lat: 25.7814, lng: -80.1302 }
    },
    permits: [
      { type: "Hurricane Shutters", year: 2023, status: "Finaled", permitId: "MIA-2023-0789", cost: 15000, contractor: "Storm Guard FL", description: "Install impact-resistant hurricane shutters" },
      { type: "Balcony Repair", year: 2022, status: "Finaled", permitId: "MIA-2022-1456", cost: 8000, contractor: "Coastal Repairs", description: "Repair balcony railing and waterproofing" },
      { type: "AC Replacement", year: 2021, status: "Finaled", permitId: "MIA-2021-2345", cost: 6000, contractor: "Cool Breeze HVAC", description: "Replace central air conditioning unit" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-09-28", type: "Hurricane", amount: 45000, status: "Paid", description: "Hurricane Ian wind and water damage" },
        { date: "2020-08-15", type: "Water Damage", amount: 12000, status: "Paid", description: "Plumbing leak in unit above" }
      ],
      fireRisk: { score: 2.1, lastInspection: "2023-09-05", notes: "Very low fire risk, modern high-rise with advanced safety systems" },
      floodRisk: { zone: "VE", riskLevel: "Very High", lastFlood: "2022-09-28" },
      cotality: {
        cotalityPropertyId: "CL-FL-0456",
        wildfireRiskScore: 1,
        floodRiskScore: 9,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Chicago, Illinois
  {
    property: {
      address: "789 N Lake Shore Dr",
      city: "Chicago",
      state: "IL",
      zip: "60611",
      price: "$1,850,000",
      beds: 3,
      baths: 3,
      sqft: 2200,
      status: "Active",
      mlsId: "MLS-IL-004",
      salesPitch: "Luxury high-rise living with breathtaking Lake Michigan views! Modern finishes, granite countertops, and floor-to-ceiling windows. Building amenities include pool, gym, and 24-hour concierge.",
      yearBuilt: 2005,
      lotSize: "Condo",
      propertyType: "Condo",
      coordinates: { lat: 41.8976, lng: -87.6205 }
    },
    permits: [
      { type: "Kitchen Renovation", year: 2023, status: "In Review", permitId: "CHI-2023-4567", cost: 55000, contractor: "Windy City Kitchens", description: "Complete kitchen remodel with custom cabinetry" },
      { type: "Hardwood Flooring", year: 2022, status: "Finaled", permitId: "CHI-2022-8901", cost: 22000, contractor: "Lakefront Floors", description: "Install premium hardwood flooring throughout" },
      { type: "Bathroom Upgrade", year: 2021, status: "Finaled", permitId: "CHI-2021-2468", cost: 18000, contractor: "Luxury Bath Chicago", description: "Master bathroom renovation with heated floors" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2021-02-15", type: "Frozen Pipes", amount: 8000, status: "Paid", description: "Pipe burst during polar vortex" },
        { date: "2019-05-10", type: "Wind", amount: 3000, status: "Paid", description: "Window damage from severe thunderstorm" }
      ],
      fireRisk: { score: 2.8, lastInspection: "2023-07-20", notes: "Low fire risk, modern building with sprinkler system and fire-resistant materials" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-IL-0789",
        wildfireRiskScore: 1,
        floodRiskScore: 3,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Austin, Texas
  {
    property: {
      address: "2468 S Lamar Blvd",
      city: "Austin",
      state: "TX",
      zip: "78704",
      price: "$875,000",
      beds: 3,
      baths: 2,
      sqft: 1950,
      status: "Active",
      mlsId: "MLS-TX-005",
      salesPitch: "Charming mid-century modern home in trendy South Austin! Open floor plan, updated kitchen, and large backyard perfect for entertaining. Close to South Lamar shops and restaurants.",
      yearBuilt: 1962,
      lotSize: "0.25 acres",
      propertyType: "Single Family",
      coordinates: { lat: 30.2504, lng: -97.7698 }
    },
    permits: [
      { type: "Pool Installation", year: 2023, status: "Approved", permitId: "ATX-2023-1357", cost: 65000, contractor: "Hill Country Pools", description: "Install in-ground swimming pool with spa" },
      { type: "Roof Replacement", year: 2022, status: "Finaled", permitId: "ATX-2022-9012", cost: 18000, contractor: "Texas Roofing Pro", description: "Complete roof replacement with impact-resistant shingles" },
      { type: "Electrical Panel", year: 2021, status: "Finaled", permitId: "ATX-2021-3579", cost: 7500, contractor: "Austin Electric", description: "Upgrade electrical panel to 200 amp service" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-03-20", type: "Hail", amount: 22000, status: "Paid", description: "Severe hailstorm damage to roof and siding" },
        { date: "2021-02-17", type: "Frozen Pipes", amount: 5000, status: "Paid", description: "Winter storm pipe damage" }
      ],
      fireRisk: { score: 4.5, lastInspection: "2023-05-30", notes: "Moderate fire risk due to drought conditions and nearby vegetation" },
      floodRisk: { zone: "A", riskLevel: "Moderate", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-TX-2468",
        wildfireRiskScore: 6,
        floodRiskScore: 5,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Denver, Colorado (keeping some local properties)
  {
    property: {
      address: "1357 Cherry Creek Dr",
      city: "Denver",
      state: "CO",
      zip: "80220",
      price: "$1,450,000",
      beds: 4,
      baths: 3,
      sqft: 2800,
      status: "Active",
      mlsId: "MLS-CO-006",
      salesPitch: "Stunning contemporary home in prestigious Cherry Creek! Gourmet kitchen, master suite with mountain views, and private backyard oasis. Walking distance to Cherry Creek Mall and dining.",
      yearBuilt: 2015,
      lotSize: "0.2 acres",
      propertyType: "Single Family",
      coordinates: { lat: 39.7447, lng: -104.9622 }
    },
    permits: [
      { type: "Basement Finish", year: 2023, status: "Finaled", permitId: "DEN-2023-7890", cost: 85000, contractor: "Mile High Basements", description: "Finish basement with theater room and bar" },
      { type: "Solar Panel Install", year: 2022, status: "Finaled", permitId: "DEN-2022-4561", cost: 32000, contractor: "Colorado Solar", description: "Install 28-panel solar system with battery backup" },
      { type: "Deck Addition", year: 2021, status: "Finaled", permitId: "DEN-2021-7823", cost: 15000, contractor: "Rocky Mountain Decks", description: "Build composite deck with pergola" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-12-15", type: "Wind", amount: 6000, status: "Paid", description: "Damage from December bomb cyclone" },
        { date: "2021-06-20", type: "Hail", amount: 18000, status: "Paid", description: "Hailstorm damage to roof and vehicles" }
      ],
      fireRisk: { score: 6.8, lastInspection: "2023-08-15", notes: "Elevated fire risk due to proximity to foothills and dry conditions" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CO-1357",
        wildfireRiskScore: 7,
        floodRiskScore: 2,
        earthquakeRiskScore: 4,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // More Denver properties
  {
    property: {
      address: "2840 Colfax Ave",
      city: "Denver",
      state: "CO",
      zip: "80206",
      price: "$875,000",
      beds: 3,
      baths: 2,
      sqft: 1950,
      status: "Active",
      mlsId: "MLS-CO-007",
      salesPitch: "Historic charm meets modern luxury on vibrant Colfax! Fully renovated Victorian with original details, chef's kitchen, and rooftop deck with city views. Perfect for urban living!",
      yearBuilt: 1895,
      lotSize: "0.15 acres",
      propertyType: "Single Family",
      coordinates: { lat: 39.7402, lng: -104.9847 }
    },
    permits: [
      { type: "Full Renovation", year: 2023, status: "Finaled", permitId: "DEN-2023-8901", cost: 125000, contractor: "Denver Historic Renovations", description: "Complete renovation preserving historic character" },
      { type: "Electrical Upgrade", year: 2023, status: "Finaled", permitId: "DEN-2023-8902", cost: 18000, contractor: "Front Range Electric", description: "Updated electrical system to modern standards" },
      { type: "Rooftop Deck", year: 2023, status: "Finaled", permitId: "DEN-2023-8903", cost: 25000, contractor: "Mile High Decks", description: "Custom rooftop deck with city views" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 3.2, lastInspection: "2023-09-10", notes: "Low fire risk due to urban location" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CO-2840",
        wildfireRiskScore: 3,
        floodRiskScore: 1,
        earthquakeRiskScore: 4,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  {
    property: {
      address: "1534 Larimer St",
      city: "Denver",
      state: "CO",
      zip: "80202",
      price: "$1,250,000",
      beds: 2,
      baths: 2,
      sqft: 1650,
      status: "Pending",
      mlsId: "MLS-CO-008",
      salesPitch: "Modern loft living in historic LoDo! Exposed brick, soaring ceilings, and industrial details. Walking distance to Union Station, sports venues, and Denver's best restaurants.",
      yearBuilt: 1902,
      lotSize: "0.08 acres",
      propertyType: "Loft",
      coordinates: { lat: 39.7505, lng: -104.9963 }
    },
    permits: [
      { type: "Loft Conversion", year: 2018, status: "Finaled", permitId: "DEN-2018-5432", cost: 200000, contractor: "Urban Loft Builders", description: "Convert historic warehouse to luxury loft" },
      { type: "HVAC Install", year: 2018, status: "Finaled", permitId: "DEN-2018-5433", cost: 35000, contractor: "Colorado Comfort", description: "Install modern HVAC system" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-03-15", type: "Plumbing", amount: 3500, status: "Paid", description: "Pipe burst in winter cold snap" }
      ],
      fireRisk: { score: 4.1, lastInspection: "2023-07-20", notes: "Standard urban fire risk" },
      floodRisk: { zone: "AE", riskLevel: "Moderate", lastFlood: "2013-09-12" },
      cotality: {
        cotalityPropertyId: "CL-CO-1534",
        wildfireRiskScore: 2,
        floodRiskScore: 6,
        earthquakeRiskScore: 4,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  {
    property: {
      address: "4521 Broadway",
      city: "Denver",
      state: "CO",
      zip: "80216",
      price: "$625,000",
      beds: 3,
      baths: 2,
      sqft: 1780,
      status: "For Sale",
      mlsId: "MLS-CO-009",
      salesPitch: "Charming bungalow in up-and-coming Highland neighborhood! Original hardwood floors, updated kitchen, and large backyard perfect for entertaining. Great investment opportunity!",
      yearBuilt: 1925,
      lotSize: "0.18 acres",
      propertyType: "Single Family",
      coordinates: { lat: 39.7213, lng: -104.9877 }
    },
    permits: [
      { type: "Kitchen Remodel", year: 2022, status: "Finaled", permitId: "DEN-2022-6789", cost: 45000, contractor: "Denver Kitchen Co", description: "Modern kitchen with granite counters" },
      { type: "Bathroom Remodel", year: 2021, status: "Finaled", permitId: "DEN-2021-9876", cost: 18000, contractor: "Bath Pro Denver", description: "Updated master bathroom" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-12-15", type: "Wind", amount: 4200, status: "Paid", description: "Tree damage from bomb cyclone" }
      ],
      fireRisk: { score: 5.8, lastInspection: "2023-06-15", notes: "Moderate fire risk" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CO-4521",
        wildfireRiskScore: 4,
        floodRiskScore: 2,
        earthquakeRiskScore: 4,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  {
    property: {
      address: "890 Speer Blvd",
      city: "Denver",
      state: "CO",
      zip: "80204",
      price: "$2,100,000",
      beds: 4,
      baths: 4,
      sqft: 3200,
      status: "Active",
      mlsId: "MLS-CO-010",
      salesPitch: "Luxury high-rise living with stunning mountain and city views! Premium finishes, chef's kitchen, and private balcony. Building amenities include gym, concierge, and rooftop pool.",
      yearBuilt: 2019,
      lotSize: "0.02 acres",
      propertyType: "Condo",
      coordinates: { lat: 39.7325, lng: -105.0087 }
    },
    permits: [
      { type: "Custom Built-ins", year: 2023, status: "Finaled", permitId: "DEN-2023-1111", cost: 22000, contractor: "Custom Millwork Denver", description: "Built-in entertainment center and wine storage" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 2.1, lastInspection: "2023-11-01", notes: "Excellent fire suppression system" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CO-890",
        wildfireRiskScore: 1,
        floodRiskScore: 1,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Seattle, Washington
  {
    property: {
      address: "9876 Capitol Hill Ave",
      city: "Seattle",
      state: "WA",
      zip: "98102",
      price: "$1,650,000",
      beds: 3,
      baths: 2,
      sqft: 2100,
      status: "Pending",
      mlsId: "MLS-WA-007",
      salesPitch: "Beautiful craftsman home in vibrant Capitol Hill! Original hardwood floors, updated kitchen, and private garden. Walk to coffee shops, restaurants, and Pike Place Market.",
      yearBuilt: 1908,
      lotSize: "0.12 acres",
      propertyType: "Single Family",
      coordinates: { lat: 47.6205, lng: -122.3212 }
    },
    permits: [
      { type: "Seismic Retrofit", year: 2023, status: "Approved", permitId: "SEA-2023-5678", cost: 45000, contractor: "Earthquake Safe WA", description: "Foundation bolting and cripple wall bracing" },
      { type: "Kitchen Remodel", year: 2022, status: "Finaled", permitId: "SEA-2022-9123", cost: 75000, contractor: "Seattle Kitchen Design", description: "Complete kitchen renovation with custom cabinets" },
      { type: "Electrical Upgrade", year: 2021, status: "Finaled", permitId: "SEA-2021-4567", cost: 12000, contractor: "Puget Sound Electric", description: "Update wiring and electrical panel" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-01-10", type: "Water Damage", amount: 15000, status: "Paid", description: "Roof leak during heavy winter rains" },
        { date: "2019-11-15", type: "Wind", amount: 4000, status: "Paid", description: "Tree damage from windstorm" }
      ],
      fireRisk: { score: 3.1, lastInspection: "2023-09-12", notes: "Low fire risk due to wet climate and urban location" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-WA-9876",
        wildfireRiskScore: 2,
        floodRiskScore: 3,
        earthquakeRiskScore: 8,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Phoenix, Arizona
  {
    property: {
      address: "3691 E Camelback Rd",
      city: "Phoenix",
      state: "AZ",
      zip: "85018",
      price: "$950,000",
      beds: 4,
      baths: 3,
      sqft: 2650,
      status: "Active",
      mlsId: "MLS-AZ-008",
      salesPitch: "Desert contemporary masterpiece with mountain views! Open floor plan, gourmet kitchen, resort-style pool, and three-car garage. Prime Arcadia location near hiking trails and golf courses.",
      yearBuilt: 1995,
      lotSize: "0.33 acres",
      propertyType: "Single Family",
      coordinates: { lat: 33.5081, lng: -111.9887 }
    },
    permits: [
      { type: "Pool Renovation", year: 2023, status: "Finaled", permitId: "PHX-2023-2468", cost: 35000, contractor: "Desert Pool Pros", description: "Pool resurfacing and equipment upgrade" },
      { type: "AC Replacement", year: 2022, status: "Finaled", permitId: "PHX-2022-1357", cost: 12000, contractor: "Arizona Comfort", description: "Replace dual-zone HVAC system" },
      { type: "Solar Panel Install", year: 2021, status: "Finaled", permitId: "PHX-2021-9876", cost: 28000, contractor: "Arizona Solar Solutions", description: "Install 32-panel solar system" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-07-20", type: "Monsoon", amount: 8000, status: "Paid", description: "Monsoon storm damage to patio cover" },
        { date: "2021-06-15", type: "Heat", amount: 3000, status: "Paid", description: "HVAC failure during extreme heat wave" }
      ],
      fireRisk: { score: 7.2, lastInspection: "2023-06-01", notes: "High fire risk due to desert vegetation and dry conditions" },
      floodRisk: { zone: "AE", riskLevel: "Moderate", lastFlood: "2019-08-25" },
      cotality: {
        cotalityPropertyId: "CL-AZ-3691",
        wildfireRiskScore: 8,
        floodRiskScore: 4,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Boston, Massachusetts
  {
    property: {
      address: "147 Newbury St",
      city: "Boston",
      state: "MA",
      zip: "02116",
      price: "$2,250,000",
      beds: 2,
      baths: 2,
      sqft: 1400,
      status: "Active",
      mlsId: "MLS-MA-009",
      salesPitch: "Historic Back Bay brownstone with modern updates! High ceilings, original details, exposed brick, and private roof deck. Prime Newbury Street location steps from shopping and dining.",
      yearBuilt: 1885,
      lotSize: "Townhome",
      propertyType: "Townhouse",
      coordinates: { lat: 42.3505, lng: -71.0756 }
    },
    permits: [
      { type: "Historic Renovation", year: 2023, status: "In Review", permitId: "BOS-2023-3579", cost: 125000, contractor: "Heritage Restorations", description: "Restore original facade and windows" },
      { type: "Kitchen Modernization", year: 2022, status: "Finaled", permitId: "BOS-2022-7891", cost: 95000, contractor: "Boston Kitchen Works", description: "Update kitchen while preserving historic character" },
      { type: "Heating System", year: 2021, status: "Finaled", permitId: "BOS-2021-1234", cost: 18000, contractor: "New England Heating", description: "Install high-efficiency boiler system" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2021-01-30", type: "Snow/Ice", amount: 12000, status: "Paid", description: "Ice dam damage to roof and interior" },
        { date: "2020-03-15", type: "Water Damage", amount: 8000, status: "Paid", description: "Burst pipe in basement during freeze" }
      ],
      fireRisk: { score: 4.8, lastInspection: "2023-10-05", notes: "Moderate fire risk due to historic construction and dense urban setting" },
      floodRisk: { zone: "AE", riskLevel: "Moderate", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-MA-0147",
        wildfireRiskScore: 2,
        floodRiskScore: 5,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Atlanta, Georgia
  {
    property: {
      address: "8642 Peachtree Rd",
      city: "Atlanta",
      state: "GA",
      zip: "30309",
      price: "$725,000",
      beds: 3,
      baths: 2,
      sqft: 2000,
      status: "Active",
      mlsId: "MLS-GA-010",
      salesPitch: "Charming bungalow in historic Virginia-Highland! Hardwood floors, updated kitchen, screened porch, and fenced yard. Walk to Piedmont Park and Virginia-Highland shops.",
      yearBuilt: 1925,
      lotSize: "0.18 acres",
      propertyType: "Single Family",
      coordinates: { lat: 33.7878, lng: -84.3733 }
    },
    permits: [
      { type: "Addition - Master Suite", year: 2023, status: "Approved", permitId: "ATL-2023-9135", cost: 75000, contractor: "Atlanta Home Builders", description: "Add master suite with walk-in closet" },
      { type: "HVAC Replacement", year: 2022, status: "Finaled", permitId: "ATL-2022-2468", cost: 8500, contractor: "Georgia Climate Control", description: "Install new heat pump system" },
      { type: "Porch Screening", year: 2021, status: "Finaled", permitId: "ATL-2021-5791", cost: 6000, contractor: "Southern Porches", description: "Screen existing front porch" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-05-18", type: "Tornado", amount: 18000, status: "Paid", description: "Tornado damage to roof and trees" },
        { date: "2020-09-20", type: "Water Damage", amount: 7000, status: "Paid", description: "Foundation leak during heavy rains" }
      ],
      fireRisk: { score: 5.5, lastInspection: "2023-07-25", notes: "Moderate fire risk due to older construction and mature trees" },
      floodRisk: { zone: "A", riskLevel: "Moderate", lastFlood: "2020-09-20" },
      cotality: {
        cotalityPropertyId: "CL-GA-8642",
        wildfireRiskScore: 4,
        floodRiskScore: 6,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Additional Miami Beach properties for better comparables
  {
    property: {
      address: "789 Collins Ave",
      city: "Miami Beach",
      state: "FL",
      zip: "33139",
      price: "$2,850,000",
      beds: 3,
      baths: 2,
      sqft: 1800,
      status: "Active",
      mlsId: "MLS-FL-011",
      salesPitch: "Luxury beachfront condo with stunning ocean views! Modern finishes, wraparound terrace, and premium building amenities. Prime South Beach location.",
      yearBuilt: 2020,
      lotSize: "Condo",
      propertyType: "Condo",
      coordinates: { lat: 25.7825, lng: -80.1298 }
    },
    permits: [
      { type: "Interior Renovation", year: 2023, status: "Finaled", permitId: "MIA-2023-1122", cost: 35000, contractor: "Luxury Renovations FL", description: "Complete interior renovation with custom finishes" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-09-28", type: "Hurricane", amount: 28000, status: "Paid", description: "Hurricane Ian minor wind damage" }
      ],
      fireRisk: { score: 2.0, lastInspection: "2023-08-15", notes: "Low fire risk, new construction with advanced safety" },
      floodRisk: { zone: "VE", riskLevel: "Very High", lastFlood: "2022-09-28" },
      cotality: {
        cotalityPropertyId: "CL-FL-0789",
        wildfireRiskScore: 1,
        floodRiskScore: 9,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  {
    property: {
      address: "321 Washington Ave",
      city: "Miami Beach",
      state: "FL",
      zip: "33139",
      price: "$3,750,000",
      beds: 3,
      baths: 3,
      sqft: 2100,
      status: "Active",
      mlsId: "MLS-FL-012",
      salesPitch: "Penthouse-level condo with private rooftop access! Panoramic ocean and city views, designer kitchen, and exclusive amenities. Art Deco district location.",
      yearBuilt: 2019,
      lotSize: "Condo",
      propertyType: "Condo",
      coordinates: { lat: 25.7809, lng: -80.1320 }
    },
    permits: [
      { type: "Rooftop Deck", year: 2023, status: "Finaled", permitId: "MIA-2023-0888", cost: 45000, contractor: "Elite Outdoor Spaces", description: "Custom rooftop deck with outdoor kitchen" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 1.8, lastInspection: "2023-10-12", notes: "Very low fire risk, new construction" },
      floodRisk: { zone: "VE", riskLevel: "Very High", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-FL-0321",
        wildfireRiskScore: 1,
        floodRiskScore: 9,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Additional Los Angeles properties
  {
    property: {
      address: "2345 Melrose Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90046",
      price: "$1,450,000",
      beds: 3,
      baths: 2,
      sqft: 2000,
      status: "Active",
      mlsId: "MLS-CA-013",
      salesPitch: "Mid-century modern gem in West Hollywood! Completely updated with premium finishes, private pool, and mature landscaping. Walk to Melrose shopping.",
      yearBuilt: 1958,
      lotSize: "0.18 acres",
      propertyType: "Single Family",
      coordinates: { lat: 34.0837, lng: -118.3570 }
    },
    permits: [
      { type: "Pool Renovation", year: 2023, status: "Finaled", permitId: "LA-2023-0567", cost: 35000, contractor: "Hollywood Pools", description: "Complete pool renovation with new tile and equipment" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-02-20", type: "Earthquake", amount: 12000, status: "Paid", description: "Minor foundation settling from 3.8 earthquake" }
      ],
      fireRisk: { score: 8.2, lastInspection: "2023-07-10", notes: "High wildfire risk area" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CA-2345",
        wildfireRiskScore: 8,
        floodRiskScore: 2,
        earthquakeRiskScore: 8,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Additional Chicago properties
  {
    property: {
      address: "555 N State St",
      city: "Chicago",
      state: "IL",
      zip: "60654",
      price: "$1,850,000",
      beds: 2,
      baths: 2,
      sqft: 1500,
      status: "Active",
      mlsId: "MLS-IL-014",
      salesPitch: "Luxury high-rise condo in River North! Floor-to-ceiling windows, chef's kitchen, and building amenities. Walk to Magnificent Mile shopping.",
      yearBuilt: 2010,
      lotSize: "Condo",
      propertyType: "Condo",
      coordinates: { lat: 41.8919, lng: -87.6281 }
    },
    permits: [
      { type: "Kitchen Remodel", year: 2022, status: "Finaled", permitId: "CHI-2022-1789", cost: 55000, contractor: "Chicago Kitchen Design", description: "Luxury kitchen renovation with marble countertops" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-02-15", type: "Water Damage", amount: 8500, status: "Paid", description: "Pipe freeze damage during polar vortex" }
      ],
      fireRisk: { score: 2.8, lastInspection: "2023-05-20", notes: "Low fire risk, modern high-rise" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-IL-0555",
        wildfireRiskScore: 1,
        floodRiskScore: 3,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // One more Miami Beach property for complete local comparables
  {
    property: {
      address: "1200 Lincoln Rd",
      city: "Miami Beach",
      state: "FL",
      zip: "33139",
      price: "$2,995,000",
      beds: 2,
      baths: 2,
      sqft: 1700,
      status: "Active",
      mlsId: "MLS-FL-015",
      salesPitch: "Designer condo on iconic Lincoln Road! Contemporary finishes, oversized terrace, and premium location. Walk to shops, restaurants, and beach.",
      yearBuilt: 2017,
      lotSize: "Condo",
      propertyType: "Condo",
      coordinates: { lat: 25.7907, lng: -80.1418 }
    },
    permits: [
      { type: "Smart Home Install", year: 2023, status: "Finaled", permitId: "MIA-2023-0999", cost: 18000, contractor: "Tech Home Solutions", description: "Complete smart home automation system" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-09-28", type: "Hurricane", amount: 15000, status: "Paid", description: "Hurricane Ian window damage" }
      ],
      fireRisk: { score: 1.9, lastInspection: "2023-09-20", notes: "Very low fire risk, modern construction" },
      floodRisk: { zone: "VE", riskLevel: "Very High", lastFlood: "2022-09-28" },
      cotality: {
        cotalityPropertyId: "CL-FL-1200",
        wildfireRiskScore: 1,
        floodRiskScore: 9,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // One more Los Angeles property for better local comparables
  {
    property: {
      address: "8899 Beverly Blvd",
      city: "Los Angeles", 
      state: "CA",
      zip: "90048",
      price: "$1,375,000",
      beds: 3,
      baths: 3,
      sqft: 2200,
      status: "Active",
      mlsId: "MLS-CA-016",
      salesPitch: "Stylish contemporary home in desirable West Hollywood adjacent! Open floor plan, gourmet kitchen, and private yard. Close to Beverly Center and entertainment.",
      yearBuilt: 1995,
      lotSize: "0.14 acres",
      propertyType: "Single Family",
      coordinates: { lat: 34.0758, lng: -118.3736 }
    },
    permits: [
      { type: "Bathroom Remodel", year: 2023, status: "Finaled", permitId: "LA-2023-0678", cost: 28000, contractor: "West Side Renovations", description: "Master bathroom renovation with luxury finishes" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 7.8, lastInspection: "2023-08-25", notes: "Moderate-high wildfire risk area" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CA-8899",
        wildfireRiskScore: 8,
        floodRiskScore: 2,
        earthquakeRiskScore: 7,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Final Los Angeles property for complete local comparables
  {
    property: {
      address: "1456 Fairfax Ave",
      city: "Los Angeles",
      state: "CA", 
      zip: "90046",
      price: "$1,195,000",
      beds: 2,
      baths: 2,
      sqft: 1800,
      status: "Active",
      mlsId: "MLS-CA-017",
      salesPitch: "Charming craftsman in trendy Fairfax district! Original hardwood floors, updated kitchen, and spacious backyard. Walk to Farmer's Market and Grove.",
      yearBuilt: 1925,
      lotSize: "0.16 acres",
      propertyType: "Single Family",
      coordinates: { lat: 34.0766, lng: -118.3614 }
    },
    permits: [
      { type: "Foundation Repair", year: 2022, status: "Finaled", permitId: "LA-2022-1234", cost: 22000, contractor: "LA Foundation Experts", description: "Seismic foundation reinforcement" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-03-10", type: "Earthquake", amount: 6500, status: "Paid", description: "Minor chimney damage from 3.5 earthquake" }
      ],
      fireRisk: { score: 7.9, lastInspection: "2023-07-30", notes: "Moderate-high wildfire risk area" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CA-1456",
        wildfireRiskScore: 8,
        floodRiskScore: 2,
        earthquakeRiskScore: 8,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // ===== MAJOR EXPANSION: Additional Cities and Properties =====
  
  // Chicago, Illinois - Lincoln Park
  {
    property: {
      address: "2156 N Cleveland Ave",
      city: "Chicago",
      state: "IL",
      zip: "60614",
      price: "$875,000",
      beds: 3,
      baths: 2,
      sqft: 1850,
      status: "Active",
      mlsId: "MLS-CHI-001",
      salesPitch: "Beautiful Victorian-era home in Lincoln Park with original hardwood floors, exposed brick, and private garden. Walk to lakefront and DePaul University.",
      yearBuilt: 1895,
      lotSize: "0.12 acres",
      propertyType: "Single Family",
      coordinates: { lat: 41.9244, lng: -87.6365 }
    },
    permits: [
      { type: "Roof Replacement", year: 2023, status: "Finaled", permitId: "CHI-2023-045", cost: 18000, contractor: "Windy City Roofing" },
      { type: "Basement Finishing", year: 2022, status: "Finaled", permitId: "CHI-2022-187", cost: 35000, contractor: "Chicago Build Co" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-02-28", type: "Water", amount: 12000, status: "Paid", description: "Burst pipe damage during polar vortex" }
      ],
      fireRisk: { score: 3.5, lastInspection: "2023-08-20", notes: "Low fire risk, well-maintained electrical systems" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-CHI-2156",
        wildfireRiskScore: 1,
        floodRiskScore: 4,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Seattle, Washington - Capitol Hill  
  {
    property: {
      address: "1532 15th Ave E",
      city: "Seattle", 
      state: "WA",
      zip: "98112",
      price: "$1,125,000",
      beds: 4,
      baths: 2,
      sqft: 2100,
      status: "Active",
      mlsId: "MLS-SEA-001",
      salesPitch: "Charming Craftsman home in trendy Capitol Hill! Original character with modern updates, stunning mountain views, and walkable to Pike Place Market.",
      yearBuilt: 1912,
      lotSize: "0.14 acres",
      propertyType: "Single Family",
      coordinates: { lat: 47.6235, lng: -122.3141 }
    },
    permits: [
      { type: "Seismic Retrofit", year: 2023, status: "Finaled", permitId: "SEA-2023-098", cost: 25000, contractor: "Pacific Northwest Structural" },
      { type: "Solar Install", year: 2022, status: "Finaled", permitId: "SEA-2022-234", cost: 22000, contractor: "Emerald City Solar" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2021-07-15", type: "Storm", amount: 8500, status: "Paid", description: "Wind damage to roof and gutters" }
      ],
      fireRisk: { score: 4.2, lastInspection: "2023-07-10", notes: "Moderate risk due to old electrical in original structure" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-SEA-1532",
        wildfireRiskScore: 3,
        floodRiskScore: 2,
        earthquakeRiskScore: 8,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Phoenix, Arizona - Scottsdale
  {
    property: {
      address: "8425 E Shea Blvd",
      city: "Scottsdale",
      state: "AZ", 
      zip: "85260",
      price: "$695,000",
      beds: 3,
      baths: 3,
      sqft: 2200,
      status: "Active",
      mlsId: "MLS-PHX-001",
      salesPitch: "Desert contemporary home with panoramic mountain views! Private pool, desert landscaping, and energy-efficient design. Resort-style living in North Scottsdale.",
      yearBuilt: 2005,
      lotSize: "0.18 acres",
      propertyType: "Single Family",
      coordinates: { lat: 33.5889, lng: -111.8906 }
    },
    permits: [
      { type: "Pool Renovation", year: 2023, status: "Finaled", permitId: "SCT-2023-112", cost: 28000, contractor: "Desert Pool Specialists" },
      { type: "HVAC Replacement", year: 2022, status: "Finaled", permitId: "SCT-2022-087", cost: 15000, contractor: "Arizona Comfort Systems" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-08-15", type: "Hail", amount: 9500, status: "Paid", description: "Roof damage from summer monsoon" }
      ],
      fireRisk: { score: 6.8, lastInspection: "2023-09-05", notes: "Elevated wildfire risk during dry seasons" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-PHX-8425",
        wildfireRiskScore: 7,
        floodRiskScore: 1,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Atlanta, Georgia - Buckhead
  {
    property: {
      address: "3245 Peachtree Rd NE",
      city: "Atlanta",
      state: "GA",
      zip: "30326",
      price: "$825,000",
      beds: 4,
      baths: 3,
      sqft: 2650,
      status: "Active", 
      mlsId: "MLS-ATL-001",
      salesPitch: "Elegant traditional home in prestigious Buckhead! Hardwood floors throughout, gourmet kitchen, private backyard. Minutes from Lenox Square and fine dining.",
      yearBuilt: 1978,
      lotSize: "0.22 acres",
      propertyType: "Single Family",
      coordinates: { lat: 33.8439, lng: -84.3694 }
    },
    permits: [
      { type: "Kitchen Renovation", year: 2023, status: "Finaled", permitId: "ATL-2023-156", cost: 52000, contractor: "Southern Elegance Builders" },
      { type: "Deck Addition", year: 2022, status: "Finaled", permitId: "ATL-2022-203", cost: 18000, contractor: "Georgia Outdoor Living" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-04-12", type: "Storm", amount: 14000, status: "Paid", description: "Tornado damage to roof and windows" }
      ],
      fireRisk: { score: 3.8, lastInspection: "2023-06-30", notes: "Low to moderate risk, well-maintained property" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-ATL-3245",
        wildfireRiskScore: 2,
        floodRiskScore: 3,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Portland, Oregon - Pearl District
  {
    property: {
      address: "1425 NW Flanders St",
      city: "Portland",
      state: "OR",
      zip: "97209",
      price: "$745,000",
      beds: 2,
      baths: 2,
      sqft: 1450,
      status: "Active",
      mlsId: "MLS-PDX-001",
      salesPitch: "Modern loft-style condo in the heart of Pearl District! Floor-to-ceiling windows, exposed concrete, rooftop terrace. Walk to galleries, breweries, and parks.",
      yearBuilt: 2008,
      lotSize: "N/A",
      propertyType: "Condominium",
      coordinates: { lat: 45.5287, lng: -122.6890 }
    },
    permits: [
      { type: "Balcony Renovation", year: 2023, status: "Finaled", permitId: "PDX-2023-078", cost: 12000, contractor: "Pacific Northwest Builders" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 2.1, lastInspection: "2023-08-15", notes: "Low fire risk, modern building with sprinkler systems" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-PDX-1425",
        wildfireRiskScore: 5,
        floodRiskScore: 2,
        earthquakeRiskScore: 7,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Nashville, Tennessee - Music Row
  {
    property: {
      address: "1820 Broadway",
      city: "Nashville",
      state: "TN",
      zip: "37203",
      price: "$465,000",
      beds: 3,
      baths: 2,
      sqft: 1680,
      status: "Active",
      mlsId: "MLS-NSH-001",
      salesPitch: "Historic home near Music Row! Original character meets modern convenience, walking distance to downtown honky-tonks and recording studios. Perfect for music lovers!",
      yearBuilt: 1925,
      lotSize: "0.08 acres",
      propertyType: "Single Family",
      coordinates: { lat: 36.1515, lng: -86.7978 }
    },
    permits: [
      { type: "Electrical Update", year: 2023, status: "Finaled", permitId: "NSH-2023-089", cost: 9500, contractor: "Music City Electric" },
      { type: "Bathroom Remodel", year: 2022, status: "Finaled", permitId: "NSH-2022-145", cost: 22000, contractor: "Tennessee Home Improvement" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2021-12-15", type: "Storm", amount: 6800, status: "Paid", description: "Tornado damage to fence and siding" }
      ],
      fireRisk: { score: 4.5, lastInspection: "2023-05-20", notes: "Moderate risk due to age of electrical systems" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-NSH-1820",
        wildfireRiskScore: 2,
        floodRiskScore: 4,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Austin, Texas - South Austin
  {
    property: {
      address: "2134 S Lamar Blvd",
      city: "Austin",
      state: "TX",
      zip: "78704",
      price: "$585,000",
      beds: 3,
      baths: 2,
      sqft: 1820,
      status: "Active",
      mlsId: "MLS-AUS-001",
      salesPitch: "Hip South Austin bungalow! Totally renovated with modern finishes, large deck for entertaining, walking distance to food trucks and live music venues. Keep Austin Weird!",
      yearBuilt: 1942,
      lotSize: "0.11 acres",
      propertyType: "Single Family",
      coordinates: { lat: 30.2498, lng: -97.7773 }
    },
    permits: [
      { type: "Full Renovation", year: 2023, status: "Finaled", permitId: "AUS-2023-234", cost: 85000, contractor: "Hill Country Renovations" },
      { type: "Deck Addition", year: 2023, status: "Finaled", permitId: "AUS-2023-245", cost: 15000, contractor: "Texas Outdoor Living" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 3.2, lastInspection: "2023-09-10", notes: "Low risk, completely updated electrical and plumbing" },
      floodRisk: { zone: "AE", riskLevel: "Moderate", lastFlood: "2018-10-15" },
      cotality: {
        cotalityPropertyId: "CL-AUS-2134",
        wildfireRiskScore: 4,
        floodRiskScore: 6,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Minneapolis, Minnesota - Uptown
  {
    property: {
      address: "2845 Hennepin Ave S",
      city: "Minneapolis",
      state: "MN",
      zip: "55408",
      price: "$425,000",
      beds: 3,
      baths: 2,
      sqft: 1650,
      status: "Active",
      mlsId: "MLS-MSP-001",
      salesPitch: "Charming duplex in vibrant Uptown! Live in one unit, rent the other. Original hardwood, updated kitchens, near Lake Calhoun and trendy restaurants.",
      yearBuilt: 1915,
      lotSize: "0.09 acres",
      propertyType: "Duplex",
      coordinates: { lat: 44.9435, lng: -93.2982 }
    },
    permits: [
      { type: "Furnace Replacement", year: 2023, status: "Finaled", permitId: "MSP-2023-167", cost: 12000, contractor: "Minnesota Heating & Cooling" },
      { type: "Window Replacement", year: 2022, status: "Finaled", permitId: "MSP-2022-089", cost: 18000, contractor: "Twin Cities Windows" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-01-20", type: "Water", amount: 8500, status: "Paid", description: "Frozen pipe burst during cold snap" }
      ],
      fireRisk: { score: 4.1, lastInspection: "2023-07-25", notes: "Moderate risk, older electrical systems in original structure" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-MSP-2845",
        wildfireRiskScore: 1,
        floodRiskScore: 2,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // San Diego, California - Mission Beach
  {
    property: {
      address: "3456 Ocean Front Walk",
      city: "San Diego",
      state: "CA",
      zip: "92109",
      price: "$1,850,000",
      beds: 3,
      baths: 3,
      sqft: 1980,
      status: "Active",
      mlsId: "MLS-SD-001",
      salesPitch: "Oceanfront paradise! Direct beach access, panoramic Pacific views, completely renovated with high-end finishes. Investment opportunity with vacation rental potential.",
      yearBuilt: 1968,
      lotSize: "0.06 acres",
      propertyType: "Single Family",
      coordinates: { lat: 32.7706, lng: -117.2527 }
    },
    permits: [
      { type: "Complete Renovation", year: 2023, status: "Finaled", permitId: "SD-2023-445", cost: 125000, contractor: "Coastal Construction Co" },
      { type: "Seawall Repair", year: 2022, status: "Finaled", permitId: "SD-2022-234", cost: 35000, contractor: "Pacific Marine Construction" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-08-30", type: "Water", amount: 22000, status: "Paid", description: "Storm surge damage during hurricane" }
      ],
      fireRisk: { score: 3.8, lastInspection: "2023-08-30", notes: "Moderate risk, updated electrical systems" },
      floodRisk: { zone: "VE", riskLevel: "High", lastFlood: "2022-08-30" },
      cotality: {
        cotalityPropertyId: "CL-SD-3456",
        wildfireRiskScore: 5,
        floodRiskScore: 9,
        earthquakeRiskScore: 7,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Las Vegas, Nevada - Summerlin
  {
    property: {
      address: "11234 Red Rock Canyon Rd",
      city: "Las Vegas",
      state: "NV",
      zip: "89135",
      price: "$565,000",
      beds: 4,
      baths: 3,
      sqft: 2350,
      status: "Active",
      mlsId: "MLS-LV-001",
      salesPitch: "Spectacular desert home with Red Rock Canyon views! Pool, spa, and outdoor kitchen perfect for entertaining. Guard-gated community with golf course access.",
      yearBuilt: 2002,
      lotSize: "0.16 acres",
      propertyType: "Single Family",
      coordinates: { lat: 36.1547, lng: -115.3267 }
    },
    permits: [
      { type: "Pool Resurfacing", year: 2023, status: "Finaled", permitId: "LV-2023-189", cost: 8500, contractor: "Desert Pool Pros" },
      { type: "Solar Installation", year: 2022, status: "Finaled", permitId: "LV-2022-267", cost: 28000, contractor: "Nevada Solar Solutions" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 5.5, lastInspection: "2023-06-15", notes: "Moderate wildfire risk during dry periods" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-LV-11234",
        wildfireRiskScore: 6,
        floodRiskScore: 1,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Raleigh, North Carolina - Downtown
  {
    property: {
      address: "525 N Person St",
      city: "Raleigh",
      state: "NC",
      zip: "27604",
      price: "$385,000",
      beds: 2,
      baths: 2,
      sqft: 1420,
      status: "Active",
      mlsId: "MLS-RAL-001",
      salesPitch: "Modern downtown condo in the heart of Raleigh! Walking distance to NC State, museums, and restaurants. Rooftop terrace with city views and fitness center.",
      yearBuilt: 2018,
      lotSize: "N/A",
      propertyType: "Condominium",
      coordinates: { lat: 35.7835, lng: -78.6442 }
    },
    permits: [],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 1.8, lastInspection: "2023-09-20", notes: "Very low risk, modern construction with sprinkler systems" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-RAL-525",
        wildfireRiskScore: 2,
        floodRiskScore: 2,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Salt Lake City, Utah - The Avenues
  {
    property: {
      address: "867 2nd Avenue",
      city: "Salt Lake City",
      state: "UT",
      zip: "84103",
      price: "$675,000",
      beds: 4,
      baths: 2,
      sqft: 2100,
      status: "Active",
      mlsId: "MLS-SLC-001",
      salesPitch: "Historic home in the prestigious Avenues! Stunning mountain views, original hardwood floors, walking distance to downtown and world-class skiing just 30 minutes away.",
      yearBuilt: 1908,
      lotSize: "0.13 acres",
      propertyType: "Single Family",
      coordinates: { lat: 40.7837, lng: -111.8840 }
    },
    permits: [
      { type: "Foundation Repair", year: 2023, status: "Finaled", permitId: "SLC-2023-123", cost: 18000, contractor: "Mountain West Foundation" },
      { type: "Heating System Upgrade", year: 2022, status: "Finaled", permitId: "SLC-2022-176", cost: 14000, contractor: "Utah HVAC Pros" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-09-10", type: "Earthquake", amount: 5500, status: "Paid", description: "Minor foundation settling" }
      ],
      fireRisk: { score: 3.9, lastInspection: "2023-08-05", notes: "Moderate risk, historic wiring updated recently" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-SLC-867",
        wildfireRiskScore: 6,
        floodRiskScore: 2,
        earthquakeRiskScore: 7,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Richmond, Virginia - Fan District
  {
    property: {
      address: "2012 Monument Ave",
      city: "Richmond",
      state: "VA",
      zip: "23220",
      price: "$425,000",
      beds: 3,
      baths: 2,
      sqft: 1780,
      status: "Active",
      mlsId: "MLS-RIC-001",
      salesPitch: "Beautiful Fan District townhouse! Historic charm with modern updates, original mantels and moldings, walking distance to VCU and trendy Carytown shopping.",
      yearBuilt: 1925,
      lotSize: "0.05 acres",
      propertyType: "Townhouse",
      coordinates: { lat: 37.5537, lng: -77.4755 }
    },
    permits: [
      { type: "Kitchen Renovation", year: 2023, status: "Finaled", permitId: "RIC-2023-089", cost: 32000, contractor: "Virginia Heritage Builders" },
      { type: "Roof Repair", year: 2022, status: "Finaled", permitId: "RIC-2022-145", cost: 8500, contractor: "Capital City Roofing" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 3.6, lastInspection: "2023-07-15", notes: "Low to moderate risk, well-maintained historic property" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-RIC-2012",
        wildfireRiskScore: 1,
        floodRiskScore: 3,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Kansas City, Missouri - Crossroads Arts District
  {
    property: {
      address: "1623 Grand Blvd",
      city: "Kansas City",
      state: "MO",
      zip: "64108",
      price: "$285,000",
      beds: 2,
      baths: 2,
      sqft: 1350,
      status: "Active",
      mlsId: "MLS-KC-001",
      salesPitch: "Urban loft in the vibrant Crossroads! Converted warehouse with exposed brick, industrial fixtures, and skyline views. Heart of the arts district with galleries and restaurants.",
      yearBuilt: 1920,
      lotSize: "N/A",
      propertyType: "Condominium",
      coordinates: { lat: 39.0921, lng: -94.5814 }
    },
    permits: [
      { type: "Loft Conversion", year: 2021, status: "Finaled", permitId: "KC-2021-234", cost: 65000, contractor: "Crossroads Development" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-05-25", type: "Storm", amount: 4500, status: "Paid", description: "Hail damage to skylights" }
      ],
      fireRisk: { score: 4.2, lastInspection: "2023-06-30", notes: "Moderate risk, converted industrial space with updated systems" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-KC-1623",
        wildfireRiskScore: 1,
        floodRiskScore: 4,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Tucson, Arizona - Foothills
  {
    property: {
      address: "7845 N Oracle Rd",
      city: "Tucson",
      state: "AZ",
      zip: "85704",
      price: "$485,000",
      beds: 3,
      baths: 3,
      sqft: 2000,
      status: "Active",
      mlsId: "MLS-TUC-001",
      salesPitch: "Desert contemporary with Catalina Mountains views! Pool, spa, and xeriscaped gardens. Energy-efficient design perfect for Arizona living. Minutes from hiking trails.",
      yearBuilt: 1998,
      lotSize: "0.21 acres",
      propertyType: "Single Family",
      coordinates: { lat: 32.3420, lng: -110.9754 }
    },
    permits: [
      { type: "Pool Equipment Upgrade", year: 2023, status: "Finaled", permitId: "TUC-2023-156", cost: 12000, contractor: "Desert Pool & Spa" },
      { type: "Solar Panel Addition", year: 2022, status: "Finaled", permitId: "TUC-2022-234", cost: 24000, contractor: "Arizona Solar Solutions" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 7.1, lastInspection: "2023-09-15", notes: "High wildfire risk during dry seasons, defensible space maintained" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-TUC-7845",
        wildfireRiskScore: 8,
        floodRiskScore: 1,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Oklahoma City, Oklahoma - Bricktown
  {
    property: {
      address: "325 E Sheridan Ave",
      city: "Oklahoma City",
      state: "OK",
      zip: "73104",
      price: "$225,000",
      beds: 2,
      baths: 2,
      sqft: 1180,
      status: "Active",
      mlsId: "MLS-OKC-001",
      salesPitch: "Modern condo in historic Bricktown! Converted warehouse with exposed brick, walking distance to Thunder games and canal entertainment district. Urban living at its best!",
      yearBuilt: 1925,
      lotSize: "N/A",
      propertyType: "Condominium",
      coordinates: { lat: 35.4638, lng: -97.5062 }
    },
    permits: [
      { type: "Unit Renovation", year: 2022, status: "Finaled", permitId: "OKC-2022-178", cost: 25000, contractor: "Sooner State Renovations" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-04-15", type: "Storm", amount: 8500, status: "Paid", description: "Tornado damage to common areas" }
      ],
      fireRisk: { score: 3.8, lastInspection: "2023-08-20", notes: "Moderate risk, historic building with updated fire suppression" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-OKC-325",
        wildfireRiskScore: 3,
        floodRiskScore: 4,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Buffalo, New York - Elmwood Village
  {
    property: {
      address: "745 Elmwood Ave",
      city: "Buffalo",
      state: "NY",
      zip: "14222",
      price: "$195,000",
      beds: 3,
      baths: 1,
      sqft: 1450,
      status: "Active",
      mlsId: "MLS-BUF-001",
      salesPitch: "Charming Victorian in trendy Elmwood Village! Original details, hardwood floors, walking distance to shops and restaurants. Great investment opportunity!",
      yearBuilt: 1895,
      lotSize: "0.08 acres",
      propertyType: "Single Family",
      coordinates: { lat: 42.9126, lng: -78.8779 }
    },
    permits: [
      { type: "Furnace Replacement", year: 2023, status: "Finaled", permitId: "BUF-2023-145", cost: 8500, contractor: "Buffalo Heating Solutions" },
      { type: "Electrical Update", year: 2022, status: "Finaled", permitId: "BUF-2022-234", cost: 12000, contractor: "Empire State Electric" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2022-12-23", type: "Water", amount: 6500, status: "Paid", description: "Pipe freeze during blizzard" }
      ],
      fireRisk: { score: 4.3, lastInspection: "2023-07-10", notes: "Moderate risk, older home with updated electrical" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-BUF-745",
        wildfireRiskScore: 1,
        floodRiskScore: 2,
        earthquakeRiskScore: 1,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Albuquerque, New Mexico - Old Town
  {
    property: {
      address: "2134 Central Ave SW",
      city: "Albuquerque",
      state: "NM",
      zip: "87104",
      price: "$315,000",
      beds: 3,
      baths: 2,
      sqft: 1620,
      status: "Active",
      mlsId: "MLS-ABQ-001",
      salesPitch: "Adobe-style home near Historic Old Town! Authentic Southwestern architecture with vigas, kiva fireplace, and walled courtyard. Walking distance to plaza and museums.",
      yearBuilt: 1965,
      lotSize: "0.12 acres",
      propertyType: "Single Family",
      coordinates: { lat: 35.0842, lng: -106.6596 }
    },
    permits: [
      { type: "Roof Replacement", year: 2023, status: "Finaled", permitId: "ABQ-2023-189", cost: 16000, contractor: "High Desert Roofing" },
      { type: "Swamp Cooler Install", year: 2022, status: "Finaled", permitId: "ABQ-2022-267", cost: 4500, contractor: "Desert Air Systems" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 5.8, lastInspection: "2023-08-30", notes: "Moderate to high wildfire risk during dry seasons" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-ABQ-2134",
        wildfireRiskScore: 6,
        floodRiskScore: 2,
        earthquakeRiskScore: 2,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Boise, Idaho - North End
  {
    property: {
      address: "1532 N 13th St",
      city: "Boise",
      state: "ID",
      zip: "83702",
      price: "$445,000",
      beds: 3,
      baths: 2,
      sqft: 1780,
      status: "Active",
      mlsId: "MLS-BOI-001",
      salesPitch: "Charming Craftsman in desirable North End! Original character with modern updates, walking distance to Hyde Park and foothills hiking trails. Mountain views!",
      yearBuilt: 1920,
      lotSize: "0.11 acres",
      propertyType: "Single Family",
      coordinates: { lat: 43.6245, lng: -116.2068 }
    },
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "BOI-2023-234", cost: 28000, contractor: "Treasure Valley Builders" },
      { type: "Basement Finishing", year: 2022, status: "Finaled", permitId: "BOI-2022-145", cost: 22000, contractor: "Idaho Home Improvements" }
    ],
    riskData: {
      insuranceClaims: [],
      fireRisk: { score: 6.2, lastInspection: "2023-09-05", notes: "Moderate to high wildfire risk during summer months" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-BOI-1532",
        wildfireRiskScore: 7,
        floodRiskScore: 2,
        earthquakeRiskScore: 4,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  },

  // Little Rock, Arkansas - Heights
  {
    property: {
      address: "2845 Kavanaugh Blvd",
      city: "Little Rock",
      state: "AR",
      zip: "72205",
      price: "$285,000",
      beds: 3,
      baths: 2,
      sqft: 1560,
      status: "Active",
      mlsId: "MLS-LR-001",
      salesPitch: "Updated ranch in the Heights! Open floor plan, hardwood floors, large backyard perfect for entertaining. Close to downtown and River Market District.",
      yearBuilt: 1968,
      lotSize: "0.16 acres",
      propertyType: "Single Family",
      coordinates: { lat: 34.7565, lng: -92.3102 }
    },
    permits: [
      { type: "HVAC Replacement", year: 2023, status: "Finaled", permitId: "LR-2023-156", cost: 11000, contractor: "Arkansas Climate Control" },
      { type: "Deck Addition", year: 2022, status: "Finaled", permitId: "LR-2022-189", cost: 8500, contractor: "Ozark Outdoor Living" }
    ],
    riskData: {
      insuranceClaims: [
        { date: "2023-03-31", type: "Storm", amount: 7500, status: "Paid", description: "Tornado damage to roof and gutters" }
      ],
      fireRisk: { score: 3.4, lastInspection: "2023-06-20", notes: "Low to moderate risk, well-maintained property" },
      floodRisk: { zone: "X", riskLevel: "Low", lastFlood: null },
      cotality: {
        cotalityPropertyId: "CL-LR-2845",
        wildfireRiskScore: 2,
        floodRiskScore: 4,
        earthquakeRiskScore: 3,
        reportUrl: "https://www.cotality.com/products/underwriting-center"
      }
    }
  }
];

// Helper function to search properties by address
export function searchPropertiesByAddress(searchTerm: string): PropertyData[] {
  const term = searchTerm.toLowerCase();
  return realPropertiesDatabase.filter(property => {
    const fullAddress = `${property.property.address}, ${property.property.city}, ${property.property.state}`.toLowerCase();
    return fullAddress.includes(term) || 
           property.property.city.toLowerCase().includes(term) ||
           property.property.state.toLowerCase().includes(term) ||
           property.property.zip.includes(term);
  });
}

// Helper function to get property by exact address
export function getPropertyByAddress(address: string, city?: string, state?: string): PropertyData | null {
  const searchAddress = address.toLowerCase().trim();
  const searchCity = city?.toLowerCase().trim();
  const searchState = state?.toLowerCase().trim();
  
  return realPropertiesDatabase.find(property => {
    const propAddress = property.property.address.toLowerCase();
    const propCity = property.property.city.toLowerCase();
    const propState = property.property.state.toLowerCase();
    
    if (searchCity && searchState) {
      return propAddress === searchAddress && propCity === searchCity && propState === searchState;
    } else {
      return propAddress === searchAddress;
    }
  }) || null;
}

// Export all addresses for search suggestions
export const allAddresses = realPropertiesDatabase.map(p => ({
  fullAddress: `${p.property.address}, ${p.property.city}, ${p.property.state} ${p.property.zip}`,
  address: p.property.address,
  city: p.property.city,
  state: p.property.state,
  zip: p.property.zip
})); 