/**
 * Application Controller
 * 
 * Root controller for the Arena application.
 * Provides basic health check endpoints.
 * 
 * @class AppController
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Application Controller
 * 
 * @class AppController
 * @description Root controller for application health checks
 */
@Controller()
export class AppController {
  /**
   * Constructor
   * 
   * @param appService Application service instance
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Health Check Endpoint
   * 
   * Returns a simple hello message to confirm the application is running.
   * 
   * @returns {string} Hello message
   * @http GET /
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
