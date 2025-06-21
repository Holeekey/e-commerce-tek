import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { ProductRepository } from '../../../../product/app/repositories/product.repository'
import { ShoppingCartRepository } from '../../../../shopping-cart/app/repositories/shopping-cart.repository'
import { CreateOrderData } from './dto/data'
import { CreateOrderResponse } from './dto/response'
import { UserNotFoundException } from '../../../../user/app/exceptions/not-found'
import { ProductId } from '../../../../product/dom/value-objects/product-id'
import { StockQuantity } from '../../../../product/dom/value-objects/stock-quantity'
import { InsufficientStockException } from '../../exceptions/insufficient-stock'
import { InactiveProductException } from '../../exceptions/inactive-product'
import { Product } from '../../../../product/dom/product'
import { DateProvider } from '../../../../core/app/date/date-provider.interface'
import { makeOrder } from '../../../dom/order'
import { IdGenerator } from '../../../../core/app/id-generator/id-generator.interfaces'
import { OrderItemQuantity } from '../../../dom/value-objects/order-item-quantity'
import { OrderItemUnitPrice } from '../../../dom/value-objects/order-item-price'
import { OrderItem } from '../../../dom/value-objects/order-item'
import { OrderRepository } from '../../repositories/order.repository'
import { EmptyCartException } from '../../exceptions/empty-cart'

export class CreateOrderService
  implements ApplicationService<CreateOrderData, CreateOrderResponse>
{
  constructor(
    private readonly idGenerator: IdGenerator<string>,
    private readonly cartRepo: ShoppingCartRepository,
    private readonly productRepo: ProductRepository,
    private readonly orderRepo: OrderRepository,
    private readonly dateProvider: DateProvider
  ) {}

  async execute(data: CreateOrderData): Promise<Result<CreateOrderResponse>> {
    const cartResult = await this.cartRepo.findByUserId(data.userId)

    if (cartResult.isEmpty()) {
      return Result.failure(new UserNotFoundException())
    }

    const cart = cartResult.get()

    if (cart.items.length === 0) {
      return Result.failure(new EmptyCartException())
    }

    const order = makeOrder({
      id: this.idGenerator.generate(),
      userId: data.userId,
      creationDate: this.dateProvider.now(),
      items: [],
    })

    const products: { product: Product; quantityOrder: number }[] = []

    for (const item of cart.items) {
      const productResult = await this.productRepo.findOne(
        new ProductId(item.productId)
      )

      const product = productResult.get()

      if (!product.hasEnoughStock(new StockQuantity(item.quantity))) {
        return Result.failure(new InsufficientStockException(product.id.value))
      }

      if (!product.active) {
        return Result.failure(new InactiveProductException(product.id.value))
      }

      products.push({ product, quantityOrder: item.quantity })

      order.addItem(
        new OrderItem(
          product.id,
          new OrderItemQuantity(item.quantity),
          new OrderItemUnitPrice(product.price.value)
        )
      )
    }

    for (const { product, quantityOrder } of products) {
      product.subtractStock(new StockQuantity(quantityOrder))
      await this.productRepo.save(product)
    }

    cart.items = []

    await this.cartRepo.save(cart)

    await this.orderRepo.save(order)

    return Result.success({
      status: order.status.value,
      totalPrice: order.getTotalPrice(),
    })
  }
}
