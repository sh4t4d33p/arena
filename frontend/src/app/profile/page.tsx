/**
 * Profile Page
 * 
 * Displays and manages user profile information.
 * Allows users to view and edit their profile details.
 * 
 * @file page.tsx
 */
'use client';

import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '@/lib/api';
import { User, ProfileUpdateDto } from '@/types';
import { ProfileCard } from '@/components/profile-card';
import { ProfileEditForm } from '@/components/profile-edit-form';
import { isValidWalletAddress } from '@/lib/utils';

/**
 * Profile Page Component
 * 
 * @component ProfilePage
 * @returns {JSX.Element} Profile page component
 */
export default function ProfilePage() {
  /**
   * Current wallet address
   * 
   * @type {string | undefined}
   */
  const { address } = useAccount();

  /**
   * Current user profile state
   * 
   * @type {User | null}
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Edit mode state
   * 
   * @type {boolean}
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Error state
   * 
   * @type {string | null}
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Loading state
   * 
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Load user profile when wallet address changes
   * 
   * @effect useEffect
   */
  useEffect(() => {
    if (address) {
      loadUserProfile();
    }
  }, [address]);

  /**
   * Load user profile from API
   * 
   * @async
   * @private
   */
  const loadUserProfile = async () => {
    if (!address) return;

    try {
      const response = await getUserProfile(address);
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle profile update
   * 
   * @async
   * @param {Partial<User>} data - Profile data to update
   */
  const handleUpdate = async (data: ProfileUpdateDto) => {
    if (!address) return;

    try {
      setIsLoading(true);
      const response = await updateUserProfile(address, data);
      if (response.success) {
        setUser({ ...user!, ...data });
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Handle update success
   */
  const handleUpdateSuccess = () => {
    setIsEditing(false);
    loadUserProfile();
  };

  /**
   * Handle form submission
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - Form submission event
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const bio = formData.get('bio') as string;
    const profileImage = formData.get('profileImage') as string;
    
    const updateData: ProfileUpdateDto = {
      username,
      bio,
      profileImage
    };

    await handleUpdate(updateData);
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateUserProfile(address, {
        username: user?.username || '',
        bio: user?.bio || '',
        profilePicUrl: user?.profilePicUrl || '',
      });

      if (response.success) {
        handleUpdateSuccess();
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render wallet connection prompt when no wallet is connected
   */
  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
        <Button onClick={() => window.location.href = '/'}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          {user ? (
            isEditing ? (
              <ProfileEditForm
                user={user}
                onSuccess={handleUpdateSuccess}
              />
            ) : (
              <ProfileCard
                user={user}
                onEdit={handleEdit}
              />
            )
          ) : (
            <div className="text-gray-500 text-center py-8">
              Please connect your wallet to view your profile
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
