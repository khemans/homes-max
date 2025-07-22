// Test utilities for HOUSE/MAX components and functionality
import React from 'react';
import { FEMAFloodData, FloodEvent, FloodMonitoringStation } from './femaFloodAPI';

// Mock data generators for testing
export interface PropertyData {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  // ... other property fields
}

export interface TestResult {
  test: string;
  passed: boolean;
  duration: number;
  message?: string;
}

// Mock property search data
export const mockSearchResults: PropertyData[] = [
  {
    id: '1',
    address: '123 Main St, Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: '2', 
    address: '456 Oak Ave, Denver, CO',
    coordinates: { lat: 39.7392, lng: -104.9903 }
  }
  // Add more mock data as needed
];

// Mock AVM data
export const mockAVMData = {
  estimatedValue: 485000,
  confidence: 0.89,
  methodology: 'Enhanced ML with comparable analysis',
  pricePerSqft: 245,
  marketTrends: {
    trend: 'Stable',
    appreciation: 0.12
  },
  lastUpdated: '2024-01-15T10:30:00Z'
};

// Mock public records data
export const mockPublicRecords = {
  taxAssessment: {
    assessedValue: 465000,
    lastAssessmentDate: '2024-01-01',
    taxHistory: [
      { year: 2023, assessment: 452000, taxes: 8740 },
      { year: 2022, assessment: 428000, taxes: 8280 }
    ]
  },
  permits: [
    {
      type: 'Electrical',
      date: '2023-08-15', 
      description: 'Panel upgrade to 200 amp',
      contractor: 'ABC Electric'
    },
    {
      type: 'Roofing',
      date: '2022-05-10',
      description: 'Full roof replacement',
      contractor: 'XYZ Roofing'
    }
  ],
  demographics: {
    medianHouseholdIncome: 82000,
    population: 15420,
    medianAge: 34.2
  }
};

// Test configuration
export const testConfig = {
  timeout: 10000, // 10 seconds
  retries: 3,
  verbose: true
};

// Test setup utilities
export const testSetup = {
  beforeEach: () => {
    // Reset any global state
    localStorage.clear();
    sessionStorage.clear();
  },
  afterEach: () => {
    // Cleanup after tests
  }
};

// Example test cases
export const exampleTests = {
  searchTest: async ({
    query,
    expectedResults
  }: {
    query: string;
    expectedResults: number;
  }): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      // Simulate search API call
      await new Promise(resolve => setTimeout(resolve, 100));
      const results = mockSearchResults.filter(r => 
        r.address.toLowerCase().includes(query.toLowerCase())
      );
      
      const passed = results.length === expectedResults;
      
      return {
        test: `Search for "${query}"`,
        passed,
        duration: Date.now() - startTime,
        message: passed ? 'Search completed successfully' : 
                `Expected ${expectedResults} results, got ${results.length}`
      };
    } catch (error) {
      return {
        test: `Search for "${query}"`,
        passed: false,
        duration: Date.now() - startTime,
        message: `Search failed: ${error}`
      };
    }
  },

  avmTest: async ({
    propertyData
  }: {
    propertyData: PropertyData;
  }): Promise<TestResult[]> => {
    // Placeholder for AVM testing
    console.log('Testing AVM for property:', propertyData.address);
    return Promise.resolve([]);
  },

  performanceTest: async (): Promise<TestResult> => {
    const startTime = performance.now();
    
    // Simulate component rendering
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const duration = performance.now() - startTime;
    const passed = duration < 100; // Should render in under 100ms
    
    return {
      test: 'Component render performance',
      passed,
      duration,
      message: passed ? 'Performance within limits' : 
              `Render took ${duration.toFixed(2)}ms (limit: 100ms)`
    };
  }
};

