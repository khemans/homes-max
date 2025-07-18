import { useState } from 'react';
import { Coordinates, MLSResult, AVMResult, PublicRecordsData, InsuranceClaim, FireRisk, FloodRisk, CotalityData } from '@/types/property';
import { getConfig } from '@/config/app';
import { getMockCoords } from '@/config/mockData';
import { cache, APICache } from '@/utils/cache';
import { measureAsync } from '@/utils/performance';

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



export const usePropertyData = (): UsePropertyDataReturn => {
  const config = getConfig();
  
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

  const fetchMLS = measureAsync(async (address: string) => {
    if (!config.features.enableAVM) return;
    
    setMlsLoading(true);
    setMlsError('');
    
    // Check cache first
    const cacheKey = APICache.getMLSKey(address);
    const cached = cache.get<MLSResult[]>(cacheKey);
    if (cached) {
      setMlsResults(cached);
      setMlsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${config.api.endpoints.mls}?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      const results = data.results || [];
      
      // Cache results
      cache.set(cacheKey, results);
      setMlsResults(results);
    } catch {
      setMlsError('Failed to load MLS data');
      setMlsResults([]);
    } finally {
      setMlsLoading(false);
    }
  }, 'fetchMLS');

  const fetchAVM = measureAsync(async (address: string) => {
    if (!config.features.enableAVM) return;
    
    setAvmLoading(true);
    setAvmError('');
    
    // Check cache first
    const cacheKey = APICache.getAVMKey(address);
    const cached = cache.get<AVMResult>(cacheKey);
    if (cached) {
      setAvmResult(cached);
      setAvmLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${config.api.endpoints.avm}?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      
      // Cache results
      cache.set(cacheKey, data);
      setAvmResult(data);
    } catch {
      setAvmError('Failed to load AVM data');
      setAvmResult(null);
    } finally {
      setAvmLoading(false);
    }
  }, 'fetchAVM');

  const fetchPublicRecords = measureAsync(async (address: string) => {
    if (!config.features.enablePublicRecords) return;
    
    setPublicRecordsLoading(true);
    setPublicRecordsError('');
    
    // Check cache first
    const cacheKey = APICache.getPublicRecordsKey(address);
    const cached = cache.get<PublicRecordsData>(cacheKey);
    if (cached) {
      setPublicRecords(cached);
      setPublicRecordsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${config.api.endpoints.publicRecords}?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      
      // Cache results
      cache.set(cacheKey, data);
      setPublicRecords(data);
    } catch {
      setPublicRecordsError('Failed to load public records');
      setPublicRecords(null);
    } finally {
      setPublicRecordsLoading(false);
    }
  }, 'fetchPublicRecords');

  const fetchRiskData = measureAsync(async (address: string) => {
    if (!config.features.enableRiskAssessment) return;
    
    setRiskLoading(true);
    setRiskError('');
    
    // Check cache first
    const cacheKey = APICache.getRiskKey(address);
    const cached = cache.get<{
      insuranceClaims?: InsuranceClaim[];
      fireRisk?: FireRisk;
      floodRisk?: FloodRisk;
      cotality?: CotalityData;
    }>(cacheKey);
    if (cached) {
      setInsuranceClaims(cached.insuranceClaims || []);
      setFireRisk(cached.fireRisk || null);
      setFloodRisk(cached.floodRisk || null);
      setCotality(cached.cotality || null);
      setRiskLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${config.api.endpoints.risk}?address=${encodeURIComponent(address)}`);
      const data = await response.json();
      
      // Cache results
      cache.set(cacheKey, data);
      
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
  }, 'fetchRiskData');

  const fetchCoordinates = measureAsync(async (address: string) => {
    if (!config.features.enableMapIntegration) return;
    
    // Use mock coords for known addresses
    const mock = getMockCoords(address);
    if (mock) {
      setCoords(mock);
      setGeoError("");
      return;
    }
    
    // Check cache first
    const cacheKey = APICache.getAddressSearchKey(address);
    const cached = cache.get<Coordinates>(cacheKey);
    if (cached) {
      setCoords(cached);
      setGeoError("");
      return;
    }
    
    // Otherwise, geocode using our enhanced address search API
    setGeoLoading(true);
    setGeoError("");
    try {
      const response = await fetch(`${config.api.endpoints.addressSearch}?q=${encodeURIComponent(address)}&validate=true`);
      const data = await response.json();
      if (data.geocoding && data.geocoding.lat && data.geocoding.lng) {
        const coords = { lat: data.geocoding.lat, lng: data.geocoding.lng };
        
        // Cache coordinates
        cache.set(cacheKey, coords);
        setCoords(coords);
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
  }, 'fetchCoordinates');

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