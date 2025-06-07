/**
 * Feed Page
 * 
 * Displays the main feed of posts and provides functionality to create new posts.
 * Implements infinite scrolling for loading more posts.
 * 
 * @file page.tsx
 */
'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/post-card';
import { createPost, getPosts } from '@/lib/api';
import { Post, CreatePostDto } from '@/types';
import { isValidWalletAddress } from '@/lib/utils';

/**
 * Feed Page Component
 * 
 * @component FeedPage
 * @returns {JSX.Element} Feed page component
 */
export function FeedPage() {
  /**
   * Current wallet address
   * 
   * @type {string | undefined}
   */
  const { address } = useAccount();

  /**
   * Posts state
   * 
   * @type {Post[]}
   */
  const [posts, setPosts] = useState<Post[]>([]);

  /**
   * Current page number for pagination
   * 
   * @type {number}
   */
  const [page, setPage] = useState(1);

  /**
   * Has more posts to load
   * 
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true);

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
  const [loading, setLoading] = useState(false);

  /**
   * New post content state
   * 
   * @type {string}
   */
  const [newPostContent, setNewPostContent] = useState('');

  /**
   * Handle post creation
   * 
   * @async
   * @private
   */
  const handleCreatePost = async () => {
    if (!address || !newPostContent.trim()) return;
    
    // Validate wallet address
    if (!isValidWalletAddress(address)) {
      setError('Invalid wallet address');
      return;
    }

    try {
      setLoading(true);
      const response = await createPost(address, {
        content: newPostContent
      } as CreatePostDto);
      if (response.success && response.data) {
        setPosts([(response.data as Post), ...posts]);
        setNewPostContent('');
      } else {
        setError(response.error || 'Failed to create post');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      try {
        const response = await getPosts({ page: 1 });
        if (response.success && response.data) {
          setPosts(response.data);
          setHasMore(response.data.length > 0);
          setError(null); // Clear error on successful load
        } else {
          setError(response.error || 'Failed to load posts');
          setHasMore(false);
        }
      } catch (error) {
        setError('Failed to connect to server');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  // Clear error when posts are successfully loaded
  useEffect(() => {
    if (posts.length > 0) {
      setError(null);
    }
  }, [posts]);

  const loadMorePosts = async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const response = await getPosts({ page });
      if (response.success && response.data) {
        setPosts(prev => [...prev, ...(response.data || []) as Post[]]);
        setHasMore(response.data.length > 0);
        setPage(prev => prev + 1);
      } else {
        setError(response.error || 'Failed to load posts');
        setHasMore(false);
      }
    } catch (error) {
      setError('Failed to connect to server');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4 mb-4">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-500 text-center py-4 mb-4">No posts yet</div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Your Feed</h1>
              <div className="text-gray-500 text-sm mb-2">
                {posts.length} posts
              </div>

              {/* New post form */}
              <div className="mb-8">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    disabled={loading || !newPostContent.trim()}
                    className="h-auto"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        <span>Posting...</span>
                      </div>
                    ) : (
                      'Post'
                    )}
                  </Button>
                </div>
              </div>

              {/* Posts list */}
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard key={post.id} post={post} error={error} />
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">No posts yet</div>
                )}
              </div>

              {/* Load more button */}
              {hasMore && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={loadMorePosts}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      'Load More'
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
