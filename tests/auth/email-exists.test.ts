import { MockEncryptor } from '../mocks/providers/mock-encryptor'
import { MockTokenGenerator } from '../mocks/providers/mock-token-generator'
import { MockCredentialRepository } from '../mocks/repositories/mock-credential.repository'
import { RegisterService } from '../../src/auth/app/services/register/register.service'
import { ObjectIdGenerator } from '../../src/core/infra/object-id/object-id-generator'
import { Role } from '../../src/auth/app/models/credentials'
import { mockCredentials } from '../data/user-mock.data'
import { AuthExceptionCode } from '../../src/auth/app/exceptions/codes/auth-exception-codes'

test('Email Already Exists', () => {
  const credentialsRepo = new MockCredentialRepository(mockCredentials)
  const tokenGenerator = new MockTokenGenerator()
  const mockEncryptor = new MockEncryptor()

  new RegisterService(
    new ObjectIdGenerator(),
    tokenGenerator,
    mockEncryptor,
    credentialsRepo
  )
    .execute({
      role: Role.CLIENT,
      email: 'lionelmessi10@gmail.com',
      password: 'password123',
    })
    .then((res) => {
      const err: any = res.getException()
      expect(err.code).toBe(AuthExceptionCode.EMAIL_TAKEN)
    })
})
