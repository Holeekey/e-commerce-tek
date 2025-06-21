import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidProductPriceException } from '../exceptions/invalid-product-price'
import { InvalidStockOperationException } from '../exceptions/invalid-stock-operation'
import { StockQuantity } from './stock-quantity'

export class ProductStock implements ValueObject<ProductStock> {
  constructor(
    private readonly _quantity: StockQuantity,
    private readonly _canStockBeDecimal: boolean
  ) {
    if (!_canStockBeDecimal && _quantity.isDecimal) {
      throw new InvalidProductPriceException()
    }
  }

  get quantity(): StockQuantity {
    return this._quantity
  }

  get isDecimal(): boolean {
    return this._canStockBeDecimal
  }

  private validOperation(quantity: StockQuantity) {
    if (quantity.isDecimal && !this._canStockBeDecimal) {
      return false
    }
    return true
  }

  add(quantity: StockQuantity): ProductStock {
    if (!this.validOperation(quantity)) {
      throw new InvalidStockOperationException()
    }
    const newQuantity = this._quantity.add(quantity.value)
    return new ProductStock(newQuantity, this._canStockBeDecimal)
  }

  subtract(quantity: StockQuantity): ProductStock {
    if (!this.validOperation(quantity) || this._quantity.isLessThan(quantity)) {
      throw new InvalidStockOperationException()
    }
    const newQuantity = this._quantity.subtract(quantity.value)
    return new ProductStock(newQuantity, this._canStockBeDecimal)
  }

  equals(other: ProductStock): boolean {
    return this._quantity === other._quantity
  }
}
