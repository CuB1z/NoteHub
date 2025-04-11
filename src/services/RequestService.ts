
const AUTH_PREFIX = "Bearer ";

/**
 * This function retrieves the authentication token from the request headers.
 * It checks if the "Authorization" header is present and starts with the expected prefix.
 * 
 * @param headers - The headers from the request
 * @returns The authentication token if present, otherwise null
*/
export function getAuthToken(headers: Headers): string | null {
    const authHeader = headers.get("Authorization");

    if (!authHeader) return null;
    if (!authHeader.startsWith(AUTH_PREFIX)) return null;
    return authHeader.substring(AUTH_PREFIX.length);
}