import { getConfig } from '@/config/app';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  clears: number;
}

class CacheManager {
  private config = getConfig();
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    clears: 0
  };

  // Get cached data
  get<T>(key: string): T | null {
    if (!this.config.performance.enableCaching) {
      return null;
    }

    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return entry.data as T;
  }

  // Set cached data
  set<T>(key: string, data: T, ttl?: number): void {
    if (!this.config.performance.enableCaching) {
      return;
    }

    const timeout = ttl || this.config.performance.cacheTimeout;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + timeout
    };

    this.cache.set(key, entry);
    this.stats.sets++;

    // Clean up expired entries periodically
    if (this.stats.sets % 100 === 0) {
      this.cleanup();
    }
  }

  // Delete specific key
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.deletes++;
    }
    return deleted;
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
    this.stats.clears++;
  }

  // Check if key exists and is not expired
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  // Get cache statistics
  getStats(): CacheStats {
    return { ...this.stats };
  }

  // Get cache hit rate
  getHitRate(): number {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : this.stats.hits / total;
  }

  // Clean up expired entries
  private cleanup(): void {
    const now = Date.now();
    let removedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removedCount++;
      }
    }

    if (this.config.development.enableConsoleLogging && removedCount > 0) {
      console.log(`🧹 Cache cleanup: removed ${removedCount} expired entries`);
    }
  }

  // Get cache size
  size(): number {
    return this.cache.size;
  }

  // Get all keys
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Get memory usage estimate (rough)
  getMemoryUsage(): number {
    let totalSize = 0;
    for (const [key, entry] of this.cache.entries()) {
      totalSize += key.length * 2; // rough string size
      totalSize += JSON.stringify(entry.data).length * 2; // rough data size
      totalSize += 24; // timestamp and expiresAt
    }
    return totalSize;
  }
}

// Singleton instance
export const cache = new CacheManager();

// Helper to create cache keys
export const createCacheKey = (...parts: (string | number)[]): string => {
  return parts.join(':');
};

// Decorator for caching function results
export const cached = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttl?: number
) => {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);
    
    // Try to get from cache first
    const cached = cache.get<R>(key);
    if (cached !== null) {
      return cached;
    }

    // Execute function and cache result
    const result = await fn(...args);
    cache.set(key, result, ttl);
    return result;
  };
};

// Cache for API responses specifically
export class APICache {
  private static ENDPOINTS = {
    MLS: 'mls',
    AVM: 'avm',
    PUBLIC_RECORDS: 'public-records',
    RISK: 'risk',
    ADDRESS_SEARCH: 'address-search'
  } as const;

  static getMLSKey(address: string): string {
    return createCacheKey('api', this.ENDPOINTS.MLS, address.toLowerCase());
  }

  static getAVMKey(address: string): string {
    return createCacheKey('api', this.ENDPOINTS.AVM, address.toLowerCase());
  }

  static getPublicRecordsKey(address: string): string {
    return createCacheKey('api', this.ENDPOINTS.PUBLIC_RECORDS, address.toLowerCase());
  }

  static getRiskKey(address: string): string {
    return createCacheKey('api', this.ENDPOINTS.RISK, address.toLowerCase());
  }

  static getAddressSearchKey(query: string): string {
    return createCacheKey('api', this.ENDPOINTS.ADDRESS_SEARCH, query.toLowerCase());
  }

  // Clear all API cache
  static clearAll(): void {
    const keys = cache.keys();
    keys.forEach(key => {
      if (key.startsWith('api:')) {
        cache.delete(key);
      }
    });
  }

  // Clear cache for specific address
  static clearForAddress(address: string): void {
    const lowerAddress = address.toLowerCase();
    const keys = [
      this.getMLSKey(lowerAddress),
      this.getAVMKey(lowerAddress),
      this.getPublicRecordsKey(lowerAddress),
      this.getRiskKey(lowerAddress)
    ];

    keys.forEach(key => cache.delete(key));
  }
}

// localStorage-based persistent cache for saved properties
export class PersistentCache {
  private static readonly PREFIX = 'housemax_';

  static set<T>(key: string, data: T, ttl?: number): void {
    if (typeof window === 'undefined') return;

    const entry = {
      data,
      timestamp: Date.now(),
      expiresAt: ttl ? Date.now() + ttl : null
    };

    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(entry));
    } catch (error) {
      // Handle quota exceeded or other localStorage errors
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (!item) return null;

      const entry = JSON.parse(item);
      
      // Check expiration
      if (entry.expiresAt && Date.now() > entry.expiresAt) {
        this.delete(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  static delete(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.PREFIX + key);
  }

  static clear(): void {
    if (typeof window === 'undefined') return;
    
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  static has(key: string): boolean {
    return this.get(key) !== null;
  }
}

export default cache; 