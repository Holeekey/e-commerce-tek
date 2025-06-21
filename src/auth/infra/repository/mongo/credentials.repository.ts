import { Optional } from '../../../../core/utils/optional'
import { CredentialsRepository } from '../../../app/repositories/credentials.repository'
import { Credentials } from '../../../app/models/credentials'
import { CredentialsModel } from '../../../../core/infra/models/credentials.model'

export class MongoCredentialsRepository implements CredentialsRepository {
  async save(user: Credentials): Promise<void> {
    await CredentialsModel.create({
      _id: user.userId,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  }
  async findOne(id: string): Promise<Optional<Credentials>> {
    const odmCredentials = await CredentialsModel.findOne({ _id: id }).lean()
    if (!odmCredentials) return Optional.empty()
    return Optional.of({
      userId: odmCredentials._id.toString(),
      email: odmCredentials.email,
      password: odmCredentials.password,
      role: odmCredentials.role,
    })
  }
  async findOneByEmail(email: string): Promise<Optional<Credentials>> {
    const odmCredentials = await CredentialsModel.findOne({ email }).lean()
    if (!odmCredentials) return Optional.empty()
    return Optional.of({
      userId: odmCredentials._id.toString(),
      email: odmCredentials.email,
      password: odmCredentials.password,
      role: odmCredentials.role,
    })
  }
  async count(): Promise<number> {
    return CredentialsModel.countDocuments()
  }
}
