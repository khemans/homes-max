import { useState } from 'react';
import { Coordinates, MLSResult, AVMResult, PublicRecordsData, InsuranceClaim, FireRisk, FloodRisk, CotalityData } from '@/types/property';

interface UsePropertyDataReturn {
  // State
  mlsResults: MLSResult[];
  avmResult: AVMResult | null;
  publicRecords: PublicRecordsData | null;
  insuranceClaims: InsuranceClaim[];
  fireRisk: FireRisk | null;
  floodRisk: FloodRisk | null;
  cotality: CotalityData | null;
  coords: Coordinates | null;
  
  // Loading states
  mlsLoading: boolean;
  avmLoading: boolean;
  publicRecordsLoading: boolean;
  riskLoading: boolean;
  geoLoading: boolean;
  
  // Error states
  mlsError: string;
  avmError: string;
  publicRecordsError: string;
  riskError: string;
  geoError: string;
  
  // Actions
  fetchPropertyData: (address: string) => void;
}

// Helper to get mock coordinates for known addresses
function getMockCoords(address: string): Coordinates | null {
  if (!address) return null;
  const lower = address.toLowerCase();
  if (lower.includes("123 main st")) return { lat: 37.779, lng: -122.4194 };
  if (lower.includes("456 oak ave")) return { lat: 37.781, lng: -122.417 };
  // Denver metro area coordinates
  if (lower.includes("1234 larimer st")) return { lat: 39.7505, lng: -104.9963 };
  if (lower.includes("5678 colfax ave")) return { lat: 39.7402, lng: -104.9847 };
  if (lower.includes("9012 broadway")) return { lat: 39.7213, lng: -104.9877 };
  if (lower.includes("3456 speer blvd")) return { lat: 39.7325, lng: -105.0087 };
  if (lower.includes("7890 alameda ave")) return { lat: 39.7156, lng: -104.9876 };
  if (lower.includes("2345 colorado blvd")) return { lat: 39.7234, lng: -104.9456 };
  if (lower.includes("6789 evans ave")) return { lat: 39.6789, lng: -104.9876 };
  if (lower.includes("1122 hampden ave")) return { lat: 39.6543, lng: -104.9876 };
  if (lower.includes("3344 mississippi ave")) return { lat: 39.7234, lng: -104.9234 };
  if (lower.includes("5566 yale ave")) return { lat: 39.7123, lng: -104.9345 };
  return null;
}

export const usePropertyData = (): UsePropertyDataReturn => {
  // State
  const [mlsResults, setMlsResults] = useState<MLSResult[]>([]);
  const [avmResult, setAvmResult] = useState<AVMResult | null>(null);
  const [publicRecords, setPublicRecords] = useState<PublicRecordsData | null>(null);
  const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[]>([]);
  const [fireRisk, setFireRisk] = useState<FireRisk | null>(null);
  const [floodRisk, setFloodRisk] = useState<FloodRisk | null>(null);
  const [cotality, setCotality] = useState<CotalityData | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  
  // Loading states
  const [mlsLoading, setMlsLoading] = useState(false);
  const [avmLoading, setAvmLoading] = useState(false);
  const [publicRecordsLoading, setPublicRecordsLoading] = useState(false);
  const [riskLoading, setRiskLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  
  // Error states
  const [mlsError, setMlsError] = useState('');
  const [avmError, setAvmError] = useState('');
  const [publicRecordsError, setPublicRecordsError] = useState('');
  const [riskError, setRiskError] = useState('');
  const [geoError, setGeoError] = useState('');

  const fetchMLS = async (address: string) => {
    setMlsLoading(true);
    setMlsError('');
    try {
      const response = await fetch(`/api/mls?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      setMlsResults(data.results || []);
    } catch {
      setMlsError('Failed to load MLS data');
      setMlsResults([]);
    } finally {
      setMlsLoading(false);
    }
  };

  const fetchAVM = async (address: string) => {
    setAvmLoading(true);
    setAvmError('');
    try {
      const response = await fetch(`/api/avm?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      setAvmResult(data);
    } catch {
      setAvmError('Failed to load AVM data');
      setAvmResult(null);
    } finally {
      setAvmLoading(false);
    }
  };

  const fetchPublicRecords = async (address: string) => {
    setPublicRecordsLoading(true);
    setPublicRecordsError('');
    try {
      const response = await fetch(`/api/public-records?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      setPublicRecords(data);
    } catch {
      setPublicRecordsError('Failed to load public records');
      setPublicRecords(null);
    } finally {
      setPublicRecordsLoading(false);
    }
  };

  const fetchRiskData = async (address: string) => {
    setRiskLoading(true);
    setRiskError('');
    try {
      const response = await fetch(`/api/risk?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      setInsuranceClaims(data.insuranceClaims || []);
      setFireRisk(data.fireRisk || null);
      setFloodRisk(data.floodRisk || null);
      setCotality(data.cotality || null);
    } catch {
      setRiskError('Failed to load risk data');
      setInsuranceClaims([]);
      setFireRisk(null);
      setFloodRisk(null);
      setCotality(null);
    } finally {
      setRiskLoading(false);
    }
  };

  const fetchCoordinates = async (address: string) => {
    // Use mock coords for known addresses
    const mock = getMockCoords(address);
    if (mock) {
      setCoords(mock);
      setGeoError("");
      return;
    }
    
    // Otherwise, geocode using our enhanced address search API
    setGeoLoading(true);
    setGeoError("");
    try {
      const response = await fetch(`/api/address-search?q=${encodeURIComponent(address)}&validate=true`);
      const data = await response.json();
      if (data.geocoding && data.geocoding.lat && data.geocoding.lng) {
        setCoords({ lat: data.geocoding.lat, lng: data.geocoding.lng });
        setGeoError("");
      } else {
        setCoords(null);
        setGeoError("Could not find this address on the map.");
      }
    } catch {
      setCoords(null);
      setGeoError("Error looking up this address.");
    } finally {
      setGeoLoading(false);
    }
  };

  const fetchPropertyData = (address: string) => {
    if (!address) return;
    
    // Fetch all data in parallel
    Promise.all([
      fetchMLS(address),
      fetchAVM(address),
      fetchPublicRecords(address),
      fetchRiskData(address),
      fetchCoordinates(address)
    ]);
  };

  return {
    // State
    mlsResults,
    avmResult,
    publicRecords,
    insuranceClaims,
    fireRisk,
    floodRisk,
    cotality,
    coords,
    
    // Loading states
    mlsLoading,
    avmLoading,
    publicRecordsLoading,
    riskLoading,
    geoLoading,
    
    // Error states
    mlsError,
    avmError,
    publicRecordsError,
    riskError,
    geoError,
    
    // Actions
    fetchPropertyData
  };
}; 