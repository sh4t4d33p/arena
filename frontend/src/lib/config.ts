/**
 * Arena Social Configuration
 * 
 * Contains environment variables and application configuration.
 * Used throughout the application for configuration and validation.
 * 
 * @file config.ts
 */

/**
 * Environment Variables Interface
 * 
 * @interface Env
 * @property {string} NEXT_PUBLIC_API_URL - Base URL for API requests
 * @property {string} NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID - WalletConnect project ID
 * @property {string} DATABASE_URL - Database connection URL
 */
export interface Env {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
  DATABASE_URL: string;
}

/**
 * Environment Configuration
 * 
 * Initializes and validates environment variables.
 * Throws errors if required variables are missing.
 * 
 * @returns {Env} Validated environment variables
 */
export const env = (() => {
  const env = process.env as unknown as Env;
  
  // Validate required environment variables
  if (!env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is required');
  }
  if (!env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required');
  }
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  return env;
})();

/**
 * Application Configuration
 * 
 * @type {Object}
 * @property {Object} api - API configuration
 * @property {string} api.url - Base URL for API requests
 * @property {Object} walletConnect - WalletConnect configuration
 * @property {string} walletConnect.projectId - WalletConnect project ID
 * @property {Object} database - Database configuration
 * @property {string} database.url - Database connection URL
 */
export const config = {
  // API Configuration
  api: {
    url: env.NEXT_PUBLIC_API_URL,
  },

  // WalletConnect Configuration
  walletConnect: {
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },

  // Database Configuration
  database: {
    url: env.DATABASE_URL,
  },
};
