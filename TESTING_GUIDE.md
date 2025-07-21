# HOUSE/MAX Testing Guide

## Overview

Comprehensive testing strategy for the HOUSE/MAX property intelligence platform, covering unit tests, integration tests, performance tests, and user acceptance testing.

## Testing Framework Setup

### Available Testing Utilities

```typescript
import {
  mockPropertyData,
  mockApiResponses,
  TestWrapper,
  MockFetch,
  propertySearchTests,
  componentTestHelpers,
  performanceTestUtils,
  testSetup
} from '@/utils/testUtils';
```

### Quick Start

1. **Import Testing Utilities**
   ```typescript
   import testUtils from '@/utils/testUtils';
   ```

2. **Setup Mock Data**
   ```typescript
   const mockFetch = new testUtils.MockFetch();
   mockFetch.mockResponse('/api/avm', testUtils.mockApiResponses.avm.success);
   mockFetch.install();
   ```

3. **Run Tests**
   ```typescript
   // Test property search
   await testUtils.componentTestHelpers.simulateSearch('123 Main St');
   
   // Verify results
   expect(testUtils.componentTestHelpers.getPropertyCard()).toBeTruthy();
   ```

## Testing Categories

### 1. Unit Tests

#### API Route Testing
```typescript
// Test AVM API endpoint
describe('AVM API', () => {
  it('should calculate property value', async () => {
    const response = await fetch('/api/avm?address=123+Main+St');
    const data = await response.json();
    
    expect(data.avmValue).toBeDefined();
    expect(data.confidence).toContain('%');
  });
});
```

#### Component Testing
```typescript
// Test property card component
describe('PropertyCard', () => {
  it('should display property information', () => {
    const { getByText } = render(
      <TestWrapper>
        <PropertyCard property={mockPropertyData.basic} />
      </TestWrapper>
    );
    
    expect(getByText('123 Test Street')).toBeInTheDocument();
    expect(getByText('$450,000')).toBeInTheDocument();
  });
});
```

#### Utility Function Testing
```typescript
// Test parcel link generation
describe('Parcel Links', () => {
  it('should generate county parcel URLs', () => {
    const link = generateParcelLink({
      address: '123 Main St',
      city: 'Denver',
      state: 'CO',
      zip: '80202'
    });
    
    expect(link.url).toContain('denvergov.org');
    expect(link.available).toBe(true);
  });
});
```

### 2. Integration Tests

#### Complete User Flow
```typescript
describe('Property Search Flow', () => {
  it('should complete full search to details flow', async () => {
    // Start at homepage
    await componentTestHelpers.simulateSearch('4521 Broadway, Denver, CO');
    
    // Wait for search results
    await componentTestHelpers.waitForLoading();
    expect(componentTestHelpers.getPropertyCard()).toBeTruthy();
    
    // Click on property
    const propertyCard = componentTestHelpers.getPropertyCard();
    propertyCard?.click();
    
    // Verify property details loaded
    await componentTestHelpers.waitForLoading();
    expect(componentTestHelpers.getAVMSection()).toBeTruthy();
    expect(componentTestHelpers.getPublicRecordsSection()).toBeTruthy();
  });
});
```

#### API Integration Testing
```typescript
describe('API Integration', () => {
  it('should handle API failures gracefully', async () => {
    const mockFetch = new MockFetch();
    mockFetch.mockError('/api/avm', new Error('Service unavailable'));
    mockFetch.install();
    
    await componentTestHelpers.simulateSearch('123 Main St');
    await componentTestHelpers.waitForLoading();
    
    // Should show error message or fallback data
    expect(componentTestHelpers.getErrorMessage()).toBeTruthy();
    
    mockFetch.uninstall();
  });
});
```

### 3. Performance Tests

#### Load Time Testing
```typescript
describe('Performance', () => {
  it('should load property details within acceptable time', async () => {
    const loadTime = await performanceTestUtils.measureRenderTime(async () => {
      await componentTestHelpers.simulateSearch('123 Main St');
      await componentTestHelpers.waitForLoading();
    });
    
    expect(loadTime).toBeLessThan(testConfig.performance.maxRenderTime);
  });
  
  it('should not exceed memory limits', async () => {
    const beforeMemory = performanceTestUtils.measureMemoryUsage();
    
    // Perform heavy operations
    await componentTestHelpers.simulateSearch('123 Main St');
    await componentTestHelpers.waitForLoading();
    
    const afterMemory = performanceTestUtils.measureMemoryUsage();
    
    if (beforeMemory && afterMemory) {
      const memoryIncrease = afterMemory.used - beforeMemory.used;
      expect(memoryIncrease).toBeLessThan(testConfig.performance.maxMemoryIncrease);
    }
  });
});
```

#### API Response Time Testing
```typescript
describe('API Performance', () => {
  it('should respond within acceptable time limits', async () => {
    const apiTest = await performanceTestUtils.measureApiResponseTime(
      () => fetch('/api/avm?address=123+Main+St').then(r => r.json())
    );
    
    expect(apiTest.success).toBe(true);
    expect(apiTest.duration).toBeLessThan(testConfig.performance.maxApiResponseTime);
  });
});
```

### 4. Accessibility Tests

