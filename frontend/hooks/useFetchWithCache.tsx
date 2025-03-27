"use client";

import { useState, useEffect } from "react";

export function useFetchWithCache<T>(url: string, cacheKey: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url);
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
  }, [url, cacheKey]);

  return { data, loading, error };
}