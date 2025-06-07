/**
 * Authentication Controller
 * 
 * Handles HTTP requests for wallet-based authentication.
 * Provides endpoints for wallet verification and user registration.
 * 
 * @class AuthController
 */
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { VerifyUserDto } from '@/auth/dto/verify-user.dto';
import { CreateUserDto } from '@/auth/dto/create-user.dto';
import { User } from '@/entities/user.entity';

/**
 * Authentication Controller
 * 
 * @class AuthController
 * @description Handles wallet-based authentication endpoints
 */
@Controller('auth')
export class AuthController {
  /**
   * Constructor
   * 
   * @param authService Authentication service instance
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Verify Ethereum wallet address
   * 
   * @param verifyUserDto Data transfer object containing wallet address
   * @returns User object if wallet exists, null otherwise
   * @status 200 OK
   */
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() verifyUserDto: VerifyUserDto): Promise<User | null> {
    return this.authService.verifyUser(verifyUserDto.wallet);
  }

  /**
   * Register new user with Ethereum wallet
   * 
   * @param createUserDto Data transfer object containing user data
   * @returns Created user object
   * @status 201 CREATED
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }
}
