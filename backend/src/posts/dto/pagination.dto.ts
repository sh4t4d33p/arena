/**
 * Pagination DTO
 * 
 * Data transfer object for paginating results.
 * Contains page number and items per page limit.
 * 
 * @class PaginationDto
 */
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * Pagination DTO
 * 
 * @class PaginationDto
 * @description DTO for paginating results
 */
export class PaginationDto {
  /**
   * Page number to retrieve
   * 
   * @type number
   * @min 1
   * @default 1
   * @optional
   */
  @IsInt()
  @IsOptional()
  @Min(1)
  page = 1;

  /**
   * Number of items per page
   * 
   * @type number
   * @min 1
   * @default 10
   * @optional
   */
  @IsInt()
  @IsOptional()
  @Min(1)
  limit = 10;
}
