import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

/**
 * SSR API Client with automatic token refresh functionality
 * 
 * Features:
 * - Automatic access token inclusion in requests
 * - Automatic token refresh on 401 errors
 * - Retry logic for failed requests after token refresh
 * - Configurable authentication behavior
 * 
 * Usage:
 * - All requests automatically include auth tokens when user is logged in
 * - 401 errors trigger automatic token refresh and request retry
 * - Use retryOnAuthFailure: false to disable automatic retry
 * - Use includeAuth: false to skip authentication entirely
 */

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string>;
    includeAuth?: boolean;
    retryOnAuthFailure?: boolean;
}

interface AuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
}

interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
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

    private async getAuthTokens(): Promise<AuthTokens> {
        try {
            const session = await getServerSession(authOptions);
            return {
                accessToken: session?.access_token || null,
                refreshToken: session?.refresh_token || null,
            };
        } catch (error) {
            // console.warn('Failed to get auth tokens:', error);
            return {
                accessToken: null,
                refreshToken: null,
            };
        }
    }

    private async getAuthToken(): Promise<string | null> {
        const tokens = await this.getAuthTokens();
        return tokens.accessToken;
    }

    private async refreshAccessToken(refreshToken: string, accessToken: string): Promise<RefreshTokenResponse | null> {
        try {
            const refreshUrl = this.buildURL('/refresh');
            const response = await fetch(refreshUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    refresh_token: refreshToken,
                    access_token: accessToken
                }),
            });

            if (!response.ok) {
                // console.warn('Token refresh failed:', response.status, response.statusText);
                return null;
            }

            const data = await response.json();
            return data as RefreshTokenResponse;
        } catch (error) {
            // console.warn('Token refresh request failed:', error);
            return null;
        }
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
            includeAuth = true,
            retryOnAuthFailure = true,
        } = options;

        return this.makeRequestWithRetry<T>(endpoint, {
            method,
            headers,
            body,
            params,
            includeAuth,
            retryOnAuthFailure,
        });
    }

    private async makeRequestWithRetry<T = any>(
        endpoint: string,
        options: RequestOptions & { retryOnAuthFailure: boolean },
        isRetry: boolean = false
    ): Promise<T> {
        const {
            method = 'GET',
            headers = {},
            body,
            params,
            includeAuth = true,
            retryOnAuthFailure = true,
        } = options;

        const url = this.buildURL(endpoint, params);

        const requestHeaders = {
            ...this.defaultHeaders,
            ...headers,
        };

        // Add authorization header if token is available and includeAuth is true
        if (includeAuth) {
            const authToken = await this.getAuthToken();
            if (authToken) {
                requestHeaders['Authorization'] = `Bearer ${authToken}`;
            }
        }

        const requestOptions: RequestInit = {
            method,
            headers: requestHeaders,
        };

        if (body && method !== 'GET') {
            requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        try {
            // console.log('SSR API request:', { method, url, headers: requestHeaders, body });
            console.log('Making request to:', url, 'with method:', method);
            const response = await fetch(url, requestOptions);
            console.log('Response status:', response.status, 'for URL:', url);

            if (!response.ok) {
                console.log('Request failed with status:', response.status);
                // Handle 401 Unauthorized with token refresh
                if (response.status === 422 && includeAuth && retryOnAuthFailure && !isRetry) {
                    console.log('422 error detected, attempting token refresh...');
                    const tokens = await this.getAuthTokens();
                    console.log('token', tokens.accessToken)

                    if (tokens.refreshToken && tokens.accessToken) {
                        // console.log('Access token expired, attempting to refresh...');
                        const refreshResult = await this.refreshAccessToken(tokens.refreshToken, tokens.accessToken);

                        if (refreshResult) {
                            console.log('Token refreshed successfully, retrying original request...');
                            // console.log('Token refreshed successfully, retrying request...');
                            return this.makeRequestWithRetry<T>(endpoint, {
                                ...options,
                                retryOnAuthFailure: false,
                            }, true);
                        }
                    }
                }

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
                console.log('Request headers sent:', requestHeaders);
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
    async get<T = any>(endpoint: string, params?: Record<string, string>, headers?: Record<string, string>, includeAuth?: boolean, retryOnAuthFailure?: boolean): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', params, headers, includeAuth, retryOnAuthFailure });
    }

    async post<T = any>(endpoint: string, body?: any, headers?: Record<string, string>, includeAuth?: boolean, retryOnAuthFailure?: boolean): Promise<T> {
        return this.request<T>(endpoint, { method: 'POST', body, headers, includeAuth, retryOnAuthFailure });
    }

    async put<T = any>(endpoint: string, body?: any, headers?: Record<string, string>, includeAuth?: boolean, retryOnAuthFailure?: boolean): Promise<T> {
        return this.request<T>(endpoint, { method: 'PUT', body, headers, includeAuth, retryOnAuthFailure });
    }

    async delete<T = any>(endpoint: string, headers?: Record<string, string>, includeAuth?: boolean, retryOnAuthFailure?: boolean): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', headers, includeAuth, retryOnAuthFailure });
    }

    async patch<T = any>(endpoint: string, body?: any, headers?: Record<string, string>, includeAuth?: boolean, retryOnAuthFailure?: boolean): Promise<T> {
        return this.request<T>(endpoint, { method: 'PATCH', body, headers, includeAuth, retryOnAuthFailure });
    }

    // Utility method to manually refresh tokens
    async refreshTokens(): Promise<RefreshTokenResponse | null> {
        const tokens = await this.getAuthTokens();
        if (!tokens.refreshToken && !tokens.accessToken) {
            // console.warn('No refresh token available');
            return null;
        }
        return this.refreshAccessToken(tokens.refreshToken!, tokens.accessToken!);
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
export const refreshTokens = ssrClient.refreshTokens.bind(ssrClient);

// Export types
export type { RequestOptions, ApiResponse, AuthTokens, RefreshTokenResponse };
