# 🏛️ Public Records API Integration

## Overview

Your **HouseMax** platform now includes a comprehensive **Public Records API** that integrates multiple free data sources to provide detailed property information beyond basic MLS data. This API enhances property searches with government data, assessments, permits, and neighborhood information.

**🆕 Recent Updates (v3.4):**
- **Consolidated Integration:** Building permits now appear exclusively within the Public Records section, eliminating duplicate displays
- **Enhanced Printable Reports:** All public records data is now included in printable property documents
- **Streamlined Architecture:** Removed redundant `/api/permits` endpoint in favor of unified public records API

## 🌟 **Key Features**

### **1. Multiple Data Sources Integration**
- **US Census Bureau API** - Demographics & neighborhood statistics
- **FEMA Flood Maps API** - Flood zone and risk assessments  
- **OpenStreetMap Nominatim** - Free geocoding services
- **Local Government APIs** - Property tax assessments and building permits
- **Crime Data APIs** - Safety and security information
- **Walk Score API** - Walkability and transportation scores

### **2. Comprehensive Property Data**
- ✅ **Tax Assessments** - Assessed values, land values, tax amounts
- ✅ **Building Permits** - Recent construction activity and improvements (consolidated in Public Records section)
- ✅ **Flood Risk Data** - FEMA flood zones and risk levels
- ✅ **Demographics** - Income, home values, crime rates, walkability
- ✅ **Property Coordinates** - Accurate latitude/longitude positioning
- ✅ **Printable Integration** - All data included in comprehensive property reports

## 🚀 **API Endpoints**

### **Single Property Lookup**
```
GET /api/public-records?address={address}
```

**Example:**
```bash
curl "http://localhost:3000/api/public-records?address=123 Main St, Los Angeles, CA"
```

### **Batch Processing (up to 10 addresses)**
```
POST /api/public-records
Content-Type: application/json

{
  "addresses": [
    "123 Main St, Los Angeles, CA",
    "456 Oak Ave, Miami, FL",
    "789 Pine Rd, Chicago, IL"
  ]
}
```

## 📊 **Response Structure**

```typescript
interface PublicRecordsResponse {
  success: boolean;
  data: {
    basic: {
      address: string;
      coordinates?: { lat: number; lng: number };
    };
    assessment?: {
      assessedValue: number;      // Property assessed value
      landValue: number;          // Land value only
      improvementValue: number;   // Building/improvement value
      assessmentYear: number;     // Year of assessment
      taxAmount: number;          // Annual property taxes
      taxRate: number;            // Tax rate percentage
    };
    permits?: Array<{
      permitNumber: string;       // Official permit number
      permitType: string;         // Building, Electrical, Plumbing, etc.
      description: string;        // Work description
      issuedDate: string;         // Date permit was issued
      value?: number;             // Estimated value of work
      status: string;             // Approved, Finaled, Pending
      contractor?: string;        // Contractor company name
    }>;
    flood?: {
      floodZone: string;          // FEMA flood zone designation
      floodRisk: string;          // High, Low to Moderate, Minimal
    };
    demographics?: {
      medianHouseholdIncome: number;  // Area median income
      medianHomeValue: number;        // Area median home value
      crimeRate: number;              // Crime index (1-10)
      walkabilityScore: number;       // Walk Score (0-100)
    };
    sources: {
      [sourceName]: {
        status: 'success' | 'error';
        data?: any;
        error?: string;
      };
    };
  };
  sources: string[];
}
```

## 🔗 **Integration Examples**

### **1. React Component Integration**

