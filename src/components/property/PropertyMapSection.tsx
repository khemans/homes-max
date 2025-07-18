import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PropertyMap with SSR disabled to avoid window reference issues
const PropertyMap = dynamic(() => import("../PropertyMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-8 bg-gray-100 flex items-center justify-center">
      <div className="text-gray-600">Loading map...</div>
    </div>
  )
});

import { Coordinates, MLSResult } from '@/types/property';

interface PropertyMapSectionProps {
  coords: Coordinates | null;
  address: string;
  geoLoading: boolean;
  geoError: string;
  mlsResults: MLSResult[];
}

const PropertyMapSection: React.FC<PropertyMapSectionProps> = ({
  coords,
  address,
  geoLoading,
  geoError,
  mlsResults
}) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      {geoLoading ? (
        <div className="remax-card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
          <div className="remax-text-body text-blue-600 font-medium">Locating property on map...</div>
        </div>
      ) : geoError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="font-semibold">Location Error</h3>
          </div>
          <p>{geoError}</p>
        </div>
      ) : (
        <div className="remax-card overflow-hidden">
          <PropertyMap 
            lat={coords?.lat} 
            lng={coords?.lng} 
            address={mlsResults[0] ? `${mlsResults[0].address}, ${mlsResults[0].city}, ${mlsResults[0].state} ${mlsResults[0].zip}` : address} 
          />
        </div>
      )}
    </div>
  );
};

export default PropertyMapSection; 