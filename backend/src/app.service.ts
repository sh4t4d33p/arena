/**
 * Application Service
 * 
 * Core service layer for the Arena application.
 * Provides basic application functionality and health checks.
 * 
 * @class AppService
 */
import { Injectable } from '@nestjs/common';

/**
 * Application Service
 * 
 * @class AppService
 * @description Core service layer for application functionality
 */
@Injectable()
export class AppService {
  /**
   * Get Hello Message
   * 
   * Returns a simple hello message for health checks.
   * 
   * @returns {string} Hello message
   */
  getHello(): string {
    return 'Hello World!';
  }
}
