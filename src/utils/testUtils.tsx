// Testing Utilities for HOUSE/MAX Platform
// Comprehensive testing setup and utilities

import React from 'react';

// Mock data generators for testing
export const mockPropertyData = {
  basic: {
    address: '123 Test Street',
    city: 'Denver',
    state: 'CO',
    zip: '80202',
    price: 450000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    status: 'Active',
    mlsId: 'TEST123'
  },
  
  avm: {
    avmValue: 475000,
    confidence: '95%',
    lastUpdated: '2024-01-15',
    comparables: [
      {
        address: '125 Test Street',
        soldPrice: 460000,
        soldDate: '2024-01-10',
        sqft: 1750,
        distance: 0.1
      }
    ]
  },
  
  publicRecords: {
    assessment: {
      assessedValue: 420000,
      taxYear: 2023,
      landValue: 150000,
      improvementValue: 270000
    },
    permits: [
      {
        permitNumber: 'P2023-001',
        type: 'Electrical',
        description: 'Panel upgrade',
        issuedDate: '2023-06-15',
        status: 'Completed'
      }
    ]
  }
};

// API Response Mocks
export const mockApiResponses = {
  mls: {
    success: {
      results: [mockPropertyData.basic],
      total: 1,
      page: 1
    },
    error: {
      error: 'MLS service unavailable'
    }
  },
  
  avm: {
    success: mockPropertyData.avm,
    error: {
      error: 'AVM calculation failed'
    }
  },
  
  publicRecords: {
    success: mockPropertyData.publicRecords,
    error: {
      error: 'Public records not available'
    }
  }
};

// Test Component Wrapper
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  );
};

// Mock Fetch Utility
export class MockFetch {
  private responses = new Map<string, any>();
  private originalFetch: typeof fetch;
  
  constructor() {
    this.originalFetch = global.fetch;
  }
  
  mockResponse(url: string, response: Record<string, unknown>, options?: { status?: number; ok?: boolean }) {
    this.responses.set(url, {
      ...response,
      status: options?.status || 200,
      ok: options?.ok !== false
    });
  }
  
  mockError(url: string, error: Error) {
    this.responses.set(url, { error });
  }
  
  install() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.fetch = ((url: string) => {
      const response = this.responses.get(url);
      
      if (response?.error) {
        return Promise.reject(response.error);
      }
      
      return Promise.resolve({
        ok: response?.ok !== false,
        status: response?.status || 200,
        json: () => Promise.resolve(response),
        text: () => Promise.resolve(JSON.stringify(response))
      } as Response);
    }) as typeof fetch;
  }
  
  uninstall() {
    global.fetch = this.originalFetch;
    this.responses.clear();
  }
  
  clear() {
    this.responses.clear();
  }
}

// Property Search Test Utilities
export const propertySearchTests = {
  // Test data for different search scenarios
  scenarios: {
    validAddress: '4521 Broadway, Denver, CO 80216',
    invalidAddress: 'Invalid Address 123',
    partialAddress: '4521 Broadway',
    multipleResults: 'Main Street',
    noResults: 'Nonexistent Street 999'
  },
  
  // Expected behaviors
  expectations: {
    shouldReturnResults: (results: unknown[]) => results.length > 0,
    shouldHaveAVM: (avm: Record<string, unknown>) => avm && typeof avm.avmValue === 'number' && avm.avmValue > 0,
    shouldHavePublicRecords: (records: Record<string, unknown>) => records && records.assessment,
    shouldHandleErrors: (error: Record<string, unknown>) => error && error.message
  }
};

// Component Testing Helpers
export const componentTestHelpers = {
  // Wait for async operations
  waitForLoading: (timeout = 3000) => 
    new Promise(resolve => setTimeout(resolve, timeout)),
  
  // Simulate user interactions
  simulateSearch: async (searchTerm: string) => {
    // Simulate typing in search input
    const searchInput = document.querySelector('[data-testid="address-search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = searchTerm;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Simulate form submission
      const form = searchInput.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    }
  },
  
  // Check for component elements
  getPropertyCard: () => document.querySelector('[data-testid="property-card"]'),
  getAVMSection: () => document.querySelector('[data-testid="avm-section"]'),
  getPublicRecordsSection: () => document.querySelector('[data-testid="public-records-section"]'),
  getErrorMessage: () => document.querySelector('[data-testid="error-message"]'),
  getLoadingSpinner: () => document.querySelector('[data-testid="loading-spinner"]')
};

