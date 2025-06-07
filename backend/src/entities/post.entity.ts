/**
 * Post Entity
 * 
 * Represents a social media post in the Arena network.
 * Contains post content, creator's wallet address, and timestamp.
 * 
 * @class Post
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

/**
 * Post Entity
 * 
 * @class Post
 * @description Database entity for social media posts
 */
@Entity('posts')
export class Post {
  /**
   * Unique post identifier
   * 
   * @type number
   * @autoIncrement
   * @required
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Ethereum wallet address of the post creator
   * 
   * @type string
   * @length 42
   * @format ethereum-address
   * @required
   */
  @Column({ type: 'varchar', length: 42 })
  wallet_address: string;

  /**
   * Post content
   * 
   * @type string
   * @length 280
   * @required
   */
  @Column({ type: 'varchar', length: 280 })
  content: string;

  /**
   * Timestamp of post creation
   * 
   * @type Date
   * @required
   */
  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
