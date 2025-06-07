/**
 * Profile Card Component
 * 
 * Displays a user's profile information with optional edit functionality.
 * Shows profile picture, username, wallet address, and bio.
 * 
 * @file profile-card.tsx
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { User } from '@/types';
import { EditIcon } from 'lucide-react';
import Image from 'next/image';

/**
 * Profile Card Props Interface
 * 
 * @interface ProfileCardProps
 * @property {User} user - User data to display
 * @property {() => void} [onEdit] - Optional edit callback function
 */
interface ProfileCardProps {
  user: User;
  onEdit?: () => void;
}

/**
 * Profile Card Component
 * 
 * @component ProfileCard
 * @param {ProfileCardProps} props - Component props
 * @param {User} props.user - User data to display
 * @param {() => void} [props.onEdit] - Optional edit callback
 * @returns {JSX.Element} Profile card component
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEdit }) => {
  /**
   * Current wallet address
   * 
   * @type {string | undefined}
   */
  const { address } = useAccount();

  /**
   * Check if current user owns the profile
   * 
   * @type {boolean}
   */
  const isOwnProfile = address === user.walletAddress;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Picture */}
        <div className="relative w-32 h-32">
          <Image
            src={user.profilePicUrl || '/default-avatar.png'}
            alt={user.username || 'Profile'}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 128px) 100vw, 128px"
          />
        </div>

        {/* Username and Wallet */}
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.username || 'Anonymous'}</h2>
          <p className="text-sm text-gray-600">
            {user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}
          </p>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="text-center text-gray-600">
            <p className="text-sm">{user.bio}</p>
          </div>
        )}

        {/* Edit Button */}
        {isOwnProfile && onEdit && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={onEdit}
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};