```typescript
import { useState, useEffect } from 'react';

function PropertyDetails({ address }: { address: string }) {
  const [publicRecords, setPublicRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicRecords = async () => {
      try {
        const response = await fetch(
          `/api/public-records?address=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        
        if (data.success) {
          setPublicRecords(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch public records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicRecords();
  }, [address]);

  if (loading) return <div>Loading public records...</div>;

  return (
    <div>
      {/* Tax Assessment */}
      {publicRecords?.assessment && (
        <div className="assessment-card">
          <h3>Tax Assessment</h3>
          <p>Assessed Value: ${publicRecords.assessment.assessedValue?.toLocaleString()}</p>
          <p>Annual Taxes: ${publicRecords.assessment.taxAmount?.toLocaleString()}</p>
          <p>Tax Rate: {publicRecords.assessment.taxRate}%</p>
        </div>
      )}

      {/* Building Permits */}
      {publicRecords?.permits && publicRecords.permits.length > 0 && (
        <div className="permits-card">
          <h3>Recent Building Permits</h3>
          {publicRecords.permits.map((permit, index) => (
            <div key={index} className="permit-item">
              <h4>{permit.description}</h4>
              <p>Type: {permit.permitType} • Status: {permit.status}</p>
              <p>Date: {permit.issuedDate}</p>
              {permit.value && <p>Value: ${permit.value.toLocaleString()}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Flood Risk */}
      {publicRecords?.flood && (
        <div className="flood-card">
          <h3>Flood Risk</h3>
          <p>Zone: {publicRecords.flood.floodZone}</p>
          <p>Risk Level: {publicRecords.flood.floodRisk}</p>
        </div>
      )}

      {/* Demographics */}
      {publicRecords?.demographics && (
        <div className="demographics-card">
          <h3>Neighborhood Data</h3>
          <p>Median Income: ${publicRecords.demographics.medianHouseholdIncome?.toLocaleString()}</p>
          <p>Median Home Value: ${publicRecords.demographics.medianHomeValue?.toLocaleString()}</p>
          <p>Walk Score: {publicRecords.demographics.walkabilityScore}/100</p>
          <p>Crime Rate: {publicRecords.demographics.crimeRate}/10</p>
        </div>
      )}
    </div>
  );
}
```

### **2. Next.js API Route Usage**

```typescript
// pages/api/property/[address].ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  
  try {
    // Fetch from our public records API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/public-records?address=${encodeURIComponent(address as string)}`
    );
    
    const publicRecords = await response.json();
    
    // Combine with other property data
    const propertyData = {
      address,
      publicRecords: publicRecords.data,
      // ... other property information
    };
    
    res.status(200).json(propertyData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property data' });
  }
}
```

## 🛠️ **Advanced Configuration**

### **Custom Data Source Configuration**

You can extend the API with additional data sources by modifying the `PublicRecordsService` class:

```typescript
// Add new data source method
async getCustomCityData(coordinates: {lat: number, lng: number}): Promise<any> {
  // Implement city-specific API integration
  const response = await fetch(
    `https://api.yourcity.gov/properties?lat=${coordinates.lat}&lng=${coordinates.lng}`
  );
  return response.json();
}

// Add to the main service
if (coordinates) {
  dataPromises.push(
    service.getCustomCityData(coordinates)
      .then(data => ({ source: 'city', data }))
      .catch(error => ({ source: 'city', error: error.message }))
  );
}
```

### **Rate Limiting & Caching**

For production use, implement caching and rate limiting:

```typescript
// Add Redis caching
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache responses for 24 hours
const cacheKey = `public-records:${address}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return NextResponse.json(JSON.parse(cached));
}

// ... fetch data ...

await redis.setex(cacheKey, 86400, JSON.stringify(response));
```

## 📈 **Performance Optimization**

### **Parallel Processing**
The API fetches data from multiple sources simultaneously for optimal performance:

```typescript
// All data sources are fetched in parallel
const [censusData, floodData, taxData, crimeData] = await Promise.allSettled([
  service.getCensusData(coordinates.lat, coordinates.lng),
  service.getFloodData(coordinates.lat, coordinates.lng),
  service.getPropertyTaxData(address, coordinates),
  service.getCrimeData(coordinates.lat, coordinates.lng)
]);
```

### **Timeout Handling**
Each API call has a 10-second timeout to prevent hanging requests:

```typescript
signal: AbortSignal.timeout(10000) // 10 seconds
```

## 🔒 **Data Source Reliability**

### **Error Handling**
The API gracefully handles failures from individual data sources:

```typescript
// Individual source failures don't break the entire response
sources[source] = {
  status: error ? 'error' : 'success',
  data: error ? undefined : data,
  error: error?.message
};
```

### **Data Source Status**
Each response includes the status of all data sources:

```json
{
  "sources": {
    "geocoding": { "status": "success" },
    "census": { "status": "success" },
    "flood": { "status": "error", "error": "Service unavailable" },
    "tax": { "status": "success" },
    "permits": { "status": "success" }
  }
}
```

## 🚦 **API Status & Health**

### **Health Check Endpoint**

```typescript
// GET /api/public-records/health
{
  "status": "healthy",
  "sources": {
    "census": "available",
    "fema": "available", 
    "nominatim": "available"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔮 **Future Enhancements**

### **1. Additional Data Sources**
- **School District APIs** - School ratings and boundaries
- **Transportation APIs** - Public transit access scores
- **Environmental APIs** - Air quality and environmental hazards
- **Economic APIs** - Property appreciation trends

### **2. Premium Data Integration**
- **PropertyRadar API** - Professional property intelligence
- **RentCast API** - Property valuations and rental estimates
- **Estated API** - Comprehensive property data

### **3. Machine Learning Enhancements**
- **Risk Scoring Models** - AI-powered risk assessments
- **Price Prediction** - Advanced valuation algorithms
- **Market Analysis** - Trend prediction and forecasting

## 📝 **Usage Examples in Your App**

### **Property Search Enhancement**
```typescript
// Enhance existing property search with public records
const searchResults = await Promise.all(
  properties.map(async (property) => {
    const publicRecords = await fetch(
      `/api/public-records?address=${property.address}`
    ).then(r => r.json());
    
    return {
      ...property,
      assessment: publicRecords.data?.assessment,
      permits: publicRecords.data?.permits,
      floodRisk: publicRecords.data?.flood,
      demographics: publicRecords.data?.demographics
    };
  })
);
```

### **Investment Analysis**
```typescript
// Calculate investment metrics with public records data
function calculateInvestmentMetrics(property: any, publicRecords: any) {
  const capRate = (property.annualRent * 12) / publicRecords.assessment?.assessedValue;
  const taxBurden = publicRecords.assessment?.taxAmount / property.annualRent;
  const permitActivity = publicRecords.permits?.length || 0;
  
  return {
    capRate: capRate * 100, // Convert to percentage
    taxBurden: taxBurden * 100,
    permitActivity,
    floodRisk: publicRecords.flood?.floodRisk,
    walkabilityScore: publicRecords.demographics?.walkabilityScore
  };
}
```

## 🎯 **Getting Started**

1. **Test the API:**
   ```bash
   curl "http://localhost:3000/api/public-records?address=1600 Pennsylvania Avenue, Washington, DC"
   ```

2. **Integrate into your components:**
   - Add public records data to your property details page
   - Enhance search results with assessment and permit data
   - Create neighborhood analysis dashboards

3. **Monitor performance:**
   - Check response times in Network tab
   - Monitor data source success rates
   - Implement error tracking for failed requests

## 🎉 **Benefits for HouseMax**

### **Enhanced Property Intelligence**
- **Comprehensive Data** - Government records provide official, verified information
- **Risk Assessment** - Flood zones, permits, and claims history for better decisions
- **Neighborhood Insights** - Demographics and walkability for location analysis

### **Competitive Advantage**
- **Free Data Sources** - No subscription costs for basic property intelligence
- **Real-time Updates** - Fresh data from government APIs
- **Scalable Architecture** - Easy to add new data sources as needed

### **User Experience**
- **One-Stop Platform** - All property information in a single search
- **Consolidated Display** - Building permits integrated within Public Records section (no duplicate sections)
- **Comprehensive Reports** - All public records data included in printable property documents
- **Professional Presentation** - Data formatted with proper source attribution and visual hierarchy

## 📄 **Printable Reports Integration**

### **Public Records in Printable Documents**
The public records data is seamlessly integrated into printable property reports, providing:

**Assessment Information:**
- Property assessed value and land value
- Annual tax amount and tax rate
- Last assessment date

**Building Permits (up to 5 most recent):**
- Permit type and permit number
- Issue date and contractor information
- Permit value and current status

**FEMA Flood Information:**
- Flood zone designation
- Risk level assessment
- Insurance requirements

**Area Demographics:**
- Median household income
- Walk score and transportation options
- Crime rate and safety statistics

**Data Source Attribution:**
- US Census Bureau
- FEMA Flood Maps
- Local Government Records
- OpenStreetMap
- Municipal Permit Databases

This ensures users have comprehensive property intelligence in both digital and printed formats, with proper source crediting for all government data.
- **Detailed Reports** - Professional-grade property analysis
- **Informed Decisions** - Complete picture for buyers, sellers, and investors

---

**🏠 Your HouseMax platform now provides comprehensive property intelligence that rivals premium real estate platforms - all powered by free public data sources!** 