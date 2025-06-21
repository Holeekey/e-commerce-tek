import { IsBoolean } from 'class-validator'

export class ChangeProductStatusDTO {
  @IsBoolean()
  active: boolean
}
