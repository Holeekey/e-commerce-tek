import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { FindOneUserData } from './dto/data'
import { FindOneUserResponse } from './dto/response'
import { UserRepository } from '../../repositories/user.repository'
import { UserId } from '../../../dom/value-objects/user-id'
import { UserNotFoundException } from '../../exceptions/not-found'
export class FindOneUserService
  implements ApplicationService<FindOneUserData, FindOneUserResponse>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute({ id }: FindOneUserData): Promise<Result<FindOneUserResponse>> {
    const userResult = await this.userRepo.findOne(new UserId(id))

    if (userResult.isEmpty()) {
      return Result.failure(new UserNotFoundException())
    }

    const user = userResult.get()

    return Result.success({
      id: user.id.value,
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email.value,
    })
  }
}
