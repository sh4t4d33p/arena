/**
 * Posts Management Service
 * 
 * Handles all post-related operations including:
 * - Post creation and retrieval
 * - Likes management
 * - Comments management
 * - Post feed pagination
 * 
 * @class PostsService
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DuplicateLikeException } from '@/exceptions/duplicate-like.exception';
import { PaginationDto } from './dto/pagination.dto';

/**
 * Posts Management Service
 * 
 * @class PostsService
 * @description Handles all post-related operations
 */
@Injectable()
export class PostsService {
  /**
   * Constructor
   * 
   * @param postsRepository Repository for Post entity
   * @param likesRepository Repository for Like entity
   * @param commentsRepository Repository for Comment entity
   */
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  /**
   * Create a new post
   * 
   * @param createPostDto Data transfer object containing post data
   * @returns Created post object
   * @throws Error if post creation fails
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  /**
   * Get paginated list of posts
   * 
   * @param paginationDto Pagination parameters
   * @returns Object containing posts array and total count
   */
  async getPosts(paginationDto: PaginationDto): Promise<{ posts: Post[]; total: number }> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [posts, total] = await this.postsRepository.findAndCount({
      order: { timestamp: 'DESC' },
      skip,
      take: limit,
    });

    return { posts, total };
  }

  /**
   * Get a single post by ID
   * 
   * @param id Post ID to retrieve
   * @returns Post object with likes and comments
   */
  async getPostById(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['likes', 'comments'],
    });
  }

  /**
   * Like a post
   * 
   * @param likePostDto Data transfer object containing post ID and wallet address
   * @returns Created like object
   * @throws DuplicateLikeException if user has already liked the post
   */
  async likePost(likePostDto: LikePostDto): Promise<Like> {
    // Check if user has already liked this post
    const existingLike = await this.likesRepository.findOne({
      where: {
        post_id: likePostDto.post_id,
        wallet_address: likePostDto.wallet_address.toLowerCase(),
      },
    });

    if (existingLike) {
      throw new DuplicateLikeException();
    }

    const like = this.likesRepository.create(likePostDto);
    return this.likesRepository.save(like);
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentsRepository.create(createCommentDto);
    return this.commentsRepository.save(comment);
  }
}
