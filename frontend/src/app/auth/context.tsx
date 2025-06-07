/**
 * Authentication Context
 * 
 * Provides authentication state and user management for the application.
 * Uses wallet address as user identifier.
 * 
 * @file context.tsx
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { AuthContextType, AuthProviderProps, User } from './types';
import { fetchWithAuth, updateProfile } from '@/lib/api';

/**
 * Authentication Context
 * 
 * React context for authentication state management.
 * 
 * @type {Context<AuthContextType | undefined>}
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider
 * 
 * @component AuthProvider
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Auth provider component
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  /**
   * Current wallet address
   * 
   * @type {string | undefined}
   */
  const { address } = useAccount();

  /**
   * Current user state
   * 
   * @type {User | null}
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Loading state
   * 
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Error state
   * 
   * @type {string | null}
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches user data when wallet address changes
   * 
   * @effect useEffect
   * @async
   */
  useEffect(() => {
    const fetchUser = async () => {
      if (!address) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchWithAuth<User>(`/api/users/${address}`);
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [address]);

  const { openConnectModal } = useConnectModal();

  const connectWallet = async () => {
    openConnectModal?.();
  };

  const disconnectWallet = async () => {
    setUser(null);
    setError(null);
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!address) return;

    // Ensure required fields are present
    const updateData = {
      username: data.username || '',
      profileImage: data.profileImage,
      bio: data.bio
    };

    try {
      const response = await updateProfile(address, updateData);
      if (response.success) {
        // Refresh user data after successful update
        const userData = await fetchWithAuth<User>('/api/user', {}, address);
        if (userData.success && userData.data) {
          setUser(userData.data);
        }
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        connectWallet,
        disconnectWallet,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