// Enhanced FEMA Flood Data Test Utilities
export const mockFloodData: FEMAFloodData = {
  floodZone: 'AE',
  floodZoneDescription: '1% annual chance flood (100-year flood) with base flood elevation',
  baseFloodElevation: 125.5,
  floodInsuranceRequired: true,
  annualChanceFlooding: '1% (100-year flood)',
  firmEffectiveDate: 'March 15, 2021',
  countyName: 'Harris County',
  riskLevel: 'High',
  insuranceRecommendation: 'Flood insurance required for federally backed mortgages',
  
  // Enhanced features
  historicalFloods: [
    {
      date: '2023-08-15',
      severity: 'Major',
      stage: 6.2,
      description: 'Flooding from hurricane-related storm surge',
      damages: 'Estimated $275,000 in damages'
    },
    {
      date: '2021-05-20',
      severity: 'Moderate',
      stage: 3.8,
      description: 'Flooding from heavy rainfall and storm surge',
      damages: 'Estimated $125,000 in damages'
    },
    {
      date: '2019-09-12',
      severity: 'Minor',
      stage: 2.1,
      description: 'Flooding from flash flooding from thunderstorms'
    }
  ],
  
  nearbyMonitoringStations: [
    {
      id: 'USGS-8074500',
      name: 'Cedar River at Mill Road',
      distance: 3.2,
      currentStage: 18.5,
      floodStage: 15.0,
      status: 'Moderate',
      url: 'https://waterdata.usgs.gov/monitoring-location/8074500'
    },
    {
      id: 'USGS-8074800',
      name: 'Fox River at Highway 50',
      distance: 7.8,
      currentStage: 12.1,
      floodStage: 14.0,
      status: 'Normal',
      url: 'https://waterdata.usgs.gov/monitoring-location/8074800'
    }
  ],
  
  floodInsuranceAnalysis: {
    required: true,
    recommendedCoverage: 250000,
    estimatedPremium: {
      building: 2400,
      contents: 1680,
      total: 4080
    },
    discounts: [
      'Community Rating System discount (varies by community)',
      'Newly mapped discount (first year in high-risk zone)'
    ],
    riskFactors: [
      'Located in high-risk flood zone',
      'Multiple historical flood events',
      'Below base flood elevation'
    ]
  },
  
  elevationData: {
    groundElevation: 122.3,
    relativeToFloodStage: -2.7,
    elevationConfidence: 88
  },
  
  floodMaps: {
    firmPanelNumber: '4801H',
    firmPanelUrl: 'https://msc.fema.gov/portal/search?AddressLine=29.7604,-95.3698#searchresultsanchor',
    interactiveMapUrl: 'https://hazards-fema.maps.arcgis.com/apps/webappviewer/index.html?id=8b0adb51996444d4879338b5529aa9cd&extent=-95.3798,29.7504,-95.3598,29.7704'
  },
  
  riskScore: 78,
  
  recommendations: [
    'Monitor local flood monitoring stations during heavy rainfall',
    'Consider flood insurance even if not required',
    'Property should be elevated to at least 125.5 feet',
    'History shows recurring flood risk - implement comprehensive flood mitigation',
    'Stay informed about local flood warnings and weather alerts',
    'Maintain emergency supplies and flood response equipment'
  ]
};

export const mockMinimalFloodData: FEMAFloodData = {
  floodZone: 'X',
  floodZoneDescription: 'Area of minimal flood hazard',
  floodInsuranceRequired: false,
  annualChanceFlooding: 'Less than 0.2%',
  firmEffectiveDate: 'January 10, 2020',
  countyName: 'Travis County',
  riskLevel: 'Minimal',
  insuranceRecommendation: 'Flood insurance optional but recommended for complete protection',
  
  historicalFloods: [],
  nearbyMonitoringStations: [
    {
      id: 'USGS-8158000',
      name: 'Colorado River at Austin',
      distance: 12.5,
      currentStage: 8.2,
      floodStage: 21.0,
      status: 'Normal',
      url: 'https://waterdata.usgs.gov/monitoring-location/8158000'
    }
  ],
  
  floodInsuranceAnalysis: {
    required: false,
    recommendedCoverage: 200000,
    estimatedPremium: {
      building: 800,
      contents: 560,
      total: 1360
    },
    discounts: [
      'Preferred Risk Policy (lower cost option)',
      'Community Rating System discount (varies by community)'
    ],
    riskFactors: []
  },
  
  elevationData: {
    groundElevation: 165.8,
    relativeToFloodStage: 12.3,
    elevationConfidence: 92
  },
  
  floodMaps: {
    firmPanelNumber: '4853H',
    firmPanelUrl: 'https://msc.fema.gov/portal/search?AddressLine=30.2672,-97.7431#searchresultsanchor',
    interactiveMapUrl: 'https://hazards-fema.maps.arcgis.com/apps/webappviewer/index.html?id=8b0adb51996444d4879338b5529aa9cd&extent=-97.7531,30.2572,-97.7331,30.2772'
  },
  
  riskScore: 18,
  
  recommendations: [
    'Stay informed about local flood warnings and weather alerts',
    'Consider flood insurance for complete protection',
    'Maintain emergency supplies and flood response equipment'
  ]
};

