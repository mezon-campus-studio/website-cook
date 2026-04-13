/**
 * Generic type definitions for the application
 * Project-specific types should be in separate files
 */

/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Generic auth state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  loading: boolean;
}