// Performance Testing Utilities
export const performanceTestUtils = {
  // Measure component render time
  measureRenderTime: async (componentFn: () => Promise<void>) => {
    const start = performance.now();
    await componentFn();
    const end = performance.now();
    return end - start;
  },
  
  // Memory usage monitoring
  measureMemoryUsage: () => {
    if ('memory' in performance) {
      return {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      };
    }
    return null;
  },
  
  // API response time testing
  measureApiResponseTime: async (apiCall: () => Promise<unknown>) => {
    const start = performance.now();
    try {
      const result = await apiCall();
      const end = performance.now();
      return {
        duration: end - start,
        success: true,
        result
      };
    } catch (error) {
      const end = performance.now();
      return {
        duration: end - start,
        success: false,
        error
      };
    }
  }
};

// Integration Test Scenarios
export const integrationTestScenarios = [
  {
    name: 'Complete Property Search Flow',
    steps: [
      'User enters valid address',
      'Search returns MLS results',
      'User clicks on property',
      'Property details page loads',
      'AVM data displays',
      'Public records load',
      'Risk assessment shows'
    ]
  },
  {
    name: 'Error Handling Flow',
    steps: [
      'User enters invalid address',
      'Appropriate error message shows',
      'User can retry search',
      'Fallback data displays when APIs fail'
    ]
  },
  {
    name: 'Performance Flow',
    steps: [
      'Page loads within 3 seconds',
      'Search completes within 2 seconds',
      'Heavy components lazy load',
      'Memory usage stays reasonable'
    ]
  }
];

// Test Configuration
export const testConfig = {
  timeouts: {
    default: 5000,
    api: 10000,
    render: 3000
  },
  
  performance: {
    maxRenderTime: 1000, // ms
    maxApiResponseTime: 3000, // ms
    maxMemoryIncrease: 50 * 1024 * 1024 // 50MB
  },
  
  coverage: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80
  }
};

// Testing Setup Utilities (framework agnostic)
export const testSetup = {
  // Global setup for all tests
  beforeAll: () => {
    // Mock console methods
    const originalConsole = global.console;
    global.console = {
      ...console,
      warn: () => {},
      error: () => {}
    };
    
    // Mock localStorage
    const localStorageMock = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    };
    
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
      });
      
      // Mock IntersectionObserver
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).IntersectionObserver = function() {
        return {
          observe: () => {},
          unobserve: () => {},
          disconnect: () => {}
        };
      };
    }
    
    return { originalConsole };
  },
  
  // Cleanup after each test
  afterEach: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  }
};

// Example Test Cases
export const exampleTests = {
  // Unit test example
  unitTest: `
    import { mockPropertyData, MockFetch } from './testUtils';
    
    describe('Property AVM Calculation', () => {
      let mockFetch: MockFetch;
      
      beforeEach(() => {
        mockFetch = new MockFetch();
        mockFetch.install();
      });
      
      afterEach(() => {
        mockFetch.uninstall();
      });
      
      it('should calculate AVM for valid property', async () => {
        mockFetch.mockResponse('/api/avm', mockPropertyData.avm);
        
        // Test implementation here
        const result = await getAVMData('123 Test Street');
        expect(result.avmValue).toBe(475000);
        expect(result.confidence).toBe('95%');
      });
    });
  `,
  
  // Integration test example
  integrationTest: `
    import { componentTestHelpers, propertySearchTests } from './testUtils';
    
    describe('Property Search Integration', () => {
      it('should complete full search flow', async () => {
        await componentTestHelpers.simulateSearch(
          propertySearchTests.scenarios.validAddress
        );
        
        await componentTestHelpers.waitForLoading();
        
        expect(componentTestHelpers.getPropertyCard()).toBeTruthy();
        expect(componentTestHelpers.getAVMSection()).toBeTruthy();
      });
    });
  `
};

const TestUtilsExport = {
  mockPropertyData,
  mockApiResponses,
  TestWrapper,
  MockFetch,
  propertySearchTests,
  componentTestHelpers,
  performanceTestUtils,
  integrationTestScenarios,
  testConfig,
  testSetup,
  exampleTests
};

export default TestUtilsExport; 