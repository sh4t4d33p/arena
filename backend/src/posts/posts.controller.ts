/**
 * Posts Controller
 * 
 * Handles HTTP requests for posts, likes, and comments.
 * Provides endpoints for creating, retrieving, and interacting with posts.
 * 
 * @class PostsController
 */
import { Controller, Post, Get, Param, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Like } from '@/entities/like.entity';
import { Comment } from '@/entities/comment.entity';

/**
 * Posts Controller
 * 
 * @class PostsController
 * @description Handles post-related HTTP endpoints
 */
@Controller('posts')
export class PostsController {
  /**
   * Constructor
   * 
   * @param postsService Posts service instance
   */
  constructor(private readonly postsService: PostsService) {}

  /**
   * Create a new post
   * 
   * @param createPostDto Data transfer object containing post data
   * @returns Created post object
   * @status 201 CREATED
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto): Promise<any> {
    return this.postsService.createPost(createPostDto);
  }

  /**
   * Get paginated list of posts
   * 
   * @param paginationDto Pagination parameters
   * @returns Object containing posts array and total count
   * @status 200 OK
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.getPosts(paginationDto);
  }

  /**
   * Get a single post by ID
   * 
   * @param id Post ID to retrieve
   * @returns Post object with likes and comments
   * @status 200 OK
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<any | null> {
    return this.postsService.getPostById(id);
  }

  /**
   * Like a post
   * 
   * @param id Post ID to like
   * @param likePostDto Data transfer object containing wallet address
   * @returns Created like object
   * @throws DuplicateLikeException if user has already liked the post
   * @status 201 CREATED
   */
  @Post(':id/like')
  @HttpCode(HttpStatus.CREATED)
  async like(
    @Param('id') id: number,
    @Body() likePostDto: LikePostDto,
  ): Promise<Like> {
    return this.postsService.likePost({ ...likePostDto, post_id: id });
  }

  /**
   * Comment on a post
   * 
   * @param id Post ID to comment on
   * @param createCommentDto Data transfer object containing comment data
   * @returns Created comment object
   * @status 201 CREATED
   */
  @Post(':id/comment')
  @HttpCode(HttpStatus.CREATED)
  async comment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.postsService.createComment({ ...createCommentDto, post_id: id });
  }
}
