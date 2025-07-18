// Diagnostic utilities for identifying runtime issues
import React from 'react';
import { getConfig } from '@/config/app';

interface DiagnosticResult {
  component: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: unknown;
}

export class RuntimeDiagnostics {
  private results: DiagnosticResult[] = [];

  // Check if running in browser environment
  checkBrowserEnvironment(): DiagnosticResult {
    const result: DiagnosticResult = {
      component: 'Browser Environment',
      status: 'pass',
      message: 'Running in browser environment'
    };

    if (typeof window === 'undefined') {
      result.status = 'fail';
      result.message = 'Not running in browser environment';
    }

    this.results.push(result);
    return result;
  }

  // Check if essential APIs are available
  checkBrowserAPIs(): DiagnosticResult {
    const result: DiagnosticResult = {
      component: 'Browser APIs',
      status: 'pass',
      message: 'All essential APIs available',
      details: {}
    };

    const apis = {
      localStorage: typeof Storage !== 'undefined' && window.localStorage,
      fetch: typeof fetch !== 'undefined',
      URLSearchParams: typeof URLSearchParams !== 'undefined',
      performance: typeof performance !== 'undefined',
      console: typeof console !== 'undefined'
    };

    const missingAPIs = Object.entries(apis)
      .filter(([, available]) => !available)
      .map(([name]) => name);

    if (missingAPIs.length > 0) {
      result.status = 'warning';
      result.message = `Missing APIs: ${missingAPIs.join(', ')}`;
    }

    result.details = apis;
    this.results.push(result);
    return result;
  }

  // Check configuration loading
  checkConfiguration(): DiagnosticResult {
    const result: DiagnosticResult = {
      component: 'Configuration',
      status: 'pass',
      message: 'Configuration loaded successfully'
    };

    try {
      const config = getConfig();
      
      // Check essential config sections
      const requiredSections = ['api', 'features', 'performance', 'errors'];
      const missingSections = requiredSections.filter(section => !config[section as keyof typeof config]);

      if (missingSections.length > 0) {
        result.status = 'fail';
        result.message = `Missing config sections: ${missingSections.join(', ')}`;
      }

      result.details = {
        environment: process.env.NODE_ENV,
        sections: Object.keys(config)
      };
    } catch (error) {
      result.status = 'fail';
      result.message = `Configuration error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      result.details = error;
    }

    this.results.push(result);
    return result;
  }

  // Check for common React issues
  checkReactEnvironment(): DiagnosticResult {
    const result: DiagnosticResult = {
      component: 'React Environment',
      status: 'pass',
      message: 'React environment OK'
    };

    try {
      // Check if React is available
      if (typeof React === 'undefined') {
        // Try to access React through import
        import('react').then(() => {
          // React is available via import
        }).catch(() => {
          result.status = 'fail';
          result.message = 'React not available';
        });
      }

      // Check for hydration issues indicators
      if (typeof window !== 'undefined') {
        const reactRoot = document.getElementById('__next') || document.getElementById('root');
        if (!reactRoot) {
          result.status = 'warning';
          result.message = 'React root element not found - possible hydration issue';
        }
      }

    } catch (error) {
      result.status = 'fail';
      result.message = `React error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    this.results.push(result);
    return result;
  }

  // Check network connectivity to APIs
  async checkAPIConnectivity(): Promise<DiagnosticResult> {
    const result: DiagnosticResult = {
      component: 'API Connectivity',
      status: 'pass',
      message: 'API endpoints reachable'
    };

    try {
      const testEndpoint = '/api/test';
      
      const response = await fetch(testEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        result.status = 'warning';
        result.message = `API test endpoint returned ${response.status}`;
      }

      result.details = {
        testEndpoint,
        status: response.status,
        statusText: response.statusText
      };

    } catch (error) {
      result.status = 'fail';
      result.message = `API connectivity error: ${error instanceof Error ? error.message : 'Network error'}`;
      result.details = error;
    }

    this.results.push(result);
    return result;
  }

  // Check for memory leaks indicators
  checkMemoryUsage(): DiagnosticResult {
    const result: DiagnosticResult = {
      component: 'Memory Usage',
      status: 'pass',
      message: 'Memory usage within normal range'
    };

    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      
      if (memory) {
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        const totalMB = memory.totalJSHeapSize / 1024 / 1024;
        const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;

        if (usedMB > limitMB * 0.8) {
          result.status = 'warning';
          result.message = 'High memory usage detected';
        }

        result.details = {
          used: `${usedMB.toFixed(2)} MB`,
          total: `${totalMB.toFixed(2)} MB`,
          limit: `${limitMB.toFixed(2)} MB`,
          percentage: `${((usedMB / limitMB) * 100).toFixed(1)}%`
        };
      }
    } else {
      result.status = 'warning';
      result.message = 'Memory API not available';
    }

    this.results.push(result);
    return result;
  }

  // Run all diagnostics
  async runAllDiagnostics(): Promise<DiagnosticResult[]> {
    this.results = [];

    // Synchronous checks
    this.checkBrowserEnvironment();
    this.checkBrowserAPIs();
    this.checkConfiguration();
    this.checkReactEnvironment();
    this.checkMemoryUsage();

    // Asynchronous checks
    await this.checkAPIConnectivity();

    return this.results;
  }

  // Get summary report
  getSummary(): { total: number; passed: number; failed: number; warnings: number } {
    return {
      total: this.results.length,
      passed: this.results.filter(r => r.status === 'pass').length,
      failed: this.results.filter(r => r.status === 'fail').length,
      warnings: this.results.filter(r => r.status === 'warning').length
    };
  }

  // Log results to console
  logResults(): void {
    console.group('🔧 Runtime Diagnostics');
    
    this.results.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
      console.log(`${icon} ${result.component}: ${result.message}`);
      
      if (result.details && result.status !== 'pass') {
        console.log('Details:', result.details);
      }
    });

    const summary = this.getSummary();
    console.log('\n📊 Summary:', summary);
    console.groupEnd();
  }
}

// Utility function to run diagnostics easily
export const runDiagnostics = async (): Promise<void> => {
  const diagnostics = new RuntimeDiagnostics();
  await diagnostics.runAllDiagnostics();
  diagnostics.logResults();
};

// Error boundary helper
export const createErrorHandler = (componentName: string) => {
  return (error: Error, errorInfo: React.ErrorInfo) => {
    console.error(`Error in ${componentName}:`, error);
    console.error('Error info:', errorInfo);
    
    // Run diagnostics when error occurs
    runDiagnostics().catch(console.error);
  };
};

export default RuntimeDiagnostics; 