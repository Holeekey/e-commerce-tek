import { ValueObject } from '../../../core/dom/value-object/value-object'
import { getDecimalsQuantity } from '../../../core/utils/functions/get-decimals-quantity'
import { roundToNDecimals } from '../../../core/utils/functions/round-to-n-decimals'
import { InvalidProductPriceException } from '../exceptions/invalid-product-price'
import { InvalidStockQuantityException } from '../exceptions/invalid-stock-quantity'

const MAX_DECIMALS = 4
const MAX_QUANTITY = 999_999_999_999.99

export class StockQuantity implements ValueObject<StockQuantity> {
  constructor(private readonly _quantity: number) {
    if (
      _quantity < 0 ||
      _quantity > MAX_QUANTITY ||
      getDecimalsQuantity(_quantity) > MAX_DECIMALS
    ) {
      throw new InvalidStockQuantityException()
    }
  }

  get value(): number {
    return this._quantity
  }

  get isDecimal(): boolean {
    return getDecimalsQuantity(this._quantity) > 0
  }

  add(quantity: number): StockQuantity {
    const newQuantity = this._quantity + quantity
    return new StockQuantity(roundToNDecimals(newQuantity, MAX_DECIMALS))
  }

  subtract(quantity: number): StockQuantity {
    if (this._quantity < quantity) {
      throw new InvalidStockQuantityException()
    }
    const newQuantity = this._quantity - quantity
    return new StockQuantity(roundToNDecimals(newQuantity, MAX_DECIMALS))
  }

  isGreaterThan(other: StockQuantity): boolean {
    return this.value > other.value
  }

  isLessThan(other: StockQuantity): boolean {
    return this.value < other.value
  }

  equals(other: StockQuantity): boolean {
    return this.value === other.value
  }
}
