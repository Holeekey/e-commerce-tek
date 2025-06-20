import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { SignUpDTO } from './dto/data'
import { SignUpResponse } from './dto/response'
import { Result } from '../../../../core/utils/result'
import { UserRepository } from '../../repositories/user.repository'
import { makeUser } from '../../../dom/user'

export class SignUpService
  implements ApplicationService<SignUpDTO, SignUpResponse>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute({
    id,
    email,
    firstName,
    lastName,
  }: SignUpDTO): Promise<Result<SignUpResponse>> {
    const user = makeUser({
      id,
      email,
      firstName,
      lastName,
    })
    await this.userRepo.save(user)
    return Result.success({
      message: 'Succesful',
    })
  }
}
