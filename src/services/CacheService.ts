/* CacheService.ts - Service for managing localStorage cache */

export const STORAGE_KEY = "__notehub_cache__";
export const EXPIRATION_TIME = 1000 * 24 * 60;

/**
 * Get stored cache from localStorage.
 * @returns {any} The stored cache object.
*/
export function getStoredCache(): any {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

/**
 * Set cache to localStorage.
 * @param {any} cache - The cache object to store.
*/
export function setStoredCache(cache: any): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
}

/**
 * Update cache in localStorage.
 * @param {string} url - URL to update in the cache.
 * @param {any} newData - The new data to store in the cache.
 */
export function updateStoredCache(url: string, newData: any): void {
    const cache = getStoredCache();
    cache[url] = { data: newData, timestamp: Date.now() };
    setStoredCache(cache);
}

/**
 * Clear cache from localStorage.
 * @param {string} [url] - URL to clear from the cache. If not provided, clears all cache.
*/
export function clearStoredCache(url?: string): void {
    if (url) {
        const cache = getStoredCache();
        delete cache[url];
        setStoredCache(cache);
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}