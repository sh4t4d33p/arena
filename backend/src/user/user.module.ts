/**
 * User Management Module
 * 
 * This module handles user profile operations including:
 * - Profile creation and updates
 * - User information retrieval
 * - Profile validation
 * 
 * @module UserModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

/**
 * User Management Module
 * 
 * Provides:
 * - User profile endpoints
 * - Profile management service
 * - User entity access
 * - Exported service for dependency injection
 */
@Module({
  imports: [
    /**
     * TypeORM module for User entity
     * - Provides database access for user profiles
     * - Used for CRUD operations on user data
     */
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
