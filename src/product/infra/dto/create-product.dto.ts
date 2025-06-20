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

export class CreateProductDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999.99)
  price: number

  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(999_999_999_999.99)
  stock: number

  @IsBoolean()
  canStockBeDecimal: boolean
}