#### Screen Reader Testing
```typescript
describe('Accessibility', () => {
  it('should have proper ARIA labels', () => {
    const { getByLabelText } = render(
      <TestWrapper>
        <AddressAutocomplete />
      </TestWrapper>
    );
    
    expect(getByLabelText(/address/i)).toBeInTheDocument();
  });
  
  it('should support keyboard navigation', () => {
    const { container } = render(
      <TestWrapper>
        <PropertyCard property={mockPropertyData.basic} />
      </TestWrapper>
    );
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    expect(focusableElements.length).toBeGreaterThan(0);
  });
});
```

### 5. Error Handling Tests

#### Network Failure Testing
```typescript
describe('Error Handling', () => {
  it('should handle network failures', async () => {
    // Simulate network failure
    const mockFetch = new MockFetch();
    mockFetch.mockError('/api/mls', new Error('Network error'));
    mockFetch.install();
    
    await componentTestHelpers.simulateSearch('123 Main St');
    await componentTestHelpers.waitForLoading();
    
    // Should show appropriate error message
    const errorElement = componentTestHelpers.getErrorMessage();
    expect(errorElement).toBeTruthy();
    expect(errorElement?.textContent).toContain('unable to search');
    
    mockFetch.uninstall();
  });
  
  it('should handle invalid data gracefully', () => {
    // Test with malformed property data
    const invalidProperty = { ...mockPropertyData.basic, price: null };
    
    expect(() => {
      render(
        <TestWrapper>
          <PropertyCard property={invalidProperty} />
        </TestWrapper>
      );
    }).not.toThrow();
  });
});
```

## Test Data Management

### Mock Property Database
```typescript
// Use comprehensive mock data
const testProperty = mockPropertyData.basic;
const testAVM = mockPropertyData.avm;
const testPublicRecords = mockPropertyData.publicRecords;
```

### API Response Mocking
```typescript
// Mock successful API responses
const mockFetch = new MockFetch();
mockFetch.mockResponse('/api/mls', mockApiResponses.mls.success);
mockFetch.mockResponse('/api/avm', mockApiResponses.avm.success);
mockFetch.mockResponse('/api/public-records', mockApiResponses.publicRecords.success);
```

### Test Scenarios
```typescript
// Use predefined test scenarios
const validAddress = propertySearchTests.scenarios.validAddress;
const invalidAddress = propertySearchTests.scenarios.invalidAddress;
const noResults = propertySearchTests.scenarios.noResults;
```

## Running Tests

### Development Testing
```bash
# Run all tests
npm run test

# Run specific test file
npm run test PropertyCard.test.tsx

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Continuous Integration
```bash
# Run full test suite
npm run test:ci

# Generate coverage report
npm run test:coverage:ci

# Performance testing
npm run test:performance
```

## Test Coverage Goals

### Coverage Targets
- **Statements**: 80%+ coverage
- **Branches**: 75%+ coverage  
- **Functions**: 80%+ coverage
- **Lines**: 80%+ coverage

### Critical Components (100% Coverage Required)
- API routes (`/api/*`)
- Core utilities (`/utils/*`)
- Main search components
- AVM calculation logic
- Error boundary components

### Performance Benchmarks
- **Page Load**: < 3 seconds
- **Search Response**: < 2 seconds
- **Component Render**: < 1 second
- **Memory Usage**: < 50MB increase per search

## Best Practices

### 1. Test Organization
- Group related tests in `describe` blocks
- Use descriptive test names
- Keep tests focused and independent
- Use setup/teardown appropriately

### 2. Mock Data
- Use realistic test data
- Keep mock data consistent
- Update mocks when APIs change
- Test both success and failure scenarios

### 3. Async Testing
- Always await async operations
- Use proper timeout handling
- Test loading states
- Verify cleanup after tests

### 4. Component Testing
- Test user interactions
- Verify rendered output
- Test prop changes
- Check accessibility features

### 5. Performance Testing
- Monitor memory usage
- Measure render times
- Test with large datasets
- Verify lazy loading works

## Debugging Test Failures

### Common Issues
1. **Timing Issues**: Use proper async/await patterns
2. **DOM Cleanup**: Ensure components unmount properly
3. **Mock Conflicts**: Clear mocks between tests
4. **State Pollution**: Reset application state

### Debug Tools
```typescript
// Add debug logging
console.log('Test state:', componentTestHelpers.getPropertyCard());

// Measure performance
const timing = await performanceTestUtils.measureRenderTime(testFunction);
console.log('Render time:', timing);

// Check memory usage
const memory = performanceTestUtils.measureMemoryUsage();
console.log('Memory usage:', memory);
```

## Integration with CI/CD

### GitHub Actions Example
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:coverage
```

### Quality Gates
- All tests must pass
- Coverage thresholds must be met
- Performance benchmarks must pass
- No accessibility violations

## Maintenance

### Regular Tasks
- Update test data monthly
- Review and update performance benchmarks
- Add tests for new features
- Refactor tests when code changes
- Monitor test execution times

### Test Health Monitoring
- Track test execution time trends
- Monitor flaky test patterns
- Review coverage reports
- Update testing documentation

This comprehensive testing guide ensures the HOUSE/MAX platform maintains high quality, performance, and reliability standards through systematic testing practices. 