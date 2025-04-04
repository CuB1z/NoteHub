import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 15,
});

interface fetchProps {
  url: string,
  authToken: string | null | undefined,
  responseType?: "JSON" | "TEXT"
}

export async function fetchData<T>({ url, authToken, responseType }: fetchProps): Promise<T | null> {
  const cacheKey = `${url}-${authToken}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T;
  }

  const headers: Record<string, string> = {};
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      return null;
    }

    const data: T = responseType && responseType === "TEXT"
      ? await response.text()
      : await response.json();
      
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
