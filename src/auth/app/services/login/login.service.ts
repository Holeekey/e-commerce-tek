import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { LoginData } from './dto/data'
import { LoginResponse } from './dto/response'
import { CredentialsRepository } from '../../repositories/credentials.repository'
import { Encryptor } from '../../../../core/app/encrypt/encryptor.interface'
import { InvalidPasswordException } from '../../exceptions/invalid-password'
import { TokenGenerator } from '../../../../core/app/token/token-generator.interface'
import { InvalidEmailException } from '../../exceptions/invalid-email'
export class LoginService
  implements ApplicationService<LoginData, LoginResponse>
{
  constructor(
    private readonly tokenGenerator: TokenGenerator<{ id: string }, string>,
    private readonly encryptor: Encryptor,
    private readonly userRepo: CredentialsRepository
  ) {}

  async execute(data: LoginData): Promise<Result<LoginResponse>> {
    const userByEmailResult = await this.userRepo.findOneByEmail(data.email)

    if (userByEmailResult.isEmpty()) {
      return Result.failure(new InvalidEmailException())
    }

    const user = userByEmailResult.get()

    const passwordMatches = this.encryptor.compare({
      original: data.password,
      encrypted: user.password,
    })

    if (!passwordMatches) {
      return Result.failure(new InvalidPasswordException())
    }

    const token = this.tokenGenerator.generate({ id: user.userId })

    return Result.success({
      token,
    })
  }
}
