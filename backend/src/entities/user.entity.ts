/**
 * User Entity
 * 
 * Represents a user in the Arena social network.
 * Uses Ethereum wallet address as primary key.
 * 
 * @class User
 */
import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * User Entity
 * 
 * @class User
 * @description Database entity for user profiles
 */
@Entity('users')
export class User {
  /**
   * Ethereum wallet address (Primary Key)
   * 
   * @type string
   * @length 42
   * @required
   */
  @PrimaryColumn({ type: 'varchar', length: 42 })
  wallet_address: string;

  /**
   * User's display name
   * 
   * @type string
   * @length 32
   * @optional
   */
  @Column({ type: 'varchar', length: 32, nullable: true })
  username: string;

  /**
   * User's bio/description
   * 
   * @type string
   * @optional
   */
  @Column({ type: 'text', nullable: true })
  bio: string;

  /**
   * URL to user's profile picture
   * 
   * @type string
   * @format url
   * @optional
   */
  @Column({ type: 'text', nullable: true })
  profile_pic_url: string;
}
