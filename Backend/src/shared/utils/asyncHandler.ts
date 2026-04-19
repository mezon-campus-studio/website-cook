import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wrapper middleware function to eliminate redundant try-catch blocks in Express controllers.
 * 
 * Takes an asynchronous controller function and ensures that any unhandled Promise rejections
 * are caught and passed to the centralized Express error handler (`next(err)`).
 * Provides strict TypeScript types for maximum IDE integration.
 * 
 * @param {RequestHandler} fn - The asynchronous Express request handler function.
 * @returns {RequestHandler} A new RequestHandler with baked-in async error capturing.
 */
export const asyncHandler = <
  P = import('express-serve-static-core').ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = import('qs').ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
