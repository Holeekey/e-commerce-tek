import { Credentials } from '../../../src/auth/app/models/credentials'
import { CredentialsRepository } from '../../../src/auth/app/repositories/credentials.repository'
import { Optional } from '../../../src/core/utils/optional'

export class MockCredentialRepository implements CredentialsRepository {
  credentials: Credentials[]

  constructor(credentials: Credentials[] = []) {
    this.credentials = credentials
  }

  save(user: Credentials): Promise<void> {
    const existingIndex = this.credentials.findIndex(
      (c) => c.userId === user.userId
    )
    if (existingIndex !== -1) {
      this.credentials[existingIndex] = user
    } else {
      this.credentials.push(user)
    }
    return Promise.resolve()
  }
  findOne(id: string): Promise<Optional<Credentials>> {
    const foundCredentials = this.credentials.find((c) => c.userId === id)
    if (foundCredentials) {
      return Promise.resolve(Optional.of(foundCredentials))
    }
    return Promise.resolve(Optional.empty())
  }
  findOneByEmail(email: string): Promise<Optional<Credentials>> {
    const foundCredentials = this.credentials.find((c) => c.email === email)
    if (foundCredentials) {
      return Promise.resolve(Optional.of(foundCredentials))
    }
    return Promise.resolve(Optional.empty())
  }
}
