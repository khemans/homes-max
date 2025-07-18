// Shared types for property-related components

export interface InsuranceClaim {
  type: string;
  date: string;
  amount: number;
  status: string;
}

export interface FireRisk {
  score: string;
  lastInspection: string;
  notes: string;
}

export interface FloodRisk {
  zone: string;
  riskLevel: string;
  lastFlood?: string;
}

export interface CotalityData {
  cotalityPropertyId: string;
  wildfireRiskScore: string;
  floodRiskScore: string;
  earthquakeRiskScore: string;
  reportUrl: string;
}

export interface Assessment {
  assessedValue?: number;
  landValue?: number;
  taxAmount?: number;
}

export interface Permit {
  permitType: string;
  permitNumber: string;
  issueDate: string;
  contractor?: string;
  value?: number;
}

export interface Flood {
  zone?: string;
  riskLevel?: string;
  insuranceRequired?: boolean;
}

export interface Demographics {
  medianIncome?: number;
  walkScore?: number;
  crimeRate?: string;
}

export interface PublicRecordsData {
  assessment?: Assessment;
  permits?: Permit[];
  flood?: Flood;
  demographics?: Demographics;
}

export interface MLSResult {
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  status: string;
  daysOnMarket: number;
  lotSize: string;
  garage: string;
  realtor: string;
  brokeragePhone: string;
  description: string;
}

export interface AVMResult {
  avmValue: number;
  confidence: string;
  lastUpdated: string;
  comparables: Array<{
    address: string;
    soldPrice: number;
    soldDate: string;
    sqft: number;
    distance: number;
  }>;
}

export interface Coordinates {
  lat: number;
  lng: number;
} 