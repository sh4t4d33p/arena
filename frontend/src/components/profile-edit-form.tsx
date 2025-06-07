import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateUserProfile } from '@/lib/api';
import { User } from '@/types';

interface ProfileEditFormProps {
  user: User;
  onSuccess: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user, onSuccess }) => {
  const [username, setUsername] = useState(user.username || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset form values when user prop changes
    setUsername(user.username || '');
    setBio(user.bio || '');
    setProfilePicUrl(user.profilePicUrl || '');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await updateUserProfile(user.walletAddress, {
        username,
        bio,
        profilePicUrl,
      });

      if (response.success) {
        onSuccess();
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          maxLength={32}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          maxLength={280}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Picture URL
        </label>
        <Input
          value={profilePicUrl}
          onChange={(e) => setProfilePicUrl(e.target.value)}
          placeholder="Enter image URL"
          className="w-full"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};
