/**
 * User Profile Controller
 * 
 * Handles HTTP requests for user profile operations.
 * Provides endpoints for profile retrieval and updates.
 * 
 * @class UserController
 */
import { Controller, Get, Param, Body, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';

/**
 * User Profile Controller
 * 
 * @class UserController
 * @description Handles user profile HTTP endpoints
 */
@Controller('users')
export class UserController {
  /**
   * Constructor
   * 
   * @param userService User service instance
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Get user profile by wallet address
   * 
   * @param walletAddress Ethereum wallet address
   * @returns User object if found, null otherwise
   * @status 200 OK
   */
  @Get(':wallet')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('wallet') walletAddress: string): Promise<User | null> {
    return this.userService.getUser(walletAddress);
  }

  /**
   * Update user profile
   * 
   * @param walletAddress Ethereum wallet address of user to update
   * @param updateUserDto Data transfer object containing update data
   * @returns Updated user object
   * @throws UserNotFoundException if user does not exist
   * @status 200 OK
   */
  @Patch(':wallet')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('wallet') walletAddress: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(walletAddress, updateUserDto);
  }
}
