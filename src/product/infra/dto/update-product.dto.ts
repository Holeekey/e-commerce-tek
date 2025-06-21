import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class UpdateProductDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999.99)
  @IsOptional()
  price: number

  @IsBoolean()
  @IsOptional()
  active: boolean
}
