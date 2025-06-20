import { Router } from 'express'
import { validateBody } from '../../../core/infra/middlewares/validate-body.middleware'
import { verifyToken } from '../../../core/infra/middlewares/verify-token.middleware'
import { verifyUserRole } from '../../../core/infra/middlewares/verify-user-role.middleware'
import { MongoCredentialsRepository } from '../../../auth/infra/repository/mongo/credentials.repository'
import { Role } from '../../../auth/app/models/credentials'
import { CreateProductDTO } from '../dto/create-product.dto'
import { ExceptionDecorator } from '../../../core/app/decorators/exception.decorator'
import { LoggerDecorator } from '../../../core/app/decorators/log.decorator'
import { CreateProductService } from '../../app/services/create/create-product.service'
import { UuidGenerator } from '../../../core/infra/uuid/uuid-generator'
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'

export const productRouter = Router()
const credentialsRepo = new MongoCredentialsRepository()

productRouter.post(
  '/create',
  validateBody(CreateProductDTO),
  verifyToken(credentialsRepo),
  verifyUserRole(Role.ADMIN),
  async (req, res) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(new CreateProductService(new UuidGenerator()), [
        new BunyanLogger('Create Product'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      ...req.body,
    })

    res.send(result.unwrap())
  }
)
