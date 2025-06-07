/**
 * Like Entity
 * 
 * Represents a like on a post in the Arena network.
 * Uses composite primary key of post_id and wallet_address.
 * 
 * @class Like
 */
import { Entity, PrimaryColumn } from 'typeorm';

/**
 * Like Entity
 * 
 * @class Like
 * @description Database entity for post likes
 */
@Entity('likes')
export class Like {
  /**
   * ID of the liked post
   * 
   * @type number
   * @required
   * @partOfCompositeKey
   */
  @PrimaryColumn()
  post_id: number;

  /**
   * Ethereum wallet address of the liker
   * 
   * @type string
   * @length 42
   * @format ethereum-address
   * @required
   * @partOfCompositeKey
   */
  @PrimaryColumn({ type: 'varchar', length: 42 })
  wallet_address: string;
}
