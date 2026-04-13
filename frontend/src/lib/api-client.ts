/**
 * HTTP Client for API requests
 * Provides a simple wrapper around fetch with common configurations
 */

import APP_CONFIG from '../config/app.config';
import { fetchWithTimeout, type FetchOptions } from './http';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = APP_CONFIG.api.baseUrl) {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetchWithTimeout(url, {
      ...options,
      headers,
    });

    return response.json() as Promise<T>;
  }

  // HTTP methods
  get<T = any>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T = any>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T = any>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T = any>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T = any>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  private getAuthToken(): string | null {
    // Client-side only
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token') || null;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
