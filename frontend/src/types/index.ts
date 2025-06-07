export interface Post {
  id: number;
  walletAddress: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  walletAddress: string;
  timestamp: string;
}

export interface CreatePostDto {
  walletAddress: string;
  content: string;
}

export interface User {
  walletAddress: string;
  username?: string;
  profilePicUrl?: string;
  bio?: string;
}

export interface ProfileUpdateDto {
  username: string;
  profilePicUrl?: string;
  bio?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  likes?: number;
  isLiked?: boolean;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ProfileUpdateDto {
  username: string;
  bio?: string;
  profileImage?: string;
}
