"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import PropertyHeader from "./property/PropertyHeader";
import PropertyMapSection from "./property/PropertyMapSection";
import PropertyRiskAssessment from "./property/PropertyRiskAssessment";
import PropertyPublicRecords from "./property/PropertyPublicRecords";
import { usePropertyData } from "@/hooks/usePropertyData";
import { getConfig } from "@/config/app";
import ErrorBoundary from "./ErrorBoundary";
import { useRenderPerformance } from "@/utils/performance";
import { createErrorHandler } from "@/utils/diagnostics";

// Helper functions for query parsing and property saving
const infoSections = [
  {
    icon: "📄",
    title: "Permit Pages",
    keyword: ["permit", "permits", "building", "code"],
    content: (
      <>
        <p className="mb-2 text-blue-800 font-semibold">How to find building permits:</p>
        <ol className="list-decimal list-inside text-blue-700 text-left mx-auto max-w-md mb-2">
          <li>Identify your local county/city planning department.</li>
          <li>Visit their official website (search for &quot;[Your County Name] building permits&quot;).</li>
          <li>Use their property search tool.</li>
          <li>Look for &apos;building permits&apos; or &apos;code enforcement records&apos;.</li>
        </ol>
        <p className="text-blue-600 text-sm">We&apos;ll provide curated links here in the future!</p>
      </>
    ),
  },
  {
    icon: "🔑",
    title: "Property Rights Chapter",
    keyword: ["right", "rights", "mineral", "water", "air", "easement"],
    content: (
      <>
        <p className="mb-2 text-blue-800 font-semibold">What are property rights?</p>
        <ul className="list-disc list-inside text-blue-700 text-left mx-auto max-w-md mb-2">
          <li><b>Mineral rights:</b> Ownership of resources below the surface.</li>
          <li><b>Water rights:</b> Rights to use water sources on/under the property.</li>
          <li><b>Air rights:</b> Rights to use/control the space above the property.</li>
          <li><b>Easements:</b> Legal rights for others to use part of your property (e.g., utility lines).</li>
        </ul>
        <p className="text-blue-600 text-sm">Check your property deed or county records for details.</p>
      </>
    ),
  },
];

function parseQuery(query: string | null) {
  if (!query) return { address: "", keywords: [] };
  // Simple keyword extraction
  const lower = query.toLowerCase();
  const keywords = [] as string[];
  infoSections.forEach(section => {
    section.keyword.forEach(k => {
      if (lower.includes(k)) keywords.push(k);
    });
  });
  // Remove keywords from address
  let address = query;
  keywords.forEach(k => {
    const re = new RegExp(k, "ig");
    address = address.replace(re, "");
  });
  address = address.replace(/\s+/g, " ").trim();
  return { address, keywords };
}

