import { Router } from 'express'
import { verifyToken } from '../../../core/infra/middlewares/verify-token.middleware'
import { MongoCredentialsRepository } from '../../../auth/infra/repository/mongo/credentials.repository'
import { verifyUserRole } from '../../../core/infra/middlewares/verify-user-role.middleware'
import { Role } from '../../../auth/app/models/credentials'
import { validateBody } from '../../../core/infra/middlewares/validate-body.middleware'
import { AddItemToCartDTO } from '../dto/add-item-to-cart'
import { validateParam } from '../../../core/infra/middlewares/validate-param.middleware'
import { isObjectId } from '../../../core/utils/functions/is-object-id'
import { MongoUserRepository } from '../../../user/infra/repositories/mongo/user.repository'
import { MongoProductRepository } from '../../../product/infra/repositories/mongo/product.repository'
import { MongoShoppingCartRepository } from '../repositories/mongo/shopping-cart.repository'
import { ExceptionDecorator } from '../../../core/app/decorators/exception.decorator'
import { LoggerDecorator } from '../../../core/app/decorators/log.decorator'
import { BunyanLogger } from '../../../core/infra/loggers/bunyan.logger'
import { expressExceptionHandler } from '../../../core/infra/exception-handlers/express.exception-handler'
import { AddItemToCartService } from '../../app/service/add-item/add-item-to-cart.service'
import { getUserFromReq } from '../../../core/infra/utils/get-user-from-req'
import { RemoveItemFromCartService } from '../../app/service/remove-item/remove-item-from-cart.service'

export const shoppingCartRouter = Router()

const credentialsRepo = new MongoCredentialsRepository()
const userRepo = new MongoUserRepository()
const productRepo = new MongoProductRepository()
const cartRepo = new MongoShoppingCartRepository()

shoppingCartRouter.get('/', (req, res) => {
  res.send({
    message: 'Shopping cart retrieved successfully',
    items: [],
  })
})

shoppingCartRouter.patch(
  '/add/:id',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.CLIENT),
  validateParam('id', isObjectId),
  validateBody(AddItemToCartDTO),
  async (req, res) => {
    const user = getUserFromReq(req)

    const result = await new ExceptionDecorator(
      new LoggerDecorator(
        new AddItemToCartService(userRepo, productRepo, cartRepo),
        [new BunyanLogger('Add Item to Cart')]
      ),
      expressExceptionHandler(res)
    ).execute({
      userId: user.id,
      productId: req.params.id,
      ...req.body,
    })

    res.send(result.unwrap())
  }
)

shoppingCartRouter.patch(
  '/remove/:id',
  verifyToken(credentialsRepo),
  verifyUserRole(Role.CLIENT),
  validateParam('id', isObjectId),
  async (req, res) => {
    const user = getUserFromReq(req)

    const result = await new ExceptionDecorator(
      new LoggerDecorator(new RemoveItemFromCartService(userRepo, cartRepo), [
        new BunyanLogger('Remove Item from Cart'),
      ]),
      expressExceptionHandler(res)
    ).execute({
      userId: user.id,
      productId: req.params.id,
    })

    res.send(result.unwrap())
  }
)
