import { Optional } from '../../../core/utils/optional'
import { ShoppingCart } from '../models/shopping-cart'

export interface ShoppingCartRepository {
  findByUserId(userId: string): Promise<Optional<ShoppingCart>>
  save(cart: ShoppingCart): Promise<void>
}
