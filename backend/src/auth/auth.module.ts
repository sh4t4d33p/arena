/**
 * Authentication Module
 * 
 * This module handles Ethereum wallet-based authentication for the Arena application.
 * It provides endpoints for connecting wallets and managing authentication state.
 * 
 * @module AuthModule
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/entities/user.entity';

/**
 * Authentication Module
 * 
 * Provides:
 * - Wallet connection endpoints
 * - Authentication service integration
 * - User entity access
 * - Exported service for dependency injection
 */
@Module({
  imports: [
    /**
     * TypeORM module for User entity
     * - Provides database access for user profiles
     * - Used for creating and retrieving user data
     */
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
