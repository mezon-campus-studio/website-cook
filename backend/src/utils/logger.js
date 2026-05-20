/**
 * Centralized logger utility.
 *
 * Provides structured, consistent logging across the application.
 * In production, this can be swapped for Winston/Pino without
 * touching any consumer code.
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

/**
 * Format a log entry with timestamp and level.
 * @param {string} level
 * @param {string} context - Module or class name.
 * @param {string} message
 * @param {*} [meta] - Additional data to log.
 */
function _log(level, context, message, meta) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}] [${context}]`;

  if (meta !== undefined) {
    // eslint-disable-next-line no-console
    console.log(`${prefix} ${message}`, meta);
  } else {
    // eslint-disable-next-line no-console
    console.log(`${prefix} ${message}`);
  }
}

const logger = {
  info: (context, message, meta) => _log(LOG_LEVELS.INFO, context, message, meta),
  warn: (context, message, meta) => _log(LOG_LEVELS.WARN, context, message, meta),
  debug: (context, message, meta) => _log(LOG_LEVELS.DEBUG, context, message, meta),

  /**
   * Log an error with full stack trace when available.
   * @param {string} context
   * @param {string} message
   * @param {Error|*} error
   */
  error: (context, message, error) => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${LOG_LEVELS.ERROR}] [${context}]`;

    // eslint-disable-next-line no-console
    console.error(`${prefix} ${message}`);

    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`${prefix} Stack:`, error.stack || error.message);
    } else if (error !== undefined) {
      // eslint-disable-next-line no-console
      console.error(`${prefix} Details:`, error);
    }
  }
};

module.exports = { logger };
