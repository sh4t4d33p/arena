/**
 * Arena Social Authentication Types
 * 
 * Contains type definitions for authentication and user management.
 * Used throughout the auth system for type safety.
 * 
 * @file types.ts
 */

/**
 * User Profile Interface
 * 
 * Represents a user's profile information in the Arena Social application.
 * Uses Ethereum address as primary identifier.
 * 
 * @interface User
 */
export interface User {
  /**
   * Ethereum wallet address (Primary identifier)
   * 
   * @type {string}
   */
  address: string;

  /**
   * User's display name
   * 
   * @type {string}
   * @optional
   */
  username?: string;

  /**
   * URL to user's profile image
   * 
   * @type {string}
   * @optional
   */
  profileImage?: string;

  /**
   * User's bio/description
   * 
   * @type {string}
   * @optional
   */
  bio?: string;
}

/**
 * Authentication Context Type
 * 
 * Defines the shape of the auth context used throughout the application.
 * Manages user state and auth-related actions.
 * 
 * @interface AuthContextType
 */
export interface AuthContextType {
  /**
   * Current user profile
   * 
   * @type {User | null}
   */
  user: User | null;

  /**
   * Loading state
   * 
   * @type {boolean}
   */
  isLoading: boolean;

  /**
   * Error state
   * 
   * @type {string | null}
   */
  error: string | null;

  /**
   * Connect wallet action
   * 
   * Opens wallet connection modal.
   */
  connectWallet: () => void;

  /**
   * Disconnect wallet action
   * 
   * Disconnects current wallet connection.
   */
  disconnectWallet: () => void;

  /**
   * Update user profile action
   * 
   * Updates user profile information.
   * 
   * @param {Partial<User>} data - Partial user data to update
   * @returns {Promise<void>} Promise that resolves when update is complete
   */
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

/**
 * Auth Provider Props Interface
 * 
 * Props for the AuthProvider component.
 * 
 * @interface AuthProviderProps
 */
export interface AuthProviderProps {
  /**
   * Child components to render
   * 
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
}
