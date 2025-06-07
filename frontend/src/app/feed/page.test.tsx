import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { FeedPage } from './page';
import { useAccount } from 'wagmi';
import { createPost, getPosts } from '@/lib/api';

// Mock external dependencies
import * as wagmi from 'wagmi';
import * as api from '@/lib/api';

// Mock implementations
jest.mock('wagmi', () => ({
  useAccount: jest.fn(() => ({ address: '0x123' }))
}));

jest.mock('@/lib/api', () => ({
  createPost: jest.fn(),
  getPosts: jest.fn()
}));

const mockPosts = [
  {
    id: 1,
    content: 'Test post 1',
    walletAddress: '0x123',
    timestamp: '2025-06-07T12:00:00Z',
    likes: 0,
    isLiked: false,
    comments: [],
  },
];

describe('FeedPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset window/document properties for each test
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
      configurable: true
    });
    Object.defineProperty(window, 'scrollY', {
      value: 1500,
      writable: true,
      configurable: true
    });
    Object.defineProperty(window, 'innerWidth', {
      value: 1000,
      writable: true,
      configurable: true
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: true,
      configurable: true
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true
    });
  });

  it('renders feed page with posts', async () => {
    (useAccount as jest.Mock).mockReturnValue({ address: '0x123' });
    (getPosts as jest.Mock).mockResolvedValue({ success: true, data: mockPosts });

    await act(async () => {
      render(<FeedPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test post 1')).toBeInTheDocument();
    });
  });

  it('handles post creation', async () => {
    (useAccount as jest.Mock).mockReturnValue({ address: '0x123' });
    (createPost as jest.Mock).mockResolvedValue({ success: true, data: { id: 1, content: 'New post' } });

    await act(async () => {
      render(<FeedPage />);
    });

    const postInput = screen.getByPlaceholderText(/what's happening/i);
    await act(async () => {
      fireEvent.change(postInput, { target: { value: 'New post' } });
      fireEvent.keyDown(postInput, { key: 'Enter', code: 'Enter' });
    });

    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith('0x123', { content: 'New post' });
    });
  });

  it('handles infinite scroll', async () => {
    (useAccount as jest.Mock).mockReturnValue({ address: '0x123' });
    (getPosts as jest.Mock).mockResolvedValue({ success: true, data: mockPosts });

    await act(async () => {
      render(<FeedPage />);
    });
    
    // Simulate scroll to bottom
    window.scrollTo = jest.fn();
    window.innerHeight = 600;
    window.innerWidth = 1000;
    
    // Mock getBoundingClientRect to simulate scroll position
    Object.defineProperty(document.documentElement, 'getBoundingClientRect', {
      value: () => ({
        width: 1000,
        height: 2000,
        top: -1500,
        left: 0,
        bottom: 500,
        right: 1000
      })
    });
    
    // Mock scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      get: () => 1500,
      set: () => {}
    });

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalled();
    });
  });
});
