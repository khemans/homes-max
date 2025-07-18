import React from 'react';
import { PublicRecordsData } from '@/types/property';

interface PropertyPublicRecordsProps {
  publicRecords?: PublicRecordsData;
}

const PropertyPublicRecords: React.FC<PropertyPublicRecordsProps> = ({ publicRecords }) => {
  if (!publicRecords) return null;

  return (
    <div className="remax-card mb-8">
      <div className="remax-card-header">
        <h2 className="remax-heading-3 text-center">Public Records</h2>
      </div>
      <div className="remax-card-body">
        
        {/* Property Assessment */}
        {publicRecords.assessment && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Property Assessment</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4">
                {publicRecords.assessment.assessedValue && (
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Assessed Value</div>
                    <div className="text-lg font-semibold text-blue-800">
                      ${publicRecords.assessment.assessedValue?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                )}
                {publicRecords.assessment.landValue && (
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Land Value</div>
                    <div className="text-lg font-semibold text-blue-800">
                      ${publicRecords.assessment.landValue?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                )}
                {publicRecords.assessment.taxAmount && (
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Annual Tax</div>
                    <div className="text-lg font-semibold text-blue-800">
                      ${publicRecords.assessment.taxAmount?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Building Permits */}
        {publicRecords.permits && publicRecords.permits.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Building Permits</h3>
            <div className="space-y-3">
              {publicRecords.permits.slice(0, 5).map((permit, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-2 md:mb-0">
                      <div className="font-semibold text-green-800">{permit.permitType}</div>
                      <div className="text-sm text-green-600">#{permit.permitNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-700">Issued: {permit.issueDate}</div>
                      {permit.value && (
                        <div className="text-sm text-green-700">Value: ${permit.value?.toLocaleString() || 'N/A'}</div>
                      )}
                    </div>
                  </div>
                  {permit.contractor && (
                    <div className="mt-2 text-sm text-green-700">
                      <span className="font-medium">Contractor:</span> {permit.contractor}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {publicRecords.permits.length > 5 && (
              <div className="text-center mt-4">
                <div className="text-sm text-gray-600">
                  Showing 5 of {publicRecords.permits.length} permits
                </div>
              </div>
            )}
          </div>
        )}

        {/* FEMA Flood Information */}
        {publicRecords.flood && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">FEMA Flood Information</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4">
                {publicRecords.flood.zone && (
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Flood Zone</div>
                    <div className="text-lg font-semibold text-blue-800">{publicRecords.flood.zone}</div>
                  </div>
                )}
                {publicRecords.flood.riskLevel && (
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Risk Level</div>
                    <div className="text-lg font-semibold text-blue-800">{publicRecords.flood.riskLevel}</div>
                  </div>
                )}
                {publicRecords.flood.insuranceRequired !== undefined && (
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Insurance Required</div>
                    <div className={`text-lg font-semibold ${
                      publicRecords.flood.insuranceRequired ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {publicRecords.flood.insuranceRequired ? 'Yes' : 'No'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Area Demographics */}
        {publicRecords.demographics && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Area Demographics</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4">
                {publicRecords.demographics.medianIncome && (
                  <div>
                    <div className="text-sm text-purple-600 font-medium">Median Income</div>
                    <div className="text-lg font-semibold text-purple-800">
                      ${publicRecords.demographics.medianIncome?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                )}
                {publicRecords.demographics.walkScore && (
                  <div>
                    <div className="text-sm text-purple-600 font-medium">Walk Score</div>
                    <div className="text-lg font-semibold text-purple-800">
                      {publicRecords.demographics.walkScore}/100
                    </div>
                  </div>
                )}
                {publicRecords.demographics.crimeRate && (
                  <div>
                    <div className="text-sm text-purple-600 font-medium">Crime Rate</div>
                    <div className="text-lg font-semibold text-purple-800">
                      {publicRecords.demographics.crimeRate}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Data Sources */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-xs text-gray-500">
            <strong>Data Sources:</strong> US Census Bureau, FEMA Flood Maps, Local Government Records, OpenStreetMap
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPublicRecords; 