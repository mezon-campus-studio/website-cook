const axios = require('axios');
const { env } = require('./env');
const { logger } = require('../utils/logger');

const CONTEXT = 'SpoonacularClient';

/**
 * Pre-configured Axios instance for Spoonacular API.
 *
 * Features:
 *  - Base URL from env
 *  - API key injected automatically as query param
 *  - Request timeout (10s default)
 *  - Basic retry logic (up to 2 retries on network/5xx errors)
 */
const spoonacularClient = axios.create({
  baseURL: env.SPOONACULAR_BASE_URL,
  timeout: env.SPOONACULAR_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// ── Request interceptor: inject API key ──────────────────────────────
spoonacularClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.apiKey = env.SPOONACULAR_API_KEY;

  logger.debug(
    CONTEXT,
    `→ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    { params: { ...config.params, apiKey: '***' } }
  );

  return config;
});

// ── Response interceptor: retry on failure ───────────────────────────
const MAX_RETRIES = 2;

spoonacularClient.interceptors.response.use(
  (response) => {
    logger.debug(CONTEXT, `← ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const config = error.config;

    // Don't retry if no config or already exhausted retries
    if (!config) return Promise.reject(error);

    config.__retryCount = config.__retryCount || 0;

    const isRetryable =
      !error.response || // network error
      error.code === 'ECONNABORTED' || // timeout
      (error.response && error.response.status >= 500); // server error

    if (isRetryable && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;

      const delay = config.__retryCount * 1000; // linear backoff: 1s, 2s
      logger.warn(
        CONTEXT,
        `Retry ${config.__retryCount}/${MAX_RETRIES} for ${config.url} in ${delay}ms`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return spoonacularClient(config);
    }

    return Promise.reject(error);
  }
);

module.exports = { spoonacularClient };
