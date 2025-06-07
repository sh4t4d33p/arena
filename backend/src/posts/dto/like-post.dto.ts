/**
 * Like Post DTO
 * 
 * Data transfer object for liking posts.
 * Contains post ID and wallet address of the liker.
 * 
 * @class LikePostDto
 */
import { IsString, IsInt, Min } from 'class-validator';
import { IsEthereumAddressConstraint } from '@/validators/is-ethereum-address.validator';

/**
 * Like Post DTO
 * 
 * @class LikePostDto
 * @description DTO for liking posts
 */
export class LikePostDto {
  /**
   * ID of the post being liked
   * 
   * @type number
   * @min 1
   * @required
   */
  @IsInt()
  @Min(1)
  post_id: number;

  /**
   * Ethereum wallet address of the user liking the post
   * 
   * @type string
   * @format ethereum-address
   * @required
   */
  @IsString()
  @IsEthereumAddressConstraint()
  wallet_address: string;
}
