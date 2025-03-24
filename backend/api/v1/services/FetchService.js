
/**
 * Fetch data from a given URL
 * 
 * @param {String} url
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method - HTTP method to be used
 * @param {Object} headers - Headers to be sent with the request
 * @param {String} headers.Authorization
 * @returns {Promise<Object>}
*/
async function fetchFrom(url, method = "GET", headers = {}) {
    const res = await fetch(url, {
        method,
        headers
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch from ${url}`);
    }

    if (res.headers.get("Content-Type").includes("application/json")) {
        const data = await res.json();
        return { data };
    } else {
        const data = await res.text();
        return { data };
    }
}

export { fetchFrom };