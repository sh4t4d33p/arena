/**
 * Update User DTO
 * 
 * Data transfer object for updating user profile information.
 * Contains optional fields for username, bio, and profile picture URL.
 * 
 * @class UpdateUserDto
 */
import { IsString, IsOptional, IsUrl, IsEthereumAddress, MinLength, MaxLength } from 'class-validator';

/**
 * Update User DTO
 * 
 * @class UpdateUserDto
 * @description DTO for updating user profile information
 */
export class UpdateUserDto {
  /**
   * User's display name
   * 
   * @type string
   * @minLength 3
   * @maxLength 32
   * @optional
   */
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  @IsOptional()
  username?: string;

  /**
   * User's bio/description
   * 
   * @type string
   * @maxLength 280
   * @optional
   */
  @IsString()
  @MaxLength(280)
  @IsOptional()
  bio?: string;

  /**
   * URL to user's profile picture
   * 
   * @type string
   * @format url
   * @optional
   */
  @IsUrl()
  @IsOptional()
  profile_pic_url?: string;

  /**
   * Custom validation method for username
   * 
   * @param username Username string to validate
   * @returns Validation result
   */
  validateUsername(username: string) {
    if (username) {
      // No special characters except underscore
      const specialChars = /[^a-zA-Z0-9_]/;
      if (specialChars.test(username)) {
        throw new Error('Username can only contain letters, numbers, and underscores');
      }
    }
  }
}
