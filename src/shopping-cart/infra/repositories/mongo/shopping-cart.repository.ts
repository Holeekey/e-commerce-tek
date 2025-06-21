import { Optional } from '../../../../core/utils/optional'
import { ShoppingCart } from '../../../app/models/shopping-cart'
import { ShoppingCartRepository } from '../../../app/repositories/shopping-cart.repository'
import { UserModel } from '../../../../core/infra/models/user.model'

export class MongoShoppingCartRepository implements ShoppingCartRepository {
  async findByUserId(userId: string): Promise<Optional<ShoppingCart>> {
    const user = await UserModel.findById(userId).lean()
    if (!user) return Optional.empty()

    const items = user.cart ? user.cart : []

    return Optional.of({
      userId,
      items,
    })
  }
  async save(cart: ShoppingCart): Promise<void> {
    await UserModel.findByIdAndUpdate(
      cart.userId,
      {
        cart: cart.items,
      },
      { upsert: true }
    )
  }
}
