import { ValueObject } from '../../../core/dom/value-object/value-object'
import { getDecimalsQuantity } from '../../../core/utils/functions/get-decimals-quantity'
import { InvalidProductPriceException } from '../exceptions/invalid-product-price'

const MAX_DECIMALS = 2
const MAX_PRICE = 999_999_999.99

export class ProductPrice implements ValueObject<ProductPrice> {
  constructor(private readonly _price: number) {
    if (
      _price < 0 ||
      _price > MAX_PRICE ||
      getDecimalsQuantity(_price) > MAX_DECIMALS
    ) {
      throw new InvalidProductPriceException()
    }
  }

  get value(): number {
    return this._price
  }

  equals(other: ProductPrice): boolean {
    return this.value === other.value
  }
}
