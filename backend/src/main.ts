/**
 * Arena Backend Application Entry Point
 * 
 * Initializes and starts the NestJS application server.
 * 
 * @file main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Application Bootstrap Function
 * 
 * Initializes the NestJS application and starts the server.
 * 
 * @async
 * @function bootstrap
 */
async function bootstrap() {
  /**
   * Creates the NestJS application instance
   * 
   * @type {Promise<NestApplication>}
   */
  const app = await NestFactory.create(AppModule);
  
  /**
   * Starts the application server
   * 
   * @param {number} port - Port number to listen on (defaults to 3000)
   */
  await app.listen(process.env.PORT ?? 3000);
}

/**
 * Entry point of the application
 * 
 * Calls the bootstrap function to start the server.
 */
bootstrap();
