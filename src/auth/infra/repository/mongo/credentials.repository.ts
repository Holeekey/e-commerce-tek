import { Optional } from '../../../../core/utils/optional'
import { CredentialsRepository } from '../../../app/repositories/credentials.repository'
import { Credentials } from '../../../app/models/credentials'
import { CredentialsModel } from '../../../../core/infra/models/credentials.model'

export class MongoCredentialsRepository implements CredentialsRepository {
  async save(user: Credentials): Promise<void> {
    await CredentialsModel.create(user)
  }
  async findOne(id: string): Promise<Optional<Credentials>> {
    const odmCredentials = await CredentialsModel.findOne({ userId: id }).lean()
    if (!odmCredentials) return Optional.empty()
    return Optional.of(odmCredentials)
  }
  async findOneByEmail(email: string): Promise<Optional<Credentials>> {
    const odmCredentials = await CredentialsModel.findOne({ email }).lean()
    if (!odmCredentials) return Optional.empty()
    return Optional.of(odmCredentials)
  }
  async count(): Promise<number> {
    return CredentialsModel.countDocuments()
  }
}
