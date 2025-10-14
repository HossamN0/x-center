interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string>;
}

interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}

class SSRApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor() {
        this.baseURL = process.env.API_URL || '';
        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        // Debug logging
        // console.log('SSR Client initialized with baseURL:', this.baseURL);
    }

    private buildURL(endpoint: string, params?: Record<string, string>): string {
        const normalizedEndpoint = endpoint.startsWith('/')
            ? endpoint.slice(1)
            : endpoint;

        const url = new URL(`${this.baseURL.replace(/\/$/, '')}/${normalizedEndpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        return url.toString();
    }

    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
        const data = await response.json();

        return {
            data,
            status: response.status,
            statusText: response.statusText,
        };
    }

    async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const {
            method = 'GET',
            headers = {},
            body,
            params,
        } = options;

        const url = this.buildURL(endpoint, params);

        const requestHeaders = {
            ...this.defaultHeaders,
            ...headers,
        };

        const requestOptions: RequestInit = {
            method,
            headers: requestHeaders,
        };

        if (body && method !== 'GET') {
            requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        try {
            // console.log('SSR API request:', { method, url, headers: requestHeaders, body });
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                let errorData: any = null;
                try {
                    errorData = await response.json();
                } catch {
                    // fallback if response isn't valid JSON
                    errorData = { message: await response.text().catch(() => 'Unknown error') };
                }

                const apiError = {
                    // body,
                    status: response.status,
                    message: errorData.message || response.statusText,
                    errors: errorData.errors || {},
                    raw: errorData,
                };

                // console.error('SSR API request failed:', apiError);

                throw apiError;
            }


            const result = await this.handleResponse<T>(response);
            return result.data;
        } catch (error) {
            // console.error('SSR API request failed:', error);
            throw error;
        }
    }

    // Convenience methods
    async get<T = any>(endpoint: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', params, headers });
    }

    async post<T = any>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, { method: 'POST', body, headers });
    }

    async put<T = any>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, { method: 'PUT', body, headers });
    }

    async delete<T = any>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', headers });
    }

    async patch<T = any>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, { method: 'PATCH', body, headers });
    }
}

// Create a singleton instance
const ssrClient = new SSRApiClient();

// Export the client instance and convenience functions
export default ssrClient;

// Export individual methods for convenience with proper binding
export const get = ssrClient.get.bind(ssrClient);
export const post = ssrClient.post.bind(ssrClient);
export const put = ssrClient.put.bind(ssrClient);
export const del = ssrClient.delete.bind(ssrClient);
export const patch = ssrClient.patch.bind(ssrClient);
export const request = ssrClient.request.bind(ssrClient);

// Export types
export type { RequestOptions, ApiResponse };
