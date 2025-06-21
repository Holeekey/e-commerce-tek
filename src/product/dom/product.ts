import { AggregateRoot } from '../../core/dom/aggregate/aggregate-root'
import { ProductId } from './value-objects/product-id'
import { ProductName } from './value-objects/product-name'
import { ProductDescription } from './value-objects/product-description'
import { ProductPrice } from './value-objects/product-price'
import { ProductStock } from './value-objects/product-stock'
import { ProductCreated } from './events/product-created'
import { ProductNameUpdated } from './events/product-name-updated'
import { ProductDescriptionUpdated } from './events/product-description-updated'
import { ProductPriceUpdated } from './events/product-price-updated'
import { StockQuantity } from './value-objects/stock-quantity'
import { ProductStockAdded } from './events/product-stock-added'
import { ProductStockSubstracted } from './events/product-stock-substracted'

export class Product extends AggregateRoot<ProductId> {
  constructor(
    id: ProductId,
    private _name: ProductName,
    private _price: ProductPrice,
    private _stock: ProductStock,
    private _description?: ProductDescription
  ) {
    super(id)
    this.pushEvent(ProductCreated.createEvent(id, _name, _price))
  }

  get name(): ProductName {
    return this._name
  }

  get description(): ProductDescription | undefined {
    return this._description
  }

  get price(): ProductPrice {
    return this._price
  }

  get stock(): ProductStock {
    return this._stock
  }

  updateName(name: ProductName): void {
    this._name = name
    this.pushEvent(ProductNameUpdated.createEvent(this.id, this._name))
  }

  updateDescription(description: ProductDescription): void {
    this._description = description
    this.pushEvent(
      ProductDescriptionUpdated.createEvent(this.id, this._description)
    )
  }

  updatePrice(price: ProductPrice): void {
    this._price = price
    this.pushEvent(ProductPriceUpdated.createEvent(this.id, this._price))
  }

  addStock(stock: StockQuantity): void {
    const oldStock = this._stock
    this._stock = this._stock.add(stock)
    this.pushEvent(
      ProductStockAdded.createEvent(this.id, oldStock, this._stock)
    )
  }

  subtractStock(stock: StockQuantity): void {
    const oldStock = this._stock
    this._stock = this._stock.subtract(stock)
    this.pushEvent(
      ProductStockSubstracted.createEvent(this.id, oldStock, this._stock)
    )
  }

  protected validateState(): void {
    if (!this.id || !this._name || !this._price || !this._stock) {
      throw new Error('Invalid product state')
    }
  }
}

export const makeProduct = (data: {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  canStockBeDecimal: boolean
}) =>
  new Product(
    new ProductId(data.id),
    new ProductName(data.name),
    new ProductPrice(data.price),
    new ProductStock(new StockQuantity(data.stock), data.canStockBeDecimal),
    data.description ? new ProductDescription(data.description) : undefined
  )
