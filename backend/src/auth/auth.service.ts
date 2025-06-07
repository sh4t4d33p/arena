/**
 * Authentication Service
 * 
 * Provides methods for handling Ethereum wallet-based authentication.
 * Manages user creation and verification using wallet addresses.
 * 
 * @class AuthService
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';

/**
 * Authentication Service
 * 
 * @class AuthService
 * @description Handles user authentication and profile management
 */
@Injectable()
export class AuthService {
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
   * Verify if a user exists by wallet address
   * 
   * @param walletAddress Ethereum wallet address to verify
   * @returns User object if found, null otherwise
   * @throws Error if wallet address is invalid
   */
  async verifyUser(walletAddress: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { wallet_address: walletAddress.toLowerCase() },
    });
  }

  /**
   * Create a new user profile
   * 
   * @param user Partial user data to create
   * @returns Created user object
   * @throws Error if user creation fails
   */
  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
