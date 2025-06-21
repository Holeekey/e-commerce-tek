import { IsIn, IsNumber, Max, Min } from 'class-validator'

export class ModifyStockDTO {
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(999_999_999_999.99)
  quantity: number

  @IsIn(['add', 'subtract'])
  operation: 'add' | 'subtract'
}
