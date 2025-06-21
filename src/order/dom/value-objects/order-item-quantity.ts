import { ValueObject } from '../../../core/dom/value-object/value-object'
import { getDecimalsQuantity } from '../../../core/utils/functions/get-decimals-quantity'
import { InvalidOrderItemQuantityException } from '../exceptions/invalid-order-item-quantity'

const MAX_DECIMALS = 4
const MAX_QUANTITY = 999_999_999_999.99

export class OrderItemQuantity implements ValueObject<OrderItemQuantity> {
  constructor(private readonly _quantity: number) {
    if (
      _quantity < 0 ||
      _quantity > MAX_QUANTITY ||
      getDecimalsQuantity(_quantity) > MAX_DECIMALS
    ) {
      throw new InvalidOrderItemQuantityException()
    }
  }

  get value(): number {
    return this._quantity
  }

  get isDecimal(): boolean {
    return getDecimalsQuantity(this._quantity) > 0
  }

  isGreaterThan(other: OrderItemQuantity): boolean {
    return this.value > other.value
  }

  isLessThan(other: OrderItemQuantity): boolean {
    return this.value < other.value
  }

  equals(other: OrderItemQuantity): boolean {
    return this.value === other.value
  }
}
