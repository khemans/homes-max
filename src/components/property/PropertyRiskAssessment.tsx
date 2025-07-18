import React from 'react';
import { getLinkedResource } from '@/utils/resourceManager';
import { InsuranceClaim, FireRisk, FloodRisk, CotalityData } from '@/types/property';

interface PropertyRiskAssessmentProps {
  insuranceClaims?: InsuranceClaim[];
  fireRisk?: FireRisk;
  floodRisk?: FloodRisk;
  cotality?: CotalityData;
}

const PropertyRiskAssessment: React.FC<PropertyRiskAssessmentProps> = ({
  insuranceClaims,
  fireRisk,
  floodRisk,
  cotality
}) => {
  const cotalityResource = getLinkedResource("Cotality Property Risk Reports");
  const clueResource = getLinkedResource("LexisNexis C.L.U.E.® Property");

  return (
    <div className="remax-card mb-8">
      <div className="remax-card-header">
        <h2 className="remax-heading-3 text-center">Risk Assessment</h2>
      </div>
      <div className="remax-card-body">
        
        {/* Insurance Claims */}
        {insuranceClaims && insuranceClaims.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Insurance Claims History</h3>
            <div className="space-y-2">
              {insuranceClaims.map((claim, idx) => (
                <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="font-medium text-red-800">{claim.type} Claim</div>
                  <div className="text-sm text-red-700">
                    Date: {claim.date} | Amount: ${claim.amount?.toLocaleString() || 'N/A'} | Status: {claim.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fire Risk */}
        {fireRisk && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Fire Risk Assessment</h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-orange-800">Risk Score: {fireRisk.score}</div>
                  <div className="text-sm text-orange-700">Last Inspection: {fireRisk.lastInspection}</div>
                </div>
                <div>
                  <div className="text-sm text-orange-700">{fireRisk.notes}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flood Risk */}
        {floodRisk && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Flood Risk Assessment</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="font-medium text-blue-800">Zone: {floodRisk.zone}</div>
                </div>
                <div>
                  <div className="font-medium text-blue-800">Risk Level: {floodRisk.riskLevel}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Last Flood: {floodRisk.lastFlood || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cotality Risk Data */}
        {cotality && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Cotality Risk Analytics
              {cotalityResource && (
                <a 
                  href={cotalityResource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  (Learn More)
                </a>
              )}
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-medium text-green-800 mb-2">Property ID: {cotality.cotalityPropertyId}</div>
                  <div className="space-y-1">
                    <div className="text-sm text-green-700">Wildfire Risk: {cotality.wildfireRiskScore}</div>
                    <div className="text-sm text-green-700">Flood Risk: {cotality.floodRiskScore}</div>
                    <div className="text-sm text-green-700">Earthquake Risk: {cotality.earthquakeRiskScore}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <a 
                    href={cotality.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="remax-btn-primary text-sm"
                  >
                    View Full Cotality Report
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Resources */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Risk Assessment Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {cotalityResource && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">{cotalityResource.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{cotalityResource.description}</p>
                <a 
                  href={cotalityResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Access Platform →
                </a>
              </div>
            )}
            {clueResource && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">{clueResource.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{clueResource.description}</p>
                <a 
                  href={clueResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Get C.L.U.E. Report →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRiskAssessment; 