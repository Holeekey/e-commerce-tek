import { ObjectIdGenerator } from '../../src/core/infra/object-id/object-id-generator'
import { MockProductRepository } from '../mocks/repositories/mock-product.repository'
import { MockCartRepository } from '../mocks/repositories/mock-cart.repository'
import { MockOrderRepository } from '../mocks/repositories/mock-order.repository'
import { CreateOrderService } from '../../src/order/app/services/create/create-order.service'
import { ConcreteDateProvider } from '../../src/core/infra/date/concrete-date.provider'
import { mockCarts, mockUserId1 } from '../data/cart-mock.data'
import { mockProducts } from '../data/product-mock.data'

test('Empty Cart', () => {
  const productRepo = new MockProductRepository(mockProducts)
  const cartRepo = new MockCartRepository(mockCarts)
  const orderRepo = new MockOrderRepository()

  new CreateOrderService(
    new ObjectIdGenerator(),
    cartRepo,
    productRepo,
    orderRepo,
    new ConcreteDateProvider()
  )
    .execute({
      userId: mockUserId1,
    })
    .then((res) => {
      expect(res.isException()).toBe(true)
    })
})
