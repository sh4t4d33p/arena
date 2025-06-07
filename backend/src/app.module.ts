/**
 * Arena Backend Application Module
 * 
 * This module serves as the root module of the Arena application, 
 * configuring and initializing all core modules and services.
 * 
 * @module AppModule
 */
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';

/**
 * Database configuration constants
 * These are loaded from environment variables and validated
 */
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

/**
 * Validate database configuration
 * Throws an error if any required environment variables are missing
 */
if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
  throw new Error('Database configuration environment variables are missing.');
}

/**
 * Root module of the Arena application
 * 
 * This module:
 * - Configures TypeORM database connection
 * - Imports all feature modules (Auth, User, Posts)
 * - Sets up global error handling middleware
 * - Provides core application services
 */
@Module({
  imports: [
    /**
     * Global configuration module
     * - Loads environment variables
     * - Makes config available throughout the application
     */
    ConfigModule.forRoot({ isGlobal: true }),
    /**
     * Database configuration
     * - Uses PostgreSQL with TypeORM
     * - Auto-synchronizes database schema (development only)
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT, 10) || 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [User, Post, Like, Comment],
      synchronize: true, // Set to false in production!
    }),
    /**
     * Feature modules
     * - AuthModule: Handles wallet authentication
     * - UserModule: Manages user profiles
     * - PostsModule: Handles posts, likes, and comments
     */
    AuthModule,
    UserModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  /**
   * Configure middleware for the application
   * 
   * @param consumer MiddlewareConsumer instance
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErrorHandlerMiddleware)
      .forRoutes('*');
  }
}
