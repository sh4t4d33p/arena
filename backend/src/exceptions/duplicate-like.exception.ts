/**
 * Duplicate Like Exception
 * 
 * Thrown when a user attempts to like a post they have already liked.
 * Returns HTTP 409 CONFLICT status code.
 * 
 * @class DuplicateLikeException
 */
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Duplicate Like Exception
 * 
 * @class DuplicateLikeException
 * @description Exception for duplicate post likes
 */
export class DuplicateLikeException extends HttpException {
  /**
   * Constructor
   * 
   * @returns DuplicateLikeException instance
   */
  constructor() {
    super('You have already liked this post', HttpStatus.CONFLICT);
  }
}
