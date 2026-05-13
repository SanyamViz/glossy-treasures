const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Enhanced fetch wrapper with error handling and timeout
 */
async function fetchWithRetry(url, options = {}, retries = 2) {
    const timeout = options.timeout || 10000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network response was not ok' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        clearTimeout(id);
        if (retries > 0 && (err.name === 'AbortError' || err.message.includes('fetch'))) {
            console.warn(`Retrying fetch for ${url}. Retries left: ${retries}`);
            return fetchWithRetry(url, options, retries - 1);
        }
        throw err;
    }
}

export const api = {
    baseUrl: BASE_URL,
    get: (endpoint) => fetchWithRetry(`${BASE_URL}${endpoint}`),
    post: (endpoint, data) => fetchWithRetry(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }),
    patch: (endpoint, data) => fetchWithRetry(`${BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }),
    delete: (endpoint) => fetchWithRetry(`${BASE_URL}${endpoint}`, {
        method: 'DELETE'
    })
};
