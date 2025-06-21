import { IsNumber, Max, Min } from 'class-validator'

export class AddItemToCartDTO {
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(999_999_999_999.99)
  quantity: number
}
