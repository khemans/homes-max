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
interface CoreLogicData {
  coreLogicPropertyId: string;
  wildfireRiskScore: number;
  floodRiskScore: number;
  earthquakeRiskScore: number;
  reportUrl: string;
}
interface RiskData {
  insuranceClaims: InsuranceClaim[];
  fireRisk: FireRisk;
  floodRisk: FloodRisk;
  coreLogic?: CoreLogicData;
}

// Mock risk data keyed by address (lowercase)
const mockRiskData: Record<string, RiskData> = {
  '123 main st': {
    insuranceClaims: [
      { date: '2021-06-15', type: 'Water Damage', amount: 12000, status: 'Paid' },
      { date: '2019-11-02', type: 'Fire', amount: 35000, status: 'Paid' },
    ],
    fireRisk: { score: 7.2, lastInspection: '2023-03-10', notes: 'Moderate risk due to nearby vegetation.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2018-09-12' },
    coreLogic: {
      coreLogicPropertyId: 'CL-123456',
      wildfireRiskScore: 8,
      floodRiskScore: 7,
      earthquakeRiskScore: 3,
      reportUrl: 'https://store.corelogic.com/search/report/CL-123456',
    },
  },
  '456 oak ave': {
    insuranceClaims: [
      { date: '2022-04-10', type: 'Wind', amount: 4000, status: 'Paid' }
    ],
    fireRisk: { score: 3.1, lastInspection: '2022-08-22', notes: 'Low risk, recent upgrades.' },
    floodRisk: { zone: 'X', riskLevel: 'Low', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-456789',
      wildfireRiskScore: 2,
      floodRiskScore: 1,
      earthquakeRiskScore: 4,
      reportUrl: 'https://store.corelogic.com/search/report/CL-456789',
    },
  },
  '1234 larimer st': {
    insuranceClaims: [
      { date: '2020-01-10', type: 'Theft', amount: 5000, status: 'Paid' }
    ],
    fireRisk: { score: 5.5, lastInspection: '2021-12-01', notes: 'Average risk, urban area.' },
    floodRisk: { zone: 'A', riskLevel: 'Moderate', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-789012',
      wildfireRiskScore: 5,
      floodRiskScore: 4,
      earthquakeRiskScore: 2,
      reportUrl: 'https://store.corelogic.com/search/report/CL-789012',
    },
  },
  '5678 colfax ave': {
    insuranceClaims: [
      { date: '2018-07-22', type: 'Hail', amount: 8000, status: 'Paid' },
      { date: '2022-03-15', type: 'Water Damage', amount: 15000, status: 'Pending' }
    ],
    fireRisk: { score: 6.0, lastInspection: '2023-02-10', notes: 'Moderate risk, older roof.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2020-05-30' },
    coreLogic: {
      coreLogicPropertyId: 'CL-135790',
      wildfireRiskScore: 7,
      floodRiskScore: 6,
      earthquakeRiskScore: 5,
      reportUrl: 'https://store.corelogic.com/search/report/CL-135790',
    },
  },
  '9012 broadway': {
    insuranceClaims: [
      { date: '2021-08-01', type: 'Fire', amount: 18000, status: 'Paid' }
    ],
    fireRisk: { score: 2.0, lastInspection: '2023-01-20', notes: 'Very low risk, recent fire department inspection.' },
    floodRisk: { zone: 'X', riskLevel: 'Low', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-246801',
      wildfireRiskScore: 1,
      floodRiskScore: 2,
      earthquakeRiskScore: 1,
      reportUrl: 'https://store.corelogic.com/search/report/CL-246801',
    },
  },
  '3456 speer blvd': {
    insuranceClaims: [
      { date: '2019-05-12', type: 'Vandalism', amount: 2000, status: 'Paid' }
    ],
    fireRisk: { score: 4.2, lastInspection: '2022-06-15', notes: 'Average risk, urban area.' },
    floodRisk: { zone: 'B', riskLevel: 'Moderate', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-369123',
      wildfireRiskScore: 4,
      floodRiskScore: 3,
      earthquakeRiskScore: 4,
      reportUrl: 'https://store.corelogic.com/search/report/CL-369123',
    },
  },
  '7890 alameda ave': {
    insuranceClaims: [
      { date: '2017-09-14', type: 'Flood', amount: 22000, status: 'Paid' }
    ],
    fireRisk: { score: 6.8, lastInspection: '2022-10-05', notes: 'Above average risk, older wiring.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2017-09-14' },
    coreLogic: {
      coreLogicPropertyId: 'CL-482103',
      wildfireRiskScore: 6,
      floodRiskScore: 5,
      earthquakeRiskScore: 3,
      reportUrl: 'https://store.corelogic.com/search/report/CL-482103',
    },
  },
  '2345 colorado blvd': {
    insuranceClaims: [
      { date: '2023-03-22', type: 'Water Damage', amount: 9000, status: 'Paid' }
    ],
    fireRisk: { score: 3.9, lastInspection: '2023-04-10', notes: 'Low risk, new construction.' },
    floodRisk: { zone: 'C', riskLevel: 'Low', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-591476',
      wildfireRiskScore: 2,
      floodRiskScore: 1,
      earthquakeRiskScore: 2,
      reportUrl: 'https://store.corelogic.com/search/report/CL-591476',
    },
  },
  '6789 evans ave': {
    insuranceClaims: [
      { date: '2022-11-11', type: 'Wind', amount: 3000, status: 'Paid' }
    ],
    fireRisk: { score: 5.0, lastInspection: '2022-09-09', notes: 'Average risk, some brush nearby.' },
    floodRisk: { zone: 'A', riskLevel: 'Moderate', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-602587',
      wildfireRiskScore: 5,
      floodRiskScore: 4,
      earthquakeRiskScore: 3,
      reportUrl: 'https://store.corelogic.com/search/report/CL-602587',
    },
  },
  '1122 hampden ave': {
    insuranceClaims: [
      { date: '2021-07-07', type: 'Fire', amount: 25000, status: 'Paid' }
    ],
    fireRisk: { score: 7.5, lastInspection: '2023-03-01', notes: 'High risk, near open space.' },
    floodRisk: { zone: 'AE', riskLevel: 'High', lastFlood: '2019-08-20' },
    coreLogic: {
      coreLogicPropertyId: 'CL-713698',
      wildfireRiskScore: 7,
      floodRiskScore: 6,
      earthquakeRiskScore: 4,
      reportUrl: 'https://store.corelogic.com/search/report/CL-713698',
    },
  },
  '3344 mississippi ave': {
    insuranceClaims: [
      { date: '2020-10-10', type: 'Theft', amount: 4000, status: 'Paid' }
    ],
    fireRisk: { score: 4.8, lastInspection: '2022-11-11', notes: 'Average risk, urban area.' },
    floodRisk: { zone: 'B', riskLevel: 'Moderate', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-824709',
      wildfireRiskScore: 3,
      floodRiskScore: 2,
      earthquakeRiskScore: 1,
      reportUrl: 'https://store.corelogic.com/search/report/CL-824709',
    },
  },
  '5566 yale ave': {
    insuranceClaims: [
      { date: '2018-12-12', type: 'Hail', amount: 7000, status: 'Paid' }
    ],
    fireRisk: { score: 3.3, lastInspection: '2023-02-15', notes: 'Low risk, new roof.' },
    floodRisk: { zone: 'X', riskLevel: 'Low', lastFlood: null },
    coreLogic: {
      coreLogicPropertyId: 'CL-935810',
      wildfireRiskScore: 1,
      floodRiskScore: 1,
      earthquakeRiskScore: 2,
      reportUrl: 'https://store.corelogic.com/search/report/CL-935810',
    },
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = (searchParams.get('address') || '').toLowerCase();
  const data = mockRiskData[address] || {
    insuranceClaims: [],
    fireRisk: { score: 0, lastInspection: '', notes: '' },
    floodRisk: { zone: '', riskLevel: '', lastFlood: null },
  };
  return NextResponse.json(data);
} 