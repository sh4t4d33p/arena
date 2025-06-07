/**
 * Create Post DTO
 * 
 * Data transfer object for creating new posts.
 * Contains content and wallet address of the creator.
 * 
 * @class CreatePostDto
 */
import { IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { IsEthereumAddressConstraint } from '@/validators/is-ethereum-address.validator';

/**
 * Create Post DTO
 * 
 * @class CreatePostDto
 * @description DTO for creating new posts
 */
export class CreatePostDto {
  /**
   * Post content
   * 
   * @type string
   * @minLength 1
   * @maxLength 280
   * @format text
   * @pattern /^[^\n]+$/
   */
  @IsString()
  @MaxLength(280)
  @MinLength(1)
  @Matches(/^[^\n]+$/, { message: 'Content cannot contain newlines' })
  content: string;

  /**
   * Ethereum wallet address of the post creator
   * 
   * @type string
   * @format ethereum-address
   * @required
   */
  @IsString()
  @IsEthereumAddressConstraint()
  wallet_address: string;
}
