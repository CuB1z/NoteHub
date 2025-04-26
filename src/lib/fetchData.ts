import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({
  max: 10000,
  ttl: 1000 * 60 * 60,
});

interface fetchProps {
  url: string,
  authToken: string | null | undefined,
  responseType?: "JSON" | "TEXT"
}

export async function fetchData<T>({ url, authToken, responseType }: fetchProps): Promise<T | null> {
  const cacheKey = `${url}-${authToken || "Global"}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T;
  }

  const token = authToken || process.env.GITHUB_DEFAULT_TOKEN;
  const headers = { "Authorization": `Bearer ${token}` };

  console.log("Fetching data from URL:", url);
  console.log("Using headers:", headers);
  console.log("Cache key:", cacheKey);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    console.log(response);

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
