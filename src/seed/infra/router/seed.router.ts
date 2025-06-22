import { Router } from 'express'
import { signUpData } from '../../data/user.data'
import { ExceptionDecorator } from '../../../core/app/decorators/exception.decorator'
import { LoggerDecorator } from '../../../core/app/decorators/log.decorator'
import { RegisterService } from '../../../auth/app/services/register/register.service'
import { ObjectIdGenerator } from '../../../core/infra/object-id/object-id-generator'
import { JwtGenerator } from '../../../core/infra/jwt/jwt-generator'
import { Sha256Encryptor } from '../../../core/infra/encryptors/sha-256/sha256-encryptor'
import { MongoCredentialsRepository } from '../../../auth/infra/repository/mongo/credentials.repository'
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { MongoUserRepository } from '../../../user/infra/repositories/mongo/user.repository'
import { SignUpService } from '../../../user/app/services/sign-up/sign-up.service'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'
import { Role } from '../../../auth/app/models/credentials'
import { CreateProductService } from '../../../product/app/services/create/create-product.service'
import { MongoProductRepository } from '../../../product/infra/repositories/mongo/product.repository'
import { productData } from '../../data/product.data'

export const seedRouter = Router()

seedRouter.get('/', async (_, res) => {
  try {
    const objectIdGenerator = new ObjectIdGenerator()
    const jwtGenerator = new JwtGenerator()
    const sha256Encryptor = new Sha256Encryptor()

    const credentialsRepo = new MongoCredentialsRepository()
    const userRepo = new MongoUserRepository()
    const productRepo = new MongoProductRepository()

    for (const user of signUpData) {
      const registerResult = await new ExceptionDecorator(
        new LoggerDecorator(
          new RegisterService(
            objectIdGenerator,
            jwtGenerator,
            sha256Encryptor,
            credentialsRepo
          ),
          [new BunyanLogger('Register')]
        ),
        expressExceptionHandler(res)
      ).execute({
        ...user,
        role: Role.CLIENT,
      })

      const registerResponse = registerResult.unwrap()

      await new ExceptionDecorator(
        new LoggerDecorator(new SignUpService(userRepo), [
          new BunyanLogger('Sign Up'),
        ]),
        expressExceptionHandler(res)
      ).execute({
        id: registerResponse.userId,
        ...user,
      })
    }

    for (const product of productData) {
      await new ExceptionDecorator(
        new LoggerDecorator(
          new CreateProductService(objectIdGenerator, productRepo),
          [new BunyanLogger('Create Product')]
        ),
        expressExceptionHandler(res)
      ).execute({
        ...product,
      })
    }

    res.status(201).json({
      message: 'Seed data created successfully',
    })
  } catch (error) {
    console.error('Error seeding data:', error)
    res.status(500).json({
      message: 'Error seeding data',
    })
  }
})
