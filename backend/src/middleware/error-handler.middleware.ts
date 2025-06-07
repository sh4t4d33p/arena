/**
 * Error Handler Middleware
 * 
 * Global error handling middleware that formats and returns errors in a consistent format.
 * Handles both HTTP exceptions and internal server errors.
 * 
 * @class ErrorHandlerMiddleware
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@nestjs/common';

/**
 * Error Handler Middleware
 * 
 * @class ErrorHandlerMiddleware
 * @description Global error handling middleware
 */
@Injectable()
export class ErrorHandlerMiddleware implements NestMiddleware {
  /**
   * Middleware handler
   * 
   * @param req Express request object
   * @param res Express response object
   * @param next Next middleware function
   */
  use(req: Request, res: Response, next: NextFunction) {
    /**
     * Formats an error into a standardized response format
     * 
     * @param error Error object to format
     * @returns Formatted error object
     */
    res.locals.formatError = (error: any) => {
      if (error instanceof HttpException) {
        return {
          statusCode: error.getStatus(),
          message: error.message,
          error: error.name,
        };
      }
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message || 'Unknown error',
      };
    };

    /**
     * Sends formatted error response
     * 
     * @param error Error object to send
     */
    res.locals.handleError = (error: any) => {
      const formattedError = res.locals.formatError(error);
      res.status(formattedError.statusCode).json(formattedError);
    };

    next();
  }
}
