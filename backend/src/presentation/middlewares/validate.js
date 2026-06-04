const { ZodError } = require('zod');
const { error: sendError } = require('../../utils/response');

/**
 * Express middleware factory that validates part of the request
 * against a Zod schema.
 *
 * @param {import('zod').ZodSchema} schema
 * @param {'body' | 'query' | 'params'} source - Which part of the request to validate.
 * @returns {import('express').RequestHandler}
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed; // replace with validated & coerced data
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }));
        return sendError(res, 'Validation failed', 400, details);
      }
      next(err);
    }
  };
}

module.exports = { validate };
