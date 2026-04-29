/**
 * Common application constants
 * Project-specific constants should be in separate files
 */

// Common Roles
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Common Time constants
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

// Common Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
