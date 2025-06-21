import { ValueObject } from '../../../core/dom/value-object/value-object'
import { ProductId } from '../../../product/dom/value-objects/product-id'
import { OrderItemUnitPrice } from './order-item-price'
import { OrderItemQuantity } from './order-item-quantity'

export class OrderItem implements ValueObject<OrderItem> {
  constructor(
    private readonly _productId: ProductId,
    private readonly _quantity: OrderItemQuantity,
    private readonly _unitPrice: OrderItemUnitPrice
  ) {}

  get productId(): ProductId {
    return this._productId
  }

  get quantity(): OrderItemQuantity {
    return this._quantity
  }

  get unitPrice(): OrderItemUnitPrice {
    return this._unitPrice
  }

  equals(other: OrderItem): boolean {
    return this._productId === other._productId
  }
}