export const mockCoastalFloodData: FEMAFloodData = {
  floodZone: 'VE',
  floodZoneDescription: '1% annual chance coastal flood with velocity hazard and base flood elevation',
  baseFloodElevation: 18.0,
  floodInsuranceRequired: true,
  annualChanceFlooding: '1% (100-year flood)',
  firmEffectiveDate: 'September 8, 2022',
  countyName: 'Galveston County',
  riskLevel: 'Very High',
  insuranceRecommendation: 'Flood insurance required - coastal high-hazard area with wave action',
  
  historicalFloods: [
    {
      date: '2023-09-15',
      severity: 'Severe',
      stage: 12.5,
      description: 'Flooding from hurricane-related storm surge',
      damages: 'Estimated $485,000 in damages'
    },
    {
      date: '2022-06-20',
      severity: 'Major',
      stage: 8.7,
      description: 'Flooding from coastal storm surge',
      damages: 'Estimated $325,000 in damages'
    },
    {
      date: '2021-08-10',
      severity: 'Major',
      stage: 9.2,
      description: 'Flooding from tropical storm system',
      damages: 'Estimated $275,000 in damages'
    },
    {
      date: '2020-05-15',
      severity: 'Moderate',
      stage: 5.1,
      description: 'Flooding from heavy rainfall and storm surge'
    }
  ],
  
  nearbyMonitoringStations: [
    {
      id: 'USGS-8770475',
      name: 'Galveston Bay at Galveston Pier',
      distance: 1.8,
      currentStage: 2.1,
      floodStage: 3.5,
      status: 'Normal',
      url: 'https://waterdata.usgs.gov/monitoring-location/8770475'
    },
    {
      id: 'USGS-8771013',
      name: 'Clear Creek at League City',
      distance: 8.9,
      currentStage: 5.8,
      floodStage: 8.0,
      status: 'Normal',
      url: 'https://waterdata.usgs.gov/monitoring-location/8771013'
    }
  ],
  
  floodInsuranceAnalysis: {
    required: true,
    recommendedCoverage: 500000,
    estimatedPremium: {
      building: 4800,
      contents: 3360,
      total: 8160
    },
    discounts: [
      'Elevated structure discount (up to 30%)',
      'Community Rating System discount (varies by community)'
    ],
    riskFactors: [
      'Located in high-risk flood zone',
      'Multiple historical flood events',
      'Coastal high-hazard area with wave action',
      'History of severe flooding'
    ]
  },
  
  elevationData: {
    groundElevation: 15.2,
    relativeToFloodStage: -2.8,
    elevationConfidence: 85
  },
  
  floodMaps: {
    firmPanelNumber: '4816H',
    firmPanelUrl: 'https://msc.fema.gov/portal/search?AddressLine=29.3013,-94.7977#searchresultsanchor',
    interactiveMapUrl: 'https://hazards-fema.maps.arcgis.com/apps/webappviewer/index.html?id=8b0adb51996444d4879338b5529aa9cd&extent=-94.8077,29.2913,-94.7877,29.3113'
  },
  
  riskScore: 95,
  
  recommendations: [
    'Consider elevated storage for valuables and important documents',
    'Install sump pump and backup power systems',
    'Review evacuation routes and emergency preparedness plan',
    'Monitor local flood monitoring stations during heavy rainfall',
    'Property should be elevated to at least 18.0 feet',
    'History shows recurring flood risk - implement comprehensive flood mitigation',
    'Stay informed about local flood warnings and weather alerts',
    'Maintain emergency supplies and flood response equipment'
  ]
};

