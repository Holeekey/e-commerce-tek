import { Optional } from '../../../src/core/utils/optional'
import { ShoppingCart } from '../../../src/shopping-cart/app/models/shopping-cart'
import { ShoppingCartRepository } from '../../../src/shopping-cart/app/repositories/shopping-cart.repository'

export class MockCartRepository implements ShoppingCartRepository {
  private carts: ShoppingCart[] = []

  constructor(carts: ShoppingCart[] = []) {
    this.carts = carts
  }

  async findByUserId(userId: string): Promise<Optional<ShoppingCart>> {
    const cart = this.carts.find((cart) => cart.userId === userId)
    return cart ? Optional.of(cart) : Optional.empty()
  }

  async save(cart: ShoppingCart): Promise<void> {
    const existingIndex = this.carts.findIndex((c) => c.userId === cart.userId)
    if (existingIndex !== -1) {
      this.carts[existingIndex] = cart
    } else {
      this.carts.push(cart)
    }
  }
}
