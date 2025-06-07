import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostCard } from './post-card';
import { Post, Comment } from '@/types';
import { HeartIcon, MessageSquareIcon } from 'lucide-react';
import { likePost, createComment } from '@/lib/api';

// Mock external dependencies
jest.mock('wagmi', () => ({
  __esModule: true,
  useAccount: () => ({
    data: {
      address: '0x123',
      isConnected: true,
    },
    isConnected: true,
    address: '0x123',
  }),
}));

jest.mock('@/lib/api', () => ({
  __esModule: true,
  likePost: jest.fn().mockResolvedValue({ 
    success: true,
    data: { likes: 1, isLiked: true }
  }),
  createComment: jest.fn().mockResolvedValue({ success: true, data: { id: 1 } }),
}));

jest.mock('lucide-react', () => ({
  __esModule: true,
  HeartIcon: () => <div data-testid="heart-icon" />,
  MessageSquareIcon: () => <div data-testid="message-icon" />,
}));

// Mock post data
const mockPost: Post = {
  id: 1,
  content: 'Test post',
  walletAddress: '0x123',
  timestamp: '2025-06-07T12:00:00Z',
  likes: 0,
  isLiked: false,
  comments: [],
};

// Test suite
describe('PostCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders post content and timestamp', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(new Date(mockPost.timestamp).toLocaleDateString())).toBeInTheDocument();
  });

  it('displays wallet address', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.walletAddress)).toBeInTheDocument();
  });

  it('displays like count', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(`${mockPost.likes}`)).toBeInTheDocument();
  });

  it('calls likePost on like button click', async () => {
    render(<PostCard post={mockPost} />);
    fireEvent.click(screen.getByTestId('like-button'));

    await waitFor(() => {
      expect(likePost).toHaveBeenCalledWith('0x123', mockPost.id);
    });
  });

  it('calls createComment on comment submit', async () => {
    render(<PostCard post={mockPost} />);
    fireEvent.change(screen.getByPlaceholderText('Add a comment...'), {
      target: { value: 'Test comment' }
    });
    fireEvent.click(screen.getByTestId('comment-submit'));

    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith('0x123', mockPost.id, 'Test comment');
    });
  });

  it('shows loading state', () => {
    const mockPostWithLoading = { ...mockPost, isLoading: true };
    render(<PostCard post={mockPostWithLoading} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error message', () => {
    const mockPostWithError = { ...mockPost, error: 'Failed to load post' };
    render(<PostCard post={mockPostWithError} />);
    expect(screen.getByText(mockPostWithError.error)).toBeInTheDocument();
  });

  it('handles like button click', async () => {
    (likePost as jest.Mock).mockResolvedValue({ success: true, data: { likes: 1, isLiked: true } });

    render(<PostCard post={mockPost} />);
    const likeButton = screen.getByRole('button', { name: /like/i });

    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(likePost).toHaveBeenCalledWith('0x123', 1);
      expect(screen.getByText('1')).toBeInTheDocument(); // Check likes count updated
      expect(screen.getByText('likes')).toBeInTheDocument();
    });
  });

  it('handles comment submission', async () => {
    (createComment as jest.Mock).mockResolvedValue({ success: true, data: { id: 1, content: 'Test comment' } });

    render(<PostCard post={mockPost} />);
    const commentButton = screen.getByRole('button', { name: /comment/i });
    fireEvent.click(commentButton);

    const commentInput = screen.getByPlaceholderText(/write a comment/i);
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });
    fireEvent.keyDown(commentInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith('0x123', 1, 'Test comment');
      expect(screen.getByText('Test comment')).toBeInTheDocument();
    });
  });

  it('handles error states', () => {
    (likePost as jest.Mock).mockResolvedValue({ success: false, error: 'Error message' });

    render(<PostCard post={mockPost} />);
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows loading states', () => {
    (likePost as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<PostCard post={mockPost} />);
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(screen.getByRole('button', { name: /like/i })).toHaveAttribute('disabled');
    expect(screen.getByRole('button', { name: /like/i })).toContainHTML('animate-spin');
  });

  it('handles empty comment submission', () => {
    render(<PostCard post={mockPost} />);
    const commentButton = screen.getByRole('button', { name: /comment/i });
    fireEvent.click(commentButton);

    const commentInput = screen.getByPlaceholderText(/write a comment/i);
    fireEvent.keyDown(commentInput, { key: 'Enter', code: 'Enter' });

    expect(createComment).not.toHaveBeenCalled();
  });

  it('handles wallet address change', () => {
    const mockWalletAddress = '0x456';
    jest.mock('wagmi', () => ({
      __esModule: true,
      useAccount: () => ({
        data: {
          address: mockWalletAddress,
          isConnected: true,
        },
        isConnected: true,
        address: mockWalletAddress,
      }),
    }));

    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockWalletAddress)).toBeInTheDocument();
  });
});