// Test data generator functions
export function generateRandomFloodEvent(): FloodEvent {
  const severities: FloodEvent['severity'][] = ['Minor', 'Moderate', 'Major', 'Severe'];
  const causes = [
    'heavy rainfall and storm surge',
    'river overflow during spring melt',
    'hurricane-related flooding',
    'flash flooding from thunderstorms',
    'coastal storm surge',
    'dam release and heavy precipitation'
  ];
  
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const yearsAgo = Math.floor(Math.random() * 10) + 1;
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearsAgo);
  
  return {
    date: date.toISOString().split('T')[0],
    severity,
    stage: Math.random() * 10 + 1,
    description: `Flooding from ${causes[Math.floor(Math.random() * causes.length)]}`,
    damages: Math.random() > 0.5 ? `Estimated $${Math.floor(Math.random() * 400000 + 50000).toLocaleString()} in damages` : undefined
  };
}

export function generateRandomMonitoringStation(): FloodMonitoringStation {
  const rivers = ['Cedar River', 'Mill Creek', 'Fox River', 'Pine Creek', 'Oak Creek'];
  const locations = ['Downtown', 'Mill Road', 'Main Street', 'Highway 50', 'County Road B'];
  
  const floodStage = Math.random() * 15 + 10;
  const currentStage = Math.random() * 20 + 5;
  const status = currentStage > floodStage + 5 ? 'Major' :
                 currentStage > floodStage + 2 ? 'Moderate' :
                 currentStage > floodStage ? 'Minor' : 'Normal';
  
  return {
    id: `USGS-${Math.floor(Math.random() * 10000000)}`,
    name: `${rivers[Math.floor(Math.random() * rivers.length)]} at ${locations[Math.floor(Math.random() * locations.length)]}`,
    distance: Number((Math.random() * 15 + 2).toFixed(1)),
    currentStage: Number(currentStage.toFixed(1)),
    floodStage: Number(floodStage.toFixed(1)),
    status,
    url: `https://waterdata.usgs.gov/monitoring-location/${Math.floor(Math.random() * 10000000)}`
  };
}

// Flood data validation functions
export function validateFloodData(floodData: FEMAFloodData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields validation
  if (!floodData.floodZone) errors.push('Flood zone is required');
  if (!floodData.floodZoneDescription) errors.push('Flood zone description is required');
  if (!floodData.riskLevel) errors.push('Risk level is required');
  if (typeof floodData.riskScore !== 'number' || floodData.riskScore < 0 || floodData.riskScore > 100) {
    errors.push('Risk score must be a number between 0 and 100');
  }
  
  // Historical floods validation
  if (floodData.historicalFloods.length > 0) {
    floodData.historicalFloods.forEach((flood, index) => {
      if (!flood.date) errors.push(`Historical flood ${index + 1}: date is required`);
      if (!flood.severity) errors.push(`Historical flood ${index + 1}: severity is required`);
      if (typeof flood.stage !== 'number' || flood.stage < 0) {
        errors.push(`Historical flood ${index + 1}: stage must be a positive number`);
      }
    });
  }
  
  // Monitoring stations validation
  if (floodData.nearbyMonitoringStations.length > 0) {
    floodData.nearbyMonitoringStations.forEach((station, index) => {
      if (!station.id) errors.push(`Monitoring station ${index + 1}: ID is required`);
      if (!station.name) errors.push(`Monitoring station ${index + 1}: name is required`);
      if (typeof station.distance !== 'number' || station.distance < 0) {
        errors.push(`Monitoring station ${index + 1}: distance must be a positive number`);
      }
    });
  }
  
  // Insurance analysis validation
  if (!floodData.floodInsuranceAnalysis) {
    errors.push('Flood insurance analysis is required');
  } else {
    const { estimatedPremium } = floodData.floodInsuranceAnalysis;
    if (typeof estimatedPremium.building !== 'number' || estimatedPremium.building < 0) {
      errors.push('Building premium must be a positive number');
    }
    if (typeof estimatedPremium.contents !== 'number' || estimatedPremium.contents < 0) {
      errors.push('Contents premium must be a positive number');
    }
    if (estimatedPremium.total !== estimatedPremium.building + estimatedPremium.contents) {
      errors.push('Total premium must equal building + contents premiums');
    }
  }
  
  // Elevation data validation
  if (!floodData.elevationData) {
    errors.push('Elevation data is required');
  } else {
    if (typeof floodData.elevationData.groundElevation !== 'number') {
      errors.push('Ground elevation must be a number');
    }
    if (typeof floodData.elevationData.elevationConfidence !== 'number' || 
        floodData.elevationData.elevationConfidence < 0 || 
        floodData.elevationData.elevationConfidence > 100) {
      errors.push('Elevation confidence must be a number between 0 and 100');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Test component for flood risk visualization
export function FloodDataTestComponent({ floodData }: { floodData: FEMAFloodData }) {
  const validation = validateFloodData(floodData);
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Flood Data Test Results</h3>
      
      <div className="space-y-2">
        <div className={`p-2 rounded ${validation.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Status: {validation.isValid ? 'Valid' : 'Invalid'}
        </div>
        
        {!validation.isValid && (
          <div className="bg-red-50 p-3 rounded">
            <h4 className="font-medium text-red-800 mb-1">Validation Errors:</h4>
            <ul className="text-sm text-red-700 list-disc list-inside">
              {validation.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Zone:</strong> {floodData.floodZone}
          </div>
          <div>
            <strong>Risk Score:</strong> {floodData.riskScore}/100
          </div>
          <div>
            <strong>Historical Floods:</strong> {floodData.historicalFloods.length}
          </div>
          <div>
            <strong>Monitoring Stations:</strong> {floodData.nearbyMonitoringStations.length}
          </div>
        </div>
      </div>
    </div>
  );
}

// Performance testing utilities
export function measureFloodDataProcessingTime(floodData: FEMAFloodData): number {
  const startTime = performance.now();
  
  // Simulate flood data processing
  validateFloodData(floodData);
  
  const endTime = performance.now();
  return endTime - startTime;
}

// Mock API response generator
export function generateMockFEMAResponse(lat: number, lng: number): Promise<FEMAFloodData> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate flood data based on coordinates
      const isCoastal = Math.abs(lat) < 35 && Math.abs(lng) > 90;
      const isRiverValley = Math.random() > 0.7;
      
      if (isCoastal) {
        resolve(mockCoastalFloodData);
      } else if (isRiverValley) {
        resolve(mockFloodData);
      } else {
        resolve(mockMinimalFloodData);
      }
    }, Math.random() * 1000 + 500); // 500-1500ms delay
  });
}

// AVM validation function (updated type)
export function validateAVMData(avmData: Record<string, unknown>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (typeof avmData.estimatedValue !== 'number' || avmData.estimatedValue <= 0) {
    errors.push('Estimated value must be a positive number');
  }
  
  if (typeof avmData.confidence !== 'number' || avmData.confidence < 0 || avmData.confidence > 1) {
    errors.push('Confidence must be a number between 0 and 1');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

const TestUtilsExport = {
  mockSearchResults,
  mockAVMData,
  mockPublicRecords,
  testConfig,
  testSetup,
  exampleTests,
  mockFloodData,
  mockMinimalFloodData,
  mockCoastalFloodData,
  generateRandomFloodEvent,
  generateRandomMonitoringStation,
  validateFloodData,
  FloodDataTestComponent,
  measureFloodDataProcessingTime,
  generateMockFEMAResponse
};

export default TestUtilsExport; 