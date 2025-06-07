/**
 * Posts Management Module
 * 
 * This module handles all post-related operations including:
 * - Creating new posts
 * - Managing likes and comments
 * - Retrieving post feeds
 * - Post interactions
 * 
 * @module PostsModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from '../entities/post.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';

/**
 * Posts Management Module
 * 
 * Provides:
 * - Post creation and management endpoints
 * - Like and comment functionality
 * - Post feed aggregation
 * - Post interaction services
 * - Exported service for dependency injection
 */
@Module({
  imports: [
    /**
     * TypeORM modules for post-related entities
     * - Post: Main post entity
     * - Like: Post likes entity
     * - Comment: Post comments entity
     * - Used for CRUD operations on post-related data
     */
    TypeOrmModule.forFeature([Post, Like, Comment])
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
