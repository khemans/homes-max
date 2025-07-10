import { NextRequest, NextResponse } from 'next/server';

// Add explicit types for risk data
interface InsuranceClaim {
  date: string;
  type: string;
  amount: number;
  status: string;
}
interface FireRisk {
  score: number;
  lastInspection: string;
  notes: string;
}
interface FloodRisk {
  zone: string;
  riskLevel: string;
  lastFlood: string | null;
}
interface CotalityData {
  cotalityPropertyId: string;
  wildfireRiskScore: number;
  floodRiskScore: number;
  earthquakeRiskScore: number;
  reportUrl: string;
}
interface RiskData {
  insuranceClaims: InsuranceClaim[];
  fireRisk: FireRisk;
  floodRisk: FloodRisk;
  cotality?: CotalityData;
}

// Mock risk data keyed by address (lowercase)
const mockRiskData: Record<string, RiskData> = {
  '123 main st': {
    insuranceClaims: [
      { date: '2023-05-01', type: 'Water Damage', amount: 12000, status: 'Paid' }
    ],
    fireRisk: { score: 7.2, lastInspection: '2023-03-10', notes: 'Moderate risk due to nearby vegetation.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2018-09-12' },
    cotality: {
      cotalityPropertyId: 'CL-123456',
      wildfireRiskScore: 8,
      floodRiskScore: 7,
      earthquakeRiskScore: 3,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '456 oak ave': {
    insuranceClaims: [
      { date: '2022-04-10', type: 'Wind', amount: 4000, status: 'Paid' }
    ],
    fireRisk: { score: 3.1, lastInspection: '2022-08-22', notes: 'Low risk, recent upgrades.' },
    floodRisk: { zone: 'X', riskLevel: 'Low', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-456789',
      wildfireRiskScore: 2,
      floodRiskScore: 1,
      earthquakeRiskScore: 4,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '1234 larimer st': {
    insuranceClaims: [
      { date: '2020-01-10', type: 'Theft', amount: 5000, status: 'Paid' }
    ],
    fireRisk: { score: 5.5, lastInspection: '2021-12-01', notes: 'Average risk, urban area.' },
    floodRisk: { zone: 'A', riskLevel: 'Moderate', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-789012',
      wildfireRiskScore: 5,
      floodRiskScore: 4,
      earthquakeRiskScore: 2,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '5678 colfax ave': {
    insuranceClaims: [
      { date: '2018-07-22', type: 'Hail', amount: 8000, status: 'Paid' },
      { date: '2022-03-15', type: 'Water Damage', amount: 15000, status: 'Pending' }
    ],
    fireRisk: { score: 6.0, lastInspection: '2023-02-10', notes: 'Moderate risk, older roof.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2020-05-30' },
    cotality: {
      cotalityPropertyId: 'CL-135790',
      wildfireRiskScore: 7,
      floodRiskScore: 6,
      earthquakeRiskScore: 5,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '9012 broadway': {
    insuranceClaims: [
      { date: '2021-08-01', type: 'Fire', amount: 18000, status: 'Paid' }
    ],
    fireRisk: { score: 2.0, lastInspection: '2023-01-20', notes: 'Very low risk, recent fire department inspection.' },
    floodRisk: { zone: 'X', riskLevel: 'Low', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-246801',
      wildfireRiskScore: 1,
      floodRiskScore: 2,
      earthquakeRiskScore: 1,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '3456 speer blvd': {
    insuranceClaims: [
      { date: '2019-05-12', type: 'Vandalism', amount: 2000, status: 'Paid' }
    ],
    fireRisk: { score: 4.2, lastInspection: '2022-06-15', notes: 'Average risk, urban area.' },
    floodRisk: { zone: 'B', riskLevel: 'Moderate', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-369123',
      wildfireRiskScore: 4,
      floodRiskScore: 3,
      earthquakeRiskScore: 4,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '7890 alameda ave': {
    insuranceClaims: [
      { date: '2017-09-14', type: 'Flood', amount: 22000, status: 'Paid' }
    ],
    fireRisk: { score: 6.8, lastInspection: '2022-10-05', notes: 'Above average risk, older wiring.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2017-09-14' },
    cotality: {
      cotalityPropertyId: 'CL-482103',
      wildfireRiskScore: 6,
      floodRiskScore: 5,
      earthquakeRiskScore: 3,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '2345 colorado blvd': {
    insuranceClaims: [
      { date: '2023-03-22', type: 'Water Damage', amount: 9000, status: 'Paid' }
    ],
    fireRisk: { score: 3.9, lastInspection: '2023-04-10', notes: 'Low risk, new construction.' },
    floodRisk: { zone: 'C', riskLevel: 'Low', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-591476',
      wildfireRiskScore: 2,
      floodRiskScore: 1,
      earthquakeRiskScore: 2,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '6789 evans ave': {
    insuranceClaims: [
      { date: '2022-11-11', type: 'Wind', amount: 3000, status: 'Paid' }
    ],
    fireRisk: { score: 5.0, lastInspection: '2022-09-09', notes: 'Average risk, some brush nearby.' },
    floodRisk: { zone: 'A', riskLevel: 'Moderate', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-602587',
      wildfireRiskScore: 5,
      floodRiskScore: 4,
      earthquakeRiskScore: 3,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '1122 hampden ave': {
    insuranceClaims: [
      { date: '2021-07-07', type: 'Fire', amount: 25000, status: 'Paid' }
    ],
    fireRisk: { score: 7.5, lastInspection: '2023-03-01', notes: 'High risk, near open space.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2019-08-20' },
    cotality: {
      cotalityPropertyId: 'CL-713698',
      wildfireRiskScore: 7,
      floodRiskScore: 6,
      earthquakeRiskScore: 4,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '3344 mississippi ave': {
    insuranceClaims: [
      { date: '2020-10-10', type: 'Theft', amount: 4000, status: 'Paid' }
    ],
    fireRisk: { score: 4.8, lastInspection: '2022-11-11', notes: 'Average risk, urban area.' },
    floodRisk: { zone: 'B', riskLevel: 'Moderate', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-824709',
      wildfireRiskScore: 3,
      floodRiskScore: 2,
      earthquakeRiskScore: 1,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
  '5566 yale ave': {
    insuranceClaims: [
      { date: '2018-12-12', type: 'Hail', amount: 7000, status: 'Paid' }
    ],
    fireRisk: { score: 3.3, lastInspection: '2023-02-15', notes: 'Low risk, new roof.' },
    floodRisk: { zone: 'X', riskLevel: 'Low', lastFlood: null },
    cotality: {
      cotalityPropertyId: 'CL-935810',
      wildfireRiskScore: 1,
      floodRiskScore: 1,
      earthquakeRiskScore: 2,
      reportUrl: 'https://www.cotality.com/products/underwriting-center',
    },
  },
};

// Default fallback risk data for any property not explicitly listed
const defaultRiskData: RiskData = {
  insuranceClaims: [
    { date: '2022-05-15', type: 'Water Damage', amount: 8000, status: 'Paid' },
    { date: '2020-09-10', type: 'Wind', amount: 3500, status: 'Paid' }
  ],
  fireRisk: { score: 5.4, lastInspection: '2023-01-15', notes: 'Average risk, some brush nearby.' },
  floodRisk: { zone: 'A', riskLevel: 'Moderate', lastFlood: '2019-06-22' },
  cotality: {
    cotalityPropertyId: 'CL-DEFAULT',
    wildfireRiskScore: 5,
    floodRiskScore: 4,
    earthquakeRiskScore: 3,
    reportUrl: 'https://www.cotality.com/products/underwriting-center',
  },
};

// Helper to build a robust key: 'address, city, state' all lowercased and trimmed
function buildRiskKey(address: string, city: string, state: string): string {
  return `${address}, ${city}, ${state}`.toLowerCase().replace(/\s+/g, ' ').trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // Try to get address, city, and state from query params
  const address = (searchParams.get('address') || '').toLowerCase().trim();
  const city = (searchParams.get('city') || '').toLowerCase().trim();
  const state = (searchParams.get('state') || '').toLowerCase().trim();

  let key = '';
  if (address && city && state) {
    key = buildRiskKey(address, city, state);
  } else if (address) {
    // Try to parse city and state from address string if not provided
    // e.g., '1001 sunset blvd, los angeles, ca 90026'
    const match = address.match(/^(.*?),\s*([^,]+),\s*([a-z]{2})/i);
    if (match) {
      key = buildRiskKey(match[1], match[2], match[3]);
    } else {
      key = address;
    }
  }

  const data = mockRiskData[key] || defaultRiskData;
  return NextResponse.json(data);
} 