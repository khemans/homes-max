import { getConfig } from '@/config/app';
import React from 'react';

interface PerformanceEntry {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private config = getConfig();
  private entries: Map<string, PerformanceEntry> = new Map();
  public measurements: PerformanceEntry[] = [];

  // Start timing an operation
  startTimer(name: string, metadata?: Record<string, unknown>): void {
    if (!this.config.development.enablePerformanceMetrics) return;

    const entry: PerformanceEntry = {
      name,
      startTime: performance.now(),
      metadata
    };

    this.entries.set(name, entry);

    if (this.config.development.enableConsoleLogging) {
      console.log(`⏱️ Started: ${name}`, metadata);
    }
  }

  // End timing an operation
  endTimer(name: string): number | null {
    if (!this.config.development.enablePerformanceMetrics) return null;

    const entry = this.entries.get(name);
    if (!entry) {
      console.warn(`Performance timer "${name}" not found`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - entry.startTime;

    const completedEntry: PerformanceEntry = {
      ...entry,
      endTime,
      duration
    };

    this.measurements.push(completedEntry);
    this.entries.delete(name);

    if (this.config.development.enableConsoleLogging) {
      console.log(`⏱️ Completed: ${name} - ${duration.toFixed(2)}ms`, entry.metadata);
    }

    return duration;
  }

  // Get all measurements
  getMeasurements(): PerformanceEntry[] {
    return [...this.measurements];
  }

  // Get measurements for a specific operation
  getMeasurementsFor(name: string): PerformanceEntry[] {
    return this.measurements.filter(entry => entry.name === name);
  }

  // Get average duration for an operation
  getAverageDuration(name: string): number | null {
    const entries = this.getMeasurementsFor(name);
    if (entries.length === 0) return null;

    const totalDuration = entries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    return totalDuration / entries.length;
  }

  // Clear all measurements
  clear(): void {
    this.measurements = [];
    this.entries.clear();
  }

  // Report performance summary
  report(): void {
    if (!this.config.development.enableConsoleLogging) return;

    console.group('📊 Performance Report');
    
    const operations = [...new Set(this.measurements.map(entry => entry.name))];
    
    operations.forEach(operation => {
      const entries = this.getMeasurementsFor(operation);
      const avgDuration = this.getAverageDuration(operation);
      const maxDuration = Math.max(...entries.map(e => e.duration || 0));
      const minDuration = Math.min(...entries.map(e => e.duration || 0));

      console.log(`${operation}:`, {
        count: entries.length,
        average: `${avgDuration?.toFixed(2)}ms`,
        min: `${minDuration.toFixed(2)}ms`,
        max: `${maxDuration.toFixed(2)}ms`
      });
    });

    console.groupEnd();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Higher-order function to measure async functions
export const measureAsync = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  name: string
): ((...args: T) => Promise<R>) => {
  return async (...args: T): Promise<R> => {
    performanceMonitor.startTimer(name, { args: args.length });
    try {
      const result = await fn(...args);
      performanceMonitor.endTimer(name);
      return result;
    } catch (error) {
      performanceMonitor.endTimer(name);
      throw error;
    }
  };
};

// Higher-order function to measure sync functions
export const measureSync = <T extends unknown[], R>(
  fn: (...args: T) => R,
  name: string
): ((...args: T) => R) => {
  return (...args: T): R => {
    performanceMonitor.startTimer(name, { args: args.length });
    try {
      const result = fn(...args);
      performanceMonitor.endTimer(name);
      return result;
    } catch (error) {
      performanceMonitor.endTimer(name);
      throw error;
    }
  };
};

// React hook for measuring component render time
export const useRenderPerformance = (componentName: string) => {
  const config = getConfig();
  
  React.useEffect(() => {
    if (!config.development.enablePerformanceMetrics) return;
    
    performanceMonitor.startTimer(`${componentName}-render`);
    return () => {
      performanceMonitor.endTimer(`${componentName}-render`);
    };
  }, [componentName, config.development.enablePerformanceMetrics]);
};

// Utility to measure Web Vitals
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      performanceMonitor.measurements.push({
        name: 'LCP',
        startTime: 0,
        endTime: lastEntry.startTime,
        duration: lastEntry.startTime
      });
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch {
    // Ignore if not supported
  }

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.name === 'first-input') {
        performanceMonitor.measurements.push({
          name: 'FID',
          startTime: entry.startTime,
          endTime: entry.startTime + entry.duration,
          duration: entry.duration
        });
      }
    });
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch {
    // Ignore if not supported
  }
};

// Bundle size analysis
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const totalSize = scripts.reduce((size, script) => {
    // This is a rough estimate - in production you'd use proper bundle analysis
    const src = script.getAttribute('src');
    if (src?.includes('chunks/')) {
      return size + 50000; // Rough estimate
    }
    return size;
  }, 0);

  performanceMonitor.measurements.push({
    name: 'Bundle Size',
    startTime: 0,
    duration: totalSize,
    metadata: { unit: 'bytes', scriptsCount: scripts.length }
  });
};

// Memory usage tracking
export const trackMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
  if (!memory) return;
  
  performanceMonitor.measurements.push({
    name: 'Memory Usage',
    startTime: performance.now(),
    duration: memory.usedJSHeapSize,
    metadata: {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      unit: 'bytes'
    }
  });
};

 