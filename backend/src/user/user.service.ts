/**
 * User Profile Management Service
 * 
 * Handles user profile operations including:
 * - Profile retrieval
 * - Profile updates
 * - User validation
 * 
 * @class UserService
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from '@/exceptions/user-not-found.exception';

/**
 * User Profile Management Service
 * 
 * @class UserService
 * @description Handles user profile operations
 */
@Injectable()
export class UserService {
  /**
   * Constructor
   * 
   * @param usersRepository Repository for User entity
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Get user profile by wallet address
   * 
   * @param walletAddress Ethereum wallet address
   * @returns User object if found, null otherwise
   */
  async getUser(walletAddress: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { wallet_address: walletAddress.toLowerCase() },
    });
  }

  /**
   * Update user profile
   * 
   * @param walletAddress Ethereum wallet address of user to update
   * @param updateUserDto Data transfer object containing update data
   * @returns Updated user object
   * @throws UserNotFoundException if user does not exist
   */
  async updateUser(walletAddress: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(walletAddress);
    if (!user) {
      throw new UserNotFoundException();
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
