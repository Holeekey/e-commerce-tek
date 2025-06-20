import { User } from '../../dom/user'
import { UserId } from '../../dom/value-objects/user-id'
import { Optional } from '../../../core/utils/optional'

export interface UserRepository {
  save(user: User): Promise<void>
  findOne(id: UserId): Promise<Optional<User>>
}
