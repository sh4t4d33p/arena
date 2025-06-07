/**
 * Verify User DTO
 * 
 * Data transfer object for verifying Ethereum wallet addresses.
 * Contains a single wallet address field for verification.
 * 
 * @class VerifyUserDto
 */
import { IsString, IsEthereumAddress } from 'class-validator';

/**
 * Verify User DTO
 * 
 * @class VerifyUserDto
 * @description DTO for verifying Ethereum wallet addresses
 */
export class VerifyUserDto {
  /**
   * Ethereum wallet address to verify
   * 
   * @type string
   * @format ethereum-address
   * @required
   */
  @IsString()
  @IsEthereumAddress()
  wallet: string;
}
