import { Router } from 'express'
import { validateBody } from '../../../core/infra/middlewares/validate-body.middleware'
import { SignUpDTO } from '../dto/sign-up.dto'
import { ExceptionDecorator } from '../../../core/app/decorators/exception.decorator'
import { LoggerDecorator } from '../../../core/app/decorators/log.decorator'
import { RegisterService } from '../../../auth/app/services/register/register.service'
import { JwtGenerator } from '../../../core/infra/jwt/jwt-generator'
import { Sha256Encryptor } from '../../../core/infra/encryptors/sha-256/sha256-encryptor'
import { MongoCredentialsRepository } from '../../../auth/infra/repository/mongo/credentials.repository'
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'
import { SignUpService } from '../../app/services/sign-up/sign-up.service'
import { MongoUserRepository } from '../repositories/mongo/user.repository'
import { verifyToken } from '../../../core/infra/middlewares/verify-token.middleware'
import { getUserFromReq } from '../../../core/infra/utils/get-user-from-req'
import { FindOneUserService } from '../../app/services/find-one/find-one-user.service'
import { ObjectIdGenerator } from '../../../core/infra/object-id/object-id-generator'

export const userRouter = Router()

const credentialsRepo = new MongoCredentialsRepository()
const userRepo = new MongoUserRepository()

userRouter.post('/sign-up', validateBody(SignUpDTO), async (req, res) => {
  const registerResult = await new ExceptionDecorator(
    new LoggerDecorator(
      new RegisterService(
        new ObjectIdGenerator(),
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

  const registerResponse = registerResult.unwrap()

  await new ExceptionDecorator(
    new LoggerDecorator(new SignUpService(userRepo), [
      new BunyanLogger('Sign Up'),
    ]),
    expressExceptionHandler(res)
  ).execute({
    id: registerResponse.userId,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })

  res.send(registerResult.unwrap())
})

userRouter.get('/current', verifyToken(credentialsRepo), async (req, res) => {
  const user = getUserFromReq(req)

  const result = await new ExceptionDecorator(
    new FindOneUserService(userRepo),
    expressExceptionHandler(res)
  ).execute({
    id: user.id,
  })

  res.send(result.unwrap())
})
