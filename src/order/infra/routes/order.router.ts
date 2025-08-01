import { Router } from 'express'
import { verifyToken } from '../../../core/infra/middlewares/verify-token.middleware'
import { verifyUserRole } from '../../../core/infra/middlewares/verify-user-role.middleware'
import { Role } from '../../../auth/app/models/credentials'
import { MongoCredentialsRepository } from '../../../auth/infra/repository/mongo/credentials.repository'
import { MongoProductRepository } from '../../../product/infra/repositories/mongo/product.repository'
import { MongoShoppingCartRepository } from '../../../shopping-cart/infra/repositories/mongo/shopping-cart.repository'
import { ExceptionDecorator } from '../../../core/app/decorators/exception.decorator'
import { LoggerDecorator } from '../../../core/app/decorators/log.decorator'
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'
import { CreateOrderService } from '../../app/services/create/create-order.service'
import { getUserFromReq } from '../../../core/infra/utils/get-user-from-req'
import { MongoOrderRepository } from '../repositories/mongo/order.repositories'
import { ObjectIdGenerator } from '../../../core/infra/object-id/object-id-generator'
import { ConcreteDateProvider } from '../../../core/infra/date/concrete-date.provider'
import { FindOneOrderService } from '../../app/services/find-one/find-one-order.service'
import { UpdateOrderStatusService } from '../../app/services/update-status/update-order-status.service'
import { CancelOrderService } from '../../app/services/cancel/cancel-order.service'
import { GetOrderHistoryService } from '../../app/services/history/get-order-history.service'
import { validateQuery } from '../../../core/infra/middlewares/validate-query.middleware'
import { PaginationDTO } from '../../../core/infra/pagination/dto/pagination.dto'
import { PerfomanceDecorator } from '../../../core/app/decorators/performance.decorator'
import { validateParam } from '../../../core/infra/middlewares/validate-param.middleware'
import { isObjectId } from '../../../core/utils/functions/is-object-id'

export const orderRouter = Router()

const credentialsRepo = new MongoCredentialsRepository()
const productRepo = new MongoProductRepository()
const cartRepo = new MongoShoppingCartRepository()
const orderRepo = new MongoOrderRepository()

orderRouter.post(
  '/create',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.CLIENT),
  async (req, res) => {
    const user = getUserFromReq(req)

    const result = await new ExceptionDecorator(
      new LoggerDecorator(
        new CreateOrderService(
          new ObjectIdGenerator(),
          cartRepo,
          productRepo,
          orderRepo,
          new ConcreteDateProvider()
        ),
        [new BunyanLogger('Create Order')]
      ),
      expressExceptionHandler(res)
    ).execute({
      userId: user.id,
    })

    res.send(result.unwrap())
  }
)

orderRouter.patch(
  '/update/:id',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.ADMIN),
  validateParam('id', isObjectId),
  async (req, res) => {
    const result = await new ExceptionDecorator(
      new LoggerDecorator(new UpdateOrderStatusService(orderRepo), [
        new BunyanLogger('Update Order Status'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      id: req.params.id,
    })

    res.send(result.unwrap())
  }
)

orderRouter.patch(
  '/cancel/:id',
  verifyToken(credentialsRepo),
  validateParam('id', isObjectId),
  async (req, res) => {
    const user = getUserFromReq(req)

    const result = await new ExceptionDecorator(
      new LoggerDecorator(new CancelOrderService(orderRepo), [
        new BunyanLogger('Cancel Order'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      id: req.params.id,
      userId: user.id,
      mustBeOwner: user.role === Role.CLIENT,
    })

    res.send(result.unwrap())
  }
)

orderRouter.get(
  '/one/:id',
  verifyToken(credentialsRepo),
  validateParam('id', isObjectId),
  async (req, res) => {
    const user = getUserFromReq(req)

    const result = await new ExceptionDecorator(
      new LoggerDecorator(new FindOneOrderService(orderRepo, productRepo), [
        new BunyanLogger('Find One Order'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      id: req.params.id,
      userId: user.id,
      mustBeOwner: user.role === Role.CLIENT,
    })

    res.send(result.unwrap())
  }
)

orderRouter.get(
  '/history',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.CLIENT),
  validateQuery(PaginationDTO),
  async (req: any, res) => {
    const user = getUserFromReq(req)

    const logger = new BunyanLogger('Get Order History')

    const result = await new ExceptionDecorator(
      new LoggerDecorator(
        new PerfomanceDecorator(
          new GetOrderHistoryService(orderRepo, productRepo),
          [logger]
        ),
        [logger]
      ),
      expressExceptionHandler(res)
    ).execute({
      userId: user.id,
      ...req.queryParams,
    })

    res.send(result.unwrap())
  }
)
