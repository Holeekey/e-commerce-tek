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
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'
import { MongoProductRepository } from '../repositories/mongo/product.repository'
import { FindOneProductService } from '../../app/services/find-one/find-one-product.service'
import { ObjectIdGenerator } from '../../../core/infra/object-id/object-id-generator'
import { UpdateProductDTO } from '../dto/update-product.dto'
import { UpdateProductService } from '../../app/services/update/update-product.service'
import { ModifyStockDTO } from '../dto/modify-stock.dto'
import { ModifyStockService } from '../../app/services/modify-stock/modify-stock.service'
import { validateParam } from '../../../core/infra/middlewares/validate-param.middleware'
import { isObjectId } from '../../../core/utils/functions/is-object-id'
import { ChangeProductStatusDTO } from '../dto/change-product-status.dto'
import { ChangeProductStatusService } from '../../app/services/change-status/change-product-status.dto'

export const productRouter = Router()
const credentialsRepo = new MongoCredentialsRepository()
const productRepo = new MongoProductRepository()

productRouter.post(
  '/create',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.ADMIN),
  validateBody(CreateProductDTO),
  async (req, res) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(
        new CreateProductService(new ObjectIdGenerator(), productRepo),
        [new BunyanLogger('Create Product')]
      ),
      expressExceptionHandler(res)
    ).execute({
      ...req.body,
    })

    res.send(result.unwrap())
  }
)

productRouter.put(
  '/update/:id',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.ADMIN),
  validateParam('id', isObjectId),
  validateBody(UpdateProductDTO),
  async (req, res) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(new UpdateProductService(productRepo), [
        new BunyanLogger('Update Product'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      id: req.params.id,
      ...req.body,
    })

    res.send(result.unwrap())
  }
)

productRouter.patch(
  '/stock/:id',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.ADMIN),
  validateParam('id', isObjectId),
  validateBody(ModifyStockDTO),
  async (req, res) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(new ModifyStockService(productRepo), [
        new BunyanLogger('Modify Stock'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      id: req.params.id,
      ...req.body,
    })

    res.send(result.unwrap())
  }
)

productRouter.get(
  '/one/:id',
  verifyToken(credentialsRepo),
  validateParam('id', isObjectId),
  async (req, res) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(new FindOneProductService(productRepo), [
        new BunyanLogger('Find One Product'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      id: req.params.id,
    })

    res.send(result.unwrap())
  }
)
