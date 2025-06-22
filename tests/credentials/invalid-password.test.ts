import { MockEncryptor } from '../mocks/providers/mock-encryptor'
import { MockTokenGenerator } from '../mocks/providers/mock-token-generator'
import { MockCredentialRepository } from '../mocks/repositories/mock-credential.repository'
import { mockCredentials } from '../data/user-mock.data'
import { LoginService } from '../../src/auth/app/services/login/login.service'

test('Invalid Password', () => {
  const credentialsRepo = new MockCredentialRepository(mockCredentials)
  const tokenGenerator = new MockTokenGenerator()
  const mockEncryptor = new MockEncryptor()

  new LoginService(tokenGenerator, mockEncryptor, credentialsRepo)
    .execute({
      email: 'lionelmessi10@gmail.com',
      password: 'password777',
    })
    .then((res) => {
      expect(res.isException()).toBe(true)
    })
})
