import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { GetCartData } from './dto/data'
import { GetCartResponse } from './dto/response'
import { ShoppingCartRepository } from '../../repositories/shopping-cart.repository'
import { UserNotFoundException } from '../../../../user/app/exceptions/not-found'
export class GetCartService
  implements ApplicationService<GetCartData, GetCartResponse>
{
  constructor(private readonly cartRepo: ShoppingCartRepository) {}

  async execute(data: GetCartData): Promise<Result<GetCartResponse>> {
    const cartResult = await this.cartRepo.findByUserId(data.userId)

    if (cartResult.isEmpty()) {
      return Result.failure(new UserNotFoundException())
    }

    const cart = cartResult.get()

    return Result.success({
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    })
  }
}
