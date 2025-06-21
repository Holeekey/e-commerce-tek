import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { RemoveItemFromCartData } from './dto/data'
import { RemoveItemFromCartResponse } from './dto/response'
import { UserRepository } from '../../../../user/app/repositories/user.repository'
import { ShoppingCartRepository } from '../../repositories/shopping-cart.repository'
import { UserNotFoundException } from '../../../../user/app/exceptions/not-found'
import { UserId } from '../../../../user/dom/value-objects/user-id'

export class RemoveItemFromCartService
  implements
    ApplicationService<RemoveItemFromCartData, RemoveItemFromCartResponse>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly cartRepo: ShoppingCartRepository
  ) {}

  async execute(
    data: RemoveItemFromCartData
  ): Promise<Result<RemoveItemFromCartResponse>> {
    const userResult = await this.userRepo.findOne(new UserId(data.userId))

    if (userResult.isEmpty()) {
      return Result.failure(new UserNotFoundException())
    }

    const cartResult = await this.cartRepo.findByUserId(data.userId)

    const cart = cartResult.get()

    const filteredCart = cart.items.filter(
      (item) => item.productId !== data.productId
    )

    if (filteredCart.length !== cart.items.length) {
      cart.items = filteredCart
      await this.cartRepo.save(cart)
    }

    return Result.success({
      message: 'Successful',
    })
  }
}
