import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { Role } from '../../app/models/credentials'

export class RegisterDTO {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsEnum(Role)
  role: Role
}
