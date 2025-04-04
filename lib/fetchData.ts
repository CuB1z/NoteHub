import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 15,
});

export async function fetchData<T>(url: string, authToken: string): Promise<T | null> {
  const cacheKey = `${url}-${authToken}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: T = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
