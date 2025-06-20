import { Router } from 'express'
import { RegisterDTO } from '../dto/register.dto'
import { validateBody } from '../../../core/infra/middlewares/validate-body.middleware'
import { LoginDTO } from '../dto/login.dto'
import { RegisterService } from '../../app/services/register/register.service'
import { LoggerDecorator } from '../../../core/app/decorators/log.decorator'
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { ExceptionDecorator } from '../../../core/app/decorators/exception.decorator'
import { UuidGenerator } from '../../../core/infra/uuid/uuid-generator'
import { MongoCredentialsRepository } from '../repository/mongo/credentials.repository'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'
import { JwtGenerator } from '../../../core/infra/jwt/jwt-generator'
import { verifyToken } from '../../../core/infra/middlewares/verify-token.middleware'
import { getUserFromReq } from '../../../core/infra/utils/get-user-from-req'
import { verifyUserRole } from '../../../core/infra/middlewares/verify-user-role.middleware'
import { Sha256Encryptor } from '../../../core/infra/encryptors/sha-256/sha256-encryptor'
import { LoginService } from '../../app/services/login/login.service'
import { Role } from '../../app/models/credentials'

export const authRouter = Router()

const credentialsRepo = new MongoCredentialsRepository()

authRouter.post(
  '/register',
  validateBody(RegisterDTO),
  async (req, res, _next) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(
        new RegisterService(
          new UuidGenerator(),
          new JwtGenerator(),
          new Sha256Encryptor(),
          credentialsRepo
        ),
        [new BunyanLogger('Register')]
      ),
      expressExceptionHandler(res)
    ).execute({
      ...req.body,
    })

    res.send(result.unwrap())
  }
)

authRouter.post('/login', validateBody(LoginDTO), async (req, res) => {
  const result = await new ExceptionDecorator(
    new LoggerDecorator(
      new LoginService(
        new JwtGenerator(),
        new Sha256Encryptor(),
        credentialsRepo
      ),
      [new BunyanLogger('Login')]
    ),
    expressExceptionHandler(res)
  ).execute({
    ...req.body,
  })

  res.send(result.unwrap())
})

authRouter.get(
  '/protected',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.ADMIN),
  (req, res) => {
    const user = getUserFromReq(req)
    res.send(user)
  }
)
