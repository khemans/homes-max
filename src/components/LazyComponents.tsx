// Lazy Loading Components for Performance Optimization
// Centralized lazy imports for heavy components

import React, { lazy, Suspense, ComponentType } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Note: LazyErrorFallback can be used for custom error handling if needed

// Higher-order component for lazy loading with error boundary
function withLazyLoading<P extends object>(
  LazyComponent: ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function LazyWrapper(props: P) {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback || <LoadingSpinner />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// Lazy-loaded components
const LazyPropertyMapSection = lazy(() => 
  import('./property/PropertyMapSection').catch(() => ({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Map component not available</p>
      </div>
    )
  }))
);

const LazyPropertyRiskAssessment = lazy(() => 
  import('./property/PropertyRiskAssessment').catch(() => ({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Risk assessment component not available</p>
      </div>
    )
  }))
);

const LazyPropertyPublicRecords = lazy(() => 
  import('./property/PropertyPublicRecords').catch(() => ({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Public records component not available</p>
      </div>
    )
  }))
);

const LazySearchResultsClient = lazy(() => 
  import('./SearchResultsClient').catch(() => ({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Search results component not available</p>
      </div>
    )
  }))
);

const LazyPropertyDetailsClient = lazy(() => 
  import('./PropertyDetailsClient').catch(() => ({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Property details component not available</p>
      </div>
    )
  }))
);

// Chart components (typically heavy)
const LazyPropertyCharts = lazy(() => 
  Promise.resolve({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Charts component not available</p>
      </div>
    )
  })
);

// Map-heavy components  
const LazyInteractiveMap = lazy(() => 
  Promise.resolve({
    default: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Interactive map not available</p>
      </div>
    )
  })
);

// Exported lazy components with error boundaries and loading states
export const PropertyMapSection = withLazyLoading(
  LazyPropertyMapSection,
  <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

export const PropertyRiskAssessment = withLazyLoading(
  LazyPropertyRiskAssessment,
  <div className="space-y-4">
    <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
    <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2"></div>
    <div className="animate-pulse bg-gray-200 h-4 rounded w-5/6"></div>
  </div>
);

export const PropertyPublicRecords = withLazyLoading(
  LazyPropertyPublicRecords,
  <div className="space-y-4">
    <div className="animate-pulse bg-gray-200 h-6 rounded w-1/3"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="animate-pulse bg-gray-200 h-20 rounded"></div>
      ))}
    </div>
  </div>
);

export const SearchResultsClient = withLazyLoading(
  LazySearchResultsClient,
  <div className="space-y-6">
    {[1, 2, 3].map(i => (
      <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
    ))}
  </div>
);

export const PropertyDetailsClient = withLazyLoading(
  LazyPropertyDetailsClient,
  <div className="space-y-6">
    <div className="animate-pulse bg-gray-200 h-8 rounded w-2/3"></div>
    <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="animate-pulse bg-gray-200 h-40 rounded"></div>
      <div className="animate-pulse bg-gray-200 h-40 rounded"></div>
    </div>
  </div>
);

export const PropertyCharts = withLazyLoading(
  LazyPropertyCharts,
  <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse bg-gray-300 h-4 w-32 mx-auto mb-2"></div>
      <div className="animate-pulse bg-gray-300 h-3 w-24 mx-auto"></div>
    </div>
  </div>
);

export const InteractiveMap = withLazyLoading(
  LazyInteractiveMap,
  <div className="bg-gray-50 rounded-lg h-96 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-2 text-gray-600">Loading map...</p>
    </div>
  </div>
);

// Utility for dynamic imports with retry logic
export const dynamicImport = async <T,>(
  importFn: () => Promise<{ default: T }>,
  retries = 3
): Promise<T> => {
  try {
    const moduleResult = await importFn();
    return moduleResult.default;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Import failed, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return dynamicImport(importFn, retries - 1);
    }
    throw error;
  }
};

// Preload utility for critical components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const preloadComponent = (importFn: () => Promise<any>) => {
  // Preload on idle or user interaction
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn().catch(() => {
        // Silently fail preloading
      });
    });
  } else {
    setTimeout(() => {
      importFn().catch(() => {
        // Silently fail preloading
      });
    }, 1000);
  }
};

// Hook for intersection-based lazy loading
export const useIntersectionLazyLoad = (
  ref: React.RefObject<HTMLElement>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFn: () => Promise<any>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          importFn().then(() => setIsLoaded(true));
          observer.disconnect();
        }
      },
      options
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [ref, importFn, isLoaded, options]);
  
  return isLoaded;
};

const LazyComponentsExport = {
  PropertyMapSection,
  PropertyRiskAssessment,
  PropertyPublicRecords,
  SearchResultsClient,
  PropertyDetailsClient,
  PropertyCharts,
  InteractiveMap,
  dynamicImport,
  preloadComponent,
  useIntersectionLazyLoad
};

export default LazyComponentsExport; 