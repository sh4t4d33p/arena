/**
 * Create User DTO
 * 
 * Data transfer object for creating new users.
 * Contains wallet address and optional profile information.
 * 
 * @class CreateUserDto
 */
import { IsString, IsOptional, IsEthereumAddress } from 'class-validator';

/**
 * Create User DTO
 * 
 * @class CreateUserDto
 * @description DTO for creating new users
 */
export class CreateUserDto {
  /**
   * Ethereum wallet address of the user
   * 
   * @type string
   * @format ethereum-address
   * @required
   */
  @IsString()
  @IsEthereumAddress()
  wallet_address: string;

  /**
   * User's display name
   * 
   * @type string
   * @optional
   */
  @IsString()
  @IsOptional()
  username?: string;

  /**
   * User's bio/description
   * 
   * @type string
   * @optional
   */
  @IsString()
  @IsOptional()
  bio?: string;

  /**
   * URL to user's profile picture
   * 
   * @type string
   * @format url
   * @optional
   */
  @IsString()
  @IsOptional()
  profile_pic_url?: string;
}
