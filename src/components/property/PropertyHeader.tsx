import React from 'react';

interface PropertyHeaderProps {
  address: string;
  onPrint?: () => void;
  onSave?: () => void;
  isSaved: boolean;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  address,
  onPrint,
  onSave,
  isSaved
}) => {
  return (
    <div className="remax-card mb-8">
      <div className="remax-card-header text-center">
        <h1 className="remax-heading-2">Property Details</h1>
        {address && (
          <p className="remax-text-body text-lg mt-2">
            <span className="font-semibold">Address:</span> {address}
          </p>
        )}
      </div>
      
      <div className="remax-card-body">
        {address && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {onPrint && (
              <button
                onClick={onPrint}
                className="remax-btn-primary flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Property Report
              </button>
            )}
            {onSave && (
              <button
                onClick={onSave}
                className={`flex items-center justify-center ${
                  isSaved 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'remax-btn-secondary'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSaved ? "M5 13l4 4L19 7" : "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"} />
                </svg>
                {isSaved ? 'Property Saved' : 'Save Property'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyHeader; 