'use client';

import React from 'react';
import { FEMAFloodData } from '@/utils/femaFloodAPI';

interface FloodRiskVisualizationProps {
  floodData: FEMAFloodData;
  address: string;
}

export function FloodRiskVisualization({ floodData, address }: FloodRiskVisualizationProps) {
  const getRiskColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'Very High': return 'text-red-600 bg-red-50 border-red-300';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-300';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-300';
      case 'Minimal': return 'text-green-600 bg-green-50 border-green-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-300';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStationStatusColor = (status: string): string => {
    switch (status) {
      case 'Major': return 'bg-red-500';
      case 'Moderate': return 'bg-orange-500';
      case 'Minor': return 'bg-yellow-500';
      case 'Normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeVariant = (severity: string): string => {
    switch (severity) {
      case 'Severe': return 'bg-red-600 text-white';
      case 'Major': return 'bg-orange-600 text-white';
      case 'Moderate': return 'bg-yellow-600 text-white';
      case 'Minor': return 'bg-gray-600 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getStatusBadgeVariant = (status: string): string => {
    switch (status) {
      case 'Major': return 'bg-red-600 text-white';
      case 'Moderate': return 'bg-orange-600 text-white';
      case 'Minor': return 'bg-yellow-600 text-white';
      case 'Normal': return 'bg-green-600 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with Risk Score */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">Comprehensive Flood Risk Assessment</h3>
              <p className="text-sm text-gray-600 font-normal">{address}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Risk Score */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className={`text-4xl font-bold ${getScoreColor(floodData.riskScore)}`}>
                  {floodData.riskScore}
                </div>
                <div className="text-lg text-gray-500">/100</div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Overall Risk Score</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getScoreColor(floodData.riskScore).replace('text-', 'bg-')}`}
                  style={{ width: `${floodData.riskScore}%` }}
                />
              </div>
            </div>

            {/* Flood Zone */}
            <div className="text-center">
              <div className={`inline-block text-lg px-4 py-2 rounded-full border-2 ${getRiskColor(floodData.riskLevel)}`}>
                Zone {floodData.floodZone}
              </div>
              <p className="text-sm text-gray-600 mt-2">{floodData.floodZoneDescription}</p>
              <p className="text-xs text-gray-500 mt-1">
                Annual chance: {floodData.annualChanceFlooding}
              </p>
            </div>

            {/* Insurance Status */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className={`h-5 w-5 ${floodData.floodInsuranceRequired ? 'text-red-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className={`font-semibold ${floodData.floodInsuranceRequired ? 'text-red-600' : 'text-green-600'}`}>
                  {floodData.floodInsuranceRequired ? 'Required' : 'Optional'}
                </span>
              </div>
              <p className="text-sm text-gray-600">Flood Insurance</p>
              <p className="text-xs text-gray-500 mt-1">
                Est. {formatCurrency(floodData.floodInsuranceAnalysis.estimatedPremium.total)}/year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Flood Events */}
      {floodData.historicalFloods.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h4 className="text-lg font-semibold">Historical Flood Events ({floodData.historicalFloods.length})</h4>
            </div>
            
            <div className="space-y-3">
              {floodData.historicalFloods.slice(0, 5).map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeVariant(event.severity)} min-w-[80px] text-center`}>
                      {event.severity}
                    </span>
                    <div>
                      <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      {event.damages && (
                        <p className="text-xs text-red-600 font-medium">{event.damages}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.stage.toFixed(1)} ft</p>
                    <p className="text-xs text-gray-500">above flood stage</p>
                  </div>
                </div>
              ))}
              {floodData.historicalFloods.length > 5 && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  +{floodData.historicalFloods.length - 5} more historical events
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Monitoring Stations */}
      {floodData.nearbyMonitoringStations.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="text-lg font-semibold">Nearby Monitoring Stations</h4>
            </div>
            
            <div className="space-y-3">
              {floodData.nearbyMonitoringStations.map((station, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStationStatusColor(station.status)}`} />
                    <div>
                      <p className="font-medium">{station.name}</p>
                      <p className="text-sm text-gray-600">{station.distance} miles away</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {station.currentStage.toFixed(1)} ft
                      <span className="text-xs text-gray-500 ml-1">
                        (flood: {station.floodStage.toFixed(1)} ft)
                      </span>
                    </p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeVariant(station.status)}`}>
                      {station.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Elevation Data */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.57 3.57A9.966 9.966 0 0112 5c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 20.523 2 15c0-1.628.39-3.166 1.08-4.52L7 6.43" />
            </svg>
            <h4 className="text-lg font-semibold">Elevation Analysis</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {floodData.elevationData.groundElevation} ft
              </div>
              <p className="text-sm text-gray-600">Ground Elevation</p>
              <p className="text-xs text-gray-500 mt-1">
                {floodData.elevationData.elevationConfidence}% confidence
              </p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                floodData.elevationData.relativeToFloodStage > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {floodData.elevationData.relativeToFloodStage > 0 ? '+' : ''}
                {floodData.elevationData.relativeToFloodStage} ft
              </div>
              <p className="text-sm text-gray-600">Relative to Flood Stage</p>
              <p className="text-xs text-gray-500 mt-1">
                {floodData.elevationData.relativeToFloodStage > 0 ? 'Above' : 'Below'} flood level
              </p>
            </div>
            <div className="text-center">
              {floodData.baseFloodElevation ? (
                <>
                  <div className="text-2xl font-bold text-orange-600">
                    {floodData.baseFloodElevation} ft
                  </div>
                  <p className="text-sm text-gray-600">Base Flood Elevation</p>
                  <p className="text-xs text-gray-500 mt-1">FEMA requirement</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-400">N/A</div>
                  <p className="text-sm text-gray-600">Base Flood Elevation</p>
                  <p className="text-xs text-gray-500 mt-1">Not established</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <h4 className="text-lg font-semibold">Flood Insurance Analysis</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Premium Breakdown */}
            <div>
              <h5 className="font-semibold mb-3">Estimated Annual Premiums</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Building Coverage</span>
                  <span className="font-medium">
                    {formatCurrency(floodData.floodInsuranceAnalysis.estimatedPremium.building)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Contents Coverage</span>
                  <span className="font-medium">
                    {formatCurrency(floodData.floodInsuranceAnalysis.estimatedPremium.contents)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-semibold">Total Annual Premium</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(floodData.floodInsuranceAnalysis.estimatedPremium.total)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended coverage: {formatCurrency(floodData.floodInsuranceAnalysis.recommendedCoverage)}
              </p>
            </div>

            {/* Discounts & Risk Factors */}
            <div>
              <div className="mb-4">
                <h5 className="font-semibold mb-2">Available Discounts</h5>
                <div className="space-y-1">
                  {floodData.floodInsuranceAnalysis.discounts.map((discount, index) => (
                    <div key={index} className="text-sm text-green-600 flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full" />
                      {discount}
                    </div>
                  ))}
                </div>
              </div>

              {floodData.floodInsuranceAnalysis.riskFactors.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Risk Factors</h5>
                  <div className="space-y-1">
                    {floodData.floodInsuranceAnalysis.riskFactors.map((factor, index) => (
                      <div key={index} className="text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Flood Maps */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h4 className="text-lg font-semibold">Official Flood Maps & Resources</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={floodData.floodMaps.firmPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium">FIRM Panel</p>
                <p className="text-sm text-gray-600">Panel #{floodData.floodMaps.firmPanelNumber}</p>
              </div>
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={floodData.floodMaps.interactiveMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm text-gray-600">FEMA Flood Map Viewer</p>
              </div>
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            FIRM Effective Date: {floodData.firmEffectiveDate} • County: {floodData.countyName}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {floodData.recommendations.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h4 className="text-lg font-semibold">Personalized Recommendations</h4>
            </div>
            
            <div className="space-y-3">
              {floodData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <svg className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-sm text-blue-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 