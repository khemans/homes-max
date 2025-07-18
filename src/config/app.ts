// Centralized application configuration
export const APP_CONFIG = {
  // API Configuration
  api: {
    endpoints: {
      mls: '/api/mls',
      avm: '/api/avm',
      publicRecords: '/api/public-records',
      risk: '/api/risk',
      addressSearch: '/api/address-search',
      permits: '/api/permits'
    },
    timeout: 10000, // 10 seconds
    retries: 3
  },

  // Performance Configuration
  performance: {
    enableCaching: true,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    enableLazyLoading: true,
    chunkSize: 1024 * 1024, // 1MB
    enableServiceWorker: true
  },

  // UI Configuration
  ui: {
    maxMlsResults: 3,
    maxPermits: 5,
    maxComparables: 10,
    printTimeout: 3000,
    animationDuration: 300
  },

  // Feature Flags
  features: {
    enableAVM: true,
    enablePublicRecords: true,
    enableRiskAssessment: true,
    enablePropertySaving: true,
    enablePrintReports: true,
    enableMapIntegration: true,
    enableAdvancedSearch: false // Future feature
  },

  // External Services
  external: {
    cotality: {
      enabled: true,
      baseUrl: 'https://api.cotality.com'
    },
    lexisNexis: {
      enabled: true,
      baseUrl: 'https://www.lexisnexis.com'
    },
    geoapify: {
      enabled: true,
      timeout: 5000
    }
  },

  // Error Handling
  errors: {
    enableErrorBoundary: true,
    enableErrorReporting: false, // Future: Sentry integration
    fallbackComponent: true,
    logErrors: true
  },

  // Development
  development: {
    enableDebugMode: process.env.NODE_ENV === 'development',
    enablePerformanceMetrics: true,
    enableConsoleLogging: process.env.NODE_ENV === 'development'
  }
};

// Type-safe config access
export type AppConfig = typeof APP_CONFIG;

// Environment-specific overrides
export const getConfig = (): AppConfig => {
  // Production overrides
  if (process.env.NODE_ENV === 'production') {
    return {
      ...APP_CONFIG,
      development: {
        ...APP_CONFIG.development,
        enableDebugMode: false,
        enableConsoleLogging: false
      },
      errors: {
        ...APP_CONFIG.errors,
        enableErrorReporting: true
      }
    };
  }

  // Test overrides
  if (process.env.NODE_ENV === 'test') {
    return {
      ...APP_CONFIG,
      api: {
        ...APP_CONFIG.api,
        timeout: 1000
      },
      performance: {
        ...APP_CONFIG.performance,
        enableCaching: false
      },
      errors: {
        ...APP_CONFIG.errors,
        logErrors: false
      }
    };
  }

  return APP_CONFIG;
}; 