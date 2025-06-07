/**
 * Arena Social API Utilities
 * 
 * Contains utility functions for making authenticated API requests.
 * Handles error handling, authentication, and response formatting.
 * 
 * @file api.ts
 */
import { ApiResponse, CreatePostDto, Post, Comment, PaginationParams, ProfileUpdateDto, User } from '@/types';

/**
 * API Base URL
 * 
 * Configuration for the backend API URL.
 * Defaults to localhost:3000 if not set in environment.
 * 
 * @type {string}
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Authenticated Fetch Utility
 * 
 * Makes authenticated API requests with wallet address.
 * Handles error cases and returns consistent response format.
 * 
 * @template T - Expected response data type
 * @param {string} path - API endpoint path
 * @param {RequestInit} options - Request options
 * @param {string} [address] - Optional wallet address for authentication
 * @returns {Promise<ApiResponse<T>>} API response
 * @throws {Error} Network or server errors
 */
export const fetchWithAuth = async <T>(path: string, options: RequestInit = {}, address?: string) => {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(address && { 'x-wallet-address': address }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch data');
    }

    return response.json() as Promise<ApiResponse<T>>;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    } as ApiResponse<T>;
  }
};

/**
 * Create Post API
 * 
 * Creates a new post in the system.
 * 
 * @param {string} address - Wallet address of the creator
 * @param {CreatePostDto} data - Post creation data
 * @returns {Promise<ApiResponse<Post>>} API response with created post
 */
export const createPost = async (address: string, data: CreatePostDto): Promise<ApiResponse<Post>> => {
  return fetchWithAuth<Post>('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }, address);
};

export const getPosts = async (params: PaginationParams = {}): Promise<ApiResponse<Post[]>> => {
  const { page = 1, limit = 10 } = params;
  return fetchWithAuth<Post[]>(`/api/posts?page=${page}&limit=${limit}`);
};

export const getComments = async (postId: number): Promise<ApiResponse<Comment[]>> => {
  return fetchWithAuth<Comment[]>(`/api/posts/${postId}/comments`);
};

export const likePost = async (address: string, postId: number): Promise<ApiResponse<Post>> => {
  return fetchWithAuth<Post>(`/api/posts/${postId}/like`, {
    method: 'POST',
  }, address);
};

export const createComment = async (address: string, postId: number, content: string): Promise<ApiResponse<Comment>> => {
  return fetchWithAuth<Comment>(`/api/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }, address);
};

export const updateProfile = async (address: string, data: ProfileUpdateDto): Promise<ApiResponse<void>> => {
  return fetchWithAuth<void>('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }, address);
};

export const getUserProfile = async (walletAddress: string): Promise<ApiResponse<User>> => {
  return fetchWithAuth<User>(`/api/users/${walletAddress}`);
};

export const updateUserProfile = async (walletAddress: string, data: ProfileUpdateDto): Promise<ApiResponse<User>> => {
  return fetchWithAuth<User>(`/api/users/${walletAddress}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};
