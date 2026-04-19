import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  public readonly errors?: any[];

  constructor(description = 'Bad Request', errors?: any[]) {
    super('BadRequestError', 400, true, description);
    this.errors = errors;
  }
}
