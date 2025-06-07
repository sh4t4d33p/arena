/**
 * Comment Entity
 * 
 * Represents a comment on a post in the Arena network.
 * Contains comment content, creator's wallet address, and timestamp.
 * 
 * @class Comment
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

/**
 * Comment Entity
 * 
 * @class Comment
 * @description Database entity for post comments
 */
@Entity('comments')
export class Comment {
  /**
   * Unique comment identifier
   * 
   * @type number
   * @autoIncrement
   * @required
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * ID of the post being commented on
   * 
   * @type number
   * @required
   */
  @Column()
  post_id: number;

  /**
   * Ethereum wallet address of the commenter
   * 
   * @type string
   * @length 42
   * @format ethereum-address
   * @required
   */
  @Column({ type: 'varchar', length: 42 })
  wallet_address: string;

  /**
   * Comment content
   * 
   * @type string
   * @required
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * Timestamp of comment creation
   * 
   * @type Date
   * @required
   */
  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
