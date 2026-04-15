/**
 * Application configuration
 * Template - will be use for environment variables
 */

export const APP_CONFIG = {
  // App basic info
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'App',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
  },

  // Environment
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Feature flags
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  },
};

export default APP_CONFIG;
