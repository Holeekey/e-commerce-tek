import { Optional } from '../../../../core/utils/optional'
import { UserRepository } from '../../../app/repositories/user.repository'
import { makeUser, User } from '../../../dom/user'
import { UserId } from '../../../dom/value-objects/user-id'
import { UserModel } from '../../../../core/infra/models/user.model'
export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await UserModel.create({
      id: user.id.value,
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email.value,
    })
  }
  async findOne(id: UserId): Promise<Optional<User>> {
    const odmUser = await UserModel.findOne({ id: id.value }).lean()
    if (!odmUser) return Optional.empty()
    return Optional.of(
      makeUser({
        id: odmUser.id,
        firstName: odmUser.firstName,
        lastName: odmUser.lastName,
        email: odmUser.email,
      })
    )
  }
}
