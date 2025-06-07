/**
 * Post Card Component
 * 
 * Displays a single post with its metadata, likes, and comments.
 * Handles post interactions like liking and commenting.
 * 
 * @file post-card.tsx
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { likePost, createComment } from '@/lib/api';
import { Post, Comment } from '@/types';
import { getWalletDisplayName } from '@/lib/utils';
import { HeartIcon, MessageSquareIcon } from 'lucide-react';

/**
 * Post Card Props Interface
 * 
 * @interface PostCardProps
 * @property {Post} post - The post data to be displayed
 * @property {string | null} [error] - Optional error message to display
 */
interface PostCardProps {
  post: Post;
  error?: string | null;
}

/**
 * Post Card Component
 * 
 * @component PostCard
 * @param {PostCardProps} props - Component props
 * @param {Post} props.post - Post data to display
 * @param {string | null} [props.error] - Optional error message
 * @returns {JSX.Element} Post card component
 */
export const PostCard: React.FC<PostCardProps> = ({ post, error: propsError }) => {
  /**
   * Current wallet address
   * 
   * @type {string | undefined}
   */
  const { address } = useAccount();

  /**
   * Likes state
   * 
   * @type {number}
   */
  const [likes, setLikes] = useState<number>(post.likes);

  /**
   * Like status state
   * 
   * @type {boolean}
   */
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);

  /**
   * Comments state
   * 
   * @type {Comment[]}
   */
  const [comments, setComments] = useState<Comment[]>(post.comments || []);

  /**
   * New comment input state
   * 
   * @type {string}
   */
  const [newComment, setNewComment] = useState<string>('');

  /**
   * Loading state
   * 
   * @type {boolean}
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Comments visibility state
   * 
   * @type {boolean}
   */
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(propsError || null);

  /**
   * Syncs the isLiked state with the post's isLiked property
   */
  useEffect(() => {
    setIsLiked(post.isLiked);
  }, [post.isLiked]);

  /**
   * Handles post liking functionality
   * Updates the likes count and isLiked state upon successful like
   */
  const handleLike = async () => {
    if (!address) return;

    try {
      setLoading(true);
      const response = await likePost(address, post.id);
      if (response.success && response.data) {
        setLikes(response.data.likes);
        setIsLiked(response.data.isLiked);
      } else {
        setError(response.error ?? 'Failed to like post');
      }
    } catch (error) {
      setError('Failed to like post');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles comment creation
   * Adds new comments to the post and clears the input field upon success
   */
  const handleComment = async () => {
    if (!address || !newComment.trim()) return;

    try {
      setLoading(true);
      const response = await createComment(address, post.id, newComment);
      if (response.success && response.data) {
        setComments(prev => [...prev, response.data as Comment]);
        setNewComment('');
      } else {
        setError(response.error ?? 'Failed to post comment');
      }
    } catch (error) {
      setError('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center py-2 mb-4">{error}</div>
      )}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{getWalletDisplayName(post.walletAddress)}</span>
              <span className="text-xs text-gray-500">• {new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{post.content}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                    <span>{likes}</span>
                  </div>
                ) : (
                  <span>{likes}</span>
                )}
              </Button>
              <span className="text-xs text-gray-500">likes</span>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-4 space-y-2">
            {commentsVisible && (
              <>
                {loading && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-center py-2 mb-4">{error}</div>
                )}
                {!loading && comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <span className="text-sm text-gray-600">
                      {getWalletDisplayName(comment.walletAddress)}
                    </span>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}

                {/* New comment form */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border rounded"
                  />
                  <Button
                    onClick={handleComment}
                    disabled={loading || !newComment.trim()}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        <span>Posting...</span>
                      </div>
                    ) : (
                      'Comment'
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Toggle comments button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommentsVisible(!commentsVisible)}
            className="mt-2"
          >
            {commentsVisible ? 'Hide Comments' : 'Show Comments'}
          </Button>
        </div>
      </div>
    </div>
  );
}
