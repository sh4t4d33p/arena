/**
 * User Not Found Exception
 * 
 * Thrown when a user with the specified wallet address is not found.
 * Returns HTTP 404 NOT_FOUND status code.
 * 
 * @class UserNotFoundException
 */
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * User Not Found Exception
 * 
 * @class UserNotFoundException
 * @description Exception for missing user profiles
 */
export class UserNotFoundException extends HttpException {
  /**
   * Constructor
   * 
   * @returns UserNotFoundException instance
   */
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
