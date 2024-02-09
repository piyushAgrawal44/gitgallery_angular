import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheServiceService {

  private cache = new Map<string, { data: any, expiry: number }>();
  private defaultExpiryTimeMs: number = 60000; // Default expiry time in milliseconds (e.g., 1 minute)

  constructor() { }

  get(key: string): any {
    const cachedItem = this.cache.get(key);
    if (cachedItem) {
      if (cachedItem.expiry === 0 || Date.now() < cachedItem.expiry) {
        // Return the data if not expired or expiry time is set to 0 (never expire)
        return cachedItem.data;
      } else {
        // Remove the item from the cache if expired
        this.cache.delete(key);
      }
    }
    return null; // Return null if item not found or expired
  }

  set(key: string, data: any, expiryTimeMs: number = this.defaultExpiryTimeMs): void {
    const expiry = expiryTimeMs > 0 ? Date.now() + expiryTimeMs : 0; // Calculate expiry time
    this.cache.set(key, { data, expiry });
  }

  has(key: string): boolean {
    return this.cache.has(key) && (this.cache.get(key)?.expiry === 0 || Date.now() < this.cache.get(key)!.expiry);
  }

  clear(): void {
    this.cache.clear();
  }
}
