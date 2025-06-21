import { Type } from 'class-transformer'
import { IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number = 5

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number = 1
}
