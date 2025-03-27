"use client";

import { useState, useEffect } from "react";

interface FetchOptions {
  authToken: string;
  method?: string;
}

export function useFetchWithCache<T>(url: string, cacheKey: string, options: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setData(null);

      if (!options?.authToken || !url) {
        setLoading(false);
        return;
      }

      const cachedToken = localStorage.getItem(`${cacheKey}-token`);
      if (cachedToken !== options?.authToken) {
        localStorage.removeItem(cacheKey);
        localStorage.setItem(`${cacheKey}-token`, options?.authToken || "");
      }

      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url, {
          method: options?.method || "GET",
          headers: {
            Authorization: `Bearer ${options?.authToken}`,
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, cacheKey, options?.authToken]);

  return { data, loading, error };
}