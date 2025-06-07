/**
 * Create Comment DTO
 * 
 * Data transfer object for creating new comments on posts.
 * Contains post ID, wallet address of commenter, and comment content.
 * 
 * @class CreateCommentDto
 */
import { IsString, IsInt, Min, MaxLength, MinLength, Matches } from 'class-validator';
import { IsEthereumAddressConstraint } from '@/validators/is-ethereum-address.validator';

/**
 * Create Comment DTO
 * 
 * @class CreateCommentDto
 * @description DTO for creating new comments
 */
export class CreateCommentDto {
  /**
   * ID of the post being commented on
   * 
   * @type number
   * @min 1
   * @required
   */
  @IsInt()
  @Min(1)
  post_id: number;

  /**
   * Ethereum wallet address of the commenter
   * 
   * @type string
   * @format ethereum-address
   * @required
   */
  @IsString()
  @IsEthereumAddressConstraint()
  wallet_address: string;

  /**
   * Comment content
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
}
