import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { RegisterData } from './dto/data'
import { RegisterResponse } from './dto/response'
import { IdGenerator } from '../../../../core/app/id-generator/id-generator.interfaces'
import { CredentialsRepository } from '../../repositories/credentials.repository'
import { TokenGenerator } from '../../../../core/app/token/token-generator.interface'
import { Encryptor } from '../../../../core/app/encrypt/encryptor.interface'
import { Credentials } from '../../models/credentials'
import { EmailTakenException } from '../../exceptions/email-taken'

export class RegisterService
  implements ApplicationService<RegisterData, RegisterResponse>
{
  constructor(
    private readonly idGenerator: IdGenerator<string>,
    private readonly tokenGenerator: TokenGenerator<{ id: string }, string>,
    private readonly encryptor: Encryptor,
    private readonly credentialsRepo: CredentialsRepository
  ) {}

  async execute({
    email,
    password,
    role,
  }: RegisterData): Promise<Result<RegisterResponse>> {
    const credentialsByEmail = await this.credentialsRepo.findOneByEmail(email)

    if (credentialsByEmail.isPresent()) {
      return Result.failure(new EmailTakenException())
    }

    const credentials: Credentials = {
      userId: this.idGenerator.generate(),
      email,
      password: this.encryptor.encrypt(password),
      role,
    }

    await this.credentialsRepo.save(credentials)

    const token = this.tokenGenerator.generate({ id: credentials.userId })

    return Result.success({
      userId: credentials.userId,
      token,
    })
  }
}
