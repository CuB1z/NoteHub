import { useState, useEffect } from "react";

const STORAGE_KEY = "__notehub_cache__";
const EXPIRATION_TIME = 1000 * 60 * 60;

/**
 * Get stored cache from localStorage.
 * @returns {any} The stored cache object.
*/
function getStoredCache(): any {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

/**
 * Set cache to localStorage.
 * @param {any} cache - The cache object to store.
*/
function setStoredCache(cache: any): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
}

/**
 * Update cache in localStorage.
 * @param {string} url - URL to update in the cache.
 * @param {any} newData - The new data to store in the cache.
 */
function updateStoredCache(url: string, newData: any): void {
    const cache = getStoredCache();
    cache[url] = { data: newData, timestamp: Date.now() };
    setStoredCache(cache);
}

/**
 * Clear cache from localStorage.
 * @param {string} [url] - URL to clear from the cache. If not provided, clears all cache.
*/
function clearStoredCache(url?: string): void {
    if (url) {
        const cache = getStoredCache();
        delete cache[url];
        setStoredCache(cache);
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}

/**
 * Hook used to fetch data from an API and cache the response in localStorage.
 * @param {string} url - URL to fetch data from.
 * @param {string | null | undefined} authToken - Authentication token for the request.
 * @param {boolean} refresh - Flag to force a refresh of the cache.
 * @returns {data, loading, error} - The fetched data, loading state, and error message.
*/
export default function useFetchCache<T>(
    url: string,
    authToken: string | null | undefined,
    refresh: boolean = false,
    expirationTime: number = EXPIRATION_TIME
): { data: T | null; loading: boolean; error: string | null } {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchData(forceRefresh: boolean = false): Promise<void> {
        setLoading(true);
        setError(null);
        setData(null);

        if (forceRefresh) clearStoredCache(url);

        // Verify if there is cached data for the URL
        const cache = getStoredCache();
        if (cache[url]) {
            const { data: cachedData, timestamp } = cache[url];

            // Check if the cache has expired
            if (Date.now() - timestamp <= expirationTime) {
                setData(cachedData);
                setLoading(false);
                return;
            } else clearStoredCache(url);
        }

        try {
            const headers = {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    ...(authToken && { Authorization: `Bearer ${authToken}` })
                }
            }
            // Fetch the data from the API
            const response = await fetch(url, headers);
            if (!response.ok) {
                setLoading(false);
                setError("There was an error fetching the data.");
                return;
            }
            const result = await response.json();

            // Store the response in the cache and update the state
            updateStoredCache(url, result);
            setData(result);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("There was an error fetching the data.");
            return;
        }
    }

    useEffect(() => {
        fetchData(refresh);
    }, [url, refresh]);

    return { data, loading, error };
}