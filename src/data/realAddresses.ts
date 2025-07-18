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