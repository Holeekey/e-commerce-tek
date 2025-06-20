import { Optional } from '../../../core/utils/optional'
import { Credentials } from '../models/credentials'

export interface CredentialsRepository {
  save(user: Credentials): Promise<void>
  findOne(id: string): Promise<Optional<Credentials>>
  findOneByEmail(email: string): Promise<Optional<Credentials>>
}
