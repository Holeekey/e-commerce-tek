import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { AddItemToCartData } from './dto/data'
import { AddItemToCartResponse } from './dto/response'
import { UserRepository } from '../../../../user/app/repositories/user.repository'
import { ProductRepository } from '../../../../product/app/repositories/product.repository'
import { ShoppingCartRepository } from '../../repositories/shopping-cart.repository'
import { UserId } from '../../../../user/dom/value-objects/user-id'
import { UserNotFoundException } from '../../../../user/app/exceptions/not-found'
import { ProductNotFoundException } from '../../../../product/app/exceptions/not-found'
import { ProductId } from '../../../../product/dom/value-objects/product-id'
import { getDecimalsQuantity } from '../../../../core/utils/functions/get-decimals-quantity'
import { DecimalStockException } from '../../../../product/app/exceptions/decimal-stock'

export class AddItemToCartService
  implements ApplicationService<AddItemToCartData, AddItemToCartResponse>
{
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly cartRepo: ShoppingCartRepository
  ) {}

  async execute(
    data: AddItemToCartData
  ): Promise<Result<AddItemToCartResponse>> {
    const productResult = await this.productRepo.findOne(
      new ProductId(data.productId)
    )

    if (productResult.isEmpty()) {
      return Result.failure(new ProductNotFoundException())
    }

    const product = productResult.get()

    if (!product.stock.isDecimal && getDecimalsQuantity(data.quantity) > 0) {
      return Result.failure(new DecimalStockException())
    }

    const cartResult = await this.cartRepo.findByUserId(data.userId)

    if (cartResult.isEmpty()) {
      return Result.failure(new UserNotFoundException())
    }

    const cart = cartResult.get()

    if (cart.items.some((item) => item.productId === data.productId)) {
      cart.items = cart.items.map((item) => {
        if (item.productId === data.productId) {
          return {
            ...item,
            quantity: data.quantity,
          }
        }
        return item
      })
    } else {
      cart.items.push({
        productId: data.productId,
        quantity: data.quantity,
      })
    }

    await this.cartRepo.save(cart)

    return Result.success({
      message: 'Successful',
    })
  }
}
