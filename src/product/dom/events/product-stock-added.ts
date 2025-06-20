import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductId } from '../value-objects/product-id'
import { ProductStock } from '../value-objects/product-stock'

export type ProductStockAddedEvent = DomainEvent<ProductStockAdded>

export class ProductStockAdded {
  private constructor() {}
  newStock: number
  quantityAdded: number

  static createEvent(
    dispatcher: ProductId,
    oldStock: ProductStock,
    newStock: ProductStock
  ): ProductStockAddedEvent {
    return DomainEventFactory<ProductStockAdded>({
      dispatcherId: dispatcher.value,
      name: ProductStockAdded.name,
      context: {
        newStock: newStock.quantity.value,
        quantityAdded: newStock.quantity.value - oldStock.quantity.value,
      },
    })
  }
}
