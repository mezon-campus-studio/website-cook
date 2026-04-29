/**
 * Error handling utilities
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends Error {
  constructor(
    public fields: Record<string, string>,
    public message: string = 'Validation failed'
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function handleApiError(error: any): never {
  if (error instanceof ApiError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new ApiError(500, error.message);
  }

  throw new ApiError(500, 'An unknown error occurred', error);
}
