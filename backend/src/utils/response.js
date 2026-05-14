/**
 * Standardized API response helpers.
 * Ensures every endpoint returns a consistent JSON envelope.
 */

/**
 * Send a success response.
 * @param {import('express').Response} res
 * @param {*} data
 * @param {number} [statusCode=200]
 */
function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data
  });
}

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} [statusCode=500]
 * @param {*} [details=null]
 */
function error(res, message, statusCode = 500, details = null) {
  const body = {
    success: false,
    error: { message }
  };
  if (details) body.error.details = details;
  return res.status(statusCode).json(body);
}

module.exports = { success, error };
