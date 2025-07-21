// FEMA Flood Data Integration - Proof of Concept
// Enhanced flood risk assessment using FEMA's National Flood Hazard Layer

export interface FEMAFloodData {
  floodZone: string;
  floodZoneDescription: string;
  baseFloodElevation?: number;
  floodInsuranceRequired: boolean;
  annualChanceFlooding: string;
  firmEffectiveDate: string;
  countyName: string;
  riskLevel: 'Minimal' | 'Moderate' | 'High' | 'Very High';
  insuranceRecommendation: string;
}

interface FEMAResponse {
  features: Array<{
    attributes: {
      FLD_ZONE: string;
      ZONE_SUBTY: string;
      STATIC_BFE: number;
      BFE_UNITS: string;
      DFIRM_ID: string;
      EFF_DATE: number;
      CNTY_NAME: string;
    };
  }>;
}

/**
 * Enhanced FEMA flood risk assessment
 * Uses NFHL (National Flood Hazard Layer) API for detailed flood zone information
 */
export class FEMAFloodService {
  private readonly baseURL = 'https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer';
  
  /**
   * Get comprehensive flood data for coordinates
   */
  async getFloodData(lat: number, lng: number): Promise<FEMAFloodData | null> {
    try {
      // Query FEMA NFHL for flood zone data
      const response = await fetch(
        `${this.baseURL}/28/query?` +
        `geometry=${lng},${lat}&` +
        `geometryType=esriGeometryPoint&` +
        `inSR=4326&` +
        `spatialRel=esriSpatialRelWithin&` +
        `returnGeometry=false&` +
        `outFields=FLD_ZONE,ZONE_SUBTY,STATIC_BFE,BFE_UNITS,DFIRM_ID,EFF_DATE,CNTY_NAME&` +
        `f=json`
      );
      
      if (!response.ok) {
        console.warn('FEMA API request failed:', response.status);
        return null;
      }
      
      const data: FEMAResponse = await response.json();
      
      if (!data.features || data.features.length === 0) {
        // Property not in mapped flood zone
        return this.getDefaultFloodData();
      }
      
      const floodZone = data.features[0].attributes;
      return this.processFloodZoneData(floodZone);
      
    } catch (error) {
      console.error('Error fetching FEMA flood data:', error);
      return null;
    }
  }
  
  /**
   * Process raw FEMA data into user-friendly format
   */
  private processFloodZoneData(zoneData: Record<string, unknown>): FEMAFloodData {
    const zone = (zoneData.FLD_ZONE as string) || 'X';
    const subtype = zoneData.ZONE_SUBTY as string | undefined;
    const bfe = zoneData.STATIC_BFE as number | undefined;
    const county = (zoneData.CNTY_NAME as string) || 'Unknown County';
    const effectiveDate = this.formatFIRMDate(zoneData.EFF_DATE as number | undefined);
    
    return {
      floodZone: zone,
      floodZoneDescription: this.getZoneDescription(zone, subtype),
      baseFloodElevation: bfe && bfe > 0 ? bfe : undefined,
      floodInsuranceRequired: this.isInsuranceRequired(zone),
      annualChanceFlooding: this.getAnnualChance(zone),
      firmEffectiveDate: effectiveDate,
      countyName: county,
      riskLevel: this.getRiskLevel(zone),
      insuranceRecommendation: this.getInsuranceRecommendation(zone)
    };
  }
  
  /**
   * Get flood zone description
   */
  private getZoneDescription(zone: string, subtype?: string): string {
    const zoneDescriptions: Record<string, string> = {
      'A': '1% annual chance flood (100-year flood), no base flood elevation determined',
      'AE': '1% annual chance flood (100-year flood) with base flood elevation',
      'AH': '1% annual chance flood (100-year flood), usually areas of ponding',
      'AO': '1% annual chance flood (100-year flood), usually sheet flow on sloping terrain',
      'AR': '1% annual chance flood that results from failure of flood control system',
      'A99': '1% annual chance flood to be protected by Federal flood control system',
      'V': '1% annual chance coastal flood with velocity hazard (wave action)',
      'VE': '1% annual chance coastal flood with velocity hazard and base flood elevation',
      'X': 'Areas of minimal flood hazard (0.2% annual chance or 500-year flood)',
      'D': 'Areas with undetermined but possible flood hazards'
    };
    
    let description = zoneDescriptions[zone] || `Flood Zone ${zone}`;
    if (subtype) {
      description += ` (${subtype})`;
    }
    return description;
  }
  
  /**
   * Determine if flood insurance is required
   */
  private isInsuranceRequired(zone: string): boolean {
    const highRiskZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE'];
    return highRiskZones.includes(zone);
  }
  
  /**
   * Get annual chance of flooding
   */
  private getAnnualChance(zone: string): string {
    if (['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE'].includes(zone)) {
      return '1% (100-year flood)';
    } else if (zone === 'X') {
      return '0.2% (500-year flood)';
    } else {
      return 'Undetermined';
    }
  }
  
  /**
   * Calculate risk level
   */
  private getRiskLevel(zone: string): 'Minimal' | 'Moderate' | 'High' | 'Very High' {
    if (['V', 'VE'].includes(zone)) {
      return 'Very High';
    } else if (['A', 'AE', 'AH', 'AO'].includes(zone)) {
      return 'High';
    } else if (['AR', 'A99'].includes(zone)) {
      return 'Moderate';
    } else {
      return 'Minimal';
    }
  }
  
  /**
   * Get insurance recommendation
   */
  private getInsuranceRecommendation(zone: string): string {
    if (['V', 'VE'].includes(zone)) {
      return 'Flood insurance required - coastal high-hazard area with wave action';
    } else if (['A', 'AE', 'AH', 'AO'].includes(zone)) {
      return 'Flood insurance required for federally backed mortgages';
    } else if (['AR', 'A99'].includes(zone)) {
      return 'Flood insurance recommended - moderate risk area';
    } else if (zone === 'X') {
      return 'Flood insurance optional but recommended for complete protection';
    } else {
      return 'Consult with local authorities for flood risk assessment';
    }
  }
  
  /**
   * Format FIRM effective date
   */
  private formatFIRMDate(timestamp?: number): string {
    if (!timestamp) return 'Unknown';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  }
  
  /**
   * Default flood data for unmapped areas
   */
  private getDefaultFloodData(): FEMAFloodData {
    return {
      floodZone: 'X',
      floodZoneDescription: 'Area of minimal flood hazard',
      floodInsuranceRequired: false,
      annualChanceFlooding: 'Less than 0.2%',
      firmEffectiveDate: 'Unknown',
      countyName: 'Unknown County',
      riskLevel: 'Minimal',
      insuranceRecommendation: 'Flood insurance optional but recommended for complete protection'
    };
  }
}

/**
 * Utility function for easy integration
 */
export async function getEnhancedFloodData(lat: number, lng: number): Promise<FEMAFloodData | null> {
  const service = new FEMAFloodService();
  return service.getFloodData(lat, lng);
}

/**
 * Example usage in property details
 */
export const exampleUsage = {
  // In your property component:
  async displayFloodInfo(coordinates: { lat: number, lng: number }) {
    const floodData = await getEnhancedFloodData(coordinates.lat, coordinates.lng);
    
    if (floodData) {
      return {
        zone: floodData.floodZone,
        description: floodData.floodZoneDescription,
        risk: floodData.riskLevel,
        insurance: floodData.insuranceRecommendation,
        effectiveDate: floodData.firmEffectiveDate
      };
    }
    
    return null;
  }
}; 