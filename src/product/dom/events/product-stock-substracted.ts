import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductId } from '../value-objects/product-id'
import { ProductStock } from '../value-objects/product-stock'

export type ProductStockSubstractedEvent = DomainEvent<ProductStockSubstracted>

export class ProductStockSubstracted {
  private constructor() {}
  newStock: number
  quantitySubstracted: number

  static createEvent(
    dispatcher: ProductId,
    oldStock: ProductStock,
    newStock: ProductStock
  ): ProductStockSubstractedEvent {
    return DomainEventFactory<ProductStockSubstracted>({
      dispatcherId: dispatcher.value,
      name: ProductStockSubstracted.name,
      context: {
        newStock: newStock.quantity.value,
        quantitySubstracted: oldStock.quantity.value - newStock.quantity.value,
      },
    })
  }
}