const PropertyDetailsClient: React.FC = () => {
  const config = getConfig();
  useRenderPerformance('PropertyDetailsClient');
  
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("query");
  
  // Debug logging
  if (config.development.enableConsoleLogging) {
    console.log('PropertyDetailsClient - Query:', query);
  }
  
  const { address, keywords } = parseQuery(query);
  
  // Debug logging
  if (config.development.enableConsoleLogging) {
    console.log('PropertyDetailsClient - Parsed address:', address);
    console.log('PropertyDetailsClient - Keywords:', keywords);
  }

  // State for UI interactions
  const [isSaved, setIsSaved] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  // Use the custom hook for property data
  const {
    mlsResults,
    avmResult,
    publicRecords,
    insuranceClaims,
    fireRisk,
    floodRisk,
    cotality,
    coords,
    geoLoading,
    geoError,
    fetchPropertyData
  } = usePropertyData();

  // Fetch data when address changes
  useEffect(() => {
    if (address) {
      fetchPropertyData(address);
    }
  }, [address, fetchPropertyData]);

  // Check if property is saved
  useEffect(() => {
    if (address && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('savedProperties');
        if (saved) {
          const savedProperties = JSON.parse(saved) as Array<{address: string}>;
          setIsSaved(savedProperties.some((prop) => prop.address === address));
        }
      } catch (error) {
        console.warn('Failed to access localStorage:', error);
      }
    }
  }, [address]);

  // Save/unsave property
  const handleSave = () => {
    if (!address || typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('savedProperties');
      let savedProperties = saved ? JSON.parse(saved) as Array<{address: string}> : [];
      
      if (isSaved) {
        // Remove from saved
        savedProperties = savedProperties.filter((prop) => prop.address !== address);
        setIsSaved(false);
      } else {
        // Add to saved
        const propertyData = {
          address,
          savedAt: new Date().toISOString(),
          mlsData: mlsResults[0] || null,
          avmData: avmResult
        };
        savedProperties.push(propertyData);
        setIsSaved(true);
      }
      
      localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
    } catch (error) {
      console.warn('Failed to save property:', error);
    }
  };

  // Print handler
  const handlePrint = () => {
    if (!printableRef.current) return;
    const printContents = printableRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=1200');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>HOUSE/MAX Property Report</title>
          <style>
            body { font-family: sans-serif; color: #222; margin: 2em; }
            h1, h2, h3 { color: #005BAA; }
            .section { margin-bottom: 2em; }
            .risk { color: #E31837; }
            .permits { color: #0a6c3d; }
            .mls { color: #005BAA; }
            .avm { color: #16a34a; }
            table { border-collapse: collapse; width: 100%; margin-top: 1em; }
            th, td { border: 1px solid #ccc; padding: 6px 10px; }
            th { background: #f0f8ff; }
            .footnote { color: #888; font-size: 0.9em; margin-top: 2em; }
            @media print { button { display: none !important; } }
          </style>
        </head>
        <body>
          ${printContents}
          <script>window.onload = function() { window.print(); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <ErrorBoundary onError={createErrorHandler('PropertyDetailsClient')}>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="remax-container">
          
          {/* Map Section */}
          {config.features.enableMapIntegration && (
            <ErrorBoundary fallback={
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800">
                  <h3 className="font-semibold mb-2">Map Temporarily Unavailable</h3>
                  <p>The map feature is currently experiencing issues. Property data is still available below.</p>
                </div>
              </div>
            }>
              <PropertyMapSection
                coords={coords}
                address={address}
                geoLoading={geoLoading}
                geoError={geoError}
                mlsResults={mlsResults}
              />
            </ErrorBoundary>
          )}

          {/* Property Details Section */}
          <div className="max-w-4xl mx-auto">
            <PropertyHeader
              address={address}
              onPrint={config.features.enablePrintReports ? handlePrint : undefined}
              onSave={config.features.enablePropertySaving ? handleSave : undefined}
              isSaved={isSaved}
            />

          {/* MLS Results */}
          {mlsResults.length > 0 && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <h2 className="remax-heading-3 text-center">MLS Listings</h2>
              </div>
              <div className="remax-card-body">
                <div className="grid gap-6">
                  {mlsResults.slice(0, 3).map((listing, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {listing.address}, {listing.city}, {listing.state} {listing.zip}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div>Type: {listing.propertyType}</div>
                            <div>Year Built: {listing.yearBuilt}</div>
                            <div>Lot Size: {listing.lotSize}</div>
                            <div>Garage: {listing.garage}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            ${listing.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            {listing.bedrooms} bed • {listing.bathrooms} bath • {listing.sqft.toLocaleString()} sq ft
                          </div>
                          <div className="text-xs text-gray-500">
                            {listing.status} • {listing.daysOnMarket} days on market
                          </div>
                        </div>
                      </div>
                      {listing.description && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-700">{listing.description}</p>
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                        Realtor: {listing.realtor} • {listing.brokeragePhone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AVM Results */}
          {avmResult && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <h2 className="remax-heading-3 text-center">Automated Valuation Model (AVM)</h2>
              </div>
              <div className="remax-card-body">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${avmResult.avmValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Confidence: {avmResult.confidence} • Last Updated: {avmResult.lastUpdated}
                  </div>
                </div>
                {avmResult.comparables && avmResult.comparables.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Recent Comparable Sales</h4>
                    <div className="space-y-2">
                      {avmResult.comparables.map((comp, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          • {comp.address} - ${comp.soldPrice.toLocaleString()} ({comp.soldDate}) - {comp.sqft.toLocaleString()} sq ft - {comp.distance} miles away
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Public Records */}
          <PropertyPublicRecords publicRecords={publicRecords || undefined} />

          {/* Risk Assessment */}
          <PropertyRiskAssessment
            insuranceClaims={insuranceClaims}
            fireRisk={fireRisk || undefined}
            floodRisk={floodRisk || undefined}
            cotality={cotality || undefined}
          />

          {/* Info Sections */}
          {keywords.length > 0 && (
            <div className="remax-card mb-8">
              <div className="remax-card-header">
                <h2 className="remax-heading-3 text-center">Related Information</h2>
              </div>
              <div className="remax-card-body">
                <div className="grid gap-6">
                  {infoSections
                    .filter(section => 
                      section.keyword.some(k => keywords.includes(k))
                    )
                    .map((section, index) => (
                      <div key={index} className="text-center bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="text-4xl mb-4">{section.icon}</div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">{section.title}</h3>
                        <div className="text-blue-700">{section.content}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden printable content */}
        <div ref={printableRef} style={{ display: 'none' }}>
          <div className="header">
            <h1>HOUSE/MAX Property Report</h1>
            <h2>{address}</h2>
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
          
          {/* Include all data in printable format */}
          {mlsResults.length > 0 && (
            <div className="section mls">
              <h3>MLS Data</h3>
              {mlsResults.slice(0, 1).map((listing, index) => (
                <div key={index}>
                  <b>Address:</b> {listing.address}, {listing.city}, {listing.state} {listing.zip}<br />
                  <b>Price:</b> ${listing.price.toLocaleString()}<br />
                  <b>Bedrooms:</b> {listing.bedrooms}<br />
                  <b>Bathrooms:</b> {listing.bathrooms}<br />
                  <b>Square Feet:</b> {listing.sqft.toLocaleString()}<br />
                  <b>Year Built:</b> {listing.yearBuilt}<br />
                  <b>Property Type:</b> {listing.propertyType}<br />
                  <b>Status:</b> {listing.status}<br />
                  <b>Days on Market:</b> {listing.daysOnMarket}<br />
                  <b>Realtor:</b> {listing.realtor}<br />
                  <b>Brokerage Phone:</b> {listing.brokeragePhone}<br />
                  {listing.description && (
                    <>
                      <b>Description:</b> {listing.description}<br />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {avmResult && (
            <div className="section avm">
              <h3>AVM Valuation</h3>
              <b>Estimated Value:</b> ${avmResult.avmValue.toLocaleString()}<br />
              <b>Confidence:</b> {avmResult.confidence}<br />
              <b>Last Updated:</b> {avmResult.lastUpdated}<br />
              {avmResult.comparables && avmResult.comparables.length > 0 && (
                <div>
                  <b>Comparable Sales:</b><br />
                  {avmResult.comparables.map((comp, index) => (
                    <div key={index}>
                      • {comp.address} - ${comp.soldPrice.toLocaleString()} ({comp.soldDate}) - {comp.sqft.toLocaleString()} sq ft - {comp.distance} miles away<br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {publicRecords && (
            <div className="section public-records">
              <h3>Public Records</h3>
              
              {/* Property Assessment */}
              {publicRecords.assessment && (
                <div>
                  <b>Property Assessment:</b><br />
                  {publicRecords.assessment.assessedValue && `• Assessed Value: $${publicRecords.assessment.assessedValue.toLocaleString()}`}<br />
                  {publicRecords.assessment.landValue && `• Land Value: $${publicRecords.assessment.landValue.toLocaleString()}`}<br />
                  {publicRecords.assessment.taxAmount && `• Annual Tax: $${publicRecords.assessment.taxAmount.toLocaleString()}`}<br />
                  <br />
                </div>
              )}

              {/* Building Permits */}
              {publicRecords.permits && publicRecords.permits.length > 0 && (
                <div>
                  <b>Recent Building Permits:</b><br />
                  {publicRecords.permits.slice(0, 5).map((permit, index) => (
                    <div key={index}>
                      • <b>{permit.permitType}</b> ({permit.permitNumber})<br />
                      &nbsp;&nbsp;Issued: {permit.issueDate}<br />
                      {permit.contractor && `&nbsp;&nbsp;Contractor: ${permit.contractor}`}<br />
                      {permit.value && `&nbsp;&nbsp;Value: $${permit.value.toLocaleString()}`}<br />
                      <br />
                    </div>
                  ))}
                </div>
              )}

              {/* Flood Information */}
              {publicRecords.flood && (
                <div>
                  <b>FEMA Flood Information:</b><br />
                  {publicRecords.flood.zone && `• Flood Zone: ${publicRecords.flood.zone}`}<br />
                  {publicRecords.flood.riskLevel && `• Flood Risk: ${publicRecords.flood.riskLevel}`}<br />
                  {publicRecords.flood.insuranceRequired !== undefined && `• Insurance Required: ${publicRecords.flood.insuranceRequired ? 'Yes' : 'No'}`}<br />
                  <br />
                </div>
              )}

              {/* Demographics */}
              {publicRecords.demographics && (
                <div>
                  <b>Area Demographics:</b><br />
                  {publicRecords.demographics.medianIncome && `• Median Income: $${publicRecords.demographics.medianIncome.toLocaleString()}`}<br />
                  {publicRecords.demographics.walkScore && `• Walk Score: ${publicRecords.demographics.walkScore}/100`}<br />
                  {publicRecords.demographics.crimeRate && `• Crime Rate: ${publicRecords.demographics.crimeRate}`}<br />
                  <br />
                </div>
              )}

              <div style={{fontSize: '10px', color: '#666'}}>
                Data sources: US Census Bureau, FEMA Flood Maps, Local Government Records, OpenStreetMap
              </div>
            </div>
          )}

          <div className="section risk">
            <h3>Risk & Insurance Data</h3>
            {insuranceClaims && insuranceClaims.length > 0 && (
              <div>
                <b>Insurance Claims:</b>
                <ul>
                  {insuranceClaims.map((claim, idx) => (
                    <li key={idx}>
                      {claim.type} claim on {claim.date} for ${claim.amount.toLocaleString()} ({claim.status})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {fireRisk && (
              <div>
                <b>Fire Risk Score:</b> {fireRisk.score}<br />
                <b>Last Inspection:</b> {fireRisk.lastInspection}<br />
                <b>Notes:</b> {fireRisk.notes}
              </div>
            )}
            {floodRisk && (
              <div>
                <b>Flood Zone:</b> {floodRisk.zone}<br />
                <b>Flood Risk Level:</b> {floodRisk.riskLevel}<br />
                <b>Last Flood:</b> {floodRisk.lastFlood || 'N/A'}
              </div>
            )}
            {cotality && (
              <div>
                <b>Cotality Property ID:</b> {cotality.cotalityPropertyId}<br />
                <b>Wildfire Risk Score:</b> {cotality.wildfireRiskScore}<br />
                <b>Flood Risk Score:</b> {cotality.floodRiskScore}<br />
                <b>Earthquake Risk Score:</b> {cotality.earthquakeRiskScore}<br />
                <b>Report URL:</b> <a href={cotality.reportUrl}>{cotality.reportUrl}</a>
              </div>
            )}
          </div>
          <div className="footnote">
            <b>Disclaimer:</b> This report is for informational purposes only. Data may be incomplete or out of date. Always verify with official sources.<br />
            &copy; {new Date().getFullYear()} HOUSE/MAX
          </div>
        </div>
      </div>
    </main>
    </ErrorBoundary>
  );
};

export default PropertyDetailsClient; 